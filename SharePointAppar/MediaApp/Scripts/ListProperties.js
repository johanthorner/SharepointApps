'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {

}

var listProperties = listProperties || {};

listProperties.movie = "Movie";
listProperties.book = "Book";
listProperties.music = "Music";
listProperties.mediaOptions = [listProperties.movie, listProperties.book, listProperties.music];
listProperties.listTitle = "HostWebList11";

var author = "Author";
var description = "Description";
var mediaType = "MediaType";

listProperties.seedListIsOn = true;

//Default listan som skapas - OM! listProperties.seedListIsOn = true; Vill vi inte detta, ändra till 'false'
function seedListWithDummyData(seedIsOn) {
    if (seedIsOn) {
        createListItem("Full Metal Jacket", "Classics", "Movie");
        createListItem("Slottet", "Classics", "Book");
        createListItem("The River", "Classics", "Music");
    }
}

var lastKnownFilter = sessionStorage.lastKnownFilter;