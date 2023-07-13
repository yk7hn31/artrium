const nameForm = document.querySelector("#nameForm");
const nameInput = nameForm.querySelector("input");
const greeting = document.querySelector("#greeting");

const classHidden = "hidden";
const usernameLS = "username";

function saveName(username) {
    localStorage.setItem(usernameLS,username);
}

function showGreeting(username) {
    nameForm.classList.add(classHidden);
    greeting.classList.remove(classHidden);
    greeting.innerText = `Such a nice day, ${username}.`;
}

function handleNameSubmit(event) {
    event.preventDefault();
    showGreeting(nameInput.value);
    saveName(nameInput.value);
}

function askForName() {
    greeting.classList.add(classHidden);
    nameForm.addEventListener("submit", handleNameSubmit);
}

function init() {
    const username = localStorage.getItem(usernameLS);
    if (username == null) {
        askForName();
    } else {
        showGreeting(username);
    }
}

init();