// Authentication Utilities - Centralized auth error handling and automatic logout
export class AuthUtils {
  
  /**
   * Makes an authenticated API request with automatic error handling
   * @param {string} url - API endpoint URL
   * @param {Object} options - Fetch options (method, headers, body, etc.)
   * @param {Function} onAuthError - Optional callback for auth error handling
   * @returns {Promise} Response or throws error
   */
  static async authenticatedFetch(url, options = {}, onAuthError = null) {
    const token = localStorage.getItem('rtribe_auth_token');
    
    // Prepare headers with authentication
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const fetchOptions = {
      ...options,
      headers
    };
    
    try {
      const response = await fetch(url, fetchOptions);
      
      // Check for authentication errors
      if (response.status === 401 || response.status === 403) {
        console.warn(`Authentication error (${response.status}) on ${url}`);
        await this.handleAuthError(onAuthError);
        throw new Error('Authentication failed - please login again');
      }
      
      // Check for other error responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Check if error message indicates auth issues
        if (this.isAuthErrorMessage(errorData.message || errorData.error)) {
          console.warn(`Auth error detected in response: ${errorData.message || errorData.error}`);
          await this.handleAuthError(onAuthError);
          throw new Error('Authentication failed - please login again');
        }
        
        throw new Error(errorData.message || errorData.error || `HTTP ${response.status}`);
      }
      
      return response;
    } catch (error) {
      // Handle network errors that might indicate token issues
      if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
        console.warn('Network error - checking if auth related');
      }
      throw error;
    }
  }
  
  /**
   * Check if an error message indicates authentication issues
   * @param {string} message - Error message to check
   * @returns {boolean} True if message indicates auth error
   */
  static isAuthErrorMessage(message) {
    if (!message) return false;
    
    const authErrorKeywords = [
      'token',
      'expired',
      'invalid',
      'unauthorized',
      'authentication',
      'login',
      'session',
      'forbidden'
    ];
    
    const lowerMessage = message.toLowerCase();
    return authErrorKeywords.some(keyword => lowerMessage.includes(keyword));
  }
  
  /**
   * Handle authentication errors - logout and show appropriate message
   * @param {Function} onAuthError - Optional custom auth error handler
   */
  static async handleAuthError(onAuthError = null) {
    console.log('Handling authentication error - logging out user');
    
    // Clear authentication data
    localStorage.removeItem('rtribe_auth_token');
    localStorage.removeItem('userData');
    
    // Call custom error handler if provided
    if (onAuthError && typeof onAuthError === 'function') {
      try {
        await onAuthError();
      } catch (error) {
        console.error('Error in custom auth error handler:', error);
      }
    }
    
    // Update header to show logged out state
    try {
      // Look for header instance
      if (window.rtribeApp && window.rtribeApp.header) {
        await window.rtribeApp.header.updateLoginState();
        window.rtribeApp.header.showMessage('Session expired. Please login again.', 'error');
      }
    } catch (error) {
      console.error('Error updating header after auth error:', error);
    }
    
    // Show global notification if no header available
    this.showAuthErrorNotification();
  }
  
  /**
   * Show a global notification for authentication errors
   */
  static showAuthErrorNotification() {
    // Create a temporary notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #ff6b6b, #ee5a24);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      animation: slideInFromRight 0.3s ease;
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>Session expired. Please login again.</span>
      </div>
    `;
    
    // Add animation keyframes
    if (!document.getElementById('auth-error-styles')) {
      const style = document.createElement('style');
      style.id = 'auth-error-styles';
      style.textContent = `
        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideInFromRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
  
  /**
   * Check if user is currently authenticated
   * @returns {boolean} True if user has valid token
   */
  static isAuthenticated() {
    const token = localStorage.getItem('rtribe_auth_token');
    const userData = localStorage.getItem('userData');
    return !!(token && userData);
  }
  
  /**
   * Get current user data
   * @returns {Object|null} User data or null if not authenticated
   */
  static getCurrentUser() {
    try {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  
  /**
   * Logout user and clear all authentication data
   */
  static logout() {
    localStorage.removeItem('rtribe_auth_token');
    localStorage.removeItem('userData');
    
    // Update header if available
    if (window.rtribeApp && window.rtribeApp.header) {
      window.rtribeApp.header.updateLoginState();
    }
  }
} 