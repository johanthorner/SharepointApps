'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");
var returnedItems = null;
function initializePage() {
    
    $(document).ready(function () {
        displayList();
    });
    
    function displayList() {
        console.log("Display funktion körs");
        var currentContext = SP.ClientContext.get_current();
        var list = currentContext.get_web().get_lists().getByTitle("MediaList");

        var caml = new SP.CamlQuery();

        //caml.set_viewXml("<View><Query><Where><BeginsWith><FieldRef Name='Title' /><Value Type='Text'>T</Value></BeginsWith>            </Where></Query></View>");
        returnedItems = list.getItems(caml);
        currentContext.load(returnedItems);
        currentContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    }

    function onQuerySucceeded(sender, args) {

        var enumerator = returnedItems.getEnumerator();
        var markup = "<ul>Items:";
        while (enumerator.moveNext()) {
            var listItem = enumerator.get_current();
            markup += "<li> ID:"+listItem.get_id()+" Title:"+listItem.get_item("Title")+"</li>";
        }
        markup += "</ul>";
        document.getElementById("MediaListDisplay").innerHTML = markup;
    }
    function onQueryFailed(sender , args)
    {
        alert("Request failed. " + args.get_message() +
         "\n" + args.get_stackTrace());
    }
}