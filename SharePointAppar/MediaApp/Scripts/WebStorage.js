'use strict'

//TODO - fixa webbstorage!

//var car = {};
//car.wheels = 4;
//car.doors = 2;
//car.sound = 'vrooom';
//car.name = "Lightning McQueen";

//console.log(car);
//localStorage.setItem("car", "car");

//console.log(localStorage.getItem('car'));

//if (localStorage.hits) {
//    localStorage.hits = Number(localStorage.hits) + 1;
//} else {
//    localStorage.hits = 1;
//}

//document.write("Total Hits: " + localStorage.hits);

//localStorage.setItem("car", JSON.stringify(car));
//console.log(JSON.parse(localStorage.getItem("car")));


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