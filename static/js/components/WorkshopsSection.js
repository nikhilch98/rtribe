// Workshops Section Component - Exact Recreation of L3 from original
export class WorkshopsSection {
  constructor() {
    this.element = null;
    this.sections = [];
  }

  render() {
    this.element = document.createElement('section');
    this.element.id = 'workshops';
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

    // Register button - overlaid on image in bottom right
    const registerButton = document.createElement('button');
    registerButton.className = 'workshop-register-button-overlay';
    registerButton.textContent = 'Register Now';
    registerButton.addEventListener('click', () => {
      this.registerForWorkshop(workshop);
    });
    imageContainer.appendChild(registerButton);

    card.appendChild(imageContainer);

    // Do NOT render .workshop-content or any details for any workshop

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

  // WhatsApp registration function with individual workshop messages
  registerForWorkshop(workshop) {
    // Get WhatsApp config from global app or use defaults
    const whatsappConfig = window.rtribeApp?.whatsappConfig || {
      phoneNumber: '917338003939',
      workshopMessageTemplate: 'Hi, I\'m interested for {style} by {artist} on {date} {time}.',
      generalInquiryMessage: 'RTRIBE Workshop Inquiry. Please share workshop details.'
    };

    let message;
    
    // First, check if this workshop has a custom WhatsApp message
    if (workshop.whatsappMessage && workshop.whatsappMessage.trim() !== '') {
      // Use the individual workshop's custom message
      message = workshop.whatsappMessage;
    } else if (workshop.style && workshop.artist && workshop.date && workshop.time) {
      // Fallback to configurable template with workshop details
      message = whatsappConfig.workshopMessageTemplate
        .replace('{style}', workshop.style)
        .replace('{artist}', workshop.artist)
        .replace('{date}', workshop.date.replace(', 2025', ''))
        .replace('{time}', workshop.time);
    } else {
      // Use general inquiry message for incomplete workshop data
      message = whatsappConfig.generalInquiryMessage;
    }

    const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
} 