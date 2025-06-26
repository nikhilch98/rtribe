/**
 * Footer Component - Exact Recreation of lE from original
 * Features gradient top border, mobile responsiveness, and WhatsApp integration
 */

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

    // Attach event listener for general inquiry form
    const form = this.element.querySelector('#generalInquiryForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = "RTRIBE Workshop Inquiry. Please share workshop details.";
        const whatsappUrl = `https://wa.me/917338003939?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
      });
    }

    return this.element;
  }
} 