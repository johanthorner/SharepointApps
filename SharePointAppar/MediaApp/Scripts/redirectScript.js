'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");
var returnedItems = null;

function initializePage() {

    $(document).ready(function() {
        
    });

    var redirectBtn = document.getElementById("redirectButton");
    var redirectToRootBtn = document.getElementById("redirectToRootButton");
    var redirectToAddNewMedia = document.getElementById("redirectToAddNewMedia");

    redirectBtn.addEventListener("click", function () {
        redirect();
    });
    redirectToRootBtn.addEventListener("click", function () {
        redirectToRootPage();
    });

    redirectToAddNewMedia.addEventListener("click", function () {
        redirectAddNewMedia();
    });

    //function redirect() {
    //    var appWebUrl1 = decodeURIComponent(getQuerryStringParameter("SPAppWebUrl"));
    //    GoToPage(appWebUrl1 + "/lists/MediaList", true);
    //}


    //fungerar inte atm - "not defined"?
    function redirectToRootPage() {
        var context = SP.ClientContext.get_current();
        var myList = context.get_web().get_lists().getByTitle("MediaList");
        var rootfolder = myList.get_rootFolder();
        
        context.load(rootfolder);
        
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    };
    function onGetUserNameSuccess() {
        //Redirect kod här..
        console.log("Redirecting to page..");
    }
    function onGetUserNameFail()
    {
        console.log("Page redirect error");
    }

    //TODO - skapa en redirect till 'Lägg till ny mediatyp'-sida


    //fungerar inte atm - "not defined"?

    //function redirectAddNewMedia() {
    //    var context = SP.ClientContext.get_current();
    //    var myMediaList = context.get_web().get_lists().getByTitle("MediaList");
    //    var rootfolder = myMediaList.get_rootFolder();
    //    var listUrl = rootfolder.get_serverRelativePath();

    //    GoToPage(listUrl, true);

    //    context.load(rootfolder);
    //    context.executeQueryAsync(onRedirectToMediaPageSuccess, onRedirectToMediaPageFail);
    //}

    //function onRedirectToMediaPageSuccess() {
    //    document.getElementById("message").innerHTML = "";
    //}

    //function onRedirectToMediaPageFail() {
    //    document.getElementById("message").innerHTML = "Failed to redirect to new page...";
    //}


    //fungerar inte alls - error 404
    var mediaPageAppWeb = decodeURIComponent(getQuerryStringParameter('SPAppWebUrl'));

    GoToPage(mediaPageAppWeb + "/MediaApp/AddNewMediaType", true);


    function getQuerryStringParameter(param) {
        var params = document.URL.split("?")[1].split("&");
        for (var i = 0; i < params.length; i = i + 1) {
            var singelParam = params[i].split("=");
            if (singelParam[0] == param) {
                return singelParam[1];
            }
        }
    }

}