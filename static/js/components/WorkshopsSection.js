// Workshops Section Component - Exact Recreation of L3 from original
export class WorkshopsSection {
  constructor() {
    this.element = null;
    this.sections = [];
  }

  render() {
    this.element = document.createElement('section');
    this.element.id = 'workshops';
    this.element.style.backgroundColor = 'black';
    this.element.className = 'workshops-section';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'workshop-container';
    this.element.appendChild(container);

    return this.element;
  }

  // Update sections data - called when API data is loaded
  updateSections(sections) {
    this.sections = sections;
    if (this.element) {
      this.renderSections();
    }
  }

  renderSections() {
    if (!this.element || !this.sections.length) return;

    const container = this.element.querySelector('.workshop-container');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Render each section exactly like original: [].concat(...sections.map(section => [...]))
    const sectionElements = this.sections.map(section => this.renderSection(section));
    sectionElements.forEach(elements => {
      elements.forEach(el => container.appendChild(el));
    });
  }

  renderSection(section) {
    const elements = [];

    // Section title - M3 from original
    const titleElement = document.createElement('h2');
    titleElement.className = 'section-title';
    titleElement.textContent = section.title;
    elements.push(titleElement);

    // Section container - D3 from original  
    const sectionContainer = document.createElement('div');
    sectionContainer.className = 'section-container';

    // Workshop grid - w3 from original
    const workshopGrid = document.createElement('div');
    workshopGrid.className = 'workshop-grid';

    // Render workshop items exactly like original map
    section.items.forEach(workshop => {
      const workshopCard = this.renderWorkshopCard(workshop);
      workshopGrid.appendChild(workshopCard);
    });

    sectionContainer.appendChild(workshopGrid);
    elements.push(sectionContainer);

    return elements;
  }

  renderWorkshopCard(workshop) {
    // Main workshop card container - zc from original
    const card = document.createElement('div');
    card.className = 'workshop-card';
    card.setAttribute('data-workshop-id', workshop.id);

    // Workshop image container - C3 from original
    const imageContainer = document.createElement('div');
    imageContainer.className = 'workshop-image-container';

    // Workshop image - R3 from original (always required)
    const image = document.createElement('img');
    image.className = 'workshop-image';
    image.src = workshop.image;
    image.alt = workshop.style || 'Workshop';
    image.loading = 'lazy';

    imageContainer.appendChild(image);
    card.appendChild(imageContainer);

    // Check if we have any non-image content to display
    const hasStyle = workshop.style && workshop.style.trim() !== '';
    const hasArtist = workshop.artist && workshop.artist.trim() !== '';
    const hasDate = workshop.date && workshop.date.trim() !== '';
    const hasTime = workshop.time && workshop.time.trim() !== '';
    const hasPrice = workshop.price && workshop.price.trim() !== '';

    // If all fields except image are null/empty, show only the image
    if (!hasStyle && !hasArtist && !hasDate && !hasTime && !hasPrice) {
      // Make the image container full height when no content is present
      imageContainer.style.height = '100%';
      imageContainer.style.flex = '1';
      return card;
    }

    // Workshop content - O3 from original (only if we have content to show)
    const content = document.createElement('div');
    content.className = 'workshop-content';

    // Workshop header - z3 from original (only if style or artist exists)
    if (hasStyle || hasArtist) {
      const header = document.createElement('div');
      header.className = 'workshop-header';

      // Workshop style - V3 from original (only if present)
      if (hasStyle) {
        const style = document.createElement('h3');
        style.className = 'workshop-style';
        style.textContent = workshop.style;
        header.appendChild(style);
      }

      // Workshop artist - _3 from original (only if present)
      if (hasArtist) {
        const artist = document.createElement('p');
        artist.className = 'workshop-artist';
        artist.innerHTML = `by ${workshop.artist}`;
        header.appendChild(artist);
      }

      content.appendChild(header);
    }

    // Workshop details - B3 from original (only if we have details to show)
    if (hasDate || hasTime || hasPrice) {
      const details = document.createElement('div');
      details.className = 'workshop-details';

      // Workshop info container - U3 from original (only if date or time exists)
      if (hasDate || hasTime) {
        const infoContainer = document.createElement('div');
        infoContainer.className = 'workshop-info-container';

        // Date info - only if present
        if (hasDate) {
          const dateInfo = document.createElement('div');
          dateInfo.className = 'workshop-info-item';
          const dateIcon = document.createElement('span');
          dateIcon.className = 'workshop-icon';
          dateIcon.textContent = '📅';
          const dateText = document.createElement('span');
          dateText.textContent = workshop.date;
          dateInfo.appendChild(dateIcon);
          dateInfo.appendChild(dateText);
          infoContainer.appendChild(dateInfo);
        }

        // Time info - only if present
        if (hasTime) {
          const timeInfo = document.createElement('div');
          timeInfo.className = 'workshop-info-item';
          const timeIcon = document.createElement('span');
          timeIcon.className = 'workshop-icon';
          timeIcon.textContent = '🕐';
          const timeText = document.createElement('span');
          timeText.textContent = workshop.time;
          timeInfo.appendChild(timeIcon);
          timeInfo.appendChild(timeText);
          infoContainer.appendChild(timeInfo);
        }

        details.appendChild(infoContainer);
      }

      // Workshop footer - j3 from original (only if price exists or we want to show register button)
      if (hasPrice || (hasStyle && hasArtist && hasDate && hasTime)) {
        const footer = document.createElement('div');
        footer.className = 'workshop-footer';

        // Workshop price - N3 from original (only if present)
        if (hasPrice) {
          const price = document.createElement('div');
          price.className = 'workshop-price';
          price.textContent = workshop.price;
          footer.appendChild(price);
        }

        // Register button - H3 from original (only show if we have enough info for registration)
        if (hasStyle && hasArtist && hasDate && hasTime) {
          const registerButton = document.createElement('button');
          registerButton.className = 'workshop-register-button';
          registerButton.textContent = 'Register Now';
          registerButton.addEventListener('click', () => {
            if (window.registerForWorkshop) {
              window.registerForWorkshop(workshop);
            }
          });
          footer.appendChild(registerButton);
        }

        details.appendChild(footer);
      }

      content.appendChild(details);
    }

    // Only append content if we actually have content to show
    if (content.children.length > 0) {
      card.appendChild(content);
    }

    return card;
  }

  // Add hover effects that match original
  addEventListeners() {
    if (!this.element) return;

    const workshopCards = this.element.querySelectorAll('.workshop-card');
    workshopCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.transition = 'all 0.3s ease';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }
} 