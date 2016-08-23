'use strict';

var Wingtip = window.Wingtip || {}

Wingtip.Collections = function () {
    //private members
    var site,
        listCollection,
        getListCollection = function () {
            var ctx = new SP.ClientContext.get_current();
            site = ctx.get_web();
            ctx.load(site);
            listCollection = site.get_lists();
            ctx.load(listCollection, 'Include(Title,Id,Fields.Include(Title,Description))');
            ctx.executeQueryAsync(success, failure);
        },
        success = function () {
            var html = [];
            //list Information
            html.push("<ul>");
            var listEnumerator = listCollection.getEnumerator();
            while (listEnumerator.moveNext()) {
                //list Title
                html.push("<li>");
                html.push(listEnumerator.get_current().get_title());
                html.push("</li>");

            }
            html.push("</ul></li>");
        }
    html.push("</ul>");
    //Show result
    $("#displayDiv").html(html.join(''));
},
FieldFailures = function (sender, arg) {
    alert(args.get_message());
}
//public interface
return {
    execute: getlistItemCollection
}
}
();
$(document).ready(function() {

})


