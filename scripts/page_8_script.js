document.addEventListener("DOMContentLoaded", function () {
    setupBackgroundOverlay();
    setupPage8ZoomInAnimation();
});

function setupBackgroundOverlay() {
    const images = [
        'url("assets/splash.jpg")',
        'url("assets/aw.jpg")',
        'url("assets/bowarrow.jpg")',
        'url("assets/bowling.jpg")',
        'url("assets/cutngrilll.jpg")',
        'url("assets/gi.jpg")',
        'url("assets/roca1.jpg")',
        'url("assets/roca2.jpg")',
        'url("assets/tp.jpg")',
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
