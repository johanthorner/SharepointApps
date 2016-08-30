'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");
var returnedItems = null;
function initializePage() {
    
    $(document).ready(function () {
        displayList("All");
       
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
        var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
        var context = new SP.ClientContext.get_current();
        var hostContext = new SP.AppContextSite(context, hostWebUrl);

        var list = hostContext.get_web().get_lists().getByTitle(listTitle);
        //Ska ta ut en specifik sökning i listan 
        var caml = new SP.CamlQuery();
        if (sortBy !== "All") {
            caml.set_viewXml("<View><Query><Where><Contains><FieldRef Name='MediaType' /><Value Type='Text'>" + sortBy + "</Value></Contains></Where></Query></View>"); 
        }
       
        returnedItems = list.getItems(caml);
        context.load(returnedItems);
        context.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    }

    function onQuerySucceeded(sender, args) {

        var enumerator = returnedItems.getEnumerator();
        var markup = "<ul>Items:";
        while (enumerator.moveNext()) {
            var listItem = enumerator.get_current();
            var curentID = listItem.get_id();
            markup += "<li> ID: " + curentID + " Title: " + listItem.get_item("Title") + "Media type: " + listItem.get_item("MediaType") + "<input type='button' class='removeBtn' value='Remove' onclick='RemoveItemPrompt(" + curentID + ");' />" + "<input type='button' class='editBtn' value='Edit' onclick='EditItem(" + curentID + ");' />" + "</li>";
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
        var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
        var context = new SP.ClientContext.get_current();
        var hostContext = new SP.AppContextSite(context, hostWebUrl);

        var list = hostContext.get_web().get_lists().getByTitle(listTitle);
        
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
    
    function EditItem(id) {

        console.log("redirectEditListItem körs");
        localStorage.id = id;
        var appWebUrl = window.location.protocol + "//" + window.location.host
                + _spPageContextInfo.webServerRelativeUrl;
        GoToPage(appWebUrl + "/Pages/EditListItem.aspx",true);
    }
   
