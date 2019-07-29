function Call_Loop() {
    var Digit = "";
    var x = 1;
    while (x < 11) {
        Digit += "<br>" + x;
        x++;
    }
    document.getElementById("Loop").innerHTML = Digit;
}

function get_str_length() {
    var str = document.getElementById("str_input").value;
    if (str.length < 2) {
        alert("That word has one character");
    }
    else{
        alert("That word has " + str.length + " characters");
    }
}
/*For loop and array combined*/
function for_loop() {
    var list = "";
    var instruments = ['Guitar', 'Sax', 'Drum'];
    for (index = 0; index < instruments.length; ++index){
        list += "<br>" + instruments[index];    
    }
    document.getElementById("instrument_list").innerHTML = list;
}
const x = 10;

function constant_function() {
    /*x = x + 1; --does not work because x is a constant*/
    document.getElementById("constant").innerHTML = x;    
}

var y = "order 66";
function var_vs_const() {
    let y = "Kill all jedi";
}
function let_alert() {
    alert(y);
}
function return_funct(){
    var x = myFunction(11, 12); 

    function myFunction(a, b) {
    return a + b;   
    }  
    document.getElementById("add").innerHTML = x;
}

function call_car_facts(){
    let car = {
        make: "Chevy ",
        model: "Cobalt ",
        year: "2007 ",
        color: "pewter ",
        description : function () {
            return "My car is a crappy " + this.year + this.color + this.make + this.model + ". Can't wait to get a new one.";
        }
    };
    document.getElementById("car_facts").innerHTML = car.description();
}
function halvinator() {
    var num = document.getElementById("num_input").value;
    while ((num % 2) == 0) {
        num = num / 2;
        if ((num % 2) != 0) {
            break;
        }
        else {
            continue;
        }
    }
    document.getElementById("result").innerHTML = num;   
}