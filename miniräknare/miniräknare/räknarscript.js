


    function addNumber(input) {
        
      
        document.getElementById("display").value += input;
    }
    function additionNumber() {

        document.getElementById("display").value += "+";
    }
    function equals() {

        var cal = document.getElementById("display").value;
        
        var calArray = cal.split("+");
        
        for (var i = 0; i < calArray.length; i++) {
            console.log(calArray[i]);
        }
    }

 


