# RTRIBE Dance Studio - Python Flask Website

A professional dance studio website built with Python Flask, featuring workshop management, responsive design, and WhatsApp integration.

## 🌟 Features

- **Workshop Management**: Dynamic workshop cards loaded from JSON data
- **Responsive Design**: Mobile-first design that works on all devices
- **Image Carousel**: Beautiful hero section with rotating images
- **WhatsApp Integration**: Direct registration via WhatsApp messages
- **Loading Animation**: Professional loading screen with studio branding
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Performance**: Optimized images, lazy loading, and efficient CSS
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rtribe_python
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

## 📁 Project Structure

```
rtribe_python/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css     # All styling
│   ├── js/
│   │   └── main.js       # JavaScript functionality
│   └── images/           # Image assets
├── data/
│   └── config.json    # Workshop data
```

## 🎨 Design System

### Color Palette
- **Primary Purple**: `#6A0DAD` - Main brand color, buttons, headings
- **Light Purple**: `#9B59B6` - Hover states, accents
- **Dark Purple**: `#4A0080` - Deep accents, shadows
- **Primary White**: `#FFFFFF` - Main background, button text
- **Secondary White**: `#F5F5F5` - Secondary backgrounds
- **Text Dark**: `#333333` - Primary text color

### Typography
- **Body Text**: Montserrat, system-ui, sans-serif
- **Headings**: Playfair Display, serif
- **Font Weights**: 300, 400, 500, 600, 700

### Responsive Breakpoints
- **Mobile**: 320px - 479px
- **Tablet**: 480px - 767px  
- **Desktop**: 768px - 1199px
- **Large**: 1200px+

## 🔧 Configuration

### Workshop Data Management

Edit `data/config.json` to manage workshop information:

```json
[
  {
    "id": 1,
    "title": "Belly Animation",
    "instructor": "Bindu Bolar",
    "time": "11:00 AM - 1:00 PM",
    "date": "June 8, 2025",
    "style": "Belly Animation",
    "price": "₹750",
    "image": "/static/images/bindu.png"
  }
]
```

### Environment Variables

Create a `.env` file for configuration:

```env
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_PORT=8080
WHATSAPP_NUMBER=917338003939
```

## 🎯 API Endpoints

- `GET /` - Main website
- `GET /api/workshops` - Workshop data API
- `GET /static/<filename>` - Static file serving

## 📱 WhatsApp Integration

### Workshop Registration Messages
Format: `"Hi, I'm interested for {WORKSHOP_NAME} by {INSTRUCTOR} on {DATE} {TIME}."`

Example: `"Hi, I'm interested for Hip Hop by Junaid on Jun 12 7:00 PM - 9:00 PM."`

### General Inquiry
Message: `"RTRIBE Workshop Inquiry. Please share workshop details."`

Phone Number: `+91 7338003939`

## 🎨 Customization

### Adding New Workshops
1. Add workshop data to `data/config.json`
2. Place instructor image in `static/images/`
3. Restart the server

### Styling Changes
1. Modify CSS variables in `static/css/style.css`
2. Update component styles as needed
3. Changes are reflected immediately

### Adding New Pages
1. Create new route in `app.py`
2. Add template in `templates/`
3. Update navigation if needed

## 🔍 SEO Optimization

- Semantic HTML5 structure
- Meta descriptions and titles
- Open Graph tags for social sharing
- Structured data for events
- Optimized images with alt tags
- Fast loading times (<3s)

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios (4.5:1+)
- Focus indicators
- Motion reduction support

## 📈 Performance

- Optimized images (WebP where supported)
- Lazy loading for below-fold content
- Minified CSS and JavaScript
- Efficient asset loading
- Service worker for caching
- Progressive enhancement

## 🔧 Development

### Local Development
```bash
# Install development dependencies
pip install -r requirements.txt

# Run with auto-reload
python app.py

# Access at http://localhost:8080
```

### Code Structure
- **Flask Routes**: Handle HTTP requests and serve templates
- **Jinja2 Templates**: Server-side HTML rendering
- **Vanilla JavaScript**: Client-side interactivity
- **CSS Grid/Flexbox**: Modern layout techniques

## 🚀 Deployment

### Production Deployment
1. Set environment variables
2. Use a production WSGI server (Gunicorn)
3. Configure reverse proxy (Nginx)
4. Set up SSL certificates
5. Configure monitoring

### Example with Gunicorn
```bash
gunicorn -w 4 -b 0.0.0.0:8080 app:app
```

## 📞 Contact Information

**RTRIBE Dance and Wellness Space**
- 📍 Cauvery Colony, Next to DMART, Koramangala, Bengaluru
- 📞 7338003939 / 7892547215  
- ✉️ beinrtribe@gmail.com
- 📷 [@beinrtribe](https://www.instagram.com/beinrtribe/)

## 🆕 Recent Updates

- ✅ Converted from React SPA to Python Flask server
- ✅ Maintained all original functionality and design
- ✅ Added proper SEO and accessibility features
- ✅ Implemented efficient workshop data management
- ✅ Enhanced performance and loading times

## 📝 License

This project is created for RTRIBE Dance Studio. All rights reserved.

---

**Built with ❤️ for the dance community in Bengaluru** 