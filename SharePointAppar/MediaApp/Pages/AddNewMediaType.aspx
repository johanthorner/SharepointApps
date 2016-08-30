<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <style>
        @import 'https://fonts.googleapis.com/css?family=Lato';
    </style>

    <!-- Add your JavaScript to the following file -->
    <script src="../Scripts/ListProperties.js"></script>
    <script src="../Scripts/CreateItemPageScript.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />


    <div class="container">
        <p id="message"></p>

        <form id="redirectForm">
            <label>Title:</label><br />
            <input id="titleInput" type="text" name="titleInput" /><br />
            <label>Description:</label><br />
            <input id="descriptionInput" type="text" name="descriptionInput" /><br />
            <br />
            <select id="selectMedia"></select>
            <br />
            <br />
            <input id="SubmitItemData" type="submit" value="Add new item" /><br />
        </form>

        <button id="redirectToRootButton" type="button">redirectToRootPage</button>

    </div>
    <div id="CreateItemMessage">
    </div>

</asp:Content>

