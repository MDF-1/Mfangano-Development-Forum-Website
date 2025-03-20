// Get elements
const popupOverlay = document.getElementById('popup-overlay');
const closeBtn = document.querySelector('.close-btn');

// Function to open the popup
function openPopup() {
  popupOverlay.classList.add('active');
}

// Function to close the popup
function closePopup() {
  popupOverlay.classList.remove('active');
}

// Close popup when close button is clicked
closeBtn.addEventListener('click', closePopup);

// Close popup when clicking outside the form
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    closePopup();
  }
});

// Handle form submission
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Form submitted! (Backend integration needed)');
  closePopup();
  form.reset();
});

// Link your existing links to open the popup
document.querySelectorAll('.open-popup').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openPopup();
  });
});