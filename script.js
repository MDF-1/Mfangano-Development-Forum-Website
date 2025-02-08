function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const dropdown = document.querySelector('.full-dropdown');
    navLinks.classList.toggle('active');
    dropdown.classList.toggle('active');
}





// Toggle Read More Functionality
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const cardContent = button.closest('.card-content');
        const fullInfo = cardContent.querySelector('.full-info');
        fullInfo.style.display = fullInfo.style.display === 'block' ? 'none' : 'block';
        button.textContent = fullInfo.style.display === 'block' ? 'Read Less' : 'Read More';
    });
});

// Close Full Info When Clicking Outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.card-content')) {
        document.querySelectorAll('.full-info').forEach(info => {
            info.style.display = 'none';
        });
        document.querySelectorAll('.read-more').forEach(button => {
            button.textContent = 'Read More';
        });
    }
});

// Toggle Menu Functionality
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const dropdown = document.querySelector('.full-dropdown');
    navLinks.classList.toggle('active');
    dropdown.classList.toggle('active');
}