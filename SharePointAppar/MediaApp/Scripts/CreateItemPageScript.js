'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");
var mediaOptions = ["Movie", "Book", "Music"];
function initializePage() {
    
    

    $(document).ready(function () {
        fillSelectMediaList(mediaOptions);
    });

   

    function fillSelectMediaList(mediaOptions) {
        console.log("Filling dropdown");
        var selectMediaList = document.getElementById("selectMedia");
        
        if (selectMediaList) {
            for (var i = 0; i < mediaOptions.length; i++) {
                addOption(selectMediaList, mediaOptions[i], i);
            }
        }
    }

    function addOption(selectBox, text, value) {
        var optn = document.createElement("OPTION");
        optn.text = text;
        optn.value = value;
        selectBox.options.add(optn);
    }
        
    var SubmitItemDataBtn = document.getElementById("SubmitItemData");
    SubmitItemDataBtn.addEventListener("click", function () {
        console.log("Submit button presed");
        var titleInput = document.getElementById("titleInput").value;
        var descriptionInput = document.getElementById("descriptionInput").value;

        var selectMediaList = document.getElementById("selectMedia");
        var SelectedMediaIndex = selectMediaList.options[selectMediaList.selectedIndex].value;
        
        createListItem(titleInput, descriptionInput, mediaOptions[SelectedMediaIndex]);

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
        newListItem.set_item("MediaType", mediaType);

        newListItem.update();
        context.load(newListItem);
        context.executeQueryAsync(addItemSuccess, addItemFail);
    }

    function addItemSuccess() {

        console.log("list item skapades!: ");
    //TODO: lägg till feedback till användaren när ett item har skapats

    }

    function addItemFail() {

        console.log("Error (i funktionen addItemToList): ");
        document.getElementById("CreateItemMessage").innerHTML = "<P>Something went wrong, item not created.</p>";
    }

    function redirectToRootPage()
    {
        var appWebUrl = decodeURIComponent(getQuerryStringParameter("SPAppWebUrl"));
        GoToPage(appWebUrl + "/Pages/Default.aspx", true);
    }
        

    


}
