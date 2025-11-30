document.addEventListener("DOMContentLoaded", function () {
    setupPage7ZoomInAnimation();
    // loadPrewedVideo();
});

function setupPage7ZoomInAnimation() {
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
        '.page-7-title, .page-7-subtitle, .prewed-video, .staggered-grid img'
    );
    if (components) {
        components.forEach(component => observer.observe(component));
    }
}

// Lazy load iframe
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const iframe = document.createElement("iframe");
            iframe.src = entry.target.dataset.src;

            entry.target.appendChild(iframe);
            observer.unobserve(entry.target);
        }
    });
});

const lazyLoadMapElements = document.querySelectorAll(".lazy-load-iframe");
lazyLoadMapElements.forEach((element) => {
    observer.observe(element);
});

document.addEventListener("touchstart", touchStartHandler, {
    passive: true
});

document.addEventListener("touchmove", touchMoveHandler, {
    passive: true
});

document.addEventListener("wheel", wheelHandler, {
    passive: true
});

function touchStartHandler(e) {
    // You can add your touch start logic here, or leave empty
}

function touchMoveHandler(e) {
    // You can add your touch move logic here, or leave empty
}

function wheelHandler(e) {
    // You can add your wheel event logic here, or leave empty
}

// Prewed video
function loadPrewedVideo() {
    const prewedVideo = document.querySelector('.prewed-video');
    if (!prewedVideo) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing after animation triggered
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of element visible
    });

    observer.observe(prewedVideo);
}
// End prewed video

// Carousel
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll('.staggered-grid img');
    lazyImages.forEach(img => {
        img.loading = "lazy";
    });

    // Lightbox elements
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImage = lightboxOverlay.querySelector('img');
    const lightboxClose = document.getElementById('lightboxClose');

    const container = document.querySelector('.staggered-grid');
    // Open lightbox when image clicked
    container.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            lightboxImage.src = e.target.src;
            lightboxOverlay.style.display = 'flex';
            // Optional: pause auto-scroll when lightbox open
            isUserScrolling = true;
        }
    });

    // Close lightbox on close button click
    lightboxClose.addEventListener('click', () => {
        lightboxOverlay.style.display = 'none';
        isUserScrolling = false; // Resume auto-scroll
    });

    // Also close lightbox if user clicks outside the image
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.style.display = 'none';
            isUserScrolling = false;
        }
    });

    // Optional: close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay.style.display === 'flex') {
            lightboxOverlay.style.display = 'none';
            isUserScrolling = false;
        }
    });
});
// End carousel
