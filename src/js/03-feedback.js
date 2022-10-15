import trottle from 'lodash.throttle'

const form = document.querySelector('.feedback-form');
const mail = document.querySelector('input');
const textarea = document.querySelector('textarea');
const SRORAGE_KEY = 'feedback-form-state';
const formData = {};

form.addEventListener("input", trottle(onInput, 500));
form.addEventListener('submit', onFormSubmit);

startInputValue();

function onInput(event) {
    formData[event.target.name] = event.target.value;

    localStorage.setItem(SRORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
    event.preventDefault();

    console.log(formData);
    event.currentTarget.reset();
    localStorage.removeItem(SRORAGE_KEY);
}

function startInputValue() {
    const savedData = localStorage.getItem(SRORAGE_KEY);

    if (savedData) {
        const parsedSavedData = JSON.parse(savedData);
        const { email, message } = parsedSavedData
        mail.value = email;
        textarea.value = message;
    }
}