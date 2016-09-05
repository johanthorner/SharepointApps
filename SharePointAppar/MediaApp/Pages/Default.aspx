<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <style>
        @import 'https://fonts.googleapis.com/css?family=Lato';
    </style>


    <!-- Add your JavaScript to the following file -->

    <script src="../Scripts/ListProperties.js"></script>
    <script src="../Scripts/CreateListInHostWeb.js"></script>
    <script src="../Scripts/displayListScript.js"></script>
    <script src="../Scripts/redirectScript.js"></script>
    <script src="../Scripts/WebStorage.js"></script>

    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div id="MediaListDisplay">
        <p id="">
            <!-- The following content will be replaced with the user name when you run the app - see App.js -->
            initializing...
        </p>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <button id="FilterMoviesButton" class="filterBtn" type="button" onclick="">Movies</button>
            <button id="FilterBooksButton" class="filterBtn" type="button" onclick="">Books</button>
            <button id="FilterMusicBotton" class="filterBtn" type="button" onclick="">Music</button>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <button id="redirectToRootButton" type="button" onclick="clickCounterRedirectToRoot()">Home</button>
            <button id="redirectToAddNewMedia" type="button" onclick="clickCounterRedirectToAddNewMedia()">Create New Item</button>
        </div>
    </div>
    <div id="clickResult"></div>
    
    
<%--    <div class="btn-group btn-group-justified" role="group" aria-label="...">
  <div class="btn-group" role="group">
    <button type="button" id="redirectToRootButton1" onclick="clickCounterRedirectToRoot()" class="btn btn-default">Home</button>
  </div>--%>


</asp:Content>
