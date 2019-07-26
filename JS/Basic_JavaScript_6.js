function lets_vote() {
    var age, can_vote;
    age = document.getElementById("age").value;
    can_vote = (age < 18) ? "Too young":"Old enough";
    document.getElementById("output").innerHTML = can_vote + " to vote.";
}
function vehicle(make, model, year, color) {
    this.vehicle_make = make;
    this.vehicle_model = model;
    this.vehicle_year = year;
    this.vehicle_color = color;
}
var Jack = new vehicle("Dodge", "viper", 2020, "red");
var Emily = new vehicle("jeep", "cherokee", 2019, "white");
var Erik = new vehicle("Ford", "escort", 1912, "off white");
function newFunction() {
    document.getElementById("keywords_and_constructors").innerHTML =
    "Erik drives a " + Erik.vehicle_color + Erik.vehicle_model + " built in " + Erik.vehicle_year;
}
function class_list(name, age) {
    this.name = name;
    this.age = age;
}
var Jim = new class_list("Jim", 24);
var Amber = new class_list("Amber", 43);

function new_function() {
    document.getElementById("New_and_This").innerHTML =
    Amber.name + " is " + Amber.age + " years old.";
}
function count_funct() {
    document.getElementById("counting").innerHTML = count();
    function count(){
        var start = 2;
        start += 1;
        return start;
    }
}