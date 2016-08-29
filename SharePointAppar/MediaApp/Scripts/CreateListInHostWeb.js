'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {
    checkIfListExistsInHostWeb();
}



function getQueryStringParameter(param) {
    var params = document.URL.split("?")[1].split("&");
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == param) {
            return singleParam[1];
        }
    }
}

function checkIfListExistsInHostWeb() {
    var hostWebUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));  //Kanske måste ändra permissions i App-manifästet. 
    var context = SP.ClientContext.get_current();
    var hostContext = new SP.AppContextSite(context, hostWebUrl);

    var list = hostContext.get_web().get_lists().getByTitle(listTitle);

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

    var hostUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    var currentcontext = new SP.ClientContext.get_current();
    var hostcontext = new SP.AppContextSite(currentcontext, hostUrl);
    var hostweb = hostcontext.get_web();
    var listCreationInfo = new SP.ListCreationInformation();
    //var listTitle = "HostWebList"; Deklarerad globalt
    listCreationInfo.set_title(listTitle);
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

    var hostWebUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));  //Kanske måste ändra permissions i App-manifästet. 
    var context = new SP.ClientContext.get_current();
    var hostContext = new SP.AppContextSite(context, hostWebUrl);

    var list = hostContext.get_web().get_lists().getByTitle(listTitle);


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
    createListItem("Full Metal Jacket", "Classics", "Movie");
    createListItem("Slottet", "Classics", "Book");
    createListItem("The River", "Classics", "Music");
}

function addColumnsFail(sender, args) {
    console.log('Failed to create the list. ' + args.get_message());
}

function createListItem(title, description, mediaType) {
    var hostWebUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));  //Kanske måste ändra permissions i App-manifästet. 
    var context = new SP.ClientContext.get_current();
    var hostContext = new SP.AppContextSite(context, hostWebUrl);

    var list = hostContext.get_web().get_lists().getByTitle(listTitle);

    var itemCreateInfo = new SP.ListItemCreationInformation();
    var newListItem = list.addItem(itemCreateInfo);

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