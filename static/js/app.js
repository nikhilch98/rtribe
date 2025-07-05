// Main Application Entry Point - Redesigned with Header and Navigation
import { LoadingScreen } from './components/LoadingScreen.js';
import { Header } from './components/Header.js';
import { HeroSection } from './components/HeroSection.js';
import { SecondaryCarousel } from './components/SecondaryCarousel.js';
import { WorkshopsSection } from './components/WorkshopsSection.js';
import { ShowcaseSection } from './components/ShowcaseSection.js';
import { TestimonialsSection } from './components/TestimonialsSection.js';
import { Footer } from './components/Footer.js';

// React-like state management using vanilla JS
class ReactLikeState {
  constructor(initialValue) {
    this.value = initialValue;
    this.listeners = [];
  }

  get() {
    return this.value;
  }

  set(newValue) {
    this.value = newValue;
    this.listeners.forEach(listener => listener(this.value));
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

// Main App Component - Redesigned with Header and proper navigation
class RTribeApp {
  constructor() {
    this.loadingState = new ReactLikeState(true);
    this.sectionsState = new ReactLikeState([]);
    this.carouselImagesState = new ReactLikeState([]);
    this.secondaryCarouselImagesState = new ReactLikeState([]);
    
    // Initialize components
    this.loadingScreen = new LoadingScreen();
    this.header = new Header();
    this.heroSection = null;
    this.secondaryCarousel = null;
    this.workshopsSection = new WorkshopsSection();
    this.showcaseSection = new ShowcaseSection();
    this.testimonialsSection = new TestimonialsSection();
    this.footer = new Footer();
    
    this.init();
  }

  init() {
    // Show loading screen immediately
    this.loadingScreen.show();
    
    // Set up loading timer - exactly like original useEffect (1.5 seconds)
    const timer = setTimeout(() => {
      this.loadingState.set(false);
      this.loadingScreen.hide();
      this.renderApp();
    }, 1500);

    // Fetch sections data - exactly like original useEffect
    this.fetchSections();
    
    // Clean up timer
    this.cleanupTimer = () => clearTimeout(timer);
  }

  fetchSections() {
    fetch("/api/sections")
      .then(response => response.json())
      .then(config => {
        // Extract sections data from config
        const sectionsData = config.sections || [];
        this.sectionsState.set(sectionsData);
        
        // Set carousel images from config data
        const carouselImages = config.carouselImages || [
          { id: 1, imageUrl: '/static/assets/All_artist.jpg' },
          { id: 2, imageUrl: '/static/assets/schedule.jpg' },
          { id: 3, imageUrl: '/static/assets/fees1.jpg' }
        ];
        this.carouselImagesState.set(carouselImages);
        
        // Set secondary carousel images from config data
        const secondaryCarouselImages = config.secondaryCarouselImages || [
          { id: 1, imageUrl: '/static/assets/All_artist.jpg' },
          { id: 2, imageUrl: '/static/assets/schedule.jpg' },
          { id: 3, imageUrl: '/static/assets/fees1.jpg' }
        ];
        this.secondaryCarouselImagesState.set(secondaryCarouselImages);
        
        // Initialize HeroSection with carousel images
        if (!this.heroSection) {
          this.heroSection = new HeroSection(carouselImages);
        }
        
        // Initialize SecondaryCarousel with secondary carousel images
        if (!this.secondaryCarousel) {
          this.secondaryCarousel = new SecondaryCarousel(secondaryCarouselImages);
        }
        
        // Update workshops if app is already rendered
        if (!this.loadingState.get()) {
          this.updateWorkshops(sectionsData);
        }
      })
      .catch(error => {
        console.error("Error loading sections:", error);
        this.sectionsState.set([]);
        
        // Fallback carousel images
        const fallbackCarousel = [
          { id: 1, imageUrl: '/static/assets/All_artist.jpg' },
          { id: 2, imageUrl: '/static/assets/schedule.jpg' },
          { id: 3, imageUrl: '/static/assets/fees1.jpg' }
        ];
        this.carouselImagesState.set(fallbackCarousel);
        
        // Fallback secondary carousel
        const fallbackSecondaryCarousel = [
          { id: 1, imageUrl: '/static/assets/All_artist.jpg' },
          { id: 2, imageUrl: '/static/assets/schedule.jpg' },
          { id: 3, imageUrl: '/static/assets/fees1.jpg' }
        ];
        this.secondaryCarouselImagesState.set(fallbackSecondaryCarousel);
        
        // Initialize HeroSection with fallback
        if (!this.heroSection) {
          this.heroSection = new HeroSection(fallbackCarousel);
        }
        
        // Initialize SecondaryCarousel with fallback
        if (!this.secondaryCarousel) {
          this.secondaryCarousel = new SecondaryCarousel(fallbackSecondaryCarousel);
        }
        
        // Update workshops if app is already rendered
        if (!this.loadingState.get()) {
          this.updateWorkshops([]);
        }
      });
  }

  updateWorkshops(sections) {
    if (this.workshopsSection && this.workshopsSection.element) {
      this.workshopsSection.updateSections(sections);
    }
  }

  renderApp() {
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      console.error('Root element not found');
      return;
    }

    // Clear any existing content
    rootElement.innerHTML = '';

    // Create main app container with header
    const appContainer = document.createElement('div');
    appContainer.className = 'app';
    
    // Add header first
    appContainer.appendChild(this.header.render());
    
    // Create main content with proper section IDs
    const mainContent = document.createElement('main');
    
    // Initialize HeroSection if not already done (with fallback data)
    if (!this.heroSection) {
      const fallbackCarousel = [
        { id: 1, imageUrl: '/static/assets/All_artist.jpg' },
        { id: 2, imageUrl: '/static/assets/schedule.jpg' },
        { id: 3, imageUrl: '/static/assets/fees1.jpg' }
      ];
      this.heroSection = new HeroSection(fallbackCarousel);
    }
    
    // Initialize SecondaryCarousel if not already done (with fallback data)
    if (!this.secondaryCarousel) {
      const fallbackSecondaryCarousel = [
        { id: 1, imageUrl: '/static/assets/All_artist.jpg' },
        { id: 2, imageUrl: '/static/assets/schedule.jpg' },
        { id: 3, imageUrl: '/static/assets/fees1.jpg' }
      ];
      this.secondaryCarousel = new SecondaryCarousel(fallbackSecondaryCarousel);
    }
    
    // Render sections with proper IDs for navigation
    const heroElement = this.heroSection.render();
    heroElement.id = 'home'; // Home section
    mainContent.appendChild(heroElement);
    
    // Regulars section (secondary carousel with integrated title)
    const secondaryCarouselElement = this.secondaryCarousel.render();
    secondaryCarouselElement.id = 'regulars';
    mainContent.appendChild(secondaryCarouselElement);
    
    
    // Workshops section
    const workshopsElement = this.workshopsSection.render();
    workshopsElement.id = 'workshops';
    mainContent.appendChild(workshopsElement);
    
    // Testimonials section
    mainContent.appendChild(this.testimonialsSection.render());
    
    // Showcase section (keeping original)
    mainContent.appendChild(this.showcaseSection.render());
    
    appContainer.appendChild(mainContent);
    
    // Footer with contact ID
    const footerElement = this.footer.render();
    footerElement.id = 'contact';
    appContainer.appendChild(footerElement);

    rootElement.appendChild(appContainer);
    
    // Pass current sections data to workshops if available
    if (this.sectionsState.get().length > 0) {
      this.updateWorkshops(this.sectionsState.get());
    }
    
    // Setup smooth scrolling for header intersection observer
    this.setupHeaderBehavior();
  }

  setupHeaderBehavior() {
    // Add smooth scrolling behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Re-initialize header intersection observer after DOM is ready
    setTimeout(() => {
      if (this.header && this.header.setupIntersectionObserver) {
        this.header.setupIntersectionObserver();
      }
    }, 100);
  }

  // WhatsApp registration function - exact recreation from original
  registerForWorkshop(workshop) {
    // Exact message format from original: e.date.replace(", 2025", "")
    const message = `Hi, I'm interested for ${workshop.style} by ${workshop.artist} on ${workshop.date.replace(", 2025", "")} ${workshop.time}.`;
    const whatsappUrl = `https://wa.me/917338003939?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }

  // General inquiry function - exact from original Footer
  sendGeneralInquiry() {
    const message = "RTRIBE Workshop Inquiry. Please share workshop details.";
    const whatsappUrl = `https://wa.me/917338003939?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }

  // Cleanup function
  destroy() {
    if (this.cleanupTimer) {
      this.cleanupTimer();
    }
    if (this.loadingScreen) {
      this.loadingScreen.hide();
    }
    if (this.header) {
      this.header.destroy();
    }
    if (this.heroSection) {
      this.heroSection.destroy();
    }
    if (this.secondaryCarousel) {
      this.secondaryCarousel.destroy();
    }
    if (this.testimonialsSection) {
      this.testimonialsSection.destroy();
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new RTribeApp();
  
  // Make registration function globally available for workshops
  window.registerForWorkshop = (workshop) => app.registerForWorkshop(workshop);
  window.sendGeneralInquiry = () => app.sendGeneralInquiry();
  
  // Store app instance for debugging
  window.rtribeApp = app;
});

export default RTribeApp; 