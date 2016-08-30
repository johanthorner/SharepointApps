'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

var itemId = localStorage.id;

function initializePage() {
    getItem();
    fillSelectMediaList(mediaOptions);

    var submitItemDataBtn = document.getElementById("SubmitItemData");

    submitItemDataBtn.addEventListener("click", function () {
        console.log("Submit button presed");
        var titleInput = document.getElementById("titleInput").value;
        var descriptionInput = document.getElementById("descriptionInput").value;

        var selectMediaList = document.getElementById("selectMedia");
        var selectedMediaIndex = selectMediaList.options[selectMediaList.selectedIndex].value;

        updateListItem(titleInput, descriptionInput, mediaOptions[selectedMediaIndex]);

    });
}

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

function getItem() {
    var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
    var context = new SP.ClientContext.get_current();
    var hostContext = new SP.AppContextSite(context, hostWebUrl);

    var list = hostContext.get_web().get_lists().getByTitle(listTitle);
    var item = list.getItemById(itemId);
    var title = item.get_item("Title");
    alert(title);

    //list.getItems("Title");
    //var item =  list.getItemById("Description");
    //list.set_item("MediaType", newMediaType);

    list.update();
    context.executeQueryAsync(listUpdateSuccess, listUpdateFail);
}

function updateListItem(newTitle, newDescription, newMediaType) {
    var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
    var context = new SP.ClientContext.get_current();
    var hostContext = new SP.AppContextSite(context, hostWebUrl);

    var list = hostContext.get_web().get_lists().getByTitle(itemId);

    list.set_item("Title", newTitle);
    list.set_item("Description", newDescription);
    list.set_item("MediaType", newMediaType);

    list.update();
    context.executeQueryAsync(listUpdateSuccess, listUpdateFail);

}
function listUpdateSuccess() {
    console.log("List id" + itemId + "Updated");
}

function listUpdateFail() {
    console.log("Error List id" + itemId + "Not Updated");
}