const mainMenuItems = [
  {
    title: 'About MDF', 
    submenu: [
      { name: 'Overview', url: 'aboutoverview.html' },
      { name: 'History', url: 'abouthistory.html' },
      { name: 'Our Structure', url: 'aboutstructure.html' },   
      { name: 'Our Leaders', url: 'ourleaders.html' },
      { name: 'Diversity, Equity and Inclusion', url: 'dei.html' },
      { name: 'Financials', url: 'aboutmdf.html#financials' },
      { name: 'Partners', url: 'aboutmdf.html#partners' },
      { name: 'Membership', url: 'membership.html' }
    ]
  },
  {
    title: 'Get Involved',
    submenu: [
      { name: 'Educational and Vocational Training', url: '/getinvolved.html' },
      { name: 'Transport and Infastructure', url: 'getinvolved.html' },
      { name: 'Health and Sanitation', url: 'getinvolved.html' },
      { name: 'Planning, Finance and Enterprise Development', url: 'getinvolved.html' },
      { name: 'Land Water and Environment', url: 'getinvolved.html' },
      { name: 'Agriculture and Livestock', url: 'getinvolved.html' },
      { name: 'Fisheries and Blue Economy', url: 'getinvolved.html' },
      { name: 'Sports, Gender, Talent Management and Development', url: 'getinvolved.html' },
      { name: 'Language, Culture, Heritage and Tourism ', url: 'getinvolved.html' },
      { name: 'Public Admin Legal Affairs and Security', url: 'getinvolved.html' },
      { name: 'AdHoc Committees', url: 'getinvolved.html' }     
    ]
  },
  {
    title: 'Our Causes',
    submenu: [
      { name: 'Health', url: '/peace-conflict-resolution' },
      { name: 'Education', url: '/disease-prevention' },
      { name: 'Agriculture', url: '/water-sanitation' },
      { name: 'Clean Water', url: '/maternal-child-health' },
      { name: 'Entrepreneurship', url: '/education' },
      { name: 'Transport', url: 'transport.html' },
      { name: 'Power', url: '/history' },
      { name: 'Fishing', url: '/history' }
    ]
  },
  {
    title: 'Our Programs',
    submenu: [
      { name: 'Education Recognition', url: '/news' },
      { name: 'MDF Benovolence', url: 'mdfbenovolence.html' },
      { name: 'Airtime', url: 'mdfairtime.html' },
      { name: 'Sacco', url: '/press-center' },
      { name: 'Investment SPV', url: '/history' }
    ]
  },
  {
    title: 'News and Features',
    submenu: [
      { name: 'Chairman Message', url: 'chairmanmessage.html' },
      { name: 'Media and Communication', url: '/learning-center' },
      { name: 'Newsletter', url: '/club-resources' },
      { name: 'Gallery', url: '/district-resources' }
    ]
  },
  {
    title: 'For Members',
    submenu: [
      { name: 'Register', url: '/member-resources' },
      { name: 'Documents', url: '/learning-center' }
    ]
  }
];

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
  initDesktopNav();
  initMobileNav();
});

// Desktop Navigation
function initDesktopNav() {
  const navItems = document.querySelectorAll('.nav-item');
  const megaMenu = document.querySelector('.mega-menu');
  const megaMenuContent = document.querySelector('.mega-menu-content');

  // Create all menu sections upfront and align them with nav items
  mainMenuItems.forEach((item, index) => {
    const section = document.createElement('div');
    section.className = 'mega-menu-section';
    section.dataset.index = index;

    section.innerHTML = `
      <div class="mega-menu-links">
        ${item.submenu.map(subItem => `
          <a href="${subItem.url}" class="mega-menu-link">${subItem.name}</a>
        `).join('')}
      </div>
    `;

    megaMenuContent.appendChild(section);
  });

  // Handle hover and click events
  navItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      openMegaMenu();
    });

 
  });

  // Close mega menu when mouse leaves the navigation area
  megaMenu.addEventListener('mouseleave', () => {
    closeMegaMenu();
  });

  // Close mega menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item') && !e.target.closest('.mega-menu')) {
      closeMegaMenu();
    }
  });

  function openMegaMenu() {
    megaMenu.classList.add('active');
  }

  function closeMegaMenu() {
    megaMenu.classList.remove('active');
  }
}

// Mobile Navigation
function initMobileNav() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavContent = document.querySelector('.mobile-nav-content');

  // Create mobile navigation content
  mobileNavContent.innerHTML = mainMenuItems.map((item, index) => `
    <div class="mobile-nav-item-container">
      <button class="mobile-nav-item" data-index="${index}">
        ${item.title}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="mobile-nav-submenu">
        ${item.submenu.map(subItem => `
          <a href="${subItem.url}" class="mobile-nav-link">${subItem.name}</a>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Toggle mobile menu
  mobileMenuButton.addEventListener('click', () => {
    mobileNav.classList.toggle('active');

    // Toggle menu icon
    const menuIcon = mobileMenuButton.querySelector('svg');
    if (mobileNav.classList.contains('active')) {
      menuIcon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
    } else {
      menuIcon.innerHTML = '<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>';
    }
  });

  // Toggle mobile submenus
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  mobileNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      const submenu = item.nextElementSibling;
      const isActive = submenu.classList.contains('active');

      // Close all other submenus
      document.querySelectorAll('.mobile-nav-submenu').forEach((menu) => {
        menu.classList.remove('active');
      });

      // Toggle clicked submenu
      if (!isActive) {
        submenu.classList.add('active');
      }
    });
  });
}

function initMap() {
  // Coordinates for the location (Change to your desired location)
  const location = { lat: -1.286389, lng: 36.817223 }; // Example: Nairobi, Kenya
  
  // Initialize the map
  const map = new google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 15, // Adjust zoom level
  });

  // Add a marker
  new google.maps.Marker({
      position: location,
      map: map,
      title: "Your Location", // Tooltip on hover
  });
}

//Our leaders page Under About script

// Add interactivity to the "Read More" buttons
const readMoreButtons = document.querySelectorAll('.btn-read-more');

readMoreButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const leaderCard = button.closest('.leader-card');
    const leaderDetails = leaderCard.querySelector('.leader-details');

    if (leaderDetails.style.display === 'none' || !leaderDetails.style.display) {
      leaderDetails.style.display = 'block';
      button.textContent = 'Read Less';
    } else {
      leaderDetails.style.display = 'none';
      button.textContent = 'Read More';
    }
  });
});

// D>E>I Scripts 

// Add interactivity (if needed)
// Example: Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});