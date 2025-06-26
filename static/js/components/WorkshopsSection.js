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

    // Workshop image - R3 from original
    const image = document.createElement('img');
    image.className = 'workshop-image';
    image.src = workshop.image;
    image.alt = workshop.style;
    image.loading = 'lazy';

    imageContainer.appendChild(image);
    card.appendChild(imageContainer);

    // Workshop content - O3 from original
    const content = document.createElement('div');
    content.className = 'workshop-content';

    // Workshop header - z3 from original
    const header = document.createElement('div');
    header.className = 'workshop-header';

    // Workshop style - V3 from original
    const style = document.createElement('h3');
    style.className = 'workshop-style';
    style.textContent = workshop.style;

    // Workshop artist - _3 from original
    const artist = document.createElement('p');
    artist.className = 'workshop-artist';
    artist.innerHTML = `by ${workshop.artist}`;

    header.appendChild(style);
    header.appendChild(artist);

    // Workshop details - B3 from original
    const details = document.createElement('div');
    details.className = 'workshop-details';

    // Workshop info container - U3 from original
    const infoContainer = document.createElement('div');
    infoContainer.className = 'workshop-info-container';

    // Date info - Dp from original with p3 icon
    const dateInfo = document.createElement('div');
    dateInfo.className = 'workshop-info-item';
    const dateIcon = document.createElement('span');
    dateIcon.className = 'workshop-icon';
    dateIcon.textContent = '📅';
    const dateText = document.createElement('span');
    dateText.textContent = workshop.date;
    dateInfo.appendChild(dateIcon);
    dateInfo.appendChild(dateText);

    // Time info - Dp from original with g3 icon
    const timeInfo = document.createElement('div');
    timeInfo.className = 'workshop-info-item';
    const timeIcon = document.createElement('span');
    timeIcon.className = 'workshop-icon';
    timeIcon.textContent = '🕐';
    const timeText = document.createElement('span');
    timeText.textContent = workshop.time;
    timeInfo.appendChild(timeIcon);
    timeInfo.appendChild(timeText);

    infoContainer.appendChild(dateInfo);
    infoContainer.appendChild(timeInfo);

    // Workshop footer - j3 from original
    const footer = document.createElement('div');
    footer.className = 'workshop-footer';

    // Workshop price - N3 from original
    const price = document.createElement('div');
    price.className = 'workshop-price';
    price.textContent = workshop.price;

    // Register button - H3 from original with onClick: () => t(e)
    const registerButton = document.createElement('button');
    registerButton.className = 'workshop-register-button';
    registerButton.textContent = 'Register Now';
    registerButton.addEventListener('click', () => {
      if (window.registerForWorkshop) {
        window.registerForWorkshop(workshop);
      }
    });

    footer.appendChild(price);
    footer.appendChild(registerButton);

    details.appendChild(infoContainer);
    details.appendChild(footer);

    content.appendChild(header);
    content.appendChild(details);

    card.appendChild(content);

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