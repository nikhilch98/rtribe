/**
 * Dance Week Section Component - Exact Recreation of K3 from original
 * Features black background, radial gradient, and styled showcase highlight
 */

export class DanceWeekSection {
  constructor() {
    this.element = null;
  }

  render() {
    this.element = document.createElement('section');
    this.element.className = 'dance-week-section';
    this.element.id = 'dance-week';
    
    this.element.innerHTML = `
      <div class="dance-week-container">
        <h2 class="dance-week-title">Namma Dance Week is here, Bengaluru!</h2>
        <p class="dance-week-description">🕺 11 Artists, 1 Celebrity Guest. Infinite Vibe.</p>
        <div class="dance-week-showcase">Showcase: June 15th</div>
      </div>
    `;

    return this.element;
  }

  addScrollAnimations() {
    if (!this.element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    const title = this.element.querySelector('.section-title');
    const description = this.element.querySelector('.dance-week-description');
    const highlight = this.element.querySelector('.showcase-highlight');

    if (title) {
      title.classList.add('fade-up');
      observer.observe(title);
    }
    if (description) {
      description.classList.add('fade-in');
      description.style.animationDelay = '0.2s';
      observer.observe(description);
    }
    if (highlight) {
      highlight.classList.add('fade-up');
      highlight.style.animationDelay = '0.4s';
      observer.observe(highlight);
    }
  }

  // Method to update dance week information if needed
  updateInfo(info) {
    if (!this.element) return;

    const titleElement = this.element.querySelector('.dance-week-title');
    const descriptionElement = this.element.querySelector('.dance-week-description');
    const showcaseElement = this.element.querySelector('.dance-week-showcase');

    if (info.title && titleElement) {
      titleElement.textContent = info.title;
    }
    if (info.description && descriptionElement) {
      descriptionElement.textContent = info.description;
    }
    if (info.showcaseDate && showcaseElement) {
      showcaseElement.textContent = `Showcase: ${info.showcaseDate}`;
    }
  }
} 