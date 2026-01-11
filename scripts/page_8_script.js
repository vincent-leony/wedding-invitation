document.addEventListener("DOMContentLoaded", function () {
    setupBackgroundOverlay();
    setupPage8ZoomInAnimation();
});

function setupBackgroundOverlay() {
    const images = [
        'url("assets/splash.jpg")',
        'url("assets/00011.jpg")',
        'url("assets/00017.jpg")',
        'url("assets/00054.jpg")',
        'url("assets/00055.jpg")',
        'url("assets/00114.jpg")',
        'url("assets/00117.jpg")',
        'url("assets/00122.jpg")',
        'url("assets/00147.jpg")',
        'url("assets/00154.jpg")',
        'url("assets/00174.jpg")',
        'url("assets/00192.jpg")',
        'url("assets/00212.jpg")',
        'url("assets/00246.jpg")',
        'url("assets/00254.jpg")',
        'url("assets/00351.jpg")',
        // 'url("assets/00377.jpg")',
        'url("assets/00427.jpg")',
        'url("assets/00455.jpg")',
        'url("assets/00472.jpg")',
        'url("assets/00571.jpg")',
        'url("assets/00599.jpg")',
        'url("assets/00630.jpg")',
        'url("assets/00643.jpg")',
        'url("assets/00647.jpg")',
        'url("assets/00134.jpg")',
    ];

    let current = 0;
    const section = document.querySelector('.page-8');

    function changeBackground() {
        section.style.backgroundImage = images[current];
        current = (current + 1) % images.length;
    }

    changeBackground();
    setInterval(changeBackground, 3000);
}

function setupPage8ZoomInAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3
    });

    const components = document.querySelectorAll(
        '.page-8-title, .page-8-subtitle-text, .page-8-date-section'
    );
    if (components) {
        components.forEach(component => observer.observe(component));
    }
}
