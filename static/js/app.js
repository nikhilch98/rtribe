// Main Application Entry Point - Exact Recreation
import { LoadingScreen } from './components/LoadingScreen.js';
import { HeroSection } from './components/HeroSection.js';
import { DanceWeekSection } from './components/DanceWeekSection.js';
import { WorkshopsSection } from './components/WorkshopsSection.js';
import { ShowcaseSection } from './components/ShowcaseSection.js';
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

// Main App Component - Exact recreation of original rE() function
class RTribeApp {
  constructor() {
    this.loadingState = new ReactLikeState(true);
    this.sectionsState = new ReactLikeState([]);
    
    // Initialize components
    this.loadingScreen = new LoadingScreen();
    this.heroSection = new HeroSection();
    this.danceWeekSection = new DanceWeekSection();
    this.workshopsSection = new WorkshopsSection();
    this.showcaseSection = new ShowcaseSection();
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
      .then(data => {
        this.sectionsState.set(data);
        // Update workshops if app is already rendered
        if (!this.loadingState.get()) {
          this.updateWorkshops(data);
        }
      })
      .catch(error => {
        console.error("Error loading sections:", error);
        this.sectionsState.set([]);
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

    // Create main app container - exact structure from original
    const appContainer = document.createElement('div');
    appContainer.className = 'app';
    
    // Create main content
    const mainContent = document.createElement('main');
    
    // Render all sections in exact order from original
    mainContent.appendChild(this.heroSection.render());           // r3
    mainContent.appendChild(this.danceWeekSection.render());      // K3
    mainContent.appendChild(this.workshopsSection.render());     // L3 
    mainContent.appendChild(this.showcaseSection.render());      // F3
    
    appContainer.appendChild(mainContent);
    appContainer.appendChild(this.footer.render());              // lE

    rootElement.appendChild(appContainer);
    
    // Pass current sections data to workshops if available
    if (this.sectionsState.get().length > 0) {
      this.updateWorkshops(this.sectionsState.get());
    }
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