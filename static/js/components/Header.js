/**
 * Header Component with Navigation
 * Professional header with logo and sticky navigation
 */

import { AuthUtils } from '../utils/AuthUtils.js';

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
              <a href="#workshops" class="nav-link">Teachers</a>
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
        <div class="header-auth">
          <button class="login-btn" id="loginBtn">
            <svg class="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10,17 15,12 10,7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Login
          </button>
        </div>
        <div class="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;

    // Add scroll behavior and mobile menu functionality
    this.addEventListeners();

    // Store reference to this header instance for login state management
    this.element._headerInstance = this;

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

    // Login button functionality
    const loginBtn = this.element.querySelector('#loginBtn');
    loginBtn.addEventListener('click', () => {
      this.openLoginModal();
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

  openLoginModal() {
    // Check if modal already exists
    let modal = document.getElementById('loginModal');
    if (!modal) {
      modal = this.createLoginModal();
      document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Reset form
    this.resetLoginForm();
  }

  createLoginModal() {
    const modal = document.createElement('div');
    modal.id = 'loginModal';
    modal.className = 'login-modal';
    
    modal.innerHTML = `
      <div class="login-modal-content">
        <div class="login-modal-header">
          <h2>Login to RTRIBE</h2>
          <button class="close-modal" id="closeLoginModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="login-steps">
          <!-- Step 1: Mobile Number -->
          <div class="login-step active" id="mobileStep">
            <div class="login-form">
              <div class="form-group">
                <label for="mobileNumber">Mobile Number</label>
                <div class="phone-input">
                  <span class="country-code">+91</span>
                  <input 
                    type="tel" 
                    id="mobileNumber" 
                    placeholder="Enter 10-digit mobile number"
                    maxlength="10"
                    pattern="[0-9]{10}"
                  >
                </div>
                <div class="input-error" id="mobileError"></div>
              </div>
              <button class="login-submit-btn" id="sendOtpBtn">
                <span class="btn-text">Send OTP</span>
                <span class="btn-loading">Sending...</span>
              </button>
            </div>
          </div>
          
          <!-- Step 2: OTP Verification -->
          <div class="login-step" id="otpStep">
            <div class="login-form">
              <div class="otp-info">
                <p>Enter the 6-digit OTP sent to</p>
                <strong id="otpMobileDisplay"></strong>
              </div>
              <div class="form-group">
                <label for="otpCode">OTP Code</label>
                <input 
                  type="text" 
                  id="otpCode" 
                  placeholder="Enter 6-digit OTP"
                  maxlength="6"
                  pattern="[0-9]{6}"
                >
                <div class="input-error" id="otpError"></div>
              </div>
              <div class="otp-actions">
                <button class="login-submit-btn" id="verifyOtpBtn">
                  <span class="btn-text">Verify OTP</span>
                  <span class="btn-loading">Verifying...</span>
                </button>
                <button class="resend-btn" id="resendOtpBtn">Resend OTP</button>
              </div>
            </div>
          </div>
          
          <!-- Step 3: Success -->
          <div class="login-step" id="successStep">
            <div class="login-success">
              <div class="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </div>
              <h3>Login Successful!</h3>
              <p>Welcome to RTRIBE</p>
              <button class="login-submit-btn" id="continueBtn">Continue</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners for the modal
    this.addLoginModalListeners(modal);
    
    return modal;
  }

  addLoginModalListeners(modal) {
    // Close modal
    const closeBtn = modal.querySelector('#closeLoginModal');
    closeBtn.addEventListener('click', () => this.closeLoginModal());
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeLoginModal();
      }
    });
    
    // Send OTP
    const sendOtpBtn = modal.querySelector('#sendOtpBtn');
    sendOtpBtn.addEventListener('click', () => this.sendOTP());
    
    // Verify OTP
    const verifyOtpBtn = modal.querySelector('#verifyOtpBtn');
    verifyOtpBtn.addEventListener('click', () => this.verifyOTP());
    
    // Resend OTP
    const resendOtpBtn = modal.querySelector('#resendOtpBtn');
    resendOtpBtn.addEventListener('click', () => this.resendOTP());
    
    // Continue after success
    const continueBtn = modal.querySelector('#continueBtn');
    continueBtn.addEventListener('click', () => this.closeLoginModal());
    
    // Auto-format mobile number input
    const mobileInput = modal.querySelector('#mobileNumber');
    mobileInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
    
    // Auto-format OTP input
    const otpInput = modal.querySelector('#otpCode');
    otpInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
    
    // Enter key handling
    mobileInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendOTP();
    });
    
    otpInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.verifyOTP();
    });
  }

  async sendOTP() {
    const mobileInput = document.getElementById('mobileNumber');
    const mobileNumber = mobileInput.value.trim();
    const sendBtn = document.getElementById('sendOtpBtn');
    const errorDiv = document.getElementById('mobileError');
    
    // Validate mobile number
    if (!mobileNumber || mobileNumber.length !== 10 || !/^[0-9]{10}$/.test(mobileNumber)) {
      this.showError(errorDiv, 'Please enter a valid 10-digit mobile number');
      return;
    }
    
    // Show loading state
    sendBtn.classList.add('loading');
    this.clearError(errorDiv);
    
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile_number: mobileNumber
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store mobile number for OTP verification
        this.currentMobile = mobileNumber;
        
        // Move to OTP step
        this.showOTPStep();
      } else {
        this.showError(errorDiv, data.message || 'Failed to send OTP');
      }
    } catch (error) {
      this.showError(errorDiv, 'Network error. Please try again.');
    } finally {
      sendBtn.classList.remove('loading');
    }
  }

  async verifyOTP() {
    const otpInput = document.getElementById('otpCode');
    const otpCode = otpInput.value.trim();
    const verifyBtn = document.getElementById('verifyOtpBtn');
    const errorDiv = document.getElementById('otpError');
    
    // Validate OTP
    if (!otpCode || otpCode.length !== 6 || !/^[0-9]{6}$/.test(otpCode)) {
      this.showError(errorDiv, 'Please enter a valid 6-digit OTP');
      return;
    }
    
    // Show loading state
    verifyBtn.classList.add('loading');
    this.clearError(errorDiv);
    
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile_number: this.currentMobile,
          otp: otpCode
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store auth token and user data with consistent keys
        localStorage.setItem('rtribe_auth_token', data.access_token);
        localStorage.setItem('userData', JSON.stringify({
          mobile: data.mobile_number,
          loginTime: new Date().toISOString()
        }));
        
        // Show success step
        this.showSuccessStep();
        
        // Update header to show logged in state (with delay to ensure DOM is ready)
        setTimeout(async () => {
          await this.updateLoginState();
        }, 100);
      } else {
        this.showError(errorDiv, data.message || 'Invalid OTP');
      }
    } catch (error) {
      this.showError(errorDiv, 'Network error. Please try again.');
    } finally {
      verifyBtn.classList.remove('loading');
    }
  }

  async resendOTP() {
    const resendBtn = document.getElementById('resendOtpBtn');
    resendBtn.textContent = 'Sending...';
    resendBtn.disabled = true;
    
    try {
      await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile_number: this.currentMobile
        })
      });
      
      resendBtn.textContent = 'OTP Sent!';
      setTimeout(() => {
        resendBtn.textContent = 'Resend OTP';
        resendBtn.disabled = false;
      }, 3000);
    } catch (error) {
      resendBtn.textContent = 'Resend OTP';
      resendBtn.disabled = false;
    }
  }

  showOTPStep() {
    const mobileStep = document.getElementById('mobileStep');
    const otpStep = document.getElementById('otpStep');
    const mobileDisplay = document.getElementById('otpMobileDisplay');
    
    mobileStep.classList.remove('active');
    otpStep.classList.add('active');
    mobileDisplay.textContent = `+91 ${this.currentMobile}`;
    
    // Focus OTP input
    setTimeout(() => {
      document.getElementById('otpCode').focus();
    }, 300);
  }

  showSuccessStep() {
    const otpStep = document.getElementById('otpStep');
    const successStep = document.getElementById('successStep');
    
    otpStep.classList.remove('active');
    successStep.classList.add('active');
  }

  resetLoginForm() {
    const steps = document.querySelectorAll('.login-step');
    steps.forEach(step => step.classList.remove('active'));
    
    const mobileStep = document.getElementById('mobileStep');
    if (mobileStep) {
        mobileStep.classList.add('active');
    }
    
    // Clear inputs
    const mobileNumber = document.getElementById('mobileNumber');
    const otpCode = document.getElementById('otpCode');
    if (mobileNumber) mobileNumber.value = '';
    if (otpCode) otpCode.value = '';
    
    // Clear errors
    const mobileError = document.getElementById('mobileError');
    const otpError = document.getElementById('otpError');
    if (mobileError) this.clearError(mobileError);
    if (otpError) this.clearError(otpError);
    
    // Reset buttons
    document.getElementById('sendOtpBtn').classList.remove('loading');
    document.getElementById('verifyOtpBtn').classList.remove('loading');
  }

  closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  showError(errorDiv, message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }

  clearError(errorDiv) {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
  }

  async updateLoginState() {
    const loginBtn = document.getElementById('loginBtn');
    
    // Check if the login button exists before trying to update it
    if (!loginBtn) {
      console.warn('Login button not found in DOM yet, skipping update');
      return;
    }
    
    const token = localStorage.getItem('rtribe_auth_token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        const mobile = user.mobile;
        
        // Fetch user profile to get name and profile picture
        const profileData = await this.fetchUserProfile();
        
        let displayContent = '';
        let displayTitle = `Logged in as +91 ${mobile}`;
        
        if (profileData && profileData.profilePicture) {
          // Show profile picture if available
          displayContent = `
            <div class="profile-avatar">
              <img src="${profileData.profilePicture}" alt="Profile" class="profile-picture" />
            </div>
          `;
        } else if (profileData && profileData.name) {
          // Show first letter of name if available
          const firstLetter = profileData.name.charAt(0).toUpperCase();
          displayContent = `
            <div class="profile-avatar letter-avatar">
              ${firstLetter}
            </div>
          `;
          displayTitle = `${profileData.name} (+91 ${mobile})`;
        } else {
          // Show default user icon with mobile number
          const displayMobile = mobile ? mobile.slice(-4) : 'User';
          displayContent = `
            <svg class="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="mobile-display">${displayMobile}</span>
          `;
        }
        
        loginBtn.innerHTML = displayContent;
        loginBtn.title = displayTitle;
        loginBtn.classList.add('logged-in');
        
        // Set click handler for profile modal
        loginBtn.onclick = () => this.openProfileModal();
        
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.resetLoginButton();
      }
    } else {
      this.resetLoginButton();
    }
  }

  resetLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;
    
    loginBtn.innerHTML = `
      <svg class="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10,17 15,12 10,7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
      Login
    `;
    loginBtn.title = 'Login to RTRIBE';
    loginBtn.classList.remove('logged-in');
    loginBtn.onclick = () => this.openLoginModal();
  }

  // Check login state on initialization
  checkLoginState() {
    // Use a small delay to ensure DOM is ready
    setTimeout(async () => {
      await this.updateLoginState();
    }, 100);
  }

  destroy() {
    // Clean up event listeners if needed
    window.removeEventListener('scroll', this.updateActiveNavigation);
    
    // Remove login modal if it exists
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.remove();
    }
  }

      openProfileModal() {
        console.log('Opening profile modal...');
        const token = localStorage.getItem('rtribe_auth_token');
        if (!token) {
            console.log('No token found, opening login modal instead');
            this.openLoginModal();
            return;
        }

        // Get user profile data
        this.fetchUserProfile().then(profileData => {
            this.currentStep = 'profile';
            this.updateModalContent();
            const modal = document.getElementById('loginModal');
            if (modal) {
                modal.style.display = 'block';
            }
            
            // Pre-fill form with existing data after a short delay to ensure DOM is ready
            setTimeout(() => {
                console.log('Auto-populating profile with data:', profileData);
                if (profileData) {
                    const nameInput = document.getElementById('profileName');
                    const emailInput = document.getElementById('profileEmail');
                    const dobInput = document.getElementById('profileDob');
                    const genderInput = document.getElementById('profileGender');
                    const picturePreview = document.getElementById('profilePicturePreview');
                    
                    console.log('Form elements found:', {
                        nameInput: !!nameInput,
                        emailInput: !!emailInput,
                        dobInput: !!dobInput,
                        genderInput: !!genderInput
                    });
                    
                    if (nameInput) {
                        nameInput.value = profileData.name || '';
                        console.log('Set name to:', profileData.name);
                    }
                    if (emailInput) {
                        emailInput.value = profileData.email || '';
                        console.log('Set email to:', profileData.email);
                    }
                    if (dobInput) {
                        dobInput.value = profileData.dateOfBirth || '';
                        console.log('Set DOB to:', profileData.dateOfBirth);
                    }
                    if (genderInput) {
                        genderInput.value = profileData.gender || '';
                        console.log('Set gender to:', profileData.gender);
                    }
                    if (picturePreview && profileData.profilePicture) {
                        picturePreview.src = profileData.profilePicture;
                        picturePreview.style.display = 'block';
                        const placeholder = document.querySelector('.profile-picture-placeholder');
                        if (placeholder) placeholder.style.display = 'none';
                        console.log('Profile picture loaded in modal:', profileData.profilePicture.substring(0, 50) + '...');
                    } else {
                        console.log('No profile picture to load');
                    }
                }
            }, 100);
        });
    }

      async fetchUserProfile() {
        try {
            const response = await AuthUtils.authenticatedFetch('/api/get-profile', {
                method: 'GET'
            });

            const data = await response.json();
            if (data.success && data.profile) {
                return data.profile;
            }
            return null;
        } catch (error) {
            console.error('Error fetching profile:', error);
            return null;
        }
    }

      async updateUserProfile(profileData) {
        try {
            console.log('Sending profile update with data:', {
                ...profileData,
                profilePicture: profileData.profilePicture ? 'DATA_PRESENT (length: ' + profileData.profilePicture.length + ')' : 'NO_DATA'
            });
            
            const response = await AuthUtils.authenticatedFetch('/api/update-profile', {
                method: 'POST',
                body: JSON.stringify(profileData)
            });

            const result = await response.json();
            this.showMessage(result.message || 'Profile updated successfully!', 'success');
            
            // Update the login button display to reflect new profile data
            await this.updateLoginState();
            
            setTimeout(() => {
                this.closeLoginModal(); // Close the modal after successful profile update
            }, 2000);
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.message.includes('Authentication failed')) {
                // Auth error already handled by AuthUtils
                return;
            }
            this.showMessage('Network error. Please try again.', 'error');
        }
    }

  updateModalContent() {
    const modal = document.getElementById('loginModal'); // Assuming loginModal is the parent
    if (!modal) return;

    if (this.currentStep === 'mobile') {
      modal.innerHTML = `
        <div class="login-modal-content">
          <div class="login-modal-header">
            <h2>Login to RTRIBE</h2>
            <button class="close-modal" id="closeLoginModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="login-steps">
            <div class="login-step active" id="mobileStep">
              <div class="login-form">
                <div class="form-group">
                  <label for="mobileNumber">Mobile Number</label>
                  <div class="mobile-input-container">
                    <span class="country-code">+91</span>
                    <input 
                      type="tel" 
                      id="mobileNumber" 
                      placeholder="Enter 10-digit number"
                      maxlength="10"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                  <div class="input-error" id="mobileError"></div>
                </div>
                <button type="submit" class="submit-btn" id="sendOtpBtn">
                  <span class="btn-text">Send OTP</span>
                  <div class="btn-spinner" style="display: none;"></div>
                </button>
              </div>
              <div class="login-footer">
                <p>By continuing, you agree to our Terms & Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (this.currentStep === 'otp') {
      modal.innerHTML = `
        <div class="login-modal-content">
          <div class="login-modal-header">
            <h2>Verify OTP</h2>
            <button class="close-modal" id="closeLoginModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="login-steps">
            <div class="login-step" id="otpStep">
              <div class="login-form">
                <div class="otp-info">
                  <p>Enter the 6-digit code sent to +91 ${this.currentMobile}</p>
                </div>
                <div class="form-group">
                  <label for="otpInput">Enter OTP</label>
                  <input 
                    type="text" 
                    id="otpInput" 
                    placeholder="000000"
                    maxlength="6"
                    pattern="[0-9]{6}"
                    class="otp-input"
                    required
                  />
                  <div class="input-error" id="otpError"></div>
                </div>
                <button type="submit" class="submit-btn" id="verifyOtpBtn">
                  <span class="btn-text">Verify OTP</span>
                  <div class="btn-spinner" style="display: none;"></div>
                </button>
                <div class="otp-actions">
                  <button type="button" id="resendOtp" class="link-btn">
                    Didn't receive code? <span class="resend-text">Resend OTP</span>
                  </button>
                  <button type="button" id="changeNumber" class="link-btn">
                    Change Number
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (this.currentStep === 'success') {
      modal.innerHTML = `
        <div class="login-modal-content">
          <div class="login-modal-header">
            <h2>Welcome to RTRIBE!</h2>
            <button class="close-modal" id="closeLoginModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="login-steps">
            <div class="login-step success-step" id="successStep">
              <div class="login-success">
                <div class="success-icon">✓</div>
                <h3>Welcome to RTRIBE!</h3>
                <p>You have successfully logged in</p>
                <div class="success-actions">
                  <button type="button" id="continueBtn" class="submit-btn">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
         } else if (this.currentStep === 'profile') {
       modal.innerHTML = `
         <div class="profile-modal-overlay">
           <div class="profile-modal-content">
             <div class="profile-modal-header">
               <h2 class="profile-title">My Profile</h2>
               <button class="close-modal" id="closeLoginModal">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <line x1="18" y1="6" x2="6" y2="18"></line>
                   <line x1="6" y1="6" x2="18" y2="18"></line>
                 </svg>
               </button>
             </div>
             
             <div class="profile-body">
               <div class="profile-form-container" id="profileFormContainer">
                <div class="profile-picture-section">
                  <div class="profile-picture-container">
                    <img id="profilePicturePreview" src="" alt="Profile Picture" style="display: none;" />
                    <div class="profile-picture-placeholder">
                      <span>📷</span>
                    </div>
                  </div>
                  <input type="file" id="profilePictureInput" accept="image/*" style="display: none;" />
                  <button type="button" id="changePictureBtn" class="link-btn">Change Picture</button>
                </div>
                
                <div class="profile-form-fields">
                  <div class="form-row">
                    <div class="form-group">
                      <label for="profileName">Full Name</label>
                      <input type="text" id="profileName" placeholder="Enter your full name" />
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label for="profileEmail">Email Address</label>
                      <input type="email" id="profileEmail" placeholder="Enter your email" />
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label for="profileDob">Date of Birth</label>
                      <input type="date" id="profileDob" />
                    </div>
                    <div class="form-group">
                      <label for="profileGender">Gender</label>
                      <select id="profileGender">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label for="profileMobile">Mobile Number</label>
                      <div class="mobile-display">
                        <span class="country-code">+91</span>
                        <span id="profileMobile">${this.getUserMobile() || 'Not available'}</span>
                        <span class="mobile-note">(Cannot be changed)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="profile-actions">
                  <button type="submit" class="submit-btn" id="updateProfileBtn">
                    <span class="btn-text">Update Profile</span>
                    <div class="btn-spinner" style="display: none;"></div>
                  </button>
                  <button type="button" id="logoutBtn" class="secondary-btn">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Re-attach event listeners after content update
    this.attachModalEventListeners();
  }

  attachModalEventListeners() {
    const modal = document.getElementById('loginModal'); // Assuming loginModal is the parent
    if (!modal) return;

    // Always attach close button listener regardless of step
    const closeBtn = modal.querySelector('#closeLoginModal');
    if (closeBtn) {
      // Remove any existing listeners to prevent duplicates
      closeBtn.replaceWith(closeBtn.cloneNode(true));
      const newCloseBtn = modal.querySelector('#closeLoginModal');
      newCloseBtn.addEventListener('click', () => this.closeLoginModal());
    }

    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeLoginModal();
      }
    });

    if (this.currentStep === 'mobile') {
      const mobileForm = document.getElementById('mobileStep'); // Changed to mobileStep
      const mobileInput = document.getElementById('mobileNumber');
      const sendOtpBtn = document.getElementById('sendOtpBtn');

      mobileForm?.addEventListener('submit', (e) => this.handleMobileSubmit(e));
      mobileInput?.addEventListener('input', (e) => this.validateMobileInput(e));
      
    } else if (this.currentStep === 'otp') {
      const otpForm = document.getElementById('otpStep'); // Changed to otpStep
      const otpInput = document.getElementById('otpInput');
      const resendBtn = document.getElementById('resendOtpBtn'); // Changed to resendOtpBtn
      const changeNumberBtn = document.getElementById('changeNumber');

      otpForm?.addEventListener('submit', (e) => this.handleOtpSubmit(e));
      otpInput?.addEventListener('input', (e) => this.validateOtpInput(e));
      resendBtn?.addEventListener('click', () => this.resendOTP());
      changeNumberBtn?.addEventListener('click', () => this.goBackToMobile());
      
    } else if (this.currentStep === 'success') {
      const continueBtn = document.getElementById('continueBtn');
      continueBtn?.addEventListener('click', () => this.closeLoginModal());
      
    } else if (this.currentStep === 'profile') {
      const updateProfileBtn = document.getElementById('updateProfileBtn');
      const changePictureBtn = document.getElementById('changePictureBtn');
      const profilePictureInput = document.getElementById('profilePictureInput');
      const logoutBtn = document.getElementById('logoutBtn');

      updateProfileBtn?.addEventListener('click', (e) => this.handleProfileSubmit(e));
      changePictureBtn?.addEventListener('click', () => profilePictureInput?.click());
      profilePictureInput?.addEventListener('change', (e) => this.handleProfilePictureChange(e));
      logoutBtn?.addEventListener('click', () => this.handleLogout());

    }
  }

  // Add profile data loading function
  async loadProfileData() {
    try {
      console.log('Loading profile data...');
      if (!AuthUtils.isAuthenticated()) {
        console.log('No auth token found');
        return;
      }

      console.log('Making API request to get profile...');
      const response = await AuthUtils.authenticatedFetch('/api/get-profile', {
        method: 'GET'
      });

      const data = await response.json();
      console.log('Profile API response:', data);
      
      if (data.success && data.profile) {
        const profile = data.profile;
        console.log('Profile data:', profile);
        
        // Populate form fields with existing data
        const nameField = document.getElementById('profileName');
        const emailField = document.getElementById('profileEmail');
        const dobField = document.getElementById('profileDob');
        const genderField = document.getElementById('profileGender');
        const profilePicturePreview = document.getElementById('profilePicturePreview');
        const profilePicturePlaceholder = document.querySelector('.profile-picture-placeholder');

        console.log('Form fields found:', {
          nameField: !!nameField,
          emailField: !!emailField, 
          dobField: !!dobField,
          genderField: !!genderField
        });

        if (nameField && profile.name) {
          nameField.value = profile.name;
          console.log('Set name field to:', profile.name);
        }
        if (emailField && profile.email) {
          emailField.value = profile.email;
          console.log('Set email field to:', profile.email);
        }
        if (dobField && profile.dateOfBirth) {
          dobField.value = profile.dateOfBirth;
          console.log('Set DOB field to:', profile.dateOfBirth);
        }
        if (genderField && profile.gender) {
          genderField.value = profile.gender;
          console.log('Set gender field to:', profile.gender);
        }
        
        // Handle profile picture
        if (profile.profilePicture && profilePicturePreview) {
          profilePicturePreview.src = profile.profilePicture;
          profilePicturePreview.style.display = 'block';
          if (profilePicturePlaceholder) {
            profilePicturePlaceholder.style.display = 'none';
          }
          console.log('Set profile picture to:', profile.profilePicture);
        }
      } else {
        console.log('Profile data not found or API error:', data);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
      if (error.message.includes('Authentication failed')) {
        // Auth error already handled by AuthUtils
        return;
      }
    }
  }

  // Add profile form handlers
      handleProfileSubmit(e) {
        e.preventDefault();
        
        const profilePicturePreview = document.getElementById('profilePicturePreview');
        let profilePicture = '';
        
        // Check if preview image exists and has a valid src
        if (profilePicturePreview && profilePicturePreview.src && profilePicturePreview.src !== window.location.href) {
            profilePicture = profilePicturePreview.src;
        }
        
        console.log('Profile picture being sent:', profilePicture ? 'Data present (length: ' + profilePicture.length + ')' : 'No data');
        
        const profileData = {
            name: document.getElementById('profileName').value.trim(),
            email: document.getElementById('profileEmail').value.trim(),
            dateOfBirth: document.getElementById('profileDob').value,
            gender: document.getElementById('profileGender').value,
            profilePicture: profilePicture
        };

        // Basic validation
        if (!profileData.name) {
            this.showMessage('Please enter your full name', 'error');
            return;
        }

        if (profileData.email && !this.isValidEmail(profileData.email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const updateBtn = document.getElementById('updateProfileBtn');
        if (updateBtn) {
            updateBtn.classList.add('loading');
        }

        this.updateUserProfile(profileData).finally(() => {
            if (updateBtn) {
                updateBtn.classList.remove('loading');
            }
        });
    }

      handleProfilePictureChange(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                this.showMessage('Profile picture must be less than 5MB', 'error');
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                this.showMessage('Please select a valid image file', 'error');
                return;
            }

            // Preview the image
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('profilePicturePreview');
                const placeholder = document.querySelector('.profile-picture-placeholder');
                if (preview) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                }
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            };
            reader.readAsDataURL(file);
        }
    }

  handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
      this.logout();
    }
  }

      isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getUserMobile() {
        try {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);
                return user.mobile || '';
            }
        } catch (error) {
            console.error('Error getting user mobile:', error);
        }
        return '';
    }

  showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

      async logout() {
        localStorage.removeItem('rtribe_auth_token');
        localStorage.removeItem('userData');
        await this.updateLoginState();
        this.closeLoginModal(); // fixed function name
        this.showMessage('Logged out successfully!', 'success');
    }

      goBackToMobile() {
        this.currentStep = 'mobile';
        this.updateModalContent();
    }

  handleMobileSubmit(e) {
    e.preventDefault();
    const mobileInput = document.getElementById('mobileNumber');
    const mobileNumber = mobileInput.value.trim();
    const sendBtn = document.getElementById('sendOtpBtn');
    const errorDiv = document.getElementById('mobileError');

    if (!mobileNumber || mobileNumber.length !== 10 || !/^[0-9]{10}$/.test(mobileNumber)) {
      this.showError(errorDiv, 'Please enter a valid 10-digit mobile number');
      return;
    }

    sendBtn.classList.add('loading');
    this.clearError(errorDiv);

    fetch('/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile_number: mobileNumber
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        this.currentMobile = mobileNumber;
        this.showOTPStep();
      } else {
        this.showError(errorDiv, data.message || 'Failed to send OTP');
      }
    })
    .catch(error => {
      this.showError(errorDiv, 'Network error. Please try again.');
    })
    .finally(() => {
      sendBtn.classList.remove('loading');
    });
  }

  handleOtpSubmit(e) {
    e.preventDefault();
    const otpInput = document.getElementById('otpInput');
    const otpCode = otpInput.value.trim();
    const verifyBtn = document.getElementById('verifyOtpBtn');
    const errorDiv = document.getElementById('otpError');

    if (!otpCode || otpCode.length !== 6 || !/^[0-9]{6}$/.test(otpCode)) {
      this.showError(errorDiv, 'Please enter a valid 6-digit OTP');
      return;
    }

    verifyBtn.classList.add('loading');
    this.clearError(errorDiv);

    fetch('/api/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile_number: this.currentMobile,
        otp: otpCode
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('rtribe_auth_token', data.access_token);
        localStorage.setItem('rtribe_mobile', data.mobile_number);
                  this.showSuccessStep();
                   setTimeout(async () => {
            await this.updateLoginState();
          }, 100);
      } else {
        this.showError(errorDiv, data.message || 'Invalid OTP');
      }
    })
    .catch(error => {
      this.showError(errorDiv, 'Network error. Please try again.');
    })
    .finally(() => {
      verifyBtn.classList.remove('loading');
    });
  }

  resendOTP() {
    const resendBtn = document.getElementById('resendOtpBtn');
    resendBtn.textContent = 'Sending...';
    resendBtn.disabled = true;

    fetch('/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile_number: this.currentMobile
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        this.showMessage('OTP Sent!', 'success');
        setTimeout(() => {
          resendBtn.textContent = 'Resend OTP';
          resendBtn.disabled = false;
        }, 3000);
      } else {
        this.showMessage(data.message || 'Failed to resend OTP', 'error');
        resendBtn.textContent = 'Resend OTP';
        resendBtn.disabled = false;
      }
    })
    .catch(error => {
      this.showMessage('Network error. Please try again.', 'error');
      resendBtn.textContent = 'Resend OTP';
      resendBtn.disabled = false;
    });
  }

  validateMobileInput(e) {
    const mobileInput = document.getElementById('mobileNumber');
    mobileInput.value = mobileInput.value.replace(/[^0-9]/g, '');
  }

  validateOtpInput(e) {
    const otpInput = document.getElementById('otpInput');
    otpInput.value = otpInput.value.replace(/[^0-9]/g, '');
  }
} 