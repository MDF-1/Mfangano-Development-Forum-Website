// Get elements
const openSlideInLinks = document.querySelectorAll('.mdf-open-slide-in'); // Target ALL links
const slideInOverlay = document.getElementById('mdf-slide-in-overlay');
const slideInForm = document.getElementById('mdf-slide-in-form');
const closeSlideInBtn = document.querySelector('.mdf-close-slide-in');

// Add event listeners to ALL links
openSlideInLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    slideInOverlay.classList.add('active');
  });
});

// Close slide-in form
closeSlideInBtn.addEventListener('click', () => {
  slideInOverlay.classList.remove('active');
});

// Close form when clicking outside
slideInOverlay.addEventListener('click', (e) => {
  if (e.target === slideInOverlay) {
    slideInOverlay.classList.remove('active');
  }
});

// Handle form submission
const form = document.getElementById('mdf-contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Form submitted! (Backend integration needed)');
  slideInOverlay.classList.remove('active');
  form.reset();
});