// Toggle menu on mobile
document.querySelector('.toggle-btn').addEventListener('click', () => {
    document.querySelector('.sidebar nav ul').classList.toggle('show');
});

// Smooth scroll for navigation links
document.querySelectorAll('.sidebar nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll-triggered fade-in for ALL sections
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of section is visible

    sections.forEach(section => {
        observer.observe(section);
    });
});
