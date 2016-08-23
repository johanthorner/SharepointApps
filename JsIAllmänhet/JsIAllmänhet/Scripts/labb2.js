"use strict";


var MyApp = MyApp || {}
MyApp.Cars = MyApp.Cars || {}
MyApp.Employees = MyApp.Employees || {}

function Employee(name, hasCar) {
    this.name = name;
    this.hasCar = hasCar;
}

MyApp.Employees.employeesList = [
    MyApp.Employees.Employee = new Employee("kalle", false),
    MyApp.Employees.Employee = new Employee("Olle", true),
    MyApp.Employees.Employee = new Employee("Ada", false),
    MyApp.Employees.Employee = new Employee("Glenn", false)
];

MyApp.Cars.carsList = ["Volvo", "Opel", "Nissan"];

MyApp.displayList = function(list) {
   

        var toDisplay = "";

        for (var i = 0; i < list.length; i++)
        {
            if (list[i].hasCar === true)
            {
            toDisplay += list[i].name + " ";
            }
       
        }
        document.getElementById("textDiv").innerHTML = toDisplay;

}

MyApp.Cars.PrintCars = function(list)
{
    var toDisplay = "";
    for (var i = 0; i < list.length; i++) {
            toDisplay += list[i] + " ";

    }
    document.getElementById("textDiv").innerHTML = toDisplay;

}

MyApp.Employees.DoEmplyeeHaveACar = function(list) {

    var dfd = $.Deferred();
    
    console.log("Check for cars...");
    var numberOfCars = 0;

    for (var i = 0; i < list.length; i++) {
        if (list[i].hasCar === true) {
            numberOfCars++;
            console.log("Car true");

        } else {
            console.log("Car false");
        }
    }
    if (numberOfCars > 0) {
        dfd.resolve();
    } else {
        dfd.reject();
    }
   return dfd.promise();

}

MyApp.Employees.ViewEmployeesBtn = function () {

    
    MyApp.Employees.DoEmplyeeHaveACar(MyApp.Employees.employeesList).then(
        function() {
            MyApp.displayList(MyApp.Employees.employeesList);
            console.log("One ore more cars found");
        },
        function() {
            document.getElementById("textDiv").innerHTML = "No persons with car found";
            console.log("No cars found");
        }
        ).always(function (){});
}

MyApp.Cars.ViewCarsBtn = function() {

    MyApp.Cars.PrintCars(MyApp.Cars.carsList);
}
   




