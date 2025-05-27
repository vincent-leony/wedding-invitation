const elements = document.querySelectorAll('.blur-image');
const maxBlur = 10;

function updateBlurOnScroll() {
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const visibleHeight = Math.min(rect.bottom + 50, windowHeight) - Math.max(rect.top + 50, 0);
        const totalHeight = rect.height;

        const visibilityRatio = Math.max(0, Math.min(visibleHeight / totalHeight, 1));
        const blurAmount = (1 - visibilityRatio) * maxBlur;

        el.style.filter = `blur(${blurAmount}px)`;
    });
}

window.addEventListener('scroll', updateBlurOnScroll);
window.addEventListener('resize', updateBlurOnScroll);
updateBlurOnScroll(); // Initial call
