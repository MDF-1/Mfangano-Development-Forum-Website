const mainMenuItems = [
    {
      title: 'About Rotary',
      submenu: ['Who We Are', 'Our Impact', 'Get Involved', 'Our Programs', 'History']
    },
    {
      title: 'Take Action',
      submenu: ['End Polio', 'Donate', 'Join', 'Volunteer', 'Learn']
    },
    {
      title: 'Our Causes',
      submenu: ['Peace & Conflict Resolution', 'Disease Prevention', 'Water & Sanitation', 'Maternal & Child Health', 'Education', 'Community Development']
    },
    {
      title: 'News & Features',
      submenu: ['News', 'Magazine', 'Stories', 'Press Center']
    },
    {
      title: 'Member Center',
      submenu: ['Member Resources', 'Learning Center', 'Club Resources', 'District Resources']
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
            <a href="#" class="mega-menu-link">${subItem}</a>
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
      
      item.addEventListener('click', (e) => {
        e.preventDefault();
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
            <a href="#" class="mobile-nav-link">${subItem}</a>
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