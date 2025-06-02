document.addEventListener("DOMContentLoaded", function () {
    setupTitleAnimation();
    setupTheVowsAnimation();
    setupTheReceptionAnimation();
    setupSeeLocationButtonListener();
});

function setupTitleAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3
    });

    const page3Title = document.querySelector('.page-3-title');
    if (page3Title) {
        observer.observe(page3Title);
    }
}

function setupTheVowsAnimation() {
    const card = document.querySelector(".the-vows-content");
    const cardBody = document.querySelector(".the-vows-body-container");

    // Observer for card container
    const cardObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    card.classList.add("zoomed-in");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.4
        }
    );

    cardObserver.observe(card);

    // Observer for card body
    const bodyObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    cardBody.classList.add("zoomed-in");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.4
        }
    );

    bodyObserver.observe(cardBody);
}

function setupTheReceptionAnimation() {
    const card = document.querySelector(".the-reception-content");
    const cardBody = document.querySelector(".the-reception-body-container");

    // Observer for card container
    const cardObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    card.classList.add("zoomed-in");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.4
        }
    );

    cardObserver.observe(card);

    // Observer for card body
    const bodyObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    cardBody.classList.add("zoomed-in");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.4
        }
    );

    bodyObserver.observe(cardBody);
}

function setupImageBlurObserver() {
    const images = document.querySelectorAll('.the-vows-image, .the-reception-image');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('clear');
            } else {
                entry.target.classList.remove('clear');
            }
        });
    }, { threshold: 0.9 });

    images.forEach(img => observer.observe(img));
}
setupImageBlurObserver();

function setupSeeLocationButtonListener() {
    const vowsButton = document.querySelector(".the-vows-location-button");
    vowsButton.addEventListener('click', function (e) {
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=Hotel+Novotel+Tangerang&travelmode=driving`;
        window.open(mapsUrl, '_blank');
    });
    
    const receptionButton = document.querySelector(".the-reception-location-button");
    receptionButton.addEventListener('click', function (e) {
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=Hotel+Novotel+Tangerang&travelmode=driving`;
        window.open(mapsUrl, '_blank');
    });
}
