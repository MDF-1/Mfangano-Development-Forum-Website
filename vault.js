// Get references to DOM elements
const documentList = document.getElementById('document-list') || document.getElementById('exec-document-list');
const documentViewer = document.getElementById('document-viewer') || document.getElementById('exec-document-viewer');
const downloadBtn = document.getElementById('download-btn') || document.getElementById('exec-download-btn');
const logoutBtn = document.getElementById('logout-btn');
const execDocsBtn = document.getElementById('exec-docs-btn');
const execLoginPopup = document.getElementById('exec-login-popup');
const execCodeInput = document.getElementById('exec-code');
const submitCodeBtn = document.getElementById('submit-code');
const errorMsg = document.getElementById('error-msg');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const sidebar = document.getElementById('sidebar');
const backToVaultBtn = document.getElementById('back-to-vault');

// Hardcoded login code
const EXEC_CODE = "1234"; // Change this to your desired code

// Add click event listeners to document list items
if (documentList) {
  documentList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const file = e.target.getAttribute('data-file');
      displayDocument(file, documentViewer, downloadBtn);
    }
  });
}

// Function to display the selected document
function displayDocument(file, viewer, btn) {
  // Clear the document viewer
  viewer.innerHTML = '';

  // Create an iframe to display the PDF
  const iframe = document.createElement('iframe');
  iframe.src = `documents/${file}`;
  iframe.width = '100%';
  iframe.height = '500px';
  viewer.appendChild(iframe);

  // Update the download button 
  btn.href = `documents/${file}`;
  btn.download = file;
  btn.style.display = 'inline-block'; // Show the download button
}

// Log Out Button (Redirect to index.html)
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirect to the main vault
  });
}

// Exec Documents Button
if (execDocsBtn) {
  execDocsBtn.addEventListener('click', () => {
    execLoginPopup.style.display = 'flex'; // Show the pop-up
  });
}

// Submit Code Button
if (submitCodeBtn) {
  submitCodeBtn.addEventListener('click', () => {
    const enteredCode = execCodeInput.value.trim();

    if (enteredCode === EXEC_CODE) {
      // Correct code - redirect to exec documents page
      window.location.href = 'exec-documents.html';
    } else {
      // Incorrect code - show error message
      errorMsg.textContent = 'Incorrect code. Please try again.';
    }
  });
}

// Close pop-up if user clicks outside of it
if (execLoginPopup) {
  window.addEventListener('click', (e) => {
    if (e.target === execLoginPopup) {
      execLoginPopup.style.display = 'none';
      errorMsg.textContent = ''; // Clear error message
    }
  });
}

// Mobile Menu Toggle
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// Back to Vault Button (Redirect to index.html)
if (backToVaultBtn) {
  backToVaultBtn.addEventListener('click', () => {
    window.location.href = 'vault.html'; // Redirect to the main vault
  });
}