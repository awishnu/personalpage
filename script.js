// Smooth scrolling
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('sidebar').classList.remove('open'); // close sidebar on mobile
  });
});

// Dark mode toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});
