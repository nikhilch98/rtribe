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

def read_workshops():
    try:
        with open('data/workshops.json', 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def write_workshops(workshops):
    with open('data/workshops.json', 'w') as f:
        json.dump(workshops, f, indent=2)

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
    return render_template('dashboard.html')

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

@app.route('/api/workshops')
def get_workshops():
    workshops = read_workshops()
    return jsonify(workshops)

@app.route('/api/workshops/update/<int:workshop_id>', methods=['POST'])
@login_required
def update_workshop(workshop_id):
    data = request.get_json()
    workshops = read_workshops()
    for workshop in workshops:
        if workshop['id'] == workshop_id:
            workshop.update(data)
            break
    write_workshops(workshops)
    return jsonify({'status': 'success'})

@app.route('/api/workshops/reorder', methods=['POST'])
@login_required
def reorder_workshops():
    data = request.get_json()
    order = [int(item_id) for item_id in data.get('order', [])]
    workshops = read_workshops()
    
    workshop_map = {w['id']: w for w in workshops}
    ordered_workshops = [workshop_map[item_id] for item_id in order if item_id in workshop_map]
    
    write_workshops(ordered_workshops)
    return jsonify({'status': 'success'})

@app.route('/api/workshops/delete/<int:workshop_id>', methods=['POST'])
@login_required
def delete_workshop(workshop_id):
    workshops = read_workshops()
    workshop_to_delete = next((w for w in workshops if w['id'] == workshop_id), None)

    if workshop_to_delete:
        image_path = workshop_to_delete.get('image')
        if image_path:
            # Path is stored like '/static/assets/image.png', remove leading '/' to get relative path
            filepath = image_path.lstrip('/')
            if os.path.exists(filepath):
                try:
                    os.remove(filepath)
                except OSError as e:
                    # Log error but continue with workshop deletion
                    print(f"Error deleting image file {filepath}: {e}")

    workshops = [w for w in workshops if w['id'] != workshop_id]
    write_workshops(workshops)
    return jsonify({'status': 'success'})

@app.route('/api/workshops/add', methods=['POST'])
@login_required
def add_workshop():
    if 'image' not in request.files:
        return jsonify({'status': 'error', 'message': 'No image file provided'}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No selected file'}), 400
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        
        file.save(filepath)
        
        workshops = read_workshops()
        
        new_workshop_data = {
            'title': request.form.get('title'),
            'instructor': request.form.get('instructor'),
            'time': request.form.get('time'),
            'date': request.form.get('date'),
            'style': request.form.get('style'),
            'price': request.form.get('price'),
            'image': f'/{filepath}'
        }
        
        new_id = max([w['id'] for w in workshops]) + 1 if workshops else 1
        new_workshop_data['id'] = new_id
        
        workshops.append(new_workshop_data)
        write_workshops(workshops)
        
        return jsonify({'status': 'success', 'id': new_id})
    else:
        return jsonify({'status': 'error', 'message': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8002)