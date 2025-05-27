document.addEventListener('DOMContentLoaded', () => {
    registerVowLocationButtonClickListener();
    registerReceptionLocationButtonClickListener();
});

function registerVowLocationButtonClickListener() {
    var btn = document.querySelector(".seeVowLocationButton");
    var modal = document.querySelector(".vowLocationInMaps");
    var closeBtn = modal ? modal.querySelector(".close1") : null;

    if (btn && modal) {
        btn.addEventListener('click', function () {
            modal.style.display = "block";
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = "none";
        });
    }
}

function registerReceptionLocationButtonClickListener() {
    var btn = document.querySelector(".seeReceptionLocationButton");
    var modal = document.querySelector(".receptionLocationInMaps");
    var closeBtn = modal ? modal.querySelector(".close2") : null;

    if (btn && modal) {
        btn.addEventListener('click', function () {
            modal.style.display = "block";
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = "none";
        });
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
