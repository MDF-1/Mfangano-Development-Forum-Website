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
            { name: 'Educational and Vocational Training', url: 'getinvolvededvoctraining.html' },
            { name: 'Transport and Infrastructure', url: 'getinvolvedtransportinfa.html' },
            { name: 'Health and Sanitation', url: 'getinvolvedhealth.html' },
            { name: 'Planning, Finance and Enterprise Development', url: 'getinvolvedfinance.html' },
            { name: 'Land Water and Environment', url: 'getinvolvedlandwater.html' },
            { name: 'Agriculture and Livestock', url: 'getinvolvedagriclivestock.html' },
            { name: 'Fisheries and Blue Economy', url: 'getinvolvedfisheries.html' },
            { name: 'Sports, Gender, Talent Management and Development', url: 'getinvolvedsports.html' },
            { name: 'Language, Culture, Heritage and Tourism', url: 'getinvolvedlanguageculture.html' },
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
            { name: 'MDF Benevolence', url: 'mdfbenevolence.html' },
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
            { name: 'Newsletter', url: '/club-resources' },
            { name: 'Gallery', url: 'mdfgallery.html' }
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
    const navItemsContainer = document.querySelector('.nav-items');

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

    // Function to ensure alignment between nav items and mega menu sections
    function alignNavAndMegaMenu() {
        const navItemsRect = navItemsContainer.getBoundingClientRect();
        const megaMenuSections = document.querySelectorAll('.mega-menu-section');
        
        // Set mega menu content width to match nav items container
        megaMenuContent.style.width = `${navItemsRect.width}px`;
        
        // Calculate section widths based on nav items
        navItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const section = megaMenuSections[index];
            if (section) {
                section.style.width = `${itemRect.width}px`;
                section.style.flexGrow = '0';
                section.style.flexShrink = '0';
            }
        });
    }

    // Initial alignment
    alignNavAndMegaMenu();

    // Re-align on window resize and zoom
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(alignNavAndMegaMenu, 100);
    });

    // Re-align on zoom (for browsers that support zoom events)
    window.addEventListener('zoom', alignNavAndMegaMenu);

    // Handle hover events
    navItems.forEach((item, index) => {
        const section = megaMenuContent.children[index];

        item.addEventListener('mouseenter', () => {
            openMegaMenu();
            alignNavAndMegaMenu(); // Ensure alignment when opening
        });

        item.addEventListener('mouseleave', (e) => {
            // Check if mouse moved to mega menu
            const toElement = e.relatedTarget;
            if (!megaMenu.contains(toElement)) {
                closeMegaMenu();
            }
        });
    });

    megaMenu.addEventListener('mouseenter', () => {
        document.querySelectorAll('.mega-menu-section').forEach(s => s.style.opacity = '1');
    });

    megaMenu.addEventListener('mouseleave', () => {
        closeMegaMenu();
    });

    function openMegaMenu() {
        megaMenu.classList.add('active');
        alignNavAndMegaMenu(); // Ensure alignment when opening
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                </svg>
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