/**
 * Testimonials Section Component
 * Beautiful testimonials section with Instagram-style video carousel
 */

export class TestimonialsSection {
  constructor() {
    this.element = null;
    this.testimonials = [
      {
        id: 1,
        name: "Priya Sharma",
        role: "Student",
        image: "/static/assets/images/Logo.png", // Using logo as placeholder
        text: "RTRIBE has completely transformed my dance journey. The instructors are phenomenal and the energy in every class is infectious. I've grown so much as a dancer here!",
        rating: 5
      },
      {
        id: 2,
        name: "Arjun Reddy",
        role: "Student",
        image: "/static/assets/images/Logo.png", // Using logo as placeholder
        text: "The workshops at RTRIBE are world-class. Learning from such talented artists has been an incredible experience. The community here is amazing!",
        rating: 5
      },
      {
        id: 3,
        name: "Sneha Patel",
        role: "Student",
        image: "/static/assets/images/Logo.png", // Using logo as placeholder
        text: "From hip-hop to contemporary, RTRIBE offers the best training in Bengaluru. The passion and dedication of every instructor is truly inspiring.",
        rating: 5
      },
      {
        id: 4,
        name: "Rahul Kumar",
        role: "Student",
        image: "/static/assets/images/Logo.png", // Using logo as placeholder
        text: "RTRIBE is more than just a dance studio - it's a family. The support, creativity, and energy here have helped me discover my true potential.",
        rating: 5
      }
    ];
    this.videos = []; // Will be loaded from API
    this.currentVideo = 0;
    this.autoplayInterval = null;
    this.loadVideos();
  }

  async loadVideos() {
    try {
      const response = await fetch('/api/testimonial-videos');
      if (response.ok) {
        const videosData = await response.json();
        this.videos = videosData.length > 0 ? videosData : this.getDefaultVideos();
      } else {
        this.videos = this.getDefaultVideos();
      }
    } catch (error) {
      console.error('Error loading testimonial videos:', error);
      this.videos = this.getDefaultVideos();
    }
    
    // Re-render if component is already rendered
    if (this.element) {
      this.updateVideoCarousel();
    }
  }

  getDefaultVideos() {
    return [
      {
        id: 1,
        url: "/static/assets/videos/dance-video-1.mp4", // Placeholder - replace with actual videos
        thumbnail: "/static/assets/20250625_164102_1.jpg",
        title: "Hip Hop Workshop Highlights",
        description: "Students showing their moves in our popular hip hop class"
      },
      {
        id: 2,
        url: "/static/assets/videos/dance-video-2.mp4", // Placeholder - replace with actual videos
        thumbnail: "/static/assets/20250625_172352.jpg",
        title: "Contemporary Dance Session",
        description: "Beautiful contemporary expressions from our talented students"
      },
      {
        id: 3,
        url: "/static/assets/videos/dance-video-3.mp4", // Placeholder - replace with actual videos
        thumbnail: "/static/assets/20250625_175540.jpg",
        title: "Bollywood Dance Energy",
        description: "High-energy Bollywood choreography in action"
      },
      {
        id: 4,
        url: "/static/assets/videos/dance-video-4.mp4", // Placeholder - replace with actual videos
        thumbnail: "/static/assets/20250625_175820.jpg",
        title: "Breaking & Street Dance",
        description: "Street dance moves and breaking techniques"
      },
      {
        id: 5,
        url: "/static/assets/videos/dance-video-5.mp4", // Placeholder - replace with actual videos
        thumbnail: "/static/assets/20250626_191029.jpg",
        title: "Dance Battle Moments",
        description: "Exciting moments from our weekly dance battles"
      }
    ];
  }

  render() {
    this.element = document.createElement('section');
    this.element.className = 'testimonials-section';
    this.element.id = 'testimonials';
    
    this.updateVideoCarousel();

    this.addEventListeners();
    this.startAutoplay();

    return this.element;
  }

  updateVideoCarousel() {
    if (!this.element) {
      this.element = document.createElement('section');
      this.element.className = 'testimonials-section';
      this.element.id = 'testimonials';
    }

    // Handle case where no videos are loaded yet
    const currentVideo = this.videos.length > 0 ? this.videos[this.currentVideo] : {
      thumbnail: '/static/assets/All_artist.jpg',
      title: 'Loading videos...',
      description: 'Please wait while we load the video content.'
    };
    
    this.element.innerHTML = `
      <div class="testimonials-container">
        <div class="testimonials-header">
          <h2 class="section-title">What Our Students Say</h2>
          <p class="section-subtitle">Hear from our incredible dance community</p>
        </div>
        
        <div class="testimonials-content">
          <!-- Full Screen Video Carousel -->
          <div class="video-carousel-container">
            <div class="video-player-main">
              <video 
                src="${currentVideo.url || ''}" 
                poster="${currentVideo.thumbnail}"
                class="main-video-display"
                controls
                muted
                autoplay
                playsinline
                preload="metadata"
              >
                <source src="${currentVideo.url || ''}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <div class="video-overlay">
                <div class="video-info">
                  <h3 class="video-title">${currentVideo.title}</h3>
                  <p class="video-description">${currentVideo.description}</p>
                </div>
              </div>
            </div>
            
            <!-- Carousel Indicators -->
            <div class="carousel-indicators">
              ${this.videos.map((_, index) => 
                `<div class="indicator-dot ${index === this.currentVideo ? 'active' : ''}" data-index="${index}"></div>`
              ).join('')}
            </div>
          </div>
          
          <!-- Testimonial Cards Grid -->
          <div class="testimonials-grid">
            ${this.testimonials.map(testimonial => this.renderTestimonialCard(testimonial)).join('')}
          </div>
        </div>
      </div>
    `;

    // Re-add event listeners if the element was already rendered
    if (this.videos.length > 0) {
      this.addEventListeners();
      
      // Attempt to play the current video automatically
      setTimeout(() => {
        const videoElement = this.element?.querySelector('.main-video-display');
        if (videoElement) {
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log('Initial autoplay prevented:', error);
            });
          }
        }
      }, 1000);
    }
  }

  renderTestimonialCard(testimonial) {
    return `
      <div class="testimonial-card">
        <div class="card-content">
          <div class="card-rating">
            ${this.renderStars(testimonial.rating)}
          </div>
          <p class="card-text">"${testimonial.text}"</p>
          <div class="card-author">
            <img src="${testimonial.image}" alt="${testimonial.name}" class="card-author-image">
            <div class="card-author-info">
              <h5 class="card-author-name">${testimonial.name}</h5>
              <p class="card-author-role">${testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderStars(rating) {
    return Array.from({ length: 5 }, (_, i) => 
      `<span class="star ${i < rating ? 'filled' : ''}">★</span>`
    ).join('');
  }

  renderVideoThumbnail(video, index) {
    return `
      <div class="video-thumbnail ${index === this.currentVideo ? 'active' : ''}" data-index="${index}">
        <div class="thumbnail-container">
          <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail-image">
          <div class="thumbnail-overlay">
            <div class="play-icon">▶</div>
          </div>
          <div class="thumbnail-info">
            <span class="thumbnail-title">${video.title}</span>
          </div>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const indicatorDots = this.element.querySelectorAll('.indicator-dot');
    const videoElement = this.element.querySelector('.main-video-display');

    // Indicator dots navigation
    indicatorDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        this.goToVideo(index);
      });
    });

    // Video event listeners
    if (videoElement) {
      // Auto-advance to next video when current video ends
      videoElement.addEventListener('ended', () => {
        setTimeout(() => {
          this.nextVideo();
        }, 1000); // Small delay before advancing to next video
      });

      // Ensure video plays when loaded
      videoElement.addEventListener('loadeddata', () => {
        // Attempt to play the video automatically
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Auto-play was prevented, this is normal for some browsers
            console.log('Autoplay prevented:', error);
          });
        }
      });

      // Handle video loading errors gracefully
      videoElement.addEventListener('error', (e) => {
        console.error('Video error:', e);
        // If video fails to load, advance to next video after a delay
        setTimeout(() => {
          this.nextVideo();
        }, 2000);
      });

      // Stop carousel autoplay when video is playing
      videoElement.addEventListener('play', () => {
        this.stopAutoplay();
      });

      // Handle manual pause by user
      videoElement.addEventListener('pause', () => {
        // Only stop autoplay if the video wasn't paused due to ending
        if (!videoElement.ended) {
          this.stopAutoplay();
        }
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previousVideo();
      } else if (e.key === 'ArrowRight') {
        this.nextVideo();
      }
    });

    // Pause auto-play on hover (but don't pause videos)
    this.element.addEventListener('mouseenter', () => {
      // Only stop autoplay, don't pause videos
      this.stopAutoplay();
    });
    
    this.element.addEventListener('mouseleave', () => {
      // Only resume autoplay if video is not currently playing
      const video = this.element.querySelector('.main-video-display');
      if (!video || video.paused || video.ended) {
        this.startAutoplay();
      }
    });
  }

  nextVideo() {
    this.currentVideo = (this.currentVideo + 1) % this.videos.length;
    this.updateVideoPlayer();
  }

  previousVideo() {
    this.currentVideo = this.currentVideo === 0 
      ? this.videos.length - 1 
      : this.currentVideo - 1;
    this.updateVideoPlayer();
  }

  goToVideo(index) {
    this.currentVideo = index;
    this.updateVideoPlayer();
  }



  updateVideoPlayer() {
    if (!this.element) return;

    const video = this.videos[this.currentVideo];
    
    // Update main video display
    const videoElement = this.element.querySelector('.main-video-display');
    const titleElement = this.element.querySelector('.video-title');
    const descriptionElement = this.element.querySelector('.video-description');

    if (videoElement) {
      // Set video source and poster
      videoElement.src = video.url || '';
      videoElement.poster = video.thumbnail || '';
      
      // Update source element as well for better browser compatibility
      const sourceElement = videoElement.querySelector('source');
      if (sourceElement) {
        sourceElement.src = video.url || '';
      }
      
      // Load the new video
      videoElement.load();
      
      // Attempt to play the new video after a short delay
      setTimeout(() => {
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Autoplay prevented for new video:', error);
          });
        }
      }, 500);
    }
    
    if (titleElement) titleElement.textContent = video.title;
    if (descriptionElement) descriptionElement.textContent = video.description;

    // Update indicator dots
    const dots = this.element.querySelectorAll('.indicator-dot');
    dots.forEach((dot, index) => {
      if (index === this.currentVideo) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  startAutoplay() {
    this.stopAutoplay(); // Clear any existing interval
    
    // Only start autoplay if no video is currently playing
    const videoElement = this.element?.querySelector('.main-video-display');
    if (videoElement && !videoElement.paused) {
      return; // Don't start autoplay if video is playing
    }
    
    this.autoplayInterval = setInterval(() => {
      // Check if video is playing before auto-advancing
      const video = this.element?.querySelector('.main-video-display');
      if (!video || video.paused || video.ended) {
        this.nextVideo();
      }
    }, 8000); // Longer interval when not playing videos
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  destroy() {
    this.stopAutoplay();
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
} 