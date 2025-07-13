// Dynamic UI Enhancements for Interactive Elements
import { responsiveUtils } from './ResponsiveUtils.js';

export class DynamicUI {
  constructor() {
    this.intersectionObserver = null;
    this.animatedElements = new Set();
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupSmoothScrolling();
    this.setupDynamicNavigation();
    this.setupTouchEnhancements();
    this.setupKeyboardNavigation();
  }
  
  // Intersection Observer for scroll animations
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };
    
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateOnScroll(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, options);
  }
  
  // Animate elements when they come into view
  animateOnScroll(element) {
    const animationType = element.dataset.animation || 'fadeInUp';
    const delay = element.dataset.delay || 0;
    
    setTimeout(() => {
      element.classList.add('animate-in', animationType);
    }, delay);
  }
  
  // Observe elements for scroll animations
  observeElement(element) {
    if (this.intersectionObserver) {
      this.intersectionObserver.observe(element);
    }
  }
  
  // Smooth scrolling for navigation links
  setupSmoothScrolling() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          this.smoothScrollTo(targetElement);
        }
      }
    });
  }
  
  smoothScrollTo(element, offset = 80) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  
  // Dynamic navigation based on scroll position
  setupDynamicNavigation() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    const handleScroll = responsiveUtils.debounce(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add/remove scrolled class
      if (scrollTop > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      
      // Hide/show header on scroll (mobile only)
      if (responsiveUtils.isMobile()) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          header.classList.add('header-hidden');
        } else {
          header.classList.remove('header-hidden');
        }
      }
      
      lastScrollTop = scrollTop;
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
  }
  
  // Touch enhancements for mobile devices
  setupTouchEnhancements() {
    if (!responsiveUtils.isTouchDevice()) return;
    
    // Add touch feedback to buttons
    document.addEventListener('touchstart', (e) => {
      const button = e.target.closest('button, .btn, .social-link');
      if (button) {
        button.classList.add('touch-active');
      }
    });
    
    document.addEventListener('touchend', (e) => {
      const button = e.target.closest('button, .btn, .social-link');
      if (button) {
        setTimeout(() => {
          button.classList.remove('touch-active');
        }, 150);
      }
    });
    
    // Prevent double-tap zoom on buttons
    document.addEventListener('touchend', (e) => {
      const button = e.target.closest('button, .btn');
      if (button) {
        e.preventDefault();
      }
    });
  }
  
  // Keyboard navigation enhancements
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Escape key closes modals/menus
      if (e.key === 'Escape') {
        this.closeAllModals();
        this.closeMobileMenu();
      }
      
      // Tab navigation enhancements
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }
  
  // Modal/overlay management
  closeAllModals() {
    const modals = document.querySelectorAll('.modal, .overlay');
    modals.forEach(modal => {
      modal.classList.remove('active', 'open');
    });
  }
  
  closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
    }
    
    if (menuToggle) {
      menuToggle.classList.remove('active');
    }
  }
  
  // Lazy loading for images
  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Dynamic grid adjustments
  adjustGridLayout(container, itemSelector) {
    if (!container) return;
    
    const items = container.querySelectorAll(itemSelector);
    const columns = responsiveUtils.getColumnsForBreakpoint();
    
    // Apply responsive grid classes
    container.className = container.className.replace(/grid-cols-\w+-?\d+/g, '');
    container.classList.add(`grid-cols-${columns}`);
    
    // Stagger animations for grid items
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 100}ms`;
    });
  }
  
  // Performance monitoring
  measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    if (end - start > 16) { // More than one frame
      console.warn(`Performance warning: ${name} took ${end - start}ms`);
    }
    
    return result;
  }
  
  // Utility methods
  addRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // Parallax scrolling effect
  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    const handleScroll = responsiveUtils.debounce(() => {
      const scrollTop = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
  }
  
  // Initialize all dynamic features
  initializeAll() {
    this.setupLazyLoading();
    this.setupParallax();
    
    // Observe all elements with animation data attributes
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(element => {
      this.observeElement(element);
    });
    
    // Setup responsive grid adjustments
    const gridContainers = document.querySelectorAll('.workshop-grid, .grid');
    gridContainers.forEach(container => {
      this.adjustGridLayout(container, '.workshop-card, .grid-item');
    });
    
    // Listen for breakpoint changes
    responsiveUtils.onBreakpointChange((breakpoint) => {
      gridContainers.forEach(container => {
        this.adjustGridLayout(container, '.workshop-card, .grid-item');
      });
    });
  }
}

// Singleton instance
export const dynamicUI = new DynamicUI();
