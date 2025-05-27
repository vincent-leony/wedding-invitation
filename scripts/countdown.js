const Days = document.getElementById('days');
const Hours = document.getElementById('hours');
const Minutes = document.getElementById('minutes');
const Seconds = document.getElementById('seconds');

const targetDate = new Date("April 25 2026 00:00:00").getTime();
const secondInMillis = 1000;
const minuteInMillis = 60 * secondInMillis;
const hourInMillis = 60 * minuteInMillis;
const dayInMillis =  24 * hourInMillis;

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
