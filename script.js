const mainMenuItems = [
  {
    title: 'About MDF', 
    submenu: [
      { name: 'Overview', url: 'aboutoverview.html' },
      { name: 'History', url: 'abouthistory.html' },
      { name: 'Our Structure', url: 'aboutstructure.html' },   
      { name: 'Our Leaders', url: 'ourleaders.html' },
      { name: 'Diversity, Equity and Inclusion', url: 'dei.html' },
      { name: 'Financials', url: 'aboutfinancials.html' },
      { name: 'Partners', url: 'aboutmdf.html#partners' },
      { name: 'Membership', url: 'membership.html' }
    ]
  },
  {
    title: 'Get Involved',
    submenu: [
      { name: 'Educational and Vocational Training', url: 'getinvolvededvoctraining.html' },
      { name: 'Transport and Infastructure', url: 'getinvolvedtransportinfa.html' },
      { name: 'Health and Sanitation', url: 'getinvolvedhealth.html' },
      { name: 'Planning, Finance and Enterprise Development', url: 'getinvolvedfinance.html' },
      { name: 'Land Water and Environment', url: 'getinvolvedlandwater.html' },
      { name: 'Agriculture and Livestock', url: 'getinvolvedagriclivestock.html' },
      { name: 'Fisheries and Blue Economy', url: 'getinvolvedfisheries.html' },
      { name: 'Sports, Gender, Talent Management and Development', url: 'getinvolvedsports.html' },
      { name: 'Language, Culture, Heritage and Tourism ', url: 'getinvolvedlanguageculture.html' },
      { name: 'Public Admin Legal Affairs and Security', url: 'getinvolvedpublicadmin.html' },
      { name: 'AdHoc Committees', url: 'getinvolvedadhoc.html' }     
    ]
  },
  {
    title: 'Our Causes',
    submenu: [
      { name: 'Health', url: 'causeshealth.html' },
      { name: 'Education', url: 'causeseducation.html' },
      { name: 'Agriculture', url: '/water-sanitation' },
      { name: 'Environment', url: 'causesenvironment.html' },
      { name: 'Entrepreneurship', url: 'causesentrepreneurship.html' },
      { name: 'Transport', url: 'transport.html' },
      { name: 'Employment', url: 'causesemployment.html' },
      { name: 'Power', url: 'causespower.html' },
      { name: 'Fishing', url: 'causesfishing.html' }
    ]
  },
  {
    title: 'Our Programs',
    submenu: [
      { name: 'Education Recognition', url: '/news' },
      { name: 'MDF Benevolence', url: 'mdfbenovolence.html' },
      { name: 'Airtime', url: 'mdfairtime.html' },
      { name: 'Sacco', url: 'mdfsacco.html' },
      { name: 'Investment SPV', url: 'mdfinvestmentspv.html' }
    ]
  },
  {
    title: 'News and Features',
    submenu: [
      { name: 'Chairman Message', url: 'chairmanmessage.html' },
      { name: 'Media and Communication', url: 'mediaandcommunications.html' },
      { name: 'Newsletter', url: 'newsletter.html' },
      { name: 'Gallery', url: 'mdfgallery.html' }
    ]
  },
  {
    title: 'For Members',
    submenu: [
      { name: 'Register', url: 'userloginform.html#' },
      { name: 'Documents', url: 'vault.html' }
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

  // Create all menu sections upfront
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

  // Handle hover events for navItems
  let hoverTimeout;

  navItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout); // Clear any existing timeout
      openMegaMenu();
    });

    item.addEventListener('mouseleave', (e) => {
      // Check if mouse moved to mega menu
      const toElement = e.relatedTarget;
      if (!megaMenu.contains(toElement)) {
        // If not, set a delay before closing the mega menu
        hoverTimeout = setTimeout(() => {
          closeMegaMenu();
        }, 300); // 300ms delay
      }
    });

    // Allow navigation for main nav items, even if they have submenus
    item.addEventListener('click', (e) => {
      // Navigate to the href of the navItem
      window.location.href = item.href;
    });
  });

  // Handle mega menu hover
  megaMenu.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout); // Clear any existing timeout
    openMegaMenu();
  });

  megaMenu.addEventListener('mouseleave', () => {
    // Set a delay before closing the mega menu
    hoverTimeout = setTimeout(() => {
      closeMegaMenu();
    }, 300); // 300ms delay
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

// Our leaders page Under About script

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

// Get the button
const backToTopButton = document.getElementById("back-to-top");

// Show the button when the user scrolls down 20px
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
};

// Scroll to the top when the button is clicked
backToTopButton.addEventListener("click", function() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
});