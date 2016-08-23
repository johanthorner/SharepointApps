     
      $(document).ready(function() {

          
          document.getElementById("SubmitButton").addEventListener("click", function() {

              var inputs = document.getElementsByClassName("textInput");
             
              alert("Hej " + inputs[0].value + " " + inputs[1].value + " Kontrollera att uppgifterna stämmer: " + "\n" +
                 "Epost" + " \t \t \t \t" + inputs[2].value + " \n" +
                 "Adress " + " \t \t \t \t" + inputs[3].value + " \n" +
                 "Postnummer" + " \t \t \t" + inputs[4].value + "\n" +
                 "Ort " + "\t \t \t \t \t" + inputs[5].value + " \n" +
                 "telefon: " + "\t \t \t \t" + inputs[6].value + " \n" +
                 "Datum för start " + "\t \t" + inputs[7].value);

          });
          document.getElementById("AvbrytButton").addEventListener("click", function() {

              var inputs = document.getElementsByClassName("textInput");
              for (var i = 0; i < inputs.length; i++) {
                  inputs[i].value = "";
              }
          });
      });
    