'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");
var returnedItems = null;

function initializePage() {

    $(document).ready(function() {
        
    });

    var redirectBtn = document.getElementById("redirectButton");
    var redirectToRootBtn = document.getElementById("redirectToRootButton");

    redirectBtn.addEventListener("click", function () {
        redirect();
    });
    redirectToRootBtn.addEventListener("click", function () {
        redirectToRootPage();
    });

    function redirect() {
        var appWebUrl1 = decodeURIComponent(getQuerryStringParameter("SPAppWebUrl"));
        GoToPage(appWebUrl1 + "/lists/MediaList", true);
    }

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

}