// Select elements
const registerButton = document.querySelector('.register-f0r-sacco');
const popupOverlay = document.querySelector('.popup-overlay');
const closePopupButton = document.querySelector('#close-popup-button');
const notification = document.querySelector('.notification');

// Show popup when "JOIN MDF SACCO" button is clicked
registerButton.addEventListener('click', () => {
  popupOverlay.classList.add('active');
});

// Close popup and show notification when "Close" button is clicked
closePopupButton.addEventListener('click', () => {
  popupOverlay.classList.remove('active');
  notification.classList.add('active');
  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('active');
  }, 3000);
});