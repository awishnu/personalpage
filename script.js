// Toggle menu on mobile
document.querySelector('.toggle-btn').addEventListener('click', () => {
    document.querySelector('.sidebar nav ul').classList.toggle('show');
});

// Smooth scroll
document.querySelectorAll('.sidebar nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});
