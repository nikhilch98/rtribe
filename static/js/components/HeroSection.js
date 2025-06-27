/**
 * Hero Section with Image Carousel
 * Auto-advancing carousel with dynamic images, navigation dots, and responsive design
 */

export class HeroSection {
  constructor(carouselImages = []) {
    this.element = null;
    this.carouselImages = carouselImages;
    this.currentSlide = 1;
    this.totalSlides = carouselImages.length || 3;
    this.autoAdvanceInterval = null;
    this.isMobile = window.innerWidth <= 768;
  }

  // Helper functions for carousel positioning (restored for circular layout)
  getLeftSlideIndex() {
    return (this.currentSlide - 2 + this.totalSlides) % this.totalSlides;
  }

  getCenterSlideIndex() {
    return this.currentSlide - 1;
  }

  getRightSlideIndex() {
    return this.currentSlide % this.totalSlides;
  }

  getCurrentSlideIndex() {
    return this.currentSlide - 1;
  }

  getCurrentImageUrl() {
    const imageIndex = this.currentSlide - 1;
    return this.carouselImages[imageIndex]?.imageUrl || this.carouselImages[0]?.imageUrl || '';
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

    // Update desktop slides (circular layout)
    const leftSlide = this.element.querySelector('.hero-slide-left');
    const centerSlide = this.element.querySelector('.hero-slide-center');
    const rightSlide = this.element.querySelector('.hero-slide-right');

    if (leftSlide) {
      leftSlide.style.backgroundImage = `url(${this.carouselImages[this.getLeftSlideIndex()]?.imageUrl || ''})`;
    }
    if (centerSlide) {
      centerSlide.style.backgroundImage = `url(${this.carouselImages[this.getCenterSlideIndex()]?.imageUrl || ''})`;
    }
    if (rightSlide) {
      rightSlide.style.backgroundImage = `url(${this.carouselImages[this.getRightSlideIndex()]?.imageUrl || ''})`;
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

  setupKeyboardNavigation() {
    this.keyboardHandler = (event) => {
      // Only handle keyboard navigation when carousel is in view or has focus
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.prevSlide();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.nextSlide();
      }
    };

    // Add global keyboard listener
    document.addEventListener('keydown', this.keyboardHandler);
    
    // Make carousel focusable for better accessibility
    if (this.element) {
      this.element.setAttribute('tabindex', '0');
      this.element.setAttribute('aria-label', 'Image carousel - Use left and right arrow keys to navigate');
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

    // Desktop carousel (circular layout)
    let desktopContent = '';
    if (!this.isMobile) {
      desktopContent = `
        <div class="hero-desktop-container">
          <div class="hero-carousel-wrapper">
            <div class="hero-slides-container">
              <div class="hero-slide hero-slide-left" style="background-image: url(${this.carouselImages[this.getLeftSlideIndex()]?.imageUrl || ''})"></div>
              <div class="hero-slide hero-slide-center" style="background-image: url(${this.carouselImages[this.getCenterSlideIndex()]?.imageUrl || ''})"></div>
              <div class="hero-slide hero-slide-right" style="background-image: url(${this.carouselImages[this.getRightSlideIndex()]?.imageUrl || ''})"></div>
            </div>
          </div>
        </div>
      `;
    }

    // Content area (hidden)
    const contentArea = document.createElement('div');
    contentArea.className = 'hero-content';

    // Navigation dots (only show if more than 1 slide)
    const navigation = document.createElement('div');
    navigation.className = 'hero-navigation';
    
    if (this.totalSlides > 1) {
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'hero-dots';

      // Create dots dynamically based on actual number of slides
      for (let i = 0; i < this.totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `hero-dot ${i + 1 === this.currentSlide ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => this.goToSlide(i + 1));
        dotsContainer.appendChild(dot);
      }

      navigation.appendChild(dotsContainer);
    }

    // Assemble the section
    this.element.appendChild(overlay);
    
    if (this.isMobile) {
      this.element.insertAdjacentHTML('beforeend', mobileContent);
    } else {
      this.element.insertAdjacentHTML('beforeend', desktopContent);
      
      // Add click handlers for desktop slides (keyboard navigation will still work)
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

    // Add keyboard navigation
    if (this.totalSlides > 1) {
      this.setupKeyboardNavigation();
    }

    // Setup event listeners
    window.addEventListener('resize', () => this.handleResize());

    // Start auto-advance only if there are multiple slides
    if (this.totalSlides > 1) {
      this.startAutoAdvance();
    }

    return this.element;
  }

  // Cleanup method
  destroy() {
    this.stopAutoAdvance();
    window.removeEventListener('resize', this.handleResize);
    
    // Clean up keyboard navigation
    if (this.keyboardHandler) {
      document.removeEventListener('keydown', this.keyboardHandler);
      this.keyboardHandler = null;
    }
  }
} 