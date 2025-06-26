// Loading Screen Component
export class LoadingScreen {
  constructor() {
    this.element = null;
    this.isVisible = false;
  }

  show() {
    if (this.isVisible) return;

    this.element = document.createElement('div');
    this.element.className = 'loading-screen';
    this.element.innerHTML = `
      <div class="loading-content">
        <h1>NAMMA Dance Week</h1>
        <p style="color: var(--primary-purple); margin-bottom: 1.5rem;">
          Rtribe Dance Studio
        </p>
        <div class="loading-spinner">
          <img src="/static/assets/log.gif" alt="Loading..." class="loading-gif" />
        </div>
      </div>
    `;

    document.body.appendChild(this.element);
    this.isVisible = true;
  }

  hide() {
    if (!this.isVisible || !this.element) return;

    // Add fade-out animation
    this.element.style.opacity = '0';
    this.element.style.transition = 'opacity 0.5s ease-out';

    setTimeout(() => {
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      this.element = null;
      this.isVisible = false;
    }, 500);
  }
} 