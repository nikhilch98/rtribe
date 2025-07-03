from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from functools import wraps
import json
import os
from werkzeug.utils import secure_filename
from PIL import Image

app = Flask(__name__)
app.secret_key = 'your_very_secret_key'  # Change this in a real app!
app.config['UPLOAD_FOLDER'] = 'static/assets'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'mov', 'avi', 'webm'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def detect_image_aspect_ratio(image_path):
    """Detect the aspect ratio of an image file"""
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            aspect_ratio = round(width / height, 3)
            print(f"Detected aspect ratio for {image_path}: {width}x{height} = {aspect_ratio}")
            return aspect_ratio
    except Exception as e:
        print(f"Error detecting aspect ratio for {image_path}: {e}")
        return 0.75  # Default to 3:4 portrait ratio

def get_optimal_aspect_ratio_category(aspect_ratio):
    """Convert numeric aspect ratio to CSS aspect ratio category"""
    if aspect_ratio > 1.5:
        return "16/9"  # Wide landscape
    elif aspect_ratio > 1.1:
        return "4/3"   # Standard landscape
    elif aspect_ratio > 0.9:
        return "1/1"   # Square-ish
    elif aspect_ratio > 0.6:
        return "3/4"   # Standard portrait
    else:
        return "2/3"   # Tall portrait

# Decorator to check if user is logged in
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

def read_config():
    try:
        with open('data/config.json', 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        # Default structure if config is missing or malformed
        return {"sections": []}

def write_config(config):
    with open('data/config.json', 'w') as f:
        json.dump(config, f, indent=2)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/admin')
@login_required
def admin():
    return redirect(url_for('dashboard'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'logged_in' in session:
        return redirect(url_for('dashboard'))
    if request.method == 'POST':
        # In a real application, use a more secure way to handle credentials
        if request.form['username'] == 'admin' and request.form['password'] == 'password':
            session['logged_in'] = True
            next_url = request.args.get('next')
            return redirect(next_url or url_for('dashboard'))
        else:
            return render_template('admin.html', error='Invalid credentials')
    return render_template('admin.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('admin_dashboard.html')

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

# --- API for dynamic sections ---

@app.route('/api/sections', methods=['GET'])
def get_sections():
    config = read_config()
    # For admin dashboard: return sections array directly
    # For frontend: return complete config including carousel images
    
    # Check if request is from admin dashboard by checking the referer or user agent
    # For now, let's return complete config and fix the frontend to handle it properly
    return jsonify(config)

@app.route('/api/sections', methods=['POST'])
@login_required
def save_sections():
    """
    Receives the entire sections array from the client and saves it to the config file.
    This single endpoint handles creating, updating, deleting, and reordering sections and their items.
    Preserves carousel images and other config data.
    """
    sections_data = request.get_json()
    if not isinstance(sections_data, list):
        return jsonify({'status': 'error', 'message': 'Invalid data format. Expected a list of sections.'}), 400
    
    # Read current config to preserve carousel images and other data
    config = read_config()
    
    # Update only the sections part
    config['sections'] = sections_data
    
    # Ensure other required fields exist
    if 'siteData' not in config:
        config['siteData'] = {'title': 'Workshops'}
    if 'carouselImages' not in config:
        config['carouselImages'] = [
            {"id": 1, "imageUrl": "/static/assets/All_artist.jpg", "title": "All Artists", "description": "Meet all our talented dance instructors"},
            {"id": 2, "imageUrl": "/static/assets/schedule.jpg", "title": "Schedule", "description": "View the complete workshop schedule"},
            {"id": 3, "imageUrl": "/static/assets/fees1.jpg", "title": "Fees", "description": "Workshop pricing information"}
        ]
    
    write_config(config)
    
    return jsonify({'status': 'success', 'message': 'Sections saved successfully.', 'preserved_carousel_images': len(config.get('carouselImages', []))})

@app.route('/api/upload', methods=['POST'])
@login_required
def upload_file():
    if 'image' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file part in the request'}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No file selected for uploading'}), 400
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        file.save(filepath)
        
        # Detect aspect ratio of uploaded image
        aspect_ratio = detect_image_aspect_ratio(filepath)
        aspect_ratio_category = get_optimal_aspect_ratio_category(aspect_ratio)
        
        image_url = f'/{filepath}' # URL path for the client
        return jsonify({
            'status': 'success', 
            'imageUrl': image_url,
            'aspectRatio': aspect_ratio,
            'aspectRatioCategory': aspect_ratio_category
        })

    return jsonify({'status': 'error', 'message': 'File type not allowed'}), 400

@app.route('/api/detect-aspect-ratio', methods=['POST'])
@login_required
def detect_aspect_ratio_endpoint():
    """Detect aspect ratio for an existing image URL"""
    data = request.get_json()
    image_url = data.get('imageUrl', '')
    
    if not image_url:
        return jsonify({'status': 'error', 'message': 'No image URL provided'}), 400
    
    # Convert URL path to file path
    if image_url.startswith('/static/'):
        file_path = image_url[1:]  # Remove leading slash
    else:
        file_path = f"static{image_url}" if not image_url.startswith('/static') else image_url[1:]
    
    if os.path.exists(file_path):
        aspect_ratio = detect_image_aspect_ratio(file_path)
        aspect_ratio_category = get_optimal_aspect_ratio_category(aspect_ratio)
        
        return jsonify({
            'status': 'success',
            'imageUrl': image_url,
            'aspectRatio': aspect_ratio,
            'aspectRatioCategory': aspect_ratio_category
        })
    else:
        print(f"Image file not found: {file_path}")
        return jsonify({
            'status': 'error',
            'message': 'Image file not found',
            'aspectRatio': 0.75,  # Default fallback
            'aspectRatioCategory': '3/4'
        }), 404

@app.route('/api/carousel', methods=['POST'])
@login_required
def save_carousel():
    """
    Saves carousel images data to the config file.
    Preserves sections and other config data.
    """
    carousel_data = request.get_json()
    if not isinstance(carousel_data, list):
        return jsonify({'status': 'error', 'message': 'Invalid data format. Expected a list of carousel items.'}), 400
    
    # Read current config to preserve other data
    config = read_config()
    
    # Update carousel images
    config['carouselImages'] = carousel_data
    
    # Ensure other required fields exist
    if 'siteData' not in config:
        config['siteData'] = {'title': 'Workshops'}
    if 'sections' not in config:
        config['sections'] = []
    
    write_config(config)
    
    return jsonify({
        'status': 'success', 
        'message': 'Carousel saved successfully.', 
        'carousel_items_count': len(carousel_data)
    })

@app.route('/api/secondary-carousel', methods=['POST'])
@login_required
def save_secondary_carousel():
    """
    Saves secondary carousel images data to the config file.
    Preserves sections and other config data.
    """
    secondary_carousel_data = request.get_json()
    if not isinstance(secondary_carousel_data, list):
        return jsonify({'status': 'error', 'message': 'Invalid data format. Expected a list of secondary carousel items.'}), 400
    
    # Read current config to preserve other data
    config = read_config()
    
    # Update secondary carousel images
    config['secondaryCarouselImages'] = secondary_carousel_data
    
    # Ensure other required fields exist
    if 'siteData' not in config:
        config['siteData'] = {'title': 'Workshops'}
    if 'sections' not in config:
        config['sections'] = []
    if 'carouselImages' not in config:
        config['carouselImages'] = []
    
    write_config(config)
    
    return jsonify({
        'status': 'success', 
        'message': 'Secondary carousel saved successfully.', 
        'secondary_carousel_items_count': len(secondary_carousel_data)
    })

@app.route('/api/testimonial-videos', methods=['GET'])
def get_testimonial_videos():
    """
    Get testimonial videos data from the config file.
    """
    config = read_config()
    videos = config.get('testimonialVideos', [])
    return jsonify(videos)

@app.route('/api/testimonial-videos', methods=['POST'])
@login_required
def save_testimonial_videos():
    """
    Saves testimonial videos data to the config file.
    Preserves sections and other config data.
    """
    videos_data = request.get_json()
    if not isinstance(videos_data, list):
        return jsonify({'status': 'error', 'message': 'Invalid data format. Expected a list of video items.'}), 400
    
    # Read current config to preserve other data
    config = read_config()
    
    # Update testimonial videos
    config['testimonialVideos'] = videos_data
    
    # Ensure other required fields exist
    if 'siteData' not in config:
        config['siteData'] = {'title': 'Workshops'}
    if 'sections' not in config:
        config['sections'] = []
    if 'carouselImages' not in config:
        config['carouselImages'] = []
    
    write_config(config)
    
    return jsonify({
        'status': 'success', 
        'message': 'Testimonial videos saved successfully.', 
        'video_items_count': len(videos_data)
    })

@app.route('/api/upload-video', methods=['POST'])
@login_required
def upload_video():
    """
    Handle video file uploads for testimonials.
    """
    if 'video' not in request.files:
        return jsonify({'status': 'error', 'message': 'No video file part in the request'}), 400
    
    file = request.files['video']
    
    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No video file selected for uploading'}), 400
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        
        # Create videos subdirectory if it doesn't exist
        videos_dir = os.path.join(app.config['UPLOAD_FOLDER'], 'videos')
        os.makedirs(videos_dir, exist_ok=True)
        
        filepath = os.path.join(videos_dir, filename)
        file.save(filepath)
        
        video_url = f'/static/assets/videos/{filename}'
        return jsonify({
            'status': 'success', 
            'videoUrl': video_url,
            'filename': filename
        })

    return jsonify({'status': 'error', 'message': 'Video file type not allowed. Supported: mp4, mov, avi, webm'}), 400


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=51176)