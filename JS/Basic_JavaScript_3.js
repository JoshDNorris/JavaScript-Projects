function addStuff() {
    var add = 2+2;
    document.getElementById("math").innerHTML = "It's " + add + "!";   
}
function subStuff() {
    var subtract = 8-3;
    document.getElementById("math").innerHTML = subtract;
}
function modStuff() {
    var modulus = 29%7;
    document.getElementById("mod").innerHTML = -modulus;
}
window.alert(Math.random() * 100);