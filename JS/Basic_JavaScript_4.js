function my_Dict() {
    var Animal = {
        Species: "Dog",
        Color:"Black",
        Breed:"Lab",
        Age:5,
        Sound:"Woof woof"
    };
    delete Animal.Color;
    document.getElementById("dict").innerHTML = Animal.Color;
}