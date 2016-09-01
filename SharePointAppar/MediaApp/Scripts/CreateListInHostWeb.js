﻿'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {
    checkIfListExistsInHostWeb();
}

function checkIfListExistsInHostWeb() {
    var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
    var context = SP.ClientContext.get_current();
    var hostContext = new SP.AppContextSite(context, hostWebUrl);
    var list = hostContext.get_web().get_lists().getByTitle(listProperties.listTitle);

    context.load(list);
    context.executeQueryAsync(onGetListSuccess, onGetListFail);
}

function onGetListSuccess() {
    console.log("List already exists");
}

function onGetListFail() {

    createlist();
}

function createlist() {
    // Create an announcement SharePoint list with the name that the user specifies.
    var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
    var currentcontext = new SP.ClientContext.get_current();
    var hostcontext = new SP.AppContextSite(currentcontext, hostWebUrl);
    var hostweb = hostcontext.get_web();
    var listCreationInfo = new SP.ListCreationInformation();
    listCreationInfo.set_title(listProperties.listTitle);
    listCreationInfo.set_templateType(SP.ListTemplateType.announcements);
    var lists = hostweb.get_lists();
    var newList = lists.add(listCreationInfo);
    currentcontext.load(newList);
    currentcontext.executeQueryAsync(onListCreationSuccess, onListCreationFail);
}

function onListCreationSuccess() {
    console.log('List created successfully!');
    createColumns();
}

function onListCreationFail(sender, args) {
    console.log('Failed to create the list. ' + args.get_message());
}

function createColumns() {

    var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
    var context = new SP.ClientContext.get_current();
    var hostContext = new SP.AppContextSite(context, hostWebUrl);

    var list = hostContext.get_web().get_lists().getByTitle(listProperties.listTitle);

    var fieldAuthor = list.get_fields().addFieldAsXml("<Field DisplayName=\'" + author + "\' Type=\'Text\' />", true, SP.AddFieldOptions.addToNoContentType);
    var fieldDescription = list.get_fields().addFieldAsXml("<Field DisplayName=\'" + description + "\' Type=\'Text\' />", true, SP.AddFieldOptions.addToNoContentType);
    var fieldType = list.get_fields().addFieldAsXml("<Field DisplayName=\'" + mediaType + "\' Type=\'Text\' />", true, SP.AddFieldOptions.addToNoContentType);

    fieldAuthor.update();
    fieldDescription.update();
    fieldType.update();
    context.executeQueryAsync(addColumnsSuccess, addColumnsFail);
}

function addColumnsSuccess() {
    console.log("Columns created successfully");
    seedListWithDummyData(listProperties.seedListIsOn);
}

function addColumnsFail(sender, args) {
    console.log('Failed to create the list. ' + args.get_message());
}

function createListItem(title, description, mediaType) {
    var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
    var context = new SP.ClientContext.get_current();
    var hostContext = new SP.AppContextSite(context, hostWebUrl);

    var list = hostContext.get_web().get_lists().getByTitle(listProperties.listTitle);

    var itemCreateInfo = new SP.ListItemCreationInformation();
    var newListItem = list.addItem(itemCreateInfo);

    newListItem.set_item("Title", title);
    newListItem.set_item("Description", description);
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