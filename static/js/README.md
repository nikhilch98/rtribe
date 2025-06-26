# RTRIBE Dance Studio - Modular JavaScript Architecture

This document outlines the refactored JavaScript structure for the RTRIBE Dance Studio website, split into maintainable modules for easier editing and development.

## 📁 File Structure

```
static/js/
├── app.js                    # Main application entry point
├── components/               # React-like component classes
│   ├── LoadingScreen.js      # 1.5s loading screen with animation
│   ├── HeroSection.js        # Main hero/intro section
│   ├── DanceWeekSection.js   # Dance week information section
│   ├── WorkshopsSection.js   # Workshop cards and registration
│   ├── ShowcaseSection.js    # Showcase event details
│   └── Footer.js             # Contact info and footer content
├── data/                     # Data files and configurations
│   └── workshops.js          # Workshop data, artist profiles, utilities
├── utils/                    # Utility functions
│   └── whatsapp.js           # WhatsApp integration functions
└── README.md                 # This documentation file
```

## 🚀 Main Components

### 1. **app.js** - Application Controller
- **Purpose**: Main application orchestrator
- **Features**: 
  - Manages component initialization
  - Handles loading sequence (1.5s loading screen)
  - Sets up scroll behavior
  - Coordinates between all components
- **Key Methods**: `init()`, `renderApp()`, `initScrollBehavior()`

### 2. **LoadingScreen.js** - Loading Animation
- **Purpose**: Shows branded loading screen for 1.5 seconds
- **Features**:
  - Animated GIF display
  - Fade-out transition
  - Auto-hide after 1.5s
- **Key Methods**: `show()`, `hide()`

### 3. **HeroSection.js** - Hero/Intro Section  
- **Purpose**: Main website introduction and call-to-action
- **Features**:
  - Hero image with overlay
  - Primary and secondary CTA buttons
  - Responsive text sizing
  - Scroll-to-section functionality
- **Key Methods**: `render()`, `updateContent()`

### 4. **DanceWeekSection.js** - Dance Week Info
- **Purpose**: Highlights the Namma Dance Week event
- **Features**:
  - Animated gradient background
  - Scroll-triggered animations
  - Event date highlighting
- **Key Methods**: `render()`, `addScrollAnimations()`, `updateInfo()`

### 5. **WorkshopsSection.js** - Workshop Cards
- **Purpose**: Displays workshop grid with registration functionality
- **Features**:
  - Dynamic workshop card rendering
  - WhatsApp registration integration
  - Hover effects and animations
  - Workshop filtering capabilities
- **Key Methods**: `render()`, `renderWorkshopCard()`, `attachEventListeners()`

### 6. **ShowcaseSection.js** - Showcase Event
- **Purpose**: Information about the final showcase performance
- **Features**:
  - Highlight items with animations
  - Scroll-triggered reveals
  - Dynamic content updates
- **Key Methods**: `render()`, `addScrollAnimations()`, `addHighlight()`

### 7. **Footer.js** - Contact & Information
- **Purpose**: Contact details, studio info, and general registration
- **Features**:
  - Responsive layout (desktop/mobile)
  - Social media links
  - Workshop hours display
  - General inquiry WhatsApp integration
- **Key Methods**: `render()`, `updateContactInfo()`, `updateSchedule()`

## 📊 Data Management

### **workshops.js** - Workshop Data Hub
- **workshopData**: Array of workshop information
- **artistProfiles**: Detailed artist information
- **workshopUtils**: Helper functions for data manipulation
- **Features**:
  - Search by artist, style, date
  - Format dates for display
  - Get unique artists/styles

## 🔧 Utilities

### **whatsapp.js** - WhatsApp Integration
- **Core Functions**:
  - `registerForWorkshop(workshop)` - Individual workshop registration
  - `sendGeneralInquiry()` - General workshop inquiry
  - `registerForMultipleWorkshops(workshops)` - Bulk registration
  - `inquireAboutShowcase()` - Showcase event inquiry
- **Features**:
  - Proper message formatting (removes current year from dates)
  - URL encoding for WhatsApp links
  - Error handling and fallbacks
  - Phone number: +917338003939

## 🎨 Styling

The modular components work with two CSS files:
- **`assets/css/index.css`** - Original styles (unchanged)
- **`css/components.css`** - New component-specific styles

## 💡 Key Features Preserved

### ✅ All Original Functionality Maintained:
- **Loading Screen**: 1.5-second branded animation
- **WhatsApp Integration**: Exact message formats maintained
  - Workshop registration: `"Hi, I'm interested for {style} by {artist} on {date} {time}."`
  - General inquiry: `"RTRIBE Workshop Inquiry. Please share workshop details."`
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Animations**: Scroll-triggered animations and hover effects
- **Workshop Data**: All artist information and workshop details
- **Contact Information**: Studio details, social links, schedule

### 📱 WhatsApp Message Format Examples:
```javascript
// Workshop Registration
"Hi, I'm interested for Hip Hop by Bindu on Jun 10 7:00 PM - 9:00 PM."

// General Inquiry  
"RTRIBE Workshop Inquiry. Please share workshop details."

// Multiple Workshops
"Hi, I'm interested in registering for multiple workshops:

1. Hip Hop by Bindu on Jun 10 7:00 PM - 9:00 PM
2. Contemporary by Siya on Jun 11 2:00 PM - 4:00 PM

Please share details about registration and any package deals."
```

## 🔧 How to Edit

### Adding New Workshops:
1. Edit `data/workshops.js`
2. Add new workshop object to `workshopData[0].items`
3. Update artist profile in `artistProfiles` if needed

### Updating Contact Information:
1. Edit `components/Footer.js`
2. Use `updateContactInfo()` method or edit the render methods directly

### Modifying WhatsApp Integration:
1. Edit `utils/whatsapp.js`
2. Update phone number in `WHATSAPP_NUMBER` constant
3. Modify message templates in respective functions

### Styling Changes:
1. Component-specific styles: Edit `css/components.css`
2. Global styles: Edit `assets/css/index.css`

### Adding New Components:
1. Create new file in `components/` directory
2. Follow the class-based structure pattern
3. Import and initialize in `app.js`
4. Add corresponding styles in `css/components.css`

## 🌐 Browser Compatibility

- **Modern Browsers**: Full ES6+ module support
- **Older Browsers**: Fallback alert message displayed
- **Mobile Devices**: Responsive design maintained
- **WhatsApp Integration**: Works on both web and mobile

## 🚦 Development Workflow

### Making Changes:
1. **Data Changes**: Edit `data/workshops.js`
2. **UI Changes**: Edit individual component files
3. **Style Changes**: Edit `css/components.css`
4. **Integration Changes**: Edit `utils/whatsapp.js`

### Testing:
1. Ensure all components render correctly
2. Test WhatsApp registration functionality
3. Verify responsive design on different screen sizes
4. Check loading screen timing (1.5s)

### Deployment:
1. No build process required - vanilla JavaScript
2. Ensure all files are uploaded to correct directories
3. Test module loading in production environment

## 📋 File Dependencies

```
app.js
├── components/LoadingScreen.js
├── components/HeroSection.js  
├── components/DanceWeekSection.js
├── components/WorkshopsSection.js
├── components/ShowcaseSection.js
├── components/Footer.js
├── data/workshops.js
└── utils/whatsapp.js
```

## 🎯 Benefits of Modular Structure

1. **Maintainability**: Each component is isolated and easy to edit
2. **Readability**: Code is organized by functionality
3. **Reusability**: Components can be easily reused or extended
4. **Debugging**: Issues can be isolated to specific components
5. **Collaboration**: Multiple developers can work on different components
6. **Scalability**: Easy to add new features or sections

## 🔄 Migration Notes

- **Original bundle**: `assets/js/index.js` (19,817 lines) → Multiple focused files
- **No functionality lost**: All features preserved exactly as before
- **Performance**: Maintained loading times and animations
- **Compatibility**: Works with existing CSS and HTML structure

---

*This modular structure maintains 100% compatibility with the original website while providing much better maintainability and editability for future development.* 