const openInvitationButton = document.getElementById('open-invitation-button');
const introSection = document.getElementById('intro');
const musicToggle = document.getElementById('musicToggle');
const music = document.getElementById('background-music');
const musicPlayer = document.getElementById('music-player');
const mainContent = document.getElementById('main-content');
let isMusicManuallyPaused = false;

openInvitationButton.addEventListener('click', () => {
    // Start fade-out animation for intro
    introSection.classList.add('fade-out');

    // Wait for fade-out transition to finish (1s)
    setTimeout(() => {
        // Hide intro and unlock scrolling
        introSection.style.display = 'none';
        document.body.classList.remove('locked');
        document.body.classList.add('unlocked');

        // Fade-in main content
        mainContent.classList.add('visible');
        document.querySelector('.page-1-couple-name').classList.add('animate');
        document.querySelector('.page-1-bible-container').classList.add('animate');

        const curveDivider = document.querySelector('.curve-divider');
        // Trigger its animation
        if (curveDivider) {
            curveDivider.classList.add('animate-in');
        }

        // Show music player
        musicPlayer.style.display = 'block';

        // Play music, add animation on success
        music.play().then(() => {
            musicPlayer.classList.add('playing');
            musicToggle.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
        }).catch((err) => {
            console.error('Music playback failed:', err);
        });
    }, 800);
});

musicToggle.addEventListener('click', () => {
    if (music.paused) {
        music.play().then(() => {
            musicPlayer.classList.add('playing');
            musicToggle.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
            // musicToggle.textContent = '⏸️';
        });
    } else {
        music.pause();
        musicPlayer.classList.remove('playing');
        musicToggle.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
        isMusicManuallyPaused = true;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const indicator = document.querySelector('.scroll-down-indicator');

    if (!indicator) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            indicator.classList.add('hidden'); // for smooth fade
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const indicator = document.querySelector('.scroll-down-indicator');
    if (!indicator) return;

    // Show indicator initially (remove hidden if present)
    indicator.classList.remove('hidden');

    // Function to hide indicator permanently
    function hideIndicator() {
        indicator.classList.add('hidden');
        window.removeEventListener('scroll', onScroll);
    }

    // Scroll listener
    function onScroll() {
        if (window.scrollY > 50) {
            hideIndicator();
        }
    }
    window.addEventListener('scroll', onScroll);

    // Click listener
    indicator.addEventListener('click', () => {
        const nextPage = document.querySelector('.page.page-2');
        if (nextPage) {
            nextPage.scrollIntoView({
                behavior: 'smooth'
            });
        }
        hideIndicator();
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');

    // Wait until the metadata is loaded so duration and currentTime are accessible
    audio.addEventListener('loadedmetadata', () => {
        audio.currentTime = 4.1;
        audio.play();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            music.pause();
            musicPlayer.classList.remove('playing');
            musicToggle.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
        } else {
            if(!isMusicManuallyPaused) {
                music.play().then(() => {
                    musicPlayer.classList.add('playing');
                    musicToggle.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
                    // musicToggle.textContent = '⏸️';
                });
            }
        }
    });
});
