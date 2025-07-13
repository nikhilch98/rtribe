// Responsive Utilities for Dynamic UI
export class ResponsiveUtils {
  constructor() {
    this.breakpoints = {
      xs: 320,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    };
    
    this.currentBreakpoint = this.getCurrentBreakpoint();
    this.listeners = [];
    
    this.init();
  }
  
  init() {
    // Listen for window resize
    window.addEventListener('resize', this.debounce(() => {
      const newBreakpoint = this.getCurrentBreakpoint();
      if (newBreakpoint !== this.currentBreakpoint) {
        this.currentBreakpoint = newBreakpoint;
        this.notifyListeners(newBreakpoint);
      }
    }, 100));
    
    // Listen for orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        const newBreakpoint = this.getCurrentBreakpoint();
        if (newBreakpoint !== this.currentBreakpoint) {
          this.currentBreakpoint = newBreakpoint;
          this.notifyListeners(newBreakpoint);
        }
      }, 100);
    });
  }
  
  getCurrentBreakpoint() {
    const width = window.innerWidth;
    
    if (width < this.breakpoints.sm) return 'xs';
    if (width < this.breakpoints.md) return 'sm';
    if (width < this.breakpoints.lg) return 'md';
    if (width < this.breakpoints.xl) return 'lg';
    if (width < this.breakpoints['2xl']) return 'xl';
    return '2xl';
  }
  
  isMobile() {
    return this.currentBreakpoint === 'xs' || this.currentBreakpoint === 'sm';
  }
  
  isTablet() {
    return this.currentBreakpoint === 'md';
  }
  
  isDesktop() {
    return this.currentBreakpoint === 'lg' || this.currentBreakpoint === 'xl' || this.currentBreakpoint === '2xl';
  }
  
  getColumnsForBreakpoint(breakpoint = this.currentBreakpoint) {
    const columnMap = {
      xs: 1,
      sm: 2,
      md: 2,
      lg: 3,
      xl: 4,
      '2xl': 4
    };
    
    return columnMap[breakpoint] || 1;
  }
  
  onBreakpointChange(callback) {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }
  
  notifyListeners(breakpoint) {
    this.listeners.forEach(listener => listener(breakpoint));
  }
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Touch detection
  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  
  // Viewport utilities
  getViewportWidth() {
    return window.innerWidth;
  }
  
  getViewportHeight() {
    return window.innerHeight;
  }
  
  // Scroll utilities
  getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
  
  isElementInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.right <= windowWidth + threshold
    );
  }
  
  // Animation utilities
  animateElement(element, animation, duration = 300) {
    return new Promise((resolve) => {
      element.style.animation = `${animation} ${duration}ms ease-in-out`;
      
      const handleAnimationEnd = () => {
        element.style.animation = '';
        element.removeEventListener('animationend', handleAnimationEnd);
        resolve();
      };
      
      element.addEventListener('animationend', handleAnimationEnd);
    });
  }
  
  // CSS class utilities
  addResponsiveClass(element, baseClass) {
    element.classList.add(`${baseClass}-${this.currentBreakpoint}`);
  }
  
  removeResponsiveClasses(element, baseClass) {
    Object.keys(this.breakpoints).forEach(bp => {
      element.classList.remove(`${baseClass}-${bp}`);
    });
  }
  
  updateResponsiveClass(element, baseClass) {
    this.removeResponsiveClasses(element, baseClass);
    this.addResponsiveClass(element, baseClass);
  }
}

// Singleton instance
export const responsiveUtils = new ResponsiveUtils();
