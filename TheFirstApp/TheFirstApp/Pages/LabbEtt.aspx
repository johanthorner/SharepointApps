<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type ="text/javascript" src="../Scripts/Labb1Script.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
    <p>hej</p>

        
     <div id="FormulärDiv">
        <label for="Förnamn">Förnamn</label>  
        <input class="textInput" type="text" id="Förnamn" /><br/>
        <label for="Efternamn">Efternamn</label> 
        <input class="textInput" type="text" id="Efternamn"/><br/>
        <label for="epost">Epost</label> 
        <input class="textInput" type="text" id="epost" /><br/>
        <label for="address">Adress</label>
        <input class="textInput" type="text" id="address" /><br/>
        <label for="postnummer">Postnummer</label>
        <input class="textInput"type="text" id="postnummer" /><br/>
        <label for="ort">Ort</label>
        <input class="textInput"type="text" id="ort" /><br/>
        <label for="telNummer">Telnummer</label>
        <input class="textInput"type="text" id="telNummer" /><br/>
        <label for="datumStart">Datum för start</label>
        <input class="textInput"type="text" id="datumStart" /><br/>
     
         <input type="button" id="SubmitButton" value="submit" name="submit" onclick="SubmitButton()"/>
         <input type="button" id="AvbrytButton" value="Avbryt" name="submit" onclick="exitButtonKlicked()"/>
    </div>
       
</asp:Content>
