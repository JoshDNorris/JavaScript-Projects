function full_sentence() {
    var part_1 = "I have ";
    var part_2 = "made this ";
    var part_3 = "into a complete sentence.";
    var whole_sentence = part_1.concat(part_2, part_3);
    document.getElementById("concatenate").innerHTML = whole_sentence;
}
function slice_method() {
    var sentence = "All work and no play makes Johnny a dull boy.";
    var section = sentence.slice(27,33);
    document.getElementById("Slice").innerHTML = section;
}
function upperize_funct() {
    var sentence = "click the button to upperize me!";
    var upperized = sentence.toUpperCase(sentence);
    document.getElementById("upperize").innerHTML = upperized;
}
function string_funct() {
    var x = 1423433;
    document.getElementById("num_to_string").innerHTML = x.toString();
}
function precise_me() {
    var x = 1423433;
    document.getElementById("num_to_string").innerHTML = x.toPrecision(3);
}
function cut_off() {
    var x = 145.2378;
    document.getElementById("cutOffDigits").innerHTML = x.toFixed(2);
}
function get_value_of() {
    str = "hey a string";
    val = str.valueOf();
    document.getElementById("valueof").innerHTML = val;
}