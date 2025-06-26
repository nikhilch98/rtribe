// Main JavaScript for RTRIBE Dance Studio Website

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');
const workshopsGrid = document.getElementById('workshops-grid');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

// Loading Screen
function hideLoadingScreen() {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 50);
        }, 500);
    }, 1500); // Show loading screen for 1.5 seconds
}

// Carousel Functionality
let currentSlide = 0;
const totalSlides = carouselSlides.length;

function showSlide(index) {
    // Remove active class from all slides and indicators
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    carouselSlides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
}

function initCarousel() {
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Add click handlers to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
}

// Workshop Data Loading and Rendering
async function loadWorkshops() {
    try {
        const response = await fetch('/api/workshops');
        if (!response.ok) {
            throw new Error('Failed to load workshops');
        }
        const workshops = await response.json();
        renderWorkshops(workshops);
    } catch (error) {
        console.error('Error loading workshops:', error);
        workshopsGrid.innerHTML = '<p>Failed to load workshops. Please try again later.</p>';
    }
}

function renderWorkshops(workshops) {
    if (!workshops || workshops.length === 0) {
        workshopsGrid.innerHTML = '<p>No workshops available at the moment.</p>';
        return;
    }

    workshopsGrid.innerHTML = workshops.map(workshop => `
        <div class="workshop-card">
            <div class="workshop-image">
                <img src="/static/images/${getImageFilename(workshop.image)}" alt="${workshop.title}" loading="lazy">
            </div>
            <div class="workshop-info">
                <div class="workshop-header">
                    <h3 class="workshop-title">${workshop.style || workshop.title}</h3>
                    <span class="workshop-instructor">by ${workshop.instructor}</span>
                </div>
                <div class="workshop-details">
                    <div class="workshop-meta">
                        <div class="meta-item">
                            <span class="icon">📅</span>
                            <span>${workshop.date}</span>
                        </div>
                        <div class="meta-item">
                            <span class="icon">🕐</span>
                            <span>${workshop.time}</span>
                        </div>
                    </div>
                    <div class="workshop-action">
                        <div class="workshop-price">${workshop.price}</div>
                        <button class="register-btn" onclick="registerForWorkshop(${JSON.stringify(workshop).replace(/"/g, '&quot;')})">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Helper function to extract filename from image path
function getImageFilename(imagePath) {
    return imagePath.split('/').pop();
}

// WhatsApp Integration
function registerForWorkshop(workshop) {
    const message = `Hi, I'm interested for ${workshop.style || workshop.title} by ${workshop.instructor} on ${workshop.date.replace(', 2025', '')} ${workshop.time}.`;
    const whatsappUrl = `https://wa.me/917338003939?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function openWhatsApp() {
    const message = "RTRIBE Workshop Inquiry. Please share workshop details.";
    const whatsappUrl = `https://wa.me/917338003939?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to Top Functionality
function initScrollToTop() {
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-purple);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observer for Animation on Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    document.querySelectorAll('.workshop-card, .feature, .footer-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Error Handling for Image Loading
function initImageErrorHandling() {
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.style.display = 'none';
            console.warn('Image failed to load:', e.target.src);
        }
    }, true);
}

// Performance: Lazy Loading for Images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Accessibility: Keyboard Navigation
function initAccessibility() {
    // Add keyboard support for carousel indicators
    indicators.forEach((indicator, index) => {
        indicator.setAttribute('tabindex', '0');
        indicator.setAttribute('role', 'button');
        indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
        
        indicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSlide(index);
            }
        });
    });
    
    // Add keyboard support for register buttons
    document.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('register-btn') && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            e.target.click();
        }
    });
}

// Mobile Menu Toggle (if needed in future)
function initMobileMenu() {
    // Placeholder for mobile menu functionality
    // Can be expanded if header navigation is added
}

// Analytics and Tracking
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    // Can be integrated with Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, eventData);
}

// Error Reporting
function reportError(error, context = '') {
    console.error('Application Error:', error, context);
    // In production, this could send errors to a logging service
}

// Initialize Application
function init() {
    try {
        // Core functionality
        hideLoadingScreen();
        initCarousel();
        loadWorkshops();
        
        // Enhanced functionality
        initSmoothScrolling();
        initScrollToTop();
        initScrollAnimations();
        initImageErrorHandling();
        initLazyLoading();
        initAccessibility();
        
        // Track page load
        trackEvent('page_load', {
            page: 'home',
            timestamp: new Date().toISOString()
        });
        
        console.log('RTRIBE Dance Studio website initialized successfully');
    } catch (error) {
        reportError(error, 'Application initialization');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', init);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any animations or intervals when tab is not visible
        trackEvent('page_hidden');
    } else {
        // Resume when tab becomes visible again
        trackEvent('page_visible');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Connection restored');
    trackEvent('connection_restored');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    trackEvent('connection_lost');
});

// Global error handler
window.addEventListener('error', (event) => {
    reportError(event.error, 'Global error handler');
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    reportError(event.reason, 'Unhandled promise rejection');
});

// Export functions for global access
window.registerForWorkshop = registerForWorkshop;
window.openWhatsApp = openWhatsApp; 