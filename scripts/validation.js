// RSPV Form
const form = document.getElementById('rspvForm');
const guestNameInput = form.querySelector('#guestName');
const totalGuestsInput = form.querySelector('#totalGuests');
const attendanceSelect = form.querySelector('#attendanceConfirmation');
const totalGuestsLabel = form.querySelector('.totalGuestsLabel');
const totalGuestsContainer = document.querySelector('.rspvTotalGuestsContainer');
const totalGuestsInputContainer = totalGuestsInput.parentElement;
const submitButton = document.getElementById('rspvSubmitButton');
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

submitButton.addEventListener('click', (e) => {
    e.preventDefault(); // prevent form submission or page reload
    // Validate guest name input
    const guestNameError = guestNameInput.nextElementSibling; // the error div after input
    if (guestNameInput.value.trim() === '') {
        guestNameInput.classList.add('error');
        guestNameError.style.display = 'block';
    } else {
        guestNameInput.classList.remove('error');
        guestNameError.style.display = 'none';
    }
    
    // Validate total guests input
    const totalGuestsError = totalGuestsInput.nextElementSibling; // the error div after input
    const numberValue = Number(totalGuestsInput.value);
    if (totalGuestsContainer.style.display !== 'none' && !Number.isInteger(numberValue)) {
        totalGuestsInput.classList.add('error');
        totalGuestsError.style.display = 'block';
    } else {
        totalGuestsInput.classList.remove('error');
        totalGuestsError.style.display = 'none';
    }
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

// Listen for dropdown changes
attendanceSelect.addEventListener('change', toggleTotalGuestsVisibility);

// Trigger once on page load (in case there's a default selected)
toggleTotalGuestsVisibility();
// End RSPV Form
