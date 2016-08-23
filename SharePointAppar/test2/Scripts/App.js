'use strict';

var lists;

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {

    $(document).ready(function() {
        
        var context = SP.ClientContext.get_current();
        var list = context.get_web().get_lists().getByTitle('DemoList3');
        context.load(list);
        context.executeQueryAsync(onGetListSuccess, onGetListFail);
       // addItemToList();

    });


    function onGetListSuccess() {
        document.getElementById("message").innerHTML = 'Listan finns redan, vi kan inte skapa den två gånger.';

    }

    function onGetListFail() {
        //listan finns inte, alltså kan vi skapa den!
        var currContext = SP.ClientContext.get_current();
        var listCreationInfo = new SP.ListCreationInformation();

        listCreationInfo.set_title('DemoList3');
        listCreationInfo.set_templateType(SP.ListTemplateType.genericList);

        var newMyList = currContext.get_web().get_lists().add(listCreationInfo);

        currContext.load(newMyList);
        currContext.executeQueryAsync(onCreateSuccess, onCreateFail);
    }

    function onCreateSuccess() {
        document.getElementById("message").innerHTML = 'Listan skapades utan problem.<br/> ';
        var newContext = SP.ClientContext.get_current();
        lists = newContext.get_web().get_lists();
        newContext.load(lists);

        newContext.executeQueryAsync(onGetAllListsSuccess, onGetAllListsFail);
    }

    function onGetAllListsSuccess() {
        var listEnumerator = lists.getEnumerator();
        var listinfo = "";
        while (listEnumerator.moveNext()) {
            var olist = listEnumerator.get_current();
            listinfo += '<li>' + olist.get_title() + '</li>';
        }
        document.getElementById("message").innerHTML += 'Lists found:<ul>' + listinfo + '</ul>';
    }

    function onGetAllListsFail(sender, args) {
        document.getElementById("message").innerHTML = 'Error (i funktionen onGetAllListsFail): ' + args.get_message();
    }

    function onCreateFail(sender, args) {
        document.getElementById("message").innerHTML = 'Error (i funktionen onCreateFail): ' + args.get_message();
    }

    document.addEventListener("click", function() {
        addItemToList();
    });
   
    function addItemToList() {
        console.log("addItemToList körs");

        var context = SP.ClientContext.get_current();
        var myList = context.get_web().get_lists().getByTitle("DemoList3");

        
        var itemCreateInfo = new SP.ListItemCreationInformation();
        var newListItem = myList.addItem(itemCreateInfo);

        newListItem.set_item("Title", "Johan");
       

      
        newListItem.update();

        context.load(newListItem);
        context.executeQueryAsync(addItemSuccess(), addItemFail());


    }

    function addItemSuccess() {
       
        console.log("list item added!: ");

    }

    function addItemFail() {
       
        console.log("Error (i funktionen addItemToList): ");
    }
}
