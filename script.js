// =============================
// DOM ready
// =============================
document.addEventListener('DOMContentLoaded', () => {
  init();
});

// =============================
// Init
// =============================
function init() {
  setupMobileMenu();
  setupSmoothScrolling();
  setupScrollAnimations();
  setupFormHandling();
  setupVideoBackground();
  setupActiveMenuHighlight();
}

// =============================
// Mobile menu
// =============================
function setupMobileMenu() {
  const toggleBtn = document.querySelector('.toggle-btn');
  const sidebar = document.querySelector('.sidebar');
  const body = document.body;

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      body.classList.toggle('menu-open');
    });
  }

  // Close on link click (mobile)
  const navLinks = document.querySelectorAll('.sidebar nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
  });
}

// =============================
// Smooth scrolling (with offset)
// =============================
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('.sidebar nav a, .cta-buttons a');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      e.preventDefault();

      const offset = 20; // small padding offset
      const targetPosition = targetSection.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update URL hash without jump
      history.pushState(null, '', targetId);
    });
  });
}

// =============================
// Scroll animations (IntersectionObserver)
// =============================
function setupScrollAnimations() {
  const sections = document.querySelectorAll('.section');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.25
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // no need to observe anymore once visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// =============================
// Contact form handling
// =============================
function setupFormHandling() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  let statusMessage = contactForm.querySelector('.form-status');
  if (!statusMessage) {
    statusMessage = document.createElement('p');
    statusMessage.className = 'form-status';
    contactForm.appendChild(statusMessage);
  }

  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]')?.value.trim();
    const email = contactForm.querySelector('input[type="email"]')?.value.trim();
    const message = contactForm.querySelector('textarea')?.value.trim();

    if (!name || !email || !message) {
      setStatus('Please fill in all fields', true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('Please enter a valid email address', true);
      return;
    }

    // Simulate successful submission
    setStatus('Thank you for your message! I will get back to you soon.', false);
    contactForm.reset();

    function setStatus(text, isError = false) {
      statusMessage.textContent = text;
      statusMessage.style.color = isError ? '#ff6b6b' : 'var(--secondary)';
    }
  });
}

// =============================
// Video background
// =============================
function setupVideoBackground() {
  const video = document.querySelector('.video-bg video');
  if (!video) return;

  // Ensure autoplay on mobile
  video.muted = true;
  video.playsInline = true;

  video.addEventListener('loadedmetadata', () => {
    const tryPlay = video.play();
    if (tryPlay && typeof tryPlay.catch === 'function') {
      tryPlay.catch(() => {
        // Autoplay blocked: keep overlay background as fallback
      });
    }
  });

  video.addEventListener('error', () => {
    const home = document.querySelector('.home-section');
    if (home) home.style.background = '#0a192f';
  });
}

// =============================
// Active menu highlight (debounced)
// =============================
function setupActiveMenuHighlight() {
  const highlight = () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.sidebar nav a');

    let currentSection = '';
    const scrollPos = window.scrollY;

    sections.forEach(section => {
      const top = section.offsetTop;
      if (scrollPos >= top - 200) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${currentSection}`;
      link.classList.toggle('active', isActive);
    });
  };

  const debounced = debounce(highlight, 60);
  window.addEventListener('scroll', debounced);
  window.addEventListener('resize', debounced);
  // Initial call
  highlight();
}

function debounce(func, wait = 20) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}
