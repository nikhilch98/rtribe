/**
 * Showcase Section Component - Exact Recreation of F3 from original
 * Features complex animated gradient background and sophisticated styling
 */

export class ShowcaseSection {
  constructor() {
    this.element = null;
  }

  render() {
    this.element = document.createElement('section');
    this.element.className = 'showcase-section';
    this.element.id = 'showcase';
    
    this.element.innerHTML = `
      <h2 class="showcase-title">Namma Dance Week Showcase</h2>
      
      <p class="showcase-intro">
        On June 15th, we wrap up Namma Dance Week with a night you won't forget — a grand stage showcase featuring:
      </p>

      <div class="showcase-features">
        <div class="showcase-feature">
          ✨ Incredible performances by individual artists
        </div>
        <div class="showcase-feature">
          🔥 Select students chosen during the week-long workshops
        </div>
        <div class="showcase-feature">
          🎶 A vibrant mix of styles, stories, and raw talent
        </div>
      </div>

      <p class="showcase-description">
        This is not just a performance — it's a celebration of movement, identity, and the spirit of Bengaluru. From high-energy street styles to soulful contemporary, each act reflects a journey, a vibe, and a bold expression of dance.
      </p>

      <p class="showcase-finale">
        Whether you're a <strong>fellow dancer</strong>, a proud friend, or someone who just loves watching <strong>passion come alive</strong> on stage — this evening is for you.
      </p>
    `;

    return this.element;
  }
} 