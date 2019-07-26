x = "global";

function global_funct() {
    document.getElementById("global").innerHTML = "Global variable is " + x;
}

function local_funct() {
    y = "local";
    document.getElementById("local").innerHTML = "Local is " + y;
}

function bad_funct() {
    document.getElementById("huzzah").innerHTML = "huzzah";
}
function getDate() {
    if (new Date().getHours() < 18) {
        document.getElementById("greeting").innerHTML = "How are you today?";
    }
    else {
        document.getElementById("greeting").innerHTML = "How are you tonight?";
    }
}
function time_function() {
    var Time = new Date().getHours();
    var Reply;
    if (Time < 12 == Time > 0) {
        Reply = "It is morning";
    }
    else if (Time > 12 == Time < 18) {
        Reply = "It is afternoon";
    }
    else {
        Reply = "It is evening";
    }
    document.getElementById("time_of_day").innerHTML = Reply;
}