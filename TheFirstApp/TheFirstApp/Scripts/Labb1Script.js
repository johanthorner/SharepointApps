        $(document).ready(function() {
      
            
            document.getElementById("SubmitButton").addEventListener("click", function () {
            var namn = document.getElementById("Förnamn");
            var efternamn = document.getElementById("Efternamn");
            var epost = document.getElementById("epost");
            var adress = document.getElementById("address");
            var postnummer = document.getElementById("postnummer");
            var ort = document.getElementById("ort");
            var telNummer = document.getElementById("telNummer");
            var datum = document.getElementById("datumStart");

            alert(" Hej " + namn.value +" " + efternamn.value + " Kontrollera att uppgifterna stämmer: " + epost.value +" "+ adress.value +" "+ postnummer.value +" "+ ort.value +" "+ telNummer.value +" "+ datum.value);
            });

        });
    
