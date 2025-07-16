/**
 * Footer Component - Exact Recreation of lE from original
 * Features gradient top border, mobile responsiveness, and WhatsApp integration
 */

import { AuthUtils } from '../utils/AuthUtils.js';

export class Footer {
  constructor() {
    this.element = null;
    this.currentYear = new Date().getFullYear();
  }

  render() {
    this.element = document.createElement('footer');
    this.element.className = 'footer-section';
    this.element.id = 'contact';
    
    this.element.innerHTML = `
      <!-- Main footer content (hidden on mobile) -->
      <div class="footer-container">
        
        <!-- Studio Info Column -->
        <div class="footer-column">
          <div class="footer-header">
            <h2>RTRIBE Dance Studio</h2>
            <p>Namma Dance Week 2025</p>
          </div>
          
          <div class="footer-contact-item">
            <svg class="footer-icon" viewBox="0 0 384 512">
              <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
            </svg>
            <div class="footer-contact-text">
              RTRIBE Dance and Wellness Space<br>
              Cauvery Colony, Next to DMART<br>
              Koramangala, Bengaluru
            </div>
          </div>
          
          <div class="footer-contact-item">
            <svg class="footer-icon" viewBox="0 0 512 512">
              <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/>
            </svg>
            <div class="footer-contact-text">7338003939 / 7892547215</div>
          </div>
          
          <div class="footer-contact-item">
            <svg class="footer-icon" viewBox="0 0 512 512">
              <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/>
            </svg>
            <div class="footer-contact-text">beinrtribe@gmail.com</div>
          </div>
          
          <div class="footer-social">
            <a href="https://www.instagram.com/beinrtribe/" target="_blank" rel="noopener noreferrer" class="footer-social-link">
              <svg viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
              <span>Follow us on Instagram</span>
            </a>
          </div>
        </div>

        <!-- Workshop Hours Column -->
        <div class="footer-column">
          <h3 class="footer-section-title">Workshop Hours</h3>
          <ul class="footer-hours-list">
            <li class="footer-hours-item">
              <span>Morning Sessions</span>
              <span>11:00 AM - 1:00 PM</span>
            </li>
            <li class="footer-hours-item">
              <span>Afternoon Sessions</span>
              <span>2:00 PM - 5:00 PM</span>
            </li>
            <li class="footer-hours-item">
              <span>Evening Sessions</span>
              <span>7:00 PM - 9:00 PM</span>
            </li>
          </ul>
          
          <h3 class="footer-section-title" style="margin-top: 2rem;">Special Event</h3>
          <div class="footer-contact-text">
            NAMMA Dance Week<br>
            June 8th - 15th, 2025<br>
            Students get a chance to perform with teachers on 15th June
          </div>
        </div>

        <!-- Registration Column -->
        <div class="footer-column">
          <h3 class="footer-section-title">Register for Workshops</h3>
          <div class="footer-contact-text">
            Stay updated with our upcoming workshops, performances, and special events. Join us for an incredible dance experience with top artists.
          </div>
          
          <form class="footer-form" id="generalInquiryForm">
            <button type="submit" class="footer-register-btn">Register Now</button>
          </form>
        </div>
        
      </div>
      
      <!-- Mobile Studio Info (visible only on mobile) -->
      <div class="footer-mobile-section" style="padding-top: 1rem;">
        <div class="footer-mobile-item">
          <svg class="footer-mobile-icon" viewBox="0 0 384 512">
            <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
          </svg>
          <span>RTRIBE Dance Studio, Koramangala</span>
        </div>
      </div>
      
      <!-- Copyright Section -->
      <div class="footer-copyright">
        <div>© ${this.currentYear} RTRIBE Dance Studio. All rights reserved.</div>
      </div>
      
      <!-- Mobile Contact Details (visible only on mobile) -->
      <div class="footer-mobile-contact">
        <div class="footer-mobile-item">
          <svg class="footer-mobile-icon" viewBox="0 0 384 512">
            <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
          </svg>
          Cauvery Colony, Next to DMART Koramangala, Bengaluru
        </div>
        <div class="footer-mobile-item">
          <svg class="footer-mobile-icon" viewBox="0 0 512 512">
            <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/>
          </svg>
          7338003939
        </div>
        <div class="footer-mobile-item">
          <svg class="footer-mobile-icon" viewBox="0 0 512 512">
            <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/>
          </svg>
          beinrtribe@gmail.com
        </div>
      </div>
      
      <!-- Mobile Instagram Link (visible only on mobile) -->
      <div class="footer-mobile-instagram">
        <a href="https://www.instagram.com/beinrtribe/" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 448 512">
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
          </svg>
          <span>Follow us on Instagram</span>
        </a>
      </div>
    `;

    // Attach event listener for Register Now button
    const form = this.element.querySelector('#generalInquiryForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleRegisterNowClick();
      });
    }

    return this.element;
  }

  handleRegisterNowClick() {
    // Check if user is logged in
    if (AuthUtils.isAuthenticated()) {
      // User is logged in - show already registered message
      this.showRegistrationConfirmation();
    } else {
      // User is not logged in - open login modal
      this.openLoginModal();
    }
  }

  openLoginModal() {
    // Find the header instance and open its login modal
    if (window.rtribeApp && window.rtribeApp.header) {
      window.rtribeApp.header.openLoginModal();
    } else {
      // Fallback - try to find header instance through DOM
      const headerElement = document.getElementById('header');
      if (headerElement && headerElement._headerInstance) {
        headerElement._headerInstance.openLoginModal();
      } else {
        console.error('Header instance not found - cannot open login modal');
        // Fallback to WhatsApp
        this.fallbackToWhatsApp();
      }
    }
  }

  showRegistrationConfirmation() {
    // Create confirmation modal
    const modal = document.createElement('div');
    modal.className = 'registration-confirmation-modal';
    modal.innerHTML = `
      <div class="registration-confirmation-content">
        <div class="registration-confirmation-header">
          <div class="confirmation-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </div>
          <button class="close-confirmation" id="closeConfirmation">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="confirmation-body">
          <h3>You're Already Registered!</h3>
          <p>Thank you for being part of the RTRIBE family! Our representative will contact you soon with more details about our upcoming classes and workshops.</p>
          <div class="confirmation-details">
            <div class="detail-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>We'll call you within 24 hours</span>
            </div>
            <div class="detail-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Visit us at Koramangala, Bengaluru</span>
            </div>
            <div class="detail-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Namma Dance Week: June 8-15, 2025</span>
            </div>
          </div>
        </div>
        
        <div class="confirmation-actions">
          <button class="contact-whatsapp-btn" id="contactWhatsApp">
            <svg viewBox="0 0 448 512">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 222-99.6 222-222 0-59.3-23.1-115-65-156.9zM223.9 413.3c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 335.4l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56 81.2 56 130.5 0 101.8-84.9 184.6-186.5 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
            Contact Us
          </button>
          <button class="close-confirmation-btn" id="closeConfirmationBtn">
            Close
          </button>
        </div>
      </div>
    `;

    // Add modal to document
    document.body.appendChild(modal);

    // Add event listeners
    const closeBtn = modal.querySelector('#closeConfirmation');
    const closeBtnBottom = modal.querySelector('#closeConfirmationBtn');
    const whatsappBtn = modal.querySelector('#contactWhatsApp');

    const closeModal = () => {
      modal.style.opacity = '0';
      setTimeout(() => {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal);
        }
      }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    closeBtnBottom.addEventListener('click', closeModal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // WhatsApp contact
    whatsappBtn.addEventListener('click', () => {
      const message = "Hi! I'm already registered with RTRIBE. I'd like to know more about the upcoming classes and workshops.";
      const whatsappUrl = `https://wa.me/917338003939?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      closeModal();
    });

    // Show modal with animation
    requestAnimationFrame(() => {
      modal.style.opacity = '1';
    });
  }

  fallbackToWhatsApp() {
    // Fallback method if login modal cannot be opened
    const message = "RTRIBE Workshop Inquiry. Please share workshop details.";
    const whatsappUrl = `https://wa.me/917338003939?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }
} 