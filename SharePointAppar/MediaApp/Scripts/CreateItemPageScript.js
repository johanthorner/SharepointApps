﻿'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {
    fillSelectMediaList(listProperties.mediaOptions);

    var SubmitItemDataBtn = document.getElementById("SubmitItemData");

    SubmitItemDataBtn.addEventListener("click", function () {
        console.log("Submit button presed");
        var titleInput = document.getElementById("titleInput").value;
        var descriptionInput = document.getElementById("descriptionInput").value;
        var selectMediaList = document.getElementById("selectMedia");
        var SelectedMediaIndex = selectMediaList.options[selectMediaList.selectedIndex].value;

        createListItem(titleInput, descriptionInput, listProperties.mediaOptions[SelectedMediaIndex]);

    });

    var redirectToRootBtn = document.getElementById("redirectToRootButton");
    redirectToRootBtn.addEventListener("click", function () {
        console.log("Redirectiong To root page");
        redirectToRootPage();
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

function createListItem(titleInput, descriptionInput, mediaTypeInput) {
    console.log("createListItem");
    var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
    var context = new SP.ClientContext.get_current();
    var hostContext = new SP.AppContextSite(context, hostWebUrl);

    var list = hostContext.get_web().get_lists().getByTitle(listProperties.listTitle);

    var itemCreateInfo = new SP.ListItemCreationInformation();
    var newListItem = list.addItem(itemCreateInfo);

    newListItem.set_item("Title", titleInput);
    newListItem.set_item("Description", descriptionInput);

    newListItem.set_item("MediaType", mediaTypeInput);

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

function redirectToRootPage() {

    var appWebUrl = window.location.protocol + "//" + window.location.host
            + _spPageContextInfo.webServerRelativeUrl;
    GoToPage(appWebUrl + "/Pages/Default.aspx", true);
}

  
  
