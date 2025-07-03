/**
 * Header Component with Navigation
 * Professional header with logo and sticky navigation
 */

export class Header {
  constructor() {
    this.element = null;
    this.isScrolled = false;
  }

  render() {
    this.element = document.createElement('header');
    this.element.className = 'header';
    this.element.id = 'header';
    
    this.element.innerHTML = `
      <div class="header-container">
        <div class="header-brand">
          <img src="/static/assets/images/Logo.png" alt="RTRIBE Logo" class="header-logo">
          <span class="header-brand-text">RTRIBE</span>
        </div>
        <nav class="header-nav">
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#home" class="nav-link active">Home</a>
            </li>
            <li class="nav-item">
              <a href="#regulars" class="nav-link">Regulars</a>
            </li>
            <li class="nav-item">
              <a href="#instructors" class="nav-link">Instructors</a>
            </li>
            <li class="nav-item">
              <a href="#workshops" class="nav-link">Workshops</a>
            </li>
            <li class="nav-item">
              <a href="#testimonials" class="nav-link">Testimonials</a>
            </li>
            <li class="nav-item">
              <a href="#contact" class="nav-link">Contact Us</a>
            </li>
          </ul>
        </nav>
        <div class="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;

    // Add scroll behavior and mobile menu functionality
    this.addEventListeners();

    return this.element;
  }

  addEventListeners() {
    // Smooth scroll for navigation links
    const navLinks = this.element.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Remove active class from all links
          navLinks.forEach(l => l.classList.remove('active'));
          // Add active class to clicked link
          link.classList.add('active');
          
          // Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Scroll behavior for header
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 100;
      if (scrolled !== this.isScrolled) {
        this.isScrolled = scrolled;
        if (scrolled) {
          this.element.classList.add('scrolled');
        } else {
          this.element.classList.remove('scrolled');
        }
      }
    });

    // Mobile menu toggle
    const mobileToggle = this.element.querySelector('.mobile-menu-toggle');
    const nav = this.element.querySelector('.header-nav');
    
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
      });
    });

    // Intersection Observer for active navigation highlighting
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = this.element.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // Update active navigation based on scroll position
  updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = this.element.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  destroy() {
    // Clean up event listeners if needed
    window.removeEventListener('scroll', this.updateActiveNavigation);
  }
} 