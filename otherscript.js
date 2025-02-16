// Counter Animation
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // Animation duration in milliseconds
    const step = target / (duration / 16); // 60 FPS
    let current = 0;
  
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
  
    updateCounter();
  }
  
  // Initialize counters when they come into view
  const counters = document.querySelectorAll('.counter');
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => counterObserver.observe(counter));
  
// Testimonials Slider
const testimonials = document.querySelectorAll('.testimonial-card');
const prevButton = document.querySelector('.prev-testimonial');
const nextButton = document.querySelector('.next-testimonial');
let currentTestimonial = 0;
let autoSlide;

// Ensure there are testimonials before running the script
if (testimonials.length > 0) {
    // Show the first testimonial on page load
    showTestimonial(currentTestimonial);

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
        resetAutoSlide();
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
        resetAutoSlide();
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevTestimonial);
        nextButton.addEventListener('click', nextTestimonial);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextTestimonial, 5000);
    }

    // Start auto-slide
    autoSlide = setInterval(nextTestimonial, 5000);
}

  
  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Parallax Effect
  function parallax() {
    const parallaxSections = document.querySelectorAll('.featured-story, .get-involved, .testimonials');
    
    window.addEventListener('scroll', () => {
      parallaxSections.forEach(section => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        section.style.backgroundPositionY = `${rate}px`;
      });
    });
  }
  
  // Form Submissions
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Add form submission logic here
      const formData = new FormData(form);
      console.log('Form submitted:', Object.fromEntries(formData));
      form.reset();
    });
  });
  
  // Initialize all functions
  document.addEventListener('DOMContentLoaded', () => {
    // Previous navigation initialization remains unchanged
    parallax();
  });
  
  // Dynamic Content Loading
  function loadContent(section) {
    const mainContent = document.querySelector('main');
    // Simulate content loading
    mainContent.style.opacity = '0';
    
    setTimeout(() => {
      // Update content based on section
      mainContent.innerHTML = `<h2>${section}</h2><p>Content for ${section}</p>`;
      mainContent.style.opacity = '1';
    }, 300);
  }
  
  // Add this to your existing navigation click handlers
  document.querySelectorAll('.nav-item, .mega-menu-link').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const section = e.target.textContent.trim();
      loadContent(section);
    });
  });
  
  // Intersection Observer for fade-in animations
  const fadeElements = document.querySelectorAll('.news-card, .involvement-card, .story-content');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  fadeElements.forEach(element => fadeObserver.observe(element));