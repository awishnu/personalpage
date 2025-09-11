\// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the page
  init();
});

// Initialize the application
function init() {
  // Set up mobile menu toggle
  setupMobileMenu();
  
  // Set up smooth scrolling for navigation links
  setupSmoothScrolling();
  
  // Set up scroll animations for sections
  setupScrollAnimations();
  
  // Set up form submission handling
  setupFormHandling();
  
  // Set up video background
  setupVideoBackground();
}

// Mobile menu functionality
function setupMobileMenu() {
  const toggleBtn = document.querySelector('.toggle-btn');
  const sidebar = document.querySelector('.sidebar');
  const body = document.body;
  
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      body.classList.toggle('menu-open');
    });
  }
  
  // Close menu when clicking on a link (for mobile)
  const navLinks = document.querySelectorAll('.sidebar nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
  });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('.sidebar nav a, .cta-buttons a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          // Calculate the position to scroll to
          const targetPosition = targetSection.offsetTop;
          
          // Smooth scroll to the target section
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Scroll animations for sections
function setupScrollAnimations() {
  const sections = document.querySelectorAll('.section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };
  
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe each section
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Form submission handling
function setupFormHandling() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const message = contactForm.querySelector('textarea').value;
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // In a real application, you would send the form data to a server here
      // For this example, we'll just show a success message
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
}

// Video background loading handler
function setupVideoBackground() {
  const video = document.querySelector('.video-bg video');
  
  if (video) {
    // Ensure video plays correctly on mobile devices
    video.addEventListener('loadedmetadata', function() {
      video.play();
    });
    
    // Fallback if video fails to load
    video.addEventListener('error', function() {
      console.error('Video failed to load, using fallback background');
      document.querySelector('.home-section').style.background = '#0a192f';
    });
  }
}

// Highlight active menu item on scroll
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.sidebar nav a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});
