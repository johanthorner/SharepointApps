'use strict'

//TODO - vill vi göra ngt mer med denna?

function clickCounterRedirect() {
    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.clickcountRedirect) {
            sessionStorage.clickcountRedirect = Number(sessionStorage.clickcountRedirect) + 1;
        } else {
            sessionStorage.clickcountRedirect = 1;
        }
        document.getElementById("clickResult").innerHTML = "You have clicked the button " + sessionStorage.clickcountRedirect + "time(s).";
    }
}

function clickCounterRedirectToRoot() {
    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.clickcountRedirectToRoot) {
            sessionStorage.clickcountRedirectToRoot = Number(sessionStorage.clickcountRedirectToRoot) + 1;
        } else {
            sessionStorage.clickcountRedirectToRoot = 1;
        }
        document.getElementById("clickResult").innerHTML = "You have clicked the button " + sessionStorage.clickcountRedirectToRoot + "time(s).";
    }
}

function clickCounterRedirectToAddNewMedia() {
    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.clickcountRedirectToAddNewMedia) {
            sessionStorage.clickcountRedirectToAddNewMedia = Number(sessionStorage.clickcountRedirectToAddNewMedia) + 1;
        } else {
            sessionStorage.clickcountRedirectToAddNewMedia = 1;
        }
        document.getElementById("clickResult").innerHTML = "You have clicked the button " + sessionStorage.clickcountRedirectToAddNewMedia + "time(s).";
    }
}