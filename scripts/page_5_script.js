document.addEventListener("DOMContentLoaded", function () {
    setupPage5ZoomInAnimation();
    setupStaggeredZoomInAnimation();
    setupSendWishesButtonListener();
    setupUserInputListener();
});

function setupPage5ZoomInAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3
    });

    const page5Title = document.querySelector('.page-5-wishes-and-prayers-section-title');
    if (page5Title) {
        observer.observe(page5Title);
    }
}

function setupStaggeredZoomInAnimation() {
    const components = document.querySelectorAll(
        '.wish-and-pray-guest-name-input-label, .wish-and-pray-data-input-label, .wish-and-pray-input-field, .wish-and-pray-submit-button, .wish-and-pray-list-container'
    );
    if (!components.length) return;

    let hasTriggered = false;
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);

                // Trigger fetch only once
                if (!hasTriggered) {
                    hasTriggered = true;
                    fetchWishesAndDisplay();
                }
            }
        });
    }, {
        threshold: 0.3
    });

    components.forEach(component => observer.observe(component));
}

function fetchWishesAndDisplay() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            const wishes = response.data.slice(0, 10);
            const listContainer = document.querySelector('.wish-and-pray-list');
            const totalDataCounter = document.querySelector('.wish-and-pray-total-data');
            const listWrapper = document.querySelector('.wish-and-pray-list-container');

            listContainer.innerHTML = '';

            if (!wishes.length) {
                // No data: hide container and exit early
                listWrapper.style.display = 'none';
                return;
            }

            // If data exists: show the container
            listWrapper.style.display = 'flex';

            wishes.forEach((wish, index) => {
                const item = document.createElement('div');
                item.classList.add('wish-list-item');
                item.innerHTML = `
                    <h4 style="margin-bottom: 5px; font-size: 14px; padding-top: 5px;">${wish.title}</h4>
                    <p style="margin: 0 0 10px; font-size: 12px;">${wish.body}</p>
                    <hr style="border: none; border-top: 1px solid #ccc; margin-bottom: 10px;" />
                `;
                listContainer.appendChild(item);
            });

            totalDataCounter.textContent = `${wishes.length} wishes`;

            listContainer.classList.remove('hidden');

            observeWishItems(); // Animation observer
        })
        .catch(error => {
            console.error('Error fetching wishes:', error);

            // Optionally hide container on error too
            const listWrapper = document.querySelector('.wish-and-pray-list-container');
            if (listWrapper) listWrapper.style.display = 'none';
        });
}

function observeWishItems() {
    const items = document.querySelectorAll('.wish-list-item');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Optional: stop observing once animated
            }
        });
    }, {
        threshold: 0.1
    });

    items.forEach(item => observer.observe(item));
}

function setupSendWishesButtonListener() {
    const sendButton = document.querySelector('.wish-and-pray-submit-button');
    if (sendButton) {
        sendButton.addEventListener('click', handleSendWishes);
    }
}

document.querySelector('.wish-and-pray-submit-button').addEventListener('click', handleSendWishes);

function handleSendWishes() {
    const name = document.querySelector('#wish-and-pray-guest-name').value.trim();
    const message = document.querySelector('#wish-and-pray-text-area').value.trim();
    const feedback = document.querySelector('#wish-and-pray-message');
    const button = document.querySelector('.wish-and-pray-submit-button');

    feedback.textContent = '';
    feedback.classList.remove('success');

    if (!name || !message) {
        feedback.textContent = 'Please fill in both name and message.';
        return;
    }

    // Start loading
    button.classList.add('wish-and-pray-loading');
    button.disabled = true;

    axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: name,
            body: message,
            userId: 1,
        })
        .then(() => {
            feedback.textContent = 'Wish sent successfully!';
            feedback.classList.add('success');
            document.querySelector('#wish-and-pray-guest-name').value = '';
            document.querySelector('#wish-and-pray-text-area').value = '';

            fetchWishesAndDisplay();
        })
        .catch(() => {
            feedback.textContent = 'Failed to send wishes. Please try again.';
        })
        .finally(() => {
            // End loading
            button.classList.remove('wish-and-pray-loading');
            button.disabled = false;
        });
}

function setupUserInputListener() {
    const messageDiv = document.querySelector('#wish-and-pray-message');
    const inputs = document.querySelectorAll('.wish-and-pray-input-field');

    if (!messageDiv || inputs.length === 0) return;

    // Hide message div if empty initially (just in case)
    if (messageDiv.textContent.trim() === '') {
        messageDiv.style.display = 'none';
    }

    // Show/hide message div based on content changes
    const observer = new MutationObserver(() => {
        if (messageDiv.textContent.trim() === '') {
            messageDiv.style.display = 'none';
        } else {
            messageDiv.style.display = 'block';
        }
    });
    observer.observe(messageDiv, {
        childList: true,
        subtree: true
    });

    // Add input event listener to all inputs and textarea with class .wish-and-pray-input-field
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (messageDiv.style.display !== 'none') {
                messageDiv.style.display = 'none';
                messageDiv.textContent = '';
                messageDiv.classList.remove('success');
            }
        });
    });
}