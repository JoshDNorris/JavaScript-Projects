function ff_winner() {
    var winner = document.getElementById("winner").value;
    var output;
    var str = " of course would win! Excellent choice";
    switch(winner) {
        case "Ronald McDonald":
            output = "Ronald McDonald " + str;
        break;
        case "Burger King":
            output = "Burger King " + str;
        break;
        case "Wendy":
            output = "Wendy " + str;
        break;
        default:
            output = "Please enter one of the options above";
    }
    document.getElementById("output").innerHTML = output;
}

function change_phrase() {
    document.getElementsByClassName("gonnaGetChanged")[0].innerHTML = "CHANGED!";

    var c = document.getElementById("id_name");
    var ctx = c.getContext("2d");
    ctx.font = "30px sans sarif";
    ctx.fillText("Hello world", 10, 50);
    var grd = ctx.createLinearGradient(0,0,170,0);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "white");
    ctx.fillStyle = grd;
    ctx.fillRect(40,100,100,100);
}