const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countDownForm');
const dateEl = document.getElementById('date-picker');
const d = new Date().toISOString().split("T")[0];
dateEl.setAttribute('min', d)

const completedEl = document.getElementById('complete')
const completedElInfo = document.getElementById('complete-info')
const completedElBtn = document.getElementById('complete-button')



let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
let countdownActive


function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;

        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)

        inputContainer.hidden = true;

        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive)
            completedElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completedEl.hidden = false;
        } else {

            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completedEl.hidden = true;
            countdownEl.hidden = false;
        }

        inputContainer.hidden = true;
    }, second);


}

function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    if (countdownDate === '') {
        alert('Please insert date');
    } else {
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();

    }
}

function reset() {
    completedEl.hidden = true;
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completedElBtn.addEventListener('click', reset);


restorePreviousCountdown()