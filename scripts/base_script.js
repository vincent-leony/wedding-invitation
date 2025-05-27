document.addEventListener('DOMContentLoaded', () => {
    setGuestName();
    applyJourneyAnimation();
    applyIbanAnimation();
});

// Read guestName from query parameter
function setGuestName() {
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get('guestName');

    if (guestName) {
        const guestElements = document.querySelectorAll('.guestName');
        guestElements.forEach(element => {
            element.textContent = guestName;
        });
    }
}

function applyJourneyAnimation() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    applyOnScrollAnimation(animatedElements)
}

function applyIbanAnimation() {
    const animatedElements = document.querySelectorAll('.iban-on-scroll');
    applyOnScrollAnimation(animatedElements)
}

function applyOnScrollAnimation(elements) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Animate in
            } else {
                entry.target.classList.remove('visible'); // Animate out
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
}

jQuery(document).ready(function ($) {
    $('#openInvitation').on('click', function () {
        $('html, body').scrollTop(0);
        $('.delay').removeClass('delay');

        $('.main_cover').fadeOut('slow', function () {
            $('html, body').animate({
                scrollTop: $('.main_intro').offset().top
            }, 1000, function () {
                $('body').css('overflow', 'auto');
            });
        });
    });
});

// Optimization
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

if (window.CSS?.supports?.('(font:-apple-system-body) and (-webkit-touch-callout:none) and (-webkit-tap-highlight-color:hotpink)')) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport !== null) {
        viewport.content = `${viewport.content},user-scalable=no`;
    }
}
// End optimization

// Disable code inspection
if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function () {
        window.event.returnValue = false;
    });
}

document.onkeydown = function (e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && (e.which === 73 || e.which === 74)) {
        e.preventDefault();
    }
    if (e.which === 123) {
        e.preventDefault();
    }
}
// End disable code inspection


