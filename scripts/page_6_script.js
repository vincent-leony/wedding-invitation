document.addEventListener("DOMContentLoaded", function () {
    validatePage6Visibility();
    setupPage6ZoomInAnimation();
});

function validatePage6Visibility() {
    const specialGuests = ["john", "maria", "vip01", "guest88"];
    const currGuestName = window.guestNameValue;
    if (
        currGuestName &&
        specialGuests.includes(currGuestName.toLowerCase())
    ) {
        const page3 = document.querySelector(".page-3");
        if (page3) page3.style.display = "none";
    }
}

function setupPage6ZoomInAnimation() {
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
        '.page-6-title, .page-6-header, .page-6-iban-container, .page-6-content-gift-delivery-title, .page-6-content-gift-delivery-address, .page-6-content-gift-delivery-receiver-name, .page-6-content-gift-delivery-receiver-number, .page-6-content-gift-delivery-confirm-button'
    );
    if (components) {
        components.forEach(component => observer.observe(component));
    }
}

// Clipboard
function copyToClipboard() {
    const text = "123456789";
    if (navigator.clipboard && navigator.clipboard.writeText) {
        // Modern browser
        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Copied to clipboard!");
            })
            .catch(err => {
                console.error("Clipboard API failed, using fallback:", err);
                fallbackCopyToClipboard(text);
            });
    } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    // Prevent scrolling to bottom
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        const success = document.execCommand("copy");
        if (success) {
            alert("Copied to clipboard!");
        } else {
            alert("Failed to copy.");
        }
    } catch (err) {
        console.error("Fallback copy failed:", err);
        alert("Browser not supported.");
    }

    document.body.removeChild(textarea);
}
// End CLipboard

// Gift delivery confirmation
function openWhatsApp() {
    const phoneNumber = '6281234567890'; // use actual number
    const message = 'Hello, I would like to confirm gift delivery.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
// End gift delivery confirmation
