/// <reference path="c:\users\johan\source\repos\sharepointapps\sharepointappar\mediaapp\pages\addnewmediatype.aspx" />
/// <reference path="c:\users\johan\source\repos\sharepointapps\sharepointappar\mediaapp\pages\addnewmediatype.aspx" />
'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");
var returnedItems = null;

function initializePage() {

    $(document).ready(function() {
        
    });

    var redirectBtn = document.getElementById("redirectButton");
    var redirectToRootBtn = document.getElementById("redirectToRootButton");
    var redirectToAddNewMedia = document.getElementById("redirectToAddNewMedia");

   
    redirectToRootBtn.addEventListener("click", function () {
        redirectToRootPage();
    });

    redirectToAddNewMedia.addEventListener("click", function () {
        redirectAddNewMedia();
    });

       function redirectToRootPage() {
           var appWebUrl = window.location.protocol + "//" + window.location.host
                + _spPageContextInfo.webServerRelativeUrl;
        GoToPage(appWebUrl + "/Pages/Default.aspx", true);
       };

    function onGetUserNameSuccess() {
        //Redirect kod här..
        console.log("Redirecting to page..");
    }

    function onGetUserNameFail() {
        console.log("Page redirect error");
    }


    function redirectAddNewMedia() {
        console.log("redirectAddNewMedia körs");

        var appWebUrl = window.location.protocol + "//" + window.location.host
                + _spPageContextInfo.webServerRelativeUrl;
        GoToPage(appWebUrl + "/Pages/AddNewMediaType.aspx", true);
       }

    function onRedirectToMediaPageSuccess() {
        console.log("Successfully redirected to Media Page");
    }

    function onRedirectToMediaPageFail() {
        console.log("Failed to redirect to new page...");
    }
}