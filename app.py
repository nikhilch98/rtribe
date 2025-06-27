from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from functools import wraps
import json
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'your_very_secret_key'  # Change this in a real app!
app.config['UPLOAD_FOLDER'] = 'static/assets'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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
        
        image_url = f'/{filepath}' # URL path for the client
        return jsonify({'status': 'success', 'imageUrl': image_url})

    return jsonify({'status': 'error', 'message': 'File type not allowed'}), 400

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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8004)