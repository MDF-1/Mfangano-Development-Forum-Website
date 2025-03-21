(function () {
  // Hero Slider Functionality
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  if (nextButton && prevButton) {
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
  }

  // Auto-slide every 5 seconds
  let autoSlideInterval;
  if (slider) {
    autoSlideInterval = setInterval(nextSlide, 5000);

    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(nextSlide, 5000);
    });
  }

  // Gallery Filtering
  const filters = document.querySelectorAll('.filters button');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filters.length > 0 && galleryItems.length > 0) {
    filters.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Remove active class from all buttons
        filters.forEach(btn => btn.classList.remove('active'));

        // Add active class to the clicked button
        button.classList.add('active');

        // Filter gallery items
        galleryItems.forEach(item => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
})();