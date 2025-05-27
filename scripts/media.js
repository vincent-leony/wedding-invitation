document.addEventListener('DOMContentLoaded', () => {
    const prewedVideo = document.querySelector('.prewedVideo');
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
});

// Music indicator
var lottieAnimation = bodymovin.loadAnimation({
    container: document.getElementById('musicAnimation'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'animations/music_icon.json'
});
var audio = document.getElementById('musicFile');
var coverMusic = document.getElementById('musicCover');
var overlaypaused = document.getElementById('overlaypausedmusic');

document.getElementById('openInvitation').addEventListener('click', function () {
    lottieAnimation.play();
    audio.volume = 1;
    audio.loop = true;
    audio.play();
    coverMusic.style.animationPlayState = "running";
    jQuery('.musicContainer').show();
});

document.getElementById('musicCover').addEventListener('click', function () {
    if (lottieAnimation.isPaused) {
        lottieAnimation.play();
        audio.play();
        coverMusic.style.animationPlayState = "running";
        jQuery('#overlaypausedmusic').fadeOut();
    } else {
        lottieAnimation.stop();
        audio.pause();
        coverMusic.style.animationPlayState = "paused";
        jQuery('#overlaypausedmusic').fadeIn();
    }
});
