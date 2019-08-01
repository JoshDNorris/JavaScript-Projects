//This function will get fired when DOM is loaded
//Disable the stop button since it's not needed until game is started
window.onload = function() {watch()};
function watch() {
    var btn = document.getElementById('btnStop');
    btnDisabled(btn); //disables button until game is started
}

//this function will roll random number twice to determine first player
function rollForTurn() {
    var xArray = [];
    var ranNum = '';
    var min = 1;
    var max = 11;
    var first = "";
    var txt1 = "";
    for (var i = 0; i < 2; i++) {
        ranNum = Math.floor(Math.random()*(max - min) + min);
        xArray.push(ranNum);
    }
    diceRoll(); //play dice sounds during the game roll
    // show result of dice roll
    for (i = 0; i < xArray.length; i++) {
        var result = i + 1;
        var pOne = xArray[0];
        var pTwo = xArray[1];
        if (pOne ==pTwo) {//rigging roll on tie to avoid bug. Needs to be fixed
            pOne = 1;
            pTwo = 2;
        }
        txt1 = "Player 1 rolled [" + pOne + "]<br>";
        writeMsg(txt1);
        txt1 = txt1 + "Player 2 rolled [" + pTwo + "]<br><br>";
        setTimeout(function() {writeMsg(txt1);}, 1000); // time delay for dramatic effect
    }
    // determine and display winning player
    if (pOne > pTwo) {
        first = "Player 1";
        setTimeout(function(){txt1 = txt1 + "Player 1 wins, please choose a square.";}, 2000);
        setTimeout(function(){writeMsg(txt1);}, 2000);
    }
    else if (pOne < pTwo) {
        first = "Player 2";
        setTimeout(function(){txt1 = txt1 + "Player 2 wins, please choose a square.";}, 2000);
        setTimeout(function(){writeMsg(txt1);}, 2000);
    }
    // pass which player won the roll
    return first;
}

//initiate game, roll for turn, determine active player
function startGame() {
    var xTurn = 0;
    activePlayer = rollForTurn();
    if (activePlayer == "") { // if it was a tie, reroll
        activePlayer = rollForTurn();
    }    
    setTimeout(function() {hideGameMsg();}, 4000);

    // assign proper state of control buttons
    var btn = document.getElementById('btnStart');
    btnDisabled(btn); //disable the start button once game is started
    var btn = document.getElementById('btnStop');
    stopEnabled(btn); // enable stop button once game is started

    //assign the active player to the console
    var showPlayer = document.getElementById('showPlayer');
    showPlayer.innerHTML = activePlayer;
    showPlayer.style.color = "green";
}

//styles the game buttons while they're disabled
function btnDisabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(153,153,102)";
    btn.style.backgroundcolor = "rgb(214,214,194)";
    btn.disabled = true;
}

//styles game buttons while enabled
function stopEnabled(btn) {
    btn.style.color = "2px solid rgb(204,0,0)";
    btn.style.backgroundcolor = "rgb(255,51,51)";
    btn.disabled = false;
}

//styles game buttons while enabled
function startEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(0, 153, 0)";
	btn.style.backgroundColor = "rgb(57, 230, 0)";
	btn.disabled = false;
}

// when user indicates, stop current game and reset
function stopGame() {
    hideGameMsg(); //clear text and hide msg box
    var btn = document.getElementById('btnStart');
    startEnabled(btn); //enable start button
    var btn = document.getElementById('btnStop');
    btnDisabled(btn); //disable stop stop button
    var showPlayer = document.getElementById('showPlayer');
    showPlayer.innerHTML = "Game Stopped";
    showPlayer.style.color = 'red';

    //reset all squares
    var arrayO = document.getElementsByClassName("O");
    var arrayX = document.getElementsByClassName("X");
    for (var i = 0; i < arrayO.length; i++) {
        arrayO[i].style.transform = "translateY(-100%)";
    }
    for (var i = 0; i < arrayX.length; i++) {
        arrayX[i].style.transform = "translateY(100%)";
    }
    //clear running log of game moves
    document.getElementById('boardState').innerHTML = "";
}
//extra space



//show message console with associated text
function showGameMsg() {
    document.getElementById('gameMsgBox').style.display = 'block';
}

//conceals message console from view
function hideGameMsg() {
    clearMsg() //clear text from view
    document.getElementById('gameMsgBox').style.display = 'none'; //hide the div
}

//writes text to msg console
function writeMsg(txt) {
    showGameMsg();
    document.getElementById('gameMsg').innerHTML = txt;
}

//clear text from msg console
function clearMsg() {
    document.getElementById('gameMsg').innerHTML = "";
}

//checks avatar assignments and prevents from being the same
//ie, both players can't be X
function saveSettings() {
    var p1Index = document.getElementById("player1").selectedIndex;
    var p1Selected = document.getElementById("player1").options;
    var p2Index = document.getElementById("player2").selectedIndex;
    var p2Selected = document.getElementById("player2").options;
    if (p1Selected[p1Index].text == p2Selected[p2Index].text) {
        alert("Error - Both players cannot use " + p1Selected[p1Index].text);
    }
    else {
        document.getElementById('p1Display').innerHTML = p1Selected[p1Index].text;
        document.getElementById('p2Display').innerHTML = p2Selected[p1Index].text;
    }
}

//returns currently assigned avatar for each player
function getAvatars() {
    var p1Avatar = document.getElementById("p1Display").innerHTML;
    var p2Avatar = document.getElementById("p2Display").innerHTML;
    var avatarArray = [p1Avatar,p2Avatar];
    return avatarArray;
}

//returns the active player's avatar
function determineAvatar() {
    //determine correct avatar to paint for the player
    var avatarArray = getAvatars();//returns array of both players avatars
    var active = document.getElementById('showPlayer').innerHTML; //get active player
    p1Avatar = avatarArray[0];
    p2Avatar = avatarArray[1];
    if (active == "Player 1") { //check which player is active
        var paintAvatar = p1Avatar;
    }
    else if (active == "Player 2") {
        var paintAvatar = p2Avatar;
    }
    return paintAvatar; //returns back correct avatar
}

//changes active player to next player
function avatarPlaced() {
    var parseText = document.getElementById('gameMsg').innerHTML;
    var showPlayer = document.getElementById('showPlayer');//select current element to memory
    //check if there's already a winner
    if (parseText == "Player 1 wins!" || parseText == "Player 2 wins!") {
        showPlayer.innerHTML = "Game Stopped";
        showPlayer.style.color = 'red';
    }
    activePlayer = showPlayer.innerHTML; //get current player from element
    if (activePlayer == "Player 1") { //once active player plays, switch player
        showPlayer.innerHTML = "Player 2";
    }
    else {
        showPlayer.innerHTML = "Player 1";
    }
    check4Tie(); //check to see if cat won
}

// gets array of current board and checks move for validity
function check(info, square) {
    for (var i in info) {
        var tempInfo = info[i].charAt(0); //comparing index of square
        if (tempInfo == square) {
            return tempInfo;
        }
    }
}


//makes sure user selection is empty and records square if not
function recordMoves(square) {
    var proposedMove = square;
    var boardState = document.getElementById('boardState').innerHTML;
    var info = boardState.split(',');
    verdict = check(info, square); 
    return verdict;
}


// gets list of previous moves and adds current move
function recordMove(currentMove) {
    var target = document.getElementById('boardState');
    var previousMoves = target.innerHTML;
    target.innerHTML = previousMoves + currentMove;
}

function checkForWinCon() {
    var squareArray = [];
    var target = document.getElementById('boardState');
    var info = target.innerHTML;
    info = info.substring(1);
    info = info.split(',');
    info.sort();
    for (var i in info) {
        squareArray.push(info[i].charAt(0));
    }
    // call the following array to check for possible win
    checkWinCon1(info,squareArray);
    checkWinCon2(info,squareArray);
    checkWinCon3(info,squareArray);
    checkWinCon4(info,squareArray);
    checkWinCon5(info,squareArray);
    checkWinCon6(info,squareArray);
    checkWinCon7(info,squareArray);
    checkWinCon8(info,squareArray);
    check4Tie();
}


// check 4 tie
function check4Tie() {
    var boardState = document.getElementById('boardState').innerHTML;
    boardState = boardState.substring(1);
    boardState = boardState.split(',');
    var check = document.getElementById('gameMsg').innerHTML;
    if(boardState.length >= 9 && check != "Player 1 wins!" && check != "Player 2 wins!") {
        var txt1 = "It's a tie!";
        tieSound();
        writeMsg(txt1);
        setTimeout(function() {stopGame();}, 3000);
    }
}


// calling winning function
function winner(winDetected, winCon) {
    if (winDetected == "win") {
        var showme = winDetected;
        var activePlayer = document.getElementById('showPlayer').innerHTML;
        var txt2 = activePlayer + " wins!";
        writeMsg(txt2);
        var btn = document.getElementById('btnStart');
        startEnabled(btn);
        var btn = document.getElementById('btnStop');
        btnDisabled(btn);
        document.getElementById('showPlayer').innerHTML = "Game Stopped";
        glowBoard(winCon);
    }
}

//lights up board for winner winner chicken dinner
function glowBoard(pos) {
    var index0 = pos[0];
    var index1 = pos[1];
    var index2 = pos[2];
    var squares = document.getElementsByClassName('square');
    for (var i = 0; i < squares.length; i++){
        if (i == index0) {
            var bg1 = squares[i];
            blink();
            winSound();
            setTimeout(function() {bg1.style.backgroundColor = 'rgb(244, 179, 66)';}, 100);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(244, 238, 66)';}, 200);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(197, 244, 66)';}, 300);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(122, 244, 66)';}, 400);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(66, 244, 235)';}, 500);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(244, 179, 66)';}, 600);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(244, 238, 66)';}, 700);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(197, 244, 66)';}, 800);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(122, 244, 66)';}, 900);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(66, 244, 235)';}, 1000);
			setTimeout(function() {bg1.style.backgroundColor = '#e5e6e8';}, 1100);
        } else if (i == index1) {
			var bg2 = squares[i];
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(66, 244, 235)';}, 100);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(122, 244, 66)';}, 200);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(197, 244, 66)';}, 300);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 238, 66)';}, 400);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 179, 66)';}, 500);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(66, 244, 235)';}, 600);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(122, 244, 66)';}, 700);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(197, 244, 66)';}, 800);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 238, 66)';}, 900);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 179, 66)';}, 1000);
			setTimeout(function() {bg2.style.backgroundColor = '#e5e6e8';}, 1100);
		} else if (i == index2) {
			var bg3 = squares[i];
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 179, 66)';}, 100);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 238, 66)';}, 200);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(197, 244, 66)';}, 300);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(122, 244, 66)';}, 400);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(66, 244, 235)';}, 500);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 179, 66)';}, 600);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 238, 66)';}, 700);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(197, 244, 66)';}, 800);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(122, 244, 66)';}, 900);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(66, 244, 235)';}, 1000);
			setTimeout(function() {bg3.style.backgroundColor = '#e5e6e8';}, 1100);
		}
    }
    setTimeout(function() {stopGame();}, 1200);
}

//produces game sounds
function squareSound() {
    var sound = document.getElementById("placeAvatar");
    sound.play();
    setTimeout(function() {sound.pause();}, 400);
    setTimeout(function() {sound.currentTime = 0;}, 500);
}
function tieSound() {
    var sound = document.getElementById("tieGame");
    var check = document.getElementById('gameMsg').innerHTML;
    setTimeout(function() {sound.play();}, 500);
}
function winSound() {
    var sound = document.getElementById("winGame");
    setTimeout(function() {sound.play();}, 500);
    setTimeout(function() {sound.pause();}, 2700);
    setTimeout(function() {sound.currentTime = 0;}, 2800);
}
function diceRoll() {
    var sound = document.getElementById("diceRoll");
    sound.play();
}


//background color flashes for win
function blink() {
    var body = document.getElementById('body');
    setTimeout(function() {body.style.backgroundcolor = '#94f7ed';},100);
    setTimeout(function() {body.style.backgroundColor = '#94cef7';}, 200);
	setTimeout(function() {body.style.backgroundColor = '#94a6f7';}, 300);
	setTimeout(function() {body.style.backgroundColor = '#b094f7';}, 400);
	setTimeout(function() {body.style.backgroundColor = '#cc94f7';}, 500);
	setTimeout(function() {body.style.backgroundColor = '#e894f7';}, 600);
	setTimeout(function() {body.style.backgroundColor = '#f794d9';}, 700);
	setTimeout(function() {body.style.backgroundColor = '#f73881';}, 800);
	setTimeout(function() {body.style.backgroundColor = '#c6034e';}, 900);
	setTimeout(function() {body.style.backgroundColor = '#e00202';}, 1000);
	setTimeout(function() {body.style.backgroundColor = '#ffffff';}, 1100);
}

//functions to check on winning conditions
//check for win condition 012
//iterates through the array looking for a win on squares 0, 1, 2
function checkWinCon1(info,squareArray) {
	var winDetected = "on";
	var winCon1 = [0,1,2];
	// iterate through the growing array during 
	// gametime searching for the existence of 
	// index 0, index 1 and index 2 and once they
	// they do appear in the array, record their 
	// avatars and compare all 3 for win cons
	for (var i in info) {
		if (info[i].charAt(0) == "0") {
			var match0Avatar = info[i].charAt(1); // only interested in recording the avatar
		}
		if (info[i].charAt(0) == "1") {
			var match1Avatar = info[i].charAt(1);
		}
		if (info[i].charAt(0) == "2") {
			var match2Avatar = info[i].charAt(1);
		}
	}
	// this will trigger (ONLY) if there was a match for index0, index1, and index2
	if (match0Avatar != undefined && match1Avatar != undefined && match2Avatar != undefined) {
		if (match0Avatar == match1Avatar && match0Avatar == match2Avatar) {
			winDetected = "win"; // this flag will pass when a win has been detected
			winner(winDetected,winCon1);
			return;
		}
	}
	winner(winDetected,winCon1); // winCon1 is the array of win combo
}

// checking for wincon squares 345
function checkWinCon2(info,squareArray) {
	var winCon2 = [3,4,5];
	var winDetected = "on";
	for (var i in info) {
		if (info[i].charAt(0) == "3") {
			var match3Avatar = info[i].charAt(1); // only interested in recording the avatar
		}
		if (info[i].charAt(0) == "4") {
			var match4Avatar = info[i].charAt(1);
		}
		if (info[i].charAt(0) == "5") {
			var match5Avatar = info[i].charAt(1);
		}
	}
	if (match3Avatar != undefined && match4Avatar != undefined && match5Avatar != undefined) { // this will trigger (ONLY) if there was a match for index3, index4, and index5
		if (match3Avatar == match4Avatar && match3Avatar == match5Avatar) {
			winDetected = "win";
		}
	}
	winner(winDetected,winCon2);
}

// checking for wincon squares 678
function checkWinCon3(info,squareArray) {
	var winCon3 = [6,7,8];
	var winDetected = "on";
	for (var i in info) {
		if (info[i].charAt(0) == "6") {
			var match6Avatar = info[i].charAt(1); // only interested in recording the avatar
		}
		if (info[i].charAt(0) == "7") {
			var match7Avatar = info[i].charAt(1);
		}
		if (info[i].charAt(0) == "8") {
			var match8Avatar = info[i].charAt(1);
		}
	}
	if (match6Avatar != undefined && match7Avatar != undefined && match8Avatar != undefined) {
		if (match6Avatar == match7Avatar && match6Avatar == match8Avatar) {
			winDetected = "win";
		}
	}
	winner(winDetected,winCon3);
}

// checking for wincon squares 036
function checkWinCon4(info,squareArray) {
	var winCon4 = [0,3,6];
	var winDetected = "on";
	for (var i in info) {
		if (info[i].charAt(0) == "0") {
			var match0Avatar = info[i].charAt(1); // only interested in recording the avatar
		}
		if (info[i].charAt(0) == "3") {
			var match3Avatar = info[i].charAt(1);
		}
		if (info[i].charAt(0) == "6") {
			var match6Avatar = info[i].charAt(1);
		}
	}
	if (match0Avatar != undefined && match3Avatar != undefined && match6Avatar != undefined) {
		if (match0Avatar == match3Avatar && match0Avatar == match6Avatar) {
			winDetected = "win";
		}
	}
	winner(winDetected,winCon4);
}

// checking for wincon squares 147
function checkWinCon5(info,squareArray) {
	var winCon5 = [1,4,7];
	var winDetected = "on";
	for (var i in info) {
		if (info[i].charAt(0) == "1") {
			var match1Avatar = info[i].charAt(1); // only interested in recording the avatar
		}
		if (info[i].charAt(0) == "4") {
			var match4Avatar = info[i].charAt(1);
		}
		if (info[i].charAt(0) == "7") {
			var match7Avatar = info[i].charAt(1);
		}
	}
	if (match1Avatar != undefined && match4Avatar != undefined && match7Avatar != undefined) {
		if (match1Avatar == match4Avatar && match1Avatar == match7Avatar) {
			winDetected = "win";
		}
	}
	winner(winDetected,winCon5);
}

// checking for wincon squares 258
function checkWinCon6(info,squareArray) {
	var winCon6 = [2,5,8];
	var winDetected = "on";
	for (var i in info) {
		if (info[i].charAt(0) == "2") {
			var match2Avatar = info[i].charAt(1); // only interested in recording the avatar
		}
		if (info[i].charAt(0) == "5") {
			var match5Avatar = info[i].charAt(1);
		}
		if (info[i].charAt(0) == "8") {
			var match8Avatar = info[i].charAt(1);
		}
	}
	if (match2Avatar != undefined && match5Avatar != undefined && match8Avatar != undefined) {
		if (match2Avatar == match5Avatar && match2Avatar == match8Avatar) {
			winDetected = "win";
		}
	}
	winner(winDetected,winCon6);
}

// checking for wincon squares 642
function checkWinCon7(info,squareArray) {
	var winCon7 = [6,4,2];
	var winDetected = "on";
	for (var i in info) {
		if (info[i].charAt(0) == "6") {
			var match6Avatar = info[i].charAt(1); // only interested in recording the avatar
		}
		if (info[i].charAt(0) == "4") {
			var match4Avatar = info[i].charAt(1);
		}
		if (info[i].charAt(0) == "2") {
			var match2Avatar = info[i].charAt(1);
		}
	}
	if (match6Avatar != undefined && match4Avatar != undefined && match2Avatar != undefined) {
		if (match6Avatar == match4Avatar && match6Avatar == match2Avatar) {
			winDetected = "win";
		}
	}
	winner(winDetected,winCon7);
}

// checking for wincon squares 048
function checkWinCon8(info,squareArray) {
	var winCon8 = [0,4,8];
	var winDetected = "on";
	for (var i in info) {
		if (info[i].charAt(0) == "0") {
			var match0Avatar = info[i].charAt(1); // only interested in recording the avatar
		}
		if (info[i].charAt(0) == "4") {
			var match4Avatar = info[i].charAt(1);
		}
		if (info[i].charAt(0) == "8") {
			var match8Avatar = info[i].charAt(1);
		}
	}
	if (match0Avatar != undefined && match4Avatar != undefined && match8Avatar != undefined) {
		if (match0Avatar == match4Avatar && match0Avatar == match8Avatar) {
			winDetected = "win";
		}
	}
	winner(winDetected,winCon8);
}

//tracking square selections
function square1Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "0";
        //check if square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[0];
            if (paintAvatar =="O") {
                animateO(selected);
            }
            else if (paintAvatar =="X") {
                animateX(selected);
            }
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square, paintAvatar);
            squareSound();
        }
    }
}
function square2Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "1";
        //check if square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[1];
            if (paintAvatar =="O") {
                animateO(selected);
            }
            else if (paintAvatar =="X") {
                animateX(selected);
            }
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square, paintAvatar);
            squareSound();
        }
    }
}
function square3Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "2";
        //check if square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[2];
            if (paintAvatar =="O") {
                animateO(selected);
            }
            else if (paintAvatar =="X") {
                animateX(selected);
            }
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square, paintAvatar);
            squareSound();
        }
    }
}
function square4Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "3";
        //check if square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[3];
            if (paintAvatar =="O") {
                animateO(selected);
            }
            else if (paintAvatar =="X") {
                animateX(selected);
            }
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square, paintAvatar);
            squareSound();
        }
    }
}
function square5Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "4";
        //check if square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[4];
            if (paintAvatar =="O") {
                animateO(selected);
            }
            else if (paintAvatar =="X") {
                animateX(selected);
            }
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square, paintAvatar);
            squareSound();
        }
    }
}
function square6Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "5";
        //check if square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[5];
            if (paintAvatar =="O") {
                animateO(selected);
            }
            else if (paintAvatar =="X") {
                animateX(selected);
            }
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square, paintAvatar);
            squareSound();
        }
    }
}
function square7Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "6";
        //check if square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[6];
            if (paintAvatar =="O") {
                animateO(selected);
            }
            else if (paintAvatar =="X") {
                animateX(selected);
            }
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square, paintAvatar);
            squareSound();
        }
    }
}
function square8Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "7";
        //check if square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[7];
            if (paintAvatar =="O") {
                animateO(selected);
            }
            else if (paintAvatar =="X") {
                animateX(selected);
            }
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square, paintAvatar);
            squareSound();
        }
    }
}
function square9Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "8";
        //check if square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[8];
            if (paintAvatar =="O") {
                animateO(selected);
            }
            else if (paintAvatar =="X") {
                animateX(selected);
            }
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square, paintAvatar);
            squareSound();
        }
    }
}

//O avatar animation
function animateO(selected) {
    selected.style.transform = (selected.style.transform == "translateY(0%" || null) ? "translateY(0%)" : "translateY(0%)";
}
//x avatar animation
function animateX(selected) {
    selected.style.transform = (selected.style.transform == "translateY(0%" || null) ? "translateY(0%)" : "translateY(0%)";
}