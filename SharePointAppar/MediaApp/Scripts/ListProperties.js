'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {
  
}
var listProperties = listProperties || {};

listProperties.movie = "Movie";
listProperties.book = "Book";
listProperties.music = "Music";
listProperties.mediaOptions = [listProperties.movie, listProperties.book, listProperties.music];
var listTitle = "HostWebList10";
var author = "Author";
var description = "Description";
var mediaType = "MediaType";