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

// Scroll-triggered fade-in for About Me section
document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector('.about-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add('visible');
                observer.unobserve(aboutSection); // Stop observing after animation
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% is visible

    observer.observe(aboutSection);
});
