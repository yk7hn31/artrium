const clockContainer = document.querySelector("time"),
    clockTitle = clockContainer.querySelector("#clock");
    FORMAT_LS = "12hour";

const defaultFormat = false;
var format = JSON.parse(localStorage.getItem(FORMAT_LS));

function saveFormat(bool) {
    localStorage.setItem(FORMAT_LS,JSON.stringify(bool));
}

function changeFormat() {
    if (format === true) {
        format = false;
    } else {
        format = true;
    }
    saveFormat(format);
}

function configFormat() {
    if (format !== null) {
        if (format === true) {
            hour12();
        } else {
            hour24();
        }
    } else {
        format = defaultFormat;
        saveFormat(format);
    }
}

function hour12() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    const apm = document.createElement("span");
    apm.innerText = ampm;
    apm.style.fontSize = "2rem";
    hours = hours % 12;
    hours = hours ? hours : 12;
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    clockTitle.appendChild(apm);
    saveFormat(format);
}

function hour24() {
    var date = new Date();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    saveFormat(format);
}

function init() {
    configFormat();
    setInterval(configFormat, 1);
    clockTitle.addEventListener("click", changeFormat);
}

init()