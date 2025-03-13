// JavaScript for Carousel
let currentIndex = 0;
const carouselInner = document.querySelector('.carousel-inner');
const totalItems = document.querySelectorAll('.carousel-item').length;

document.querySelector('.carousel-next').addEventListener('click', () => {
  if (currentIndex < totalItems - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
});

document.querySelector('.carousel-prev').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalItems - 1;
  }
  updateCarousel();
});

function updateCarousel() {
  const offset = -currentIndex * 100;
  carouselInner.style.transform = `translateX(${offset}%)`;
}