'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {


    $(document).ready(function () {
        
    });
    var SubmitItemDataBtn = document.getElementById("SubmitItemData");
    SubmitItemDataBtn.addEventListener("click", function () {
        console.log("Submit button presed");
        var titleInput = document.getElementById("titleInput").value;
        var descriptionInput = document.getElementById("descriptionInput").value;
        var mediaTypeInput = document.getElementById("descriptionInput").value;

        createListItem(titleInput, descriptionInput, mediaTypeInput);

    });
    var redirectToRootBtn = document.getElementById("redirectToRootButton");
    redirectToRootBtn.addEventListener("click", function() {
        console.log("Redirectiong To root page");
        redirectToRootPage();
    });
   
    function getQuerryStringParameter(param) {
        var params = document.URL.split("?")[1].split("&");
        for (var i = 0; i < params.length; i = i + 1) {
            var singelParam = params[i].split("=");
            if (singelParam[0] == param) {
                return singelParam[1];
            }
        }
    }

    function createListItem(title, description, mediaType) {

        var context = SP.ClientContext.get_current();
        var mediaList = context.get_web().get_lists().getByTitle("MediaList");

        var itemCreateInfo = new SP.ListItemCreationInformation();
        var newListItem = mediaList.addItem(itemCreateInfo);

        newListItem.set_item("Title", title);
        newListItem.set_item("Description", description);

        //newListItem.set_item("Author", "Stanley Kubrick");
        newListItem.set_item("MediaType", mediaType);

        newListItem.update();
        context.load(newListItem);
        context.executeQueryAsync(addItemSuccess, addItemFail);
    }

    function addItemSuccess() {

        console.log("list item skapades!: ");

    }

    function addItemFail() {

        console.log("Error (i funktionen addItemToList): ");
    }

    function redirectToRootPage()
    {
        var appWebUrl = decodeURIComponent(getQuerryStringParameter("SPAppWebUrl"));
        GoToPage(appWebUrl + "/Pages/Default.aspx", true);
    }
        

    


}
