// Toggle menu on mobile
document.querySelector('.toggle-btn').addEventListener('click', () => {
  document.querySelector('.sidebar nav ul').classList.toggle('show');
});

// Smooth scroll for navigation links
document.querySelectorAll('.sidebar nav ul li a, .cta-button').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    // Check if it's a valid section ID
    if (targetId.startsWith('#')) {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu after clicking a link
        if (window.innerWidth <= 768) {
          document.querySelector('.sidebar nav ul').classList.remove('show');
        }
      }
    }
  });
});

// Scroll-triggered fade-in for ALL sections
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const menu = document.querySelector('.sidebar nav ul');
  const toggleBtn = document.querySelector('.toggle-btn');
  
  if (menu.classList.contains('show') && 
      !menu.contains(e.target) && 
      !toggleBtn.contains(e.target) &&
      window.innerWidth <= 768) {
    menu.classList.remove('show');
  }
});

// Update active menu item on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.sidebar nav ul li a');
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
