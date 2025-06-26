/**
 * Hero Section with Image Carousel
 * Auto-advancing carousel with 3 images, navigation dots, and responsive design
 */

// Carousel images
const carouselImages = [
  { id: 1, imageUrl: '/static/assets/All_artist.jpg' },
  { id: 2, imageUrl: '/static/assets/schedule.jpg' },
  { id: 3, imageUrl: '/static/assets/fees1.jpg' }
];

export class HeroSection {
  constructor() {
    this.element = null;
    this.currentSlide = 1;
    this.totalSlides = 3;
    this.autoAdvanceInterval = null;
    this.isMobile = window.innerWidth <= 768;
  }

  // Helper functions for desktop carousel positioning
  getLeftSlideIndex() {
    return (this.currentSlide - 2 + this.totalSlides) % this.totalSlides;
  }

  getCenterSlideIndex() {
    return this.currentSlide - 1;
  }

  getRightSlideIndex() {
    return this.currentSlide % this.totalSlides;
  }

  getCurrentImageUrl() {
    switch(this.currentSlide) {
      case 1: return carouselImages[0].imageUrl;
      case 2: return carouselImages[1].imageUrl;
      case 3: return carouselImages[2].imageUrl;
      default: return carouselImages[0].imageUrl;
    }
  }

  // Navigation functions
  nextSlide() {
    this.currentSlide = this.currentSlide === this.totalSlides ? 1 : this.currentSlide + 1;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 1 ? this.totalSlides : this.currentSlide - 1;
    this.updateCarousel();
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    this.updateCarousel();
  }

  updateCarousel() {
    if (!this.element) return;

    // Update mobile slide
    const mobileSlide = this.element.querySelector('.hero-mobile-slide');
    if (mobileSlide) {
      mobileSlide.style.backgroundImage = `url(${this.getCurrentImageUrl()})`;
    }

    // Update desktop slides
    const leftSlide = this.element.querySelector('.hero-slide-left');
    const centerSlide = this.element.querySelector('.hero-slide-center');
    const rightSlide = this.element.querySelector('.hero-slide-right');

    if (leftSlide) {
      leftSlide.style.backgroundImage = `url(${carouselImages[this.getLeftSlideIndex()].imageUrl})`;
    }
    if (centerSlide) {
      centerSlide.style.backgroundImage = `url(${carouselImages[this.getCenterSlideIndex()].imageUrl})`;
    }
    if (rightSlide) {
      rightSlide.style.backgroundImage = `url(${carouselImages[this.getRightSlideIndex()].imageUrl})`;
    }

    // Update navigation dots
    const dots = this.element.querySelectorAll('.hero-dot');
    dots.forEach((dot, index) => {
      if (index + 1 === this.currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  handleResize() {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== this.isMobile) {
      this.isMobile = newIsMobile;
      // Re-render for responsive changes
      const parent = this.element.parentNode;
      if (parent) {
        parent.replaceChild(this.render(), this.element);
      }
    }
  }

  startAutoAdvance() {
    this.autoAdvanceInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoAdvance() {
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
      this.autoAdvanceInterval = null;
    }
  }

  render() {
    this.element = document.createElement('section');
    this.element.className = 'hero-section';
    this.element.id = 'home';

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'hero-overlay';

    // Mobile carousel
    let mobileContent = '';
    if (this.isMobile) {
      mobileContent = `
        <div class="hero-mobile-slide" style="background-image: url(${this.getCurrentImageUrl()})"></div>
      `;
    }

    // Desktop carousel
    let desktopContent = '';
    if (!this.isMobile) {
      desktopContent = `
        <div class="hero-desktop-container">
          <div class="hero-carousel-wrapper">
            <div class="hero-slides-container">
              <div class="hero-slide hero-slide-left" style="background-image: url(${carouselImages[this.getLeftSlideIndex()].imageUrl})"></div>
              <div class="hero-slide hero-slide-center" style="background-image: url(${carouselImages[this.getCenterSlideIndex()].imageUrl})"></div>
              <div class="hero-slide hero-slide-right" style="background-image: url(${carouselImages[this.getRightSlideIndex()].imageUrl})"></div>
            </div>
          </div>
        </div>
      `;
    }

    // Content area (hidden)
    const contentArea = document.createElement('div');
    contentArea.className = 'hero-content';

    // Navigation dots
    const navigation = document.createElement('div');
    navigation.className = 'hero-navigation';
    
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'hero-dots';

    // Create dots
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = `hero-dot ${i + 1 === this.currentSlide ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.goToSlide(i + 1));
      dotsContainer.appendChild(dot);
    }

    navigation.appendChild(dotsContainer);

    // Assemble the section
    this.element.appendChild(overlay);
    
    if (this.isMobile) {
      this.element.insertAdjacentHTML('beforeend', mobileContent);
    } else {
      this.element.insertAdjacentHTML('beforeend', desktopContent);
      
      // Add click handlers for desktop slides
      setTimeout(() => {
        const leftSlide = this.element.querySelector('.hero-slide-left');
        const rightSlide = this.element.querySelector('.hero-slide-right');
        
        if (leftSlide) {
          leftSlide.addEventListener('click', () => this.prevSlide());
        }
        if (rightSlide) {
          rightSlide.addEventListener('click', () => this.nextSlide());
        }
      }, 0);
    }

    this.element.appendChild(contentArea);
    this.element.appendChild(navigation);

    // Setup event listeners
    window.addEventListener('resize', () => this.handleResize());

    // Start auto-advance
    this.startAutoAdvance();

    return this.element;
  }

  // Cleanup method
  destroy() {
    this.stopAutoAdvance();
    window.removeEventListener('resize', this.handleResize);
  }
} 