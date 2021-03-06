﻿'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");
var returnedItems = null;

function initializePage() {
    
    $(document).ready(function () {
       if (sessionStorage.lastKnownFilter == null) {
           displayList("All");
       } else {
           displayList(sessionStorage.lastKnownFilter);
       }
             
    });
    var movieBtn = document.getElementById("FilterMoviesButton");
    var musicBtn = document.getElementById("FilterMusicBotton");
    var booksBtn = document.getElementById("FilterBooksButton");
    
    movieBtn.addEventListener("click", function() {
        console.log("Filter by movies");
        displayList(listProperties.movie);
    });
    musicBtn.addEventListener("click", function () {
        console.log("Filter by music");
        displayList(listProperties.music);
    });
    booksBtn.addEventListener("click", function () {
        console.log("Filter by books");
        displayList(listProperties.book);
    });
  
    //Tar in en variabel - stringen SortBy - och sätter sessionstorage till sortBy
    function displayList(sortBy) {
        sessionStorage.lastKnownFilter = sortBy;
        console.log(sessionStorage.lastKnownFilter);
        var hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
        var context = new SP.ClientContext.get_current();
        var hostContext = new SP.AppContextSite(context, hostWebUrl);

        //hämtar listan
        var list = hostContext.get_web().get_lists().getByTitle(listProperties.listTitle);
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
        var markup = "<div class='row'><div class='col-sm-2' id='ID'>ID</div><div class='col-sm-2' id='Title'>Title</div><div class='col-sm-4' id='Type'>Type</div><div class='col-sm-4' id='fuskis'>,</div>";
        while (enumerator.moveNext()) {
            var listItem = enumerator.get_current();
            var curentID = listItem.get_id();
            markup += "<div class='col-sm-2'>" + curentID + "</div><div class='col-sm-2'>" + listItem.get_item("Title") + "</div><div class='col-sm-4'>" + listItem.get_item("MediaType") + "</div><div class='col-sm-4'><input type='button' class='removeBtn' value='Remove' onclick='RemoveItemPrompt(" + curentID + ");' />" + "<input type='button' class='editBtn' value='Edit' onclick='EditItem(" + curentID + ");' />" + "</div>";
            }
        markup += "</div>";
        document.getElementById("MediaListDisplay").innerHTML = markup;
        }
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

        var list = hostContext.get_web().get_lists().getByTitle(listProperties.listTitle);
        
        var myListItem = list.getItemById(itemId);
        myListItem.deleteObject();

        context.executeQueryAsync(onItemDeleted, onItemNotDeleted);
    }

    function onItemDeleted() {
        alert("Item deleted:");
        location.reload();
       
    }
    function onItemNotDeleted() {
        alert("Somthing went wrong, item not removed");
    }
    
    function EditItem(id) {

        console.log("redirectEditListItem körs");
        localStorage.id = id;
        var appWebUrl = window.location.protocol + "//" + window.location.host
                + _spPageContextInfo.webServerRelativeUrl;
        GoToPage(appWebUrl + "/Pages/EditListItem.aspx",true);
    }
   



//TODO: snygga till listan dra knapparna till höger.
//TODO: ge feedback när ett item uppdaterats.
//TODO: lägg alla listpropertys ett i ett eget namespace