'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");
var returnedItems = null;

function initializePage() {

    $(document).ready(function() {
        
    });

    document.addEventListener("click", function() {
        //redirectToRootPage();
         redirect();
    });

    function redirect() {
        var appWebUrl1 = decodeURIComponent(getQuerryStringParameter("SPAppWebUrl"));
        GoToPage(appWebUrl1 + "/lists/MediaList", true);
    }

    function redirectToRootPage() {
        var context = SP.ClientContext.get_current();
        var myList = context.get_web().get_lists().getByTitle("listaPåRootWebben");
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

}