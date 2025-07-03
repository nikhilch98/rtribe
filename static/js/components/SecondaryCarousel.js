/**
 * Secondary Section with Image Carousel
 * Auto-advancing carousel with dynamic images, navigation dots, and responsive design
 */

export class SecondaryCarousel {
  constructor(carouselImages = []) {
    this.element = null;
    this.carouselImages = carouselImages;
    this.currentSlide = 1;
    this.totalSlides = carouselImages.length || 3;
    this.autoAdvanceInterval = null;
    this.isMobile = window.innerWidth <= 768;

    this.containerAspectRatio = '3/4'; // Default aspect ratio
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

  // Get aspect ratio from config or detect it as fallback
  getImageAspectRatio(imageUrl) {
    // Find the image item in carouselImages by URL
    const imageItem = this.carouselImages.find(item => item.imageUrl === imageUrl);
    
    if (imageItem && imageItem.aspectRatioCategory) {
      console.log(`Using config aspect ratio for secondary carousel ${imageUrl}: ${imageItem.aspectRatioCategory}`);
      return imageItem.aspectRatioCategory;
    }
    
    // Fallback to default if not in config
    console.log(`No aspect ratio in config for secondary carousel ${imageUrl}, using default 3/4`);
    return "3/4";
  }

  // Update container aspect ratio based on current image config
  updateContainerAspectRatio() {
    const currentImageUrl = this.getCurrentImageUrl();
    if (!currentImageUrl) return;

    // Get aspect ratio directly from config
    this.containerAspectRatio = this.getImageAspectRatio(currentImageUrl);

    // Apply the aspect ratio to the carousel
    this.applyContainerAspectRatio();
  }

  // Apply the calculated aspect ratio to the carousel slides
  applyContainerAspectRatio() {
    if (!this.element) return;

    const slides = this.element.querySelectorAll('.secondary-slide, .secondary-mobile-slide');
    slides.forEach(slide => {
      slide.style.aspectRatio = this.containerAspectRatio;
    });

    console.log(`Applied secondary carousel aspect ratio: ${this.containerAspectRatio}`);
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

  async updateCarousel() {
    if (!this.element) return;

    // Update mobile slide
    const mobileSlide = this.element.querySelector('.secondary-mobile-slide');
    if (mobileSlide) {
      mobileSlide.style.backgroundImage = `url(${this.getCurrentImageUrl()})`;
    }

    // Update desktop slides (circular layout)
    const leftSlide = this.element.querySelector('.secondary-slide-left');
    const centerSlide = this.element.querySelector('.secondary-slide-center');
    const rightSlide = this.element.querySelector('.secondary-slide-right');

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
    const dots = this.element.querySelectorAll('.secondary-dot');
    dots.forEach((dot, index) => {
      if (index + 1 === this.currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update container aspect ratio based on current image
    this.updateContainerAspectRatio();
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
    this.element.className = 'secondary-section';

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'secondary-overlay';

    // Mobile carousel
    let mobileContent = '';
    if (this.isMobile) {
      mobileContent = `
        <div class="secondary-mobile-slide" style="background-image: url(${this.getCurrentImageUrl()})"></div>
      `;
    }

    // Desktop carousel (circular layout)
    let desktopContent = '';
    if (!this.isMobile) {
      desktopContent = `
        <div class="secondary-desktop-container">
          <div class="secondary-carousel-wrapper">
            <div class="secondary-slides-container">
              <div class="secondary-slide secondary-slide-left" style="background-image: url(${this.carouselImages[this.getLeftSlideIndex()]?.imageUrl || ''})"></div>
              <div class="secondary-slide secondary-slide-center" style="background-image: url(${this.carouselImages[this.getCenterSlideIndex()]?.imageUrl || ''})"></div>
              <div class="secondary-slide secondary-slide-right" style="background-image: url(${this.carouselImages[this.getRightSlideIndex()]?.imageUrl || ''})"></div>
            </div>
          </div>
        </div>
      `;
    }

    // Content area (hidden)
    const contentArea = document.createElement('div');
    contentArea.className = 'secondary-content';

    // Navigation dots (only show if more than 1 slide)
    const navigation = document.createElement('div');
    navigation.className = 'secondary-navigation';
    
    if (this.totalSlides > 1) {
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'secondary-dots';

      // Create dots dynamically based on actual number of slides
      for (let i = 0; i < this.totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `secondary-dot ${i + 1 === this.currentSlide ? 'active' : ''}`;
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
        const leftSlide = this.element.querySelector('.secondary-slide-left');
        const rightSlide = this.element.querySelector('.secondary-slide-right');
        
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

    // Initialize aspect ratio detection for all images
    this.initializeImageAspectRatios();

    return this.element;
  }

  // Initialize aspect ratios from config
  initializeImageAspectRatios() {
    console.log('Initializing secondary carousel aspect ratios from config...');
    // Apply initial aspect ratio
    this.updateContainerAspectRatio();
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