'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

var itemId = localStorage.id;
var returnedItems = null;
function initializePage() {
   
    getItem();
    fillSelectMediaList(listProperties.mediaOptions);
    
   
var submitItemDataBtn = document.getElementById("SubmitItemData");

        submitItemDataBtn.addEventListener("click", function () {
        console.log("Submit button presed");
        var titleInput = document.getElementById("titleInput").value;
        var descriptionInput = document.getElementById("descriptionInput").value;

        var selectMediaList = document.getElementById("selectMedia");
        var selectedMediaIndex = selectMediaList.options[selectMediaList.selectedIndex].value;

        updateListItem(titleInput, descriptionInput, listProperties.mediaOptions[selectedMediaIndex]);
        
    });
}

function fillSelectMediaList(mediaOptions) {
    console.log("Filling dropdown");
    var selectMediaList = document.getElementById("selectMedia");

    if (selectMediaList) {
        for (var i = 0; i < mediaOptions.length; i++) {
            addOption(selectMediaList, listProperties.mediaOptions[i], i);
        }
    }
}

function addOption(selectBox, text, value) {
    var optn = document.createElement("OPTION");
    optn.text = text;
    optn.value = value;
    selectBox.options.add(optn);
}

function getItem(sortBy) {

   
    var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
    var context = new SP.ClientContext.get_current();
    var hostContext = new SP.AppContextSite(context, hostWebUrl);

    var list = hostContext.get_web().get_lists().getByTitle(listTitle);
    //Ska ta ut en specifik sökning i listan 
    var caml = new SP.CamlQuery();
    
    returnedItems = list.getItems(caml);
    context.load(returnedItems);
    context.executeQueryAsync(onQuerySucceeded, onQueryFailed);

}

function onQuerySucceeded(sender, args) {

    var enumerator = returnedItems.getEnumerator();
    while (enumerator.moveNext()) {
        var listItem = enumerator.get_current();
        var curentID = listItem.get_id();
        if (curentID == itemId) {
             document.getElementById("titleInput").value = listItem.get_item("Title");
             document.getElementById("descriptionInput").value = listItem.get_item("Description");

             function setSelectedIndex(s, v) {

                 for (var i = 0; i < s.options.length; i++) {

                     if (s.options[i].text == v) {

                         s.options[i].selected = true;

                         return;

                     }

                 }

             }

             setSelectedIndex(document.getElementById("selectMedia"), listItem.get_item("MediaType"));
            

        }
    }
  
    }
   
function onQueryFailed(sender , args)
{
    alert("Request failed. " + args.get_message() +
     "\n" + args.get_stackTrace());
}

function redirectToRootPage() {
    console.log("Redirect to root...")
    var appWebUrl = window.location.protocol + "//" + window.location.host
            + _spPageContextInfo.webServerRelativeUrl;
    GoToPage(appWebUrl + "/Pages/Default.aspx", true);
}



function updateListItem(newTitle, newDescription, newMediaType) {
   
    var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
    var context = new SP.ClientContext.get_current();
    var hostContext = new SP.AppContextSite(context, hostWebUrl);

    var list = hostContext.get_web().get_lists().getByTitle(listTitle);

    
    var newListItem = list.getItemById(itemId);

    newListItem.set_item("Title", newTitle);
    newListItem.set_item("Description", newDescription);
    newListItem.set_item("MediaType", newMediaType);

    newListItem.update();
    context.load(newListItem);
    context.executeQueryAsync(listUpdateSuccess, listUpdateFail);
}
function listUpdateSuccess() {
  
    console.log("List id" + itemId + "Updated");
    redirectToRootPage();

}

function listUpdateFail() {
    console.log("Error List id" + itemId + "Not Updated");
    redirectToRootPage();
}
//TODO: redirect to root efter att item updaterats