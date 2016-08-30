

'use strict';
var mediaList = "MediaList";
var author = "Author";
var description = "Description";
var mediaType = "MediaType";
ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {

    $(document).ready(function () {

        var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
        var context = SP.ClientContext.get_current();
        var hostContext = new SP.AppContextSite(context, hostWebUrl);

        var list = hostContext.get_web().get_lists().getByTitle("MediaList");

        context.load(list);
        context.executeQueryAsync(onGetListSuccess, onGetListFail);

    });

    function onGetListSuccess() {
        //Listan finns
        console.log("MediaList finns");
    }

    function onGetListFail() {
        //Skapar lista..
        console.log("MediaList finns inte, skapar lista");
        var currentContext = SP.ClientContext.get_current();
        var listCreationInfo = new SP.ListCreationInformation();

        listCreationInfo.set_title("MediaList");
        listCreationInfo.set_templateType(SP.ListTemplateType.genericList);

        var newMyList = currentContext.get_web().get_lists().add(listCreationInfo);

        currentContext.load(newMyList);
        currentContext.executeQueryAsync(onCreateSuccess, onCreateFail);
    }

    function onCreateSuccess() {
        console.log("Listan skapades");
        createColumns("MediaList");
    }
    function createColumns(listTitle) {


        var context = SP.ClientContext.get_current();
        var myList = context.get_web().get_lists().getByTitle(listTitle);


        var fieldAuthor = myList.get_fields().addFieldAsXml("<Field DisplayName=\'" + author + "\' Type=\'Text\' />", true, SP.AddFieldOptions.addToNoContentType);
        var fieldDescription = myList.get_fields().addFieldAsXml("<Field DisplayName=\'" + description + "\' Type=\'Text\' />", true, SP.AddFieldOptions.addToNoContentType);
        var fieldType = myList.get_fields().addFieldAsXml("<Field DisplayName=\'" + mediaType + "\' Type=\'Text\' />", true, SP.AddFieldOptions.addToNoContentType);

        fieldAuthor.update();
        fieldDescription.update();
        fieldType.update();
        context.executeQueryAsync(addFieldSuccess, addFieldFail);
    }

    function addFieldSuccess() {
        console.log("Field lades till");
        createListItem("Full Metal Jacket", "Classics", "Movie");
        createListItem("Slottet", "Classics", "Book");
        createListItem("The River", "Classics", "Music");
    }
    function addFieldFail() {
        console.log("Field lades INTE till");
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

    }

    function addItemFail() {

        console.log("Error (i funktionen addItemToList): ");
    }

    function onCreateFail() {
        console.log("Något blev fel. listan skapades inte");
    }

}
