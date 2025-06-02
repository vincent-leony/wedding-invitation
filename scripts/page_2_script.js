document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const heading = entry.target;
                heading.classList.add('animate');
                heading.querySelector('.page-2-title')?.classList.add('animate');
                heading.querySelector('.page-2-couple-name')?.classList.add('animate');
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% is visible
    });

    const headingElement = document.querySelector('.page-2-heading');
    if (headingElement) {
        observer.observe(headingElement);
    }
});

// Countdown timer
const Days = document.getElementById('days');
const Hours = document.getElementById('hours');
const Minutes = document.getElementById('minutes');
const Seconds = document.getElementById('seconds');

const targetDate = new Date("April 25 2026 00:00:00").getTime();
const secondInMillis = 1000;
const minuteInMillis = 60 * secondInMillis;
const hourInMillis = 60 * minuteInMillis;
const dayInMillis = 24 * hourInMillis;

function timer() {
    const currentDate = new Date().getTime();
    const remainingDate = targetDate - currentDate;

    const days = Math.floor(remainingDate / dayInMillis);
    const hours = Math.floor(remainingDate / hourInMillis) % 24;
    const minutes = Math.floor(remainingDate / minuteInMillis) % 60;
    const seconds = Math.floor(remainingDate / secondInMillis) % 60;

    Days.innerHTML = days;
    Hours.innerHTML = hours;
    Minutes.innerHTML = minutes;
    Seconds.innerHTML = seconds;
}
setInterval(timer, 1000);
// End countdown timer

document.addEventListener('DOMContentLoaded', function () {
    setupCalendar();
    setupSetReminderEvent();
});

// Calendar
function setupCalendar() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadCalendar(); // Inject calendar content
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Only run once
            }
        });
    }, {
        rootMargin: '0px 0px -20% 0px', // Trigger just before it's fully in view
        threshold: 0.1
    });

    const calendarContainer = document.getElementById('lazy-calendar-container');
    observer.observe(calendarContainer);

    function loadCalendar() {
        const calendarHTML = `
            <div class="calendar-wrapper">
                <h2 id="calendar-month-year" class="calendar-heading">April 2026</h2>
                <div class="calendar-grid" id="calendar-grid">
                    <div class="calendar-day-name">Sun</div>
                    <div class="calendar-day-name">Mon</div>
                    <div class="calendar-day-name">Tue</div>
                    <div class="calendar-day-name">Wed</div>
                    <div class="calendar-day-name">Thu</div>
                    <div class="calendar-day-name">Fri</div>
                    <div class="calendar-day-name">Sat</div>
                    <!-- Days will be appended here -->
                </div>
            </div>
        `;
        calendarContainer.innerHTML = calendarHTML;
        generateCalendar(2026, 3); // July 2025
    }

    function generateCalendar(year, month) {
        const calendarGrid = document.getElementById('calendar-grid');

        // Clear any previous days (keep day names intact)
        // Remove all except first 7 children (the day names)
        while (calendarGrid.children.length > 7) {
            calendarGrid.removeChild(calendarGrid.lastChild);
        }

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add empty slots before the first day
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.className = "calendar-day empty";
            calendarGrid.appendChild(emptyCell);
        }

        for (let date = 1; date <= daysInMonth; date++) {
            const dayCell = document.createElement("div");
            dayCell.className = "calendar-day";
            dayCell.textContent = date;

            if (date === 25) {
                dayCell.classList.add("highlight");
            }

            calendarGrid.appendChild(dayCell);
        }
    }
}
// End calendar

// Set reminder
function setupSetReminderEvent() {
    const reminderWrapper = document.getElementById('reminder-button-wrapper');
    if (reminderWrapper) {
        const reminderObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    reminderObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -20% 0px',
            threshold: 0.1
        });

        reminderObserver.observe(reminderWrapper);
    }

    document.addEventListener('click', function (e) {
        if (e.target.id === 'set-reminder-button') {
            const title = encodeURIComponent("Vincent & Leony's Wedding");
            const details = encodeURIComponent("Join us to celebrate this special day!");
            const location = encodeURIComponent("Wedding Venue, Jakarta");
            const startDate = "20260425T100000Z"; // 25 April 2026, 10 AM UTC => 17.00
            const endDate = "20260425T140000Z"; // 2 PM UTC => 21.00

            const calendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`;

            window.open(calendarUrl, '_blank');
        }
    });
}
// End set reminder

// Individual introduction
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains("individual-introduction-and-text")) {
                    entry.target.classList.add("animate");
                } else {
                    entry.target.classList.add("visible");
                }
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.3
    });

    const elements = document.querySelectorAll(
        ".slide-left-fade-in, .slide-right-fade-in, .individual-introduction-and-text"
    );
    elements.forEach((el, index) => {
        const delayClass = `delay-1`; // delay 1 s
        el.classList.add(delayClass);
        observer.observe(el);
    });

    // Click listeners
    const brideButton = document.querySelector(".bride-button");
    brideButton.addEventListener("click", function () {
        window.location.href = "https://www.instagram.com/leony.ah";
    });
    const groomButton = document.querySelector(".groom-button");
    groomButton.addEventListener("click", function () {
        window.location.href = "https://www.instagram.com/vincent_a.p";
    });
});
// End individual introduction