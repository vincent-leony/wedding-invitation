let prefetchedQRImage = "";

document.addEventListener("DOMContentLoaded", function () {
    setupZoomInAnimation();
    applyJourneyAnimation();
    // prefetchQRCode();
});

function setupZoomInAnimation() {
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
        '.page-4-title, .attendance-confirmation-description, .attendance-confirmation-form-container, .page-4-journey-section-title'
    );
    if (components) {
        components.forEach(component => observer.observe(component));
    }
}

// RSPV Form
const form = document.getElementById('rspv-form');
const guestNameInput = form.querySelector('#rspv-guest-name');
const totalGuestsInput = form.querySelector('#total-guests');
const attendanceSelect = form.querySelector('#attendance-confirmation');
const totalGuestsLabel = form.querySelector('.total-guests-label');
const totalGuestsContainer = document.querySelector('.rspv-total-guests-container');
const totalGuestsInputContainer = totalGuestsInput.parentElement;
const rspvSubmitButton = document.getElementById('rspv-submit-button');
const rspvFormInputs = [guestNameInput, totalGuestsInput];

// Toggle visibility of total guests based on attendance value
function toggleTotalGuestsVisibility() {
    const isPresent = attendanceSelect.value === 'Present';
    if (isPresent) {
        totalGuestsContainer.classList.add('show');
    } else {
        totalGuestsContainer.classList.remove('show');
        totalGuestsInput.classList.remove('error');
        totalGuestsInput.nextElementSibling.style.display = 'none';
        totalGuestsInput.value = 1;
    }
}

rspvSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    let hasError = false;
    let isAbsent = false;

    const guestNameError = guestNameInput.nextElementSibling;
    if (guestNameInput.value.trim() === '') {
        guestNameInput.classList.add('error');
        guestNameError.style.display = 'block';
        hasError = true;
    } else {
        guestNameInput.classList.remove('error');
        guestNameError.style.display = 'none';
    }

    const totalGuestsError = totalGuestsInput.nextElementSibling;
    const numberValue = Number(totalGuestsInput.value);
    const isPresent = attendanceSelect.value === 'Present';
    let totalAttendees = 0;
    if (isPresent && (!Number.isInteger(numberValue) || numberValue <= 0)) {
        totalGuestsInput.classList.add('error');
        totalGuestsError.style.display = 'block';
        hasError = true;
    } else if (attendanceSelect.value === 'Select') {
        const attendanceSelectError = document.querySelector('.rspv-attendance-confirmation-error-message');
        attendanceSelect.classList.add('error');
        attendanceSelectError.style.display = 'block';
        hasError = true;
    } else {
        if (attendanceSelect.value === 'Absent') {
            isAbsent = true;
        } else {
            totalAttendees = totalGuestsInput.value;
            totalGuestsInput.classList.remove('error');
            totalGuestsError.style.display = 'none';
        }
    }

    if (hasError) return;

    // Show loading indicator
    const submitButton = document.getElementById('rspv-submit-button');
    const buttonContent = submitButton.querySelector('.button-content');
    const buttonSpinner = document.getElementById('button-loading-spinner');

    buttonContent.style.display = 'none';
    buttonSpinner.style.display = 'inline-block';
    document.getElementById('loading-blocker').style.display = 'block';

    const formContainer = document.querySelector('.attendance-confirmation-form-container');
    const description = document.querySelector('.attendance-confirmation-description');

    // API Call
    axios.post('https://teal-creponne-1bac93.netlify.app/.netlify/functions/attendance_confirmation', {
            attendeeName: guestNameInput.value,
            confirmation: attendanceSelect.value,
            totalAttendees: numberValue
        }).then(response => {
            // Fade out form and description
            if (!isAbsent) {
                formContainer.classList.add('fade-out');
                description.classList.add('fade-out');

                // Wait for fade out to complete
                setTimeout(() => {
                    formContainer.style.display = 'none';
                    description.style.display = 'none';

                    // Show thank-you message
                    const messageContainer = document.getElementById("confirmation-message");
                    messageContainer.style.display = 'flex';
                    messageContainer.classList.add('fade-in');

                    buttonContent.style.display = 'flex';
                    buttonSpinner.style.display = 'none';
                    document.getElementById('loading-blocker').style.display = 'none';
                }, 2000); // 1s fade duration
            } else {
                buttonContent.style.display = 'flex';
                buttonSpinner.style.display = 'none';
                document.getElementById('loading-blocker').style.display = 'none';
                guestNameInput.value = "";
                attendanceSelect.value = "Select";
                totalGuestsInput.value = "1";
                toggleTotalGuestsVisibility();
            }
        })
        .catch(error => {
            console.error('API error:', error);
            buttonContent.style.display = 'flex';
            buttonSpinner.style.display = 'none';
            document.getElementById('loading-blocker').style.display = 'none';
        });
});

rspvFormInputs.forEach(input => {
    input.addEventListener('input', () => {
        const error = input.nextElementSibling;
        if (input.value.trim() !== '') {
            input.classList.remove('error');
            error.style.display = 'none';
        }
    });
});

attendanceSelect.addEventListener('change', () => {
    const attendanceSelectError = document.querySelector('.rspv-attendance-confirmation-error-message');
    if (attendanceSelect.value !== 'Select') {
        attendanceSelect.classList.remove('error');
        attendanceSelectError.style.display = 'none';
    }
});
// Listen for dropdown changes
attendanceSelect.addEventListener('change', toggleTotalGuestsVisibility);
// Trigger once on page load (in case there's a default selected)
toggleTotalGuestsVisibility();
// End RSPV Form

// QR Code
function prefetchQRCode() {
    const qrText = window.guestNameValue;
    const qrImageUrl = "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png";
    const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(qrText)}&centerImageUrl=${encodeURIComponent(qrImageUrl)}&size=200`;
    // Prefetch the image
    const prefetchImage = new Image();
    prefetchImage.src = qrUrl;
    prefetchedQRImage = prefetchImage.src;
}
// End QR Code

// Journey
function applyJourneyAnimation() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
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

    animatedElements.forEach(el => observer.observe(el));
}
// End Journey