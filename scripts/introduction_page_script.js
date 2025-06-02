document.addEventListener('DOMContentLoaded', () => {
    showLoading();
    setGuestName();
});

function showLoading() {
    const loader = document.getElementById('intro-loading');
    const introContent = document.getElementById('intro-content');

    // Simulate a loading delay (e.g., assets or music preload)
    setTimeout(() => {
        loader.style.display = 'none';
        introContent.style.display = 'contents'; // or "block" if contents doesn't suit your layout
    }, 3000); // 3s delay
}

function setGuestName() {
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get('guestName');

    if (guestName) {
        const guestElements = document.querySelectorAll('.guest-name');
        guestElements.forEach(element => {
            element.textContent = guestName;
        });
        // window.guestNameValue = guestName;
    }
}
