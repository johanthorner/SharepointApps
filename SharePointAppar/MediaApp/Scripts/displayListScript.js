'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");
var returnedItems = null;
function initializePage() {
    
    $(document).ready(function () {
        displayList("All");
       
        //var removeItemBtn = document.getElementById("removeItem");
        //var removeItemBtn.addEventListener("click", function () {
        //    console.log("Remove item: ");
        //});
    });
    var movieBtn = document.getElementById("FilterMoviesButton");
    var musicBtn = document.getElementById("FilterMusicBotton");
    var booksBtn = document.getElementById("FilterBooksButton");
    
    movieBtn.addEventListener("click", function() {
        console.log("Filter by movies");
        displayList("Movie");
    });
    musicBtn.addEventListener("click", function () {
        console.log("Filter by music");
        displayList("Music");
    });
    booksBtn.addEventListener("click", function () {
        console.log("Filter by books");
        displayList("Book");
    });
  

    
    function displayList(sortBy) {

        console.log("Display funktion körs");
        var currentContext = SP.ClientContext.get_current();
        var list = currentContext.get_web().get_lists().getByTitle("MediaList");

        //Ska ta ut en specifik sökning i listan 
        var caml = new SP.CamlQuery();
        if (sortBy !== "All") {
            caml.set_viewXml("<View><Query><Where><Contains><FieldRef Name='MediaType' /><Value Type='Text'>" + sortBy + "</Value></Contains></Where></Query></View>"); 
        }
       
        returnedItems = list.getItems(caml);
        currentContext.load(returnedItems);
        currentContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    }

    function onQuerySucceeded(sender, args) {

        var enumerator = returnedItems.getEnumerator();
        var markup = "<ul>Items:";
        while (enumerator.moveNext()) {
            var listItem = enumerator.get_current();
            var curentID = listItem.get_id();
            markup += "<li> ID: " + curentID + " Title: " + listItem.get_item("Title") + "Media type: " + listItem.get_item("MediaType") + "<input type='button' value='Remove' onclick='RemoveItemPrompt(" + curentID + ");' />" + "</li>";
            }
        markup += "</ul>";
        document.getElementById("MediaListDisplay").innerHTML = markup;
        }
       
        
      
        //TODO: ta bort item i listan
      
    }

    function onQueryFailed(sender , args)
    {
        alert("Request failed. " + args.get_message() +
         "\n" + args.get_stackTrace());
    }

    function RemoveItemPrompt(id) {
        var removeItemAnswer = confirm("Are you sure you want to remove item:" + id);
        if (removeItemAnswer === true) {
            removeItem(id);
        } else {
            alert("item not removed");
        }
    }

    function removeItem(itemId) {
       
        var context = SP.ClientContext.get_current();

        var hostContext = new SP.AppContextSite(context, hostweburl);
        var list = hostContext.get_web().get_lists().getByTitle("MediaList");

      

        var myListItem = list.getItemById(itemId);
        myListItem.deleteObject();

        context.executeQueryAsync(onItemDeleted, onItemNotDeleted);
    }

    function onItemDeleted() {
        alert("Item deleted:");
    }
    function onItemNotDeleted() {
        alert("Somthing went wrong");
    }
    

