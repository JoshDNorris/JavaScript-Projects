function validateInput() {
    var x = document.forms["frm1"]["fname"].value;
    if (x == "") {
        alert("You must input name");
        return false;
    }
}

function displayType(character) {
    var characterType = character.getAttribute("data-character-type");
    alert(characterType + " is in the " + character.innerHTML + " universe");
}