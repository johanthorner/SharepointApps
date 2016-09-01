'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {
  
}
var listProperties = listProperties || {};

listProperties.movie = "Movie";
listProperties.book = "Book";
listProperties.music = "Music";
listProperties.mediaOptions = [listProperties.movie, listProperties.book, listProperties.music];
listProperties.listTitle = "HostWebList10";

var author = "Author";
var description = "Description";
var mediaType = "MediaType";

listProperties.seedListIsOn = true;
function seedListWithDummyData() {
    createListItem("Full Metal Jacket", "Classics", "Movie");
    createListItem("Slottet", "Classics", "Book");
    createListItem("The River", "Classics", "Music");
}

var lastKnownFilter = sessionStorage.lastKnownFilter;