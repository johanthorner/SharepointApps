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

   
    //fungerar inte atm - "not defined"?
    function redirectToRootPage() {
        var appWebUrl = decodeURIComponent(getQuerryStringParameter("SPAppWebUrl"));
        GoToPage(appWebUrl + "/Pages/Default.aspx", true);
    };
    function onGetUserNameSuccess() {
        //Redirect kod här..
        console.log("Redirecting to page..");
    }
    function onGetUserNameFail()
    {
        console.log("Page redirect error");
    }

   
    //fungerar inte atm - "not defined"?
    //TODO - Fixa, denna eller alt.2
    function getQuerryStringParameter(param) {
        var params = document.URL.split("?")[1].split("&");
        for (var i = 0; i < params.length; i = i + 1) {
            var singelParam = params[i].split("=");
            if (singelParam[0] == param) {
                return singelParam[1];
            }
        }
    }
    function redirectAddNewMedia() {
        console.log("redirectAddNewMedia körs");

        var appWebUrl = decodeURIComponent(getQuerryStringParameter("SPAppWebUrl"));
        GoToPage(appWebUrl + "/Pages/AddNewMediaType.aspx", true);
       }

    function onRedirectToMediaPageSuccess() {
        document.getElementById("message").innerHTML = "";
    }

    function onRedirectToMediaPageFail() {
        document.getElementById("message").innerHTML = "Failed to redirect to new page...";
    }


    //fungerar inte alls - error 404
    //TODO - Fixa, denna eller alt1.
    //var mediaPageAppWeb = decodeURIComponent(getQuerryStringParameter('SPAppWebUrl'));

    //GoToPage(mediaPageAppWeb + "/MediaApp/AddNewMediaType", true);


   

}