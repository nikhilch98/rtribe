from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from functools import wraps
import json
import os
from werkzeug.utils import secure_filename
from PIL import Image
import logging
import secrets
import threading
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from twilio.rest import Client
from twilio.base.exceptions import TwilioException
from jose import JWTError, jwt

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Twilio Configuration - Load from environment variables
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_VERIFY_SERVICE_SID = os.getenv('TWILIO_VERIFY_SERVICE_SID')

# JWT Configuration
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key_change_in_production')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24 * 30  # 30 days

# Auth Token Storage Interface
class AuthTokenStorage:
    """Interface for auth token storage operations."""
    
    def __init__(self, storage_file='data/auth_tokens.json'):
        self.storage_file = storage_file
        os.makedirs(os.path.dirname(storage_file), exist_ok=True)
    
    def save_token(self, mobile_number: str, token: str, expires_at: datetime) -> bool:
        """Save auth token for a mobile number."""
        try:
            tokens = self._load_tokens()
            tokens[mobile_number] = {
                'token': token,
                'expires_at': expires_at.isoformat(),
                'created_at': datetime.utcnow().isoformat()
            }
            return self._save_tokens(tokens)
        except Exception as e:
            logger.error(f"Error saving token: {e}")
            return False
    
    def get_token(self, mobile_number: str) -> Optional[Dict[str, Any]]:
        """Get auth token for a mobile number."""
        try:
            tokens = self._load_tokens()
            token_data = tokens.get(mobile_number)
            if token_data:
                expires_at = datetime.fromisoformat(token_data['expires_at'])
                if expires_at > datetime.utcnow():
                    return token_data
                else:
                    # Token expired, remove it
                    self.revoke_token(mobile_number)
            return None
        except Exception as e:
            logger.error(f"Error getting token: {e}")
            return None
    
    def revoke_token(self, mobile_number: str) -> bool:
        """Revoke auth token for a mobile number."""
        try:
            tokens = self._load_tokens()
            if mobile_number in tokens:
                del tokens[mobile_number]
                return self._save_tokens(tokens)
            return True
        except Exception as e:
            logger.error(f"Error revoking token: {e}")
            return False
    
    def verify_token(self, token: str) -> Optional[str]:
        """Verify token and return mobile number if valid."""
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
            mobile_number = payload.get("sub")
            exp = payload.get("exp")
            
            if mobile_number and exp:
                if datetime.utcfromtimestamp(exp) > datetime.utcnow():
                    # Check if the token still exists in storage (not revoked)
                    stored_token = self.get_token(mobile_number)
                    if stored_token and stored_token['token'] == token:
                        return mobile_number
            return None
        except JWTError:
            return None
    
    def _load_tokens(self) -> Dict[str, Any]:
        """Load tokens from storage file."""
        try:
            if os.path.exists(self.storage_file):
                with open(self.storage_file, 'r') as f:
                    return json.load(f)
            return {}
        except (FileNotFoundError, json.JSONDecodeError):
            return {}
    
    def _save_tokens(self, tokens: Dict[str, Any]) -> bool:
        """Save tokens to storage file."""
        try:
            with open(self.storage_file, 'w') as f:
                json.dump(tokens, f, indent=2)
            return True
        except Exception as e:
            logger.error(f"Error saving tokens to file: {e}")
            return False

# Twilio OTP Service
class TwilioOTPService:
    """Service for handling OTP operations with Twilio."""
    
    def __init__(self):
        """Initialize Twilio client."""
        if not all([TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID]):
            logger.warning("Twilio credentials not properly configured. Missing environment variables. OTP service will use test mode.")
            logger.info("Required environment variables: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID")
            self.client = None
        else:
            try:
                self.client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
                logger.info(f"Twilio client initialized successfully with Account SID: {TWILIO_ACCOUNT_SID[:8]}...")
            except Exception as e:
                logger.error(f"Failed to initialize Twilio client: {e}")
                self.client = None
        self.verify_service_sid = TWILIO_VERIFY_SERVICE_SID
    
    def send_otp(self, mobile_number: str) -> dict:
        """
        Send OTP to mobile number.
        
        Args:
            mobile_number: 10-digit mobile number without country code
            
        Returns:
            dict: Response with status and message
        """
        try:
            # Test mode for development
            if mobile_number == "9999999999":
                logger.info(f"Test mode: OTP sent to {mobile_number}")
                return {
                    "success": True,
                    "message": "OTP sent successfully (test mode)",
                    "sid": "test_sid"
                }
            
            # Check if Twilio client is available
            if not self.client:
                logger.warning(f"Twilio client not available for {mobile_number}, using test mode")
                return {
                    "success": True,
                    "message": "OTP sent successfully (test mode - Twilio not configured)",
                    "sid": "test_sid"
                }
            
            # Format mobile number with +91 country code
            formatted_number = f"+91{mobile_number}"
            
            # Send OTP using Twilio Verify
            verification = self.client.verify.v2.services(
                self.verify_service_sid
            ).verifications.create(
                to=formatted_number,
                channel="sms"
            )
            
            if verification.status == "pending":
                logger.info(f"OTP sent successfully to {mobile_number}")
                return {
                    "success": True,
                    "message": "OTP sent successfully",
                    "sid": verification.sid
                }
            else:
                logger.error(f"Failed to send OTP to {mobile_number}: {verification.status}")
                return {
                    "success": False,
                    "message": "Failed to send OTP"
                }
                
        except TwilioException as e:
            logger.error(f"Twilio error sending OTP to {mobile_number}: {str(e)}")
            return {
                "success": False,
                "message": f"Failed to send OTP: {str(e)}"
            }
        except Exception as e:
            logger.error(f"Unexpected error sending OTP to {mobile_number}: {str(e)}")
            return {
                "success": False,
                "message": "An unexpected error occurred"
            }
    
    def verify_otp(self, mobile_number: str, otp_code: str) -> dict:
        """
        Verify OTP code.
        
        Args:
            mobile_number: 10-digit mobile number without country code
            otp_code: 6-digit OTP code
            
        Returns:
            dict: Response with verification status
        """
        try:
            # Test mode for development
            if mobile_number == "9999999999" and otp_code == "123456":
                logger.info(f"Test mode: OTP verified for {mobile_number}")
                return {
                    "success": True,
                    "message": "OTP verified successfully (test mode)",
                    "sid": "test_verification_sid"
                }
            
            # Check if Twilio client is available
            if not self.client:
                logger.warning(f"Twilio client not available for {mobile_number}, using test mode")
                return {
                    "success": True,
                    "message": "OTP verified successfully (test mode - Twilio not configured)",
                    "sid": "test_verification_sid"
                }
            
            # Format mobile number with +91 country code
            formatted_number = f"+91{mobile_number}"
            
            # Verify OTP using Twilio Verify
            verification_check = self.client.verify.v2.services(
                self.verify_service_sid
            ).verification_checks.create(
                to=formatted_number,
                code=otp_code
            )
            
            if verification_check.status == "approved":
                logger.info(f"OTP verified successfully for {mobile_number}")
                return {
                    "success": True,
                    "message": "OTP verified successfully",
                    "sid": verification_check.sid
                }
            else:
                logger.warning(f"OTP verification failed for {mobile_number}: {verification_check.status}")
                return {
                    "success": False,
                    "message": "Invalid or expired OTP"
                }
                
        except TwilioException as e:
            logger.error(f"Twilio error verifying OTP for {mobile_number}: {str(e)}")
            return {
                "success": False,
                "message": f"OTP verification failed: {str(e)}"
            }
        except Exception as e:
            logger.error(f"Unexpected error verifying OTP for {mobile_number}: {str(e)}")
            return {
                "success": False,
                "message": "An unexpected error occurred"
            }

# Initialize services
auth_storage = AuthTokenStorage()
twilio_service = TwilioOTPService()

def send_otp_background(mobile_number: str):
    """Send OTP in background thread."""
    try:
        logger.info(f"Background OTP sending started for: {mobile_number}")
        result = twilio_service.send_otp(mobile_number)
        print("twilio result ",result)
        if result["success"]:
            logger.info(f"Background OTP sent successfully to: {mobile_number}")
        else:
            logger.error(f"Background OTP sending failed for {mobile_number}: {result['message']}")
            
    except Exception as e:
        logger.error(f"Background OTP sending error for {mobile_number}: {str(e)}")

def create_access_token(mobile_number: str, expires_delta: Optional[timedelta] = None) -> str:
    """Create JWT access token."""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    
    to_encode = {"exp": expire, "sub": mobile_number}
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt

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

# --- OTP Authentication APIs ---

@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    """Send OTP to mobile number asynchronously."""
    try:
        data = request.get_json()
        if not data or 'mobile_number' not in data:
            return jsonify({
                'success': False,
                'message': 'Mobile number is required'
            }), 400
        
        mobile_number = data['mobile_number'].strip()
        
        # Validate mobile number format (basic validation)
        if not mobile_number or len(mobile_number) != 10 or not mobile_number.isdigit():
            return jsonify({
                'success': False,
                'message': 'Invalid mobile number format. Please provide 10-digit mobile number.'
            }), 400
        
        # Log the request
        logger.info(f"OTP request received for: {mobile_number}")
        
        # Test number returns immediately
        if mobile_number == "9999999999":
            return jsonify({
                "success": True,
                "message": "OTP is being sent to your mobile number",
                "mobile_number": mobile_number
            })
        
        # Schedule OTP sending in background (fire and forget)
        thread = threading.Thread(target=send_otp_background, args=(mobile_number,))
        thread.daemon = True
        thread.start()
        
        # Return immediate success response
        return jsonify({
            "success": True,
            "message": "OTP is being sent to your mobile number",
            "mobile_number": mobile_number
        })
        
    except Exception as e:
        logger.error(f"Send OTP endpoint error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to process OTP request'
        }), 500

@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    """Verify OTP and generate auth token."""
    try:
        data = request.get_json()
        if not data or 'mobile_number' not in data or 'otp' not in data:
            return jsonify({
                'success': False,
                'message': 'Mobile number and OTP are required'
            }), 400
        
        mobile_number = data['mobile_number'].strip()
        otp_code = data['otp'].strip()
        
        # Validate mobile number format
        if not mobile_number or len(mobile_number) != 10 or not mobile_number.isdigit():
            return jsonify({
                'success': False,
                'message': 'Invalid mobile number format. Please provide 10-digit mobile number.'
            }), 400
        
        # Validate OTP format
        if not otp_code or len(otp_code) != 6 or not otp_code.isdigit():
            return jsonify({
                'success': False,
                'message': 'Invalid OTP format. Please provide 6-digit OTP.'
            }), 400
        
        # Verify OTP using Twilio
        result = twilio_service.verify_otp(mobile_number, otp_code)
        
        if not result["success"]:
            return jsonify({
                'success': False,
                'message': result["message"]
            }), 400
        
        # Generate access token
        access_token_expires = timedelta(hours=JWT_EXPIRATION_HOURS)
        access_token = create_access_token(mobile_number, access_token_expires)
        expires_at = datetime.utcnow() + access_token_expires
        
        # Save token to storage
        if not auth_storage.save_token(mobile_number, access_token, expires_at):
            logger.error(f"Failed to save token for {mobile_number}")
            return jsonify({
                'success': False,
                'message': 'Failed to save authentication token'
            }), 500
        
        logger.info(f"OTP verified and token generated for {mobile_number}")
        
        return jsonify({
            'success': True,
            'message': 'OTP verified successfully',
            'access_token': access_token,
            'token_type': 'bearer',
            'expires_in': int(access_token_expires.total_seconds()),
            'mobile_number': mobile_number
        })
        
    except Exception as e:
        logger.error(f"OTP verification error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'OTP verification failed'
        }), 500

@app.route('/api/verify-token', methods=['POST'])
def verify_auth_token():
    """Verify if auth token is valid."""
    try:
        data = request.get_json()
        if not data or 'token' not in data:
            return jsonify({
                'success': False,
                'message': 'Token is required'
            }), 400
        
        token = data['token']
        mobile_number = auth_storage.verify_token(token)
        
        if mobile_number:
            return jsonify({
                'success': True,
                'message': 'Token is valid',
                'mobile_number': mobile_number
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Invalid or expired token'
            }), 401
            
    except Exception as e:
        logger.error(f"Token verification error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Token verification failed'
        }), 500

@app.route('/api/logout', methods=['POST'])
def logout_user():
    """Logout user by revoking their token."""
    try:
        data = request.get_json()
        if not data or 'token' not in data:
            return jsonify({
                'success': False,
                'message': 'Token is required'
            }), 400
        
        token = data['token']
        mobile_number = auth_storage.verify_token(token)
        
        if mobile_number:
            auth_storage.revoke_token(mobile_number)
            logger.info(f"User {mobile_number} logged out successfully")
            return jsonify({
                'success': True,
                'message': 'Logged out successfully'
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Invalid token'
            }), 401
            
    except Exception as e:
        logger.error(f"Logout error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Logout failed'
        }), 500

# --- End OTP Authentication APIs ---

@app.route('/api/whatsapp-config', methods=['POST'])
@login_required
def save_whatsapp_config():
    """
    Saves WhatsApp configuration data to the config file.
    Preserves sections and other config data.
    """
    whatsapp_data = request.get_json()
    if not isinstance(whatsapp_data, dict):
        return jsonify({'status': 'error', 'message': 'Invalid data format. Expected a dictionary.'}), 400
    
    # Validate required fields
    required_fields = ['phoneNumber', 'workshopMessageTemplate', 'generalInquiryMessage']
    for field in required_fields:
        if field not in whatsapp_data or not whatsapp_data[field]:
            return jsonify({'status': 'error', 'message': f'Missing required field: {field}'}), 400
    
    # Validate phone number format
    if not whatsapp_data['phoneNumber'].isdigit():
        return jsonify({'status': 'error', 'message': 'Phone number must contain only digits'}), 400
    
    # Read current config to preserve other data
    config = read_config()
    
    # Update WhatsApp configuration
    config['whatsappConfig'] = whatsapp_data
    
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
        'message': 'WhatsApp configuration saved successfully.',
        'phoneNumber': whatsapp_data['phoneNumber']
    })

# Profile Management APIs
@app.route('/api/get-profile', methods=['GET'])
def get_profile():
    """Get user profile information"""
    try:
        # Get authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Missing or invalid authorization header'}), 401
        
        token = auth_header.split(' ')[1]
        
        # Verify token and get user info
        mobile_number = auth_storage.verify_token(token)
        if not mobile_number:
            return jsonify({'error': 'Invalid or expired token'}), 401
        
        # Get profile data from storage
        profile_data = get_user_profile(mobile_number)
        
        if profile_data:
            return jsonify({'success': True, 'profile': profile_data})
        else:
            return jsonify({'success': False, 'message': 'Profile not found'}), 404
        
    except Exception as e:
        logging.error(f"Error getting profile: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/update-profile', methods=['POST'])
def update_profile():
    """Update user profile information"""
    try:
        # Get authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Missing or invalid authorization header'}), 401
        
        token = auth_header.split(' ')[1]
        
        # Verify token and get user info
        mobile_number = auth_storage.verify_token(token)
        if not mobile_number:
            return jsonify({'error': 'Invalid or expired token'}), 401
        
        # Get profile data from request
        profile_data = request.get_json()
        if not profile_data:
            return jsonify({'error': 'No profile data provided'}), 400
        
        # Log profile picture data for debugging
        if 'profilePicture' in profile_data:
            pic_data = profile_data['profilePicture']
            if pic_data:
                logging.info(f"Profile picture received: {len(pic_data)} characters")
            else:
                logging.info("Profile picture field is empty")
        else:
            logging.info("No profilePicture field in request")
        
        # Validate profile data
        validation_error = validate_profile_data(profile_data)
        if validation_error:
            return jsonify({'error': validation_error}), 400
        
        # Update profile
        success = update_user_profile(mobile_number, profile_data)
        
        if success:
            return jsonify({
                'success': True,
                'message': 'Profile updated successfully'
            })
        else:
            return jsonify({'error': 'Failed to update profile'}), 500
        
    except Exception as e:
        logging.error(f"Error updating profile: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

def get_user_profile(mobile_number):
    """Get user profile data from storage"""
    try:
        profile_file = "data/user_data.json"
        pictures_file = "data/profile_pictures.json"
        
        # Load all user data
        if os.path.exists(profile_file):
            with open(profile_file, 'r') as f:
                all_users = json.load(f)
        else:
            all_users = {}
        
        # Load profile pictures data
        if os.path.exists(pictures_file):
            with open(pictures_file, 'r') as f:
                all_pictures = json.load(f)
        else:
            all_pictures = {}
        
        # Get specific user's profile
        if mobile_number in all_users:
            profile = all_users[mobile_number].copy()
            # Add profile picture from separate file
            profile['profilePicture'] = all_pictures.get(mobile_number, '')
            return profile
        else:
            # Return default profile structure
            return {
                'mobile': mobile_number,
                'name': '',
                'email': '',
                'dateOfBirth': '',
                'gender': '',
                'profilePicture': all_pictures.get(mobile_number, ''),
                'createdAt': datetime.now().isoformat(),
                'updatedAt': datetime.now().isoformat()
            }
    except Exception as e:
        logging.error(f"Error getting user profile: {str(e)}")
        return {
            'success': False,
            'error': 'Failed to load profile'
        }

def update_user_profile(mobile_number, profile_data):
    """Update user profile data in storage"""
    try:
        profile_file = "data/user_data.json"
        pictures_file = "data/profile_pictures.json"
        
        # Load all user data
        if os.path.exists(profile_file):
            with open(profile_file, 'r') as f:
                all_users = json.load(f)
        else:
            all_users = {}
        
        # Load profile pictures data
        if os.path.exists(pictures_file):
            with open(pictures_file, 'r') as f:
                all_pictures = json.load(f)
        else:
            all_pictures = {}
        
        # Get existing profile or create new one
        if mobile_number in all_users:
            existing_profile = all_users[mobile_number]
        else:
            existing_profile = {
                'mobile': mobile_number,
                'createdAt': datetime.now().isoformat()
            }
        
        # Handle profile picture separately
        profile_picture = profile_data.get('profilePicture', '')
        if profile_picture:
            # Store profile picture in separate file
            all_pictures[mobile_number] = profile_picture
            logging.info(f"Profile picture stored for user: {mobile_number} (size: {len(profile_picture)} chars)")
        elif mobile_number in all_pictures:
            # If no new picture provided but user wants to remove it, remove from pictures file
            if profile_picture == '':
                del all_pictures[mobile_number]
                logging.info(f"Profile picture removed for user: {mobile_number}")
        
        # Update profile data (without profile picture)
        existing_profile.update({
            'name': profile_data.get('name', ''),
            'email': profile_data.get('email', ''),
            'dateOfBirth': profile_data.get('dateOfBirth', ''),
            'gender': profile_data.get('gender', ''),
            'updatedAt': datetime.now().isoformat()
        })
        
        # Update the specific user's data
        all_users[mobile_number] = existing_profile
        
        # Save user data back to file (without profile picture)
        with open(profile_file, 'w') as f:
            json.dump(all_users, f, indent=2)
        
        # Save profile pictures to separate file
        with open(pictures_file, 'w') as f:
            json.dump(all_pictures, f, indent=2)
        
        logging.info(f"Profile updated for user: {mobile_number}")
        return True
        
    except Exception as e:
        logging.error(f"Error updating user profile: {str(e)}")
        return False

def validate_profile_data(profile_data):
    """Validate profile data"""
    try:
        # Check required fields
        name = profile_data.get('name', '').strip()
        if not name:
            return "Name is required"
        
        if len(name) < 2:
            return "Name must be at least 2 characters long"
        
        if len(name) > 100:
            return "Name must be less than 100 characters"
        
        # Validate email if provided
        email = profile_data.get('email', '').strip()
        if email:
            import re
            email_pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
            if not re.match(email_pattern, email):
                return "Invalid email format"
        
        # Validate date of birth if provided
        dob = profile_data.get('dateOfBirth', '').strip()
        if dob:
            try:
                from datetime import datetime
                dob_date = datetime.strptime(dob, '%Y-%m-%d')
                
                # Check if date is not in the future
                if dob_date > datetime.now():
                    return "Date of birth cannot be in the future"
                
                # Check if age is reasonable (not older than 120 years)
                age = (datetime.now() - dob_date).days / 365.25
                if age > 120:
                    return "Invalid date of birth"
                    
            except ValueError:
                return "Invalid date format. Use YYYY-MM-DD"
        
        # Validate gender if provided
        gender = profile_data.get('gender', '').strip()
        if gender:
            valid_genders = ['male', 'female', 'other', 'prefer-not-to-say']
            if gender not in valid_genders:
                return "Invalid gender option"
        
        return None  # No validation errors
        
    except Exception as e:
        logging.error(f"Error validating profile data: {str(e)}")
        return "Invalid profile data"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)