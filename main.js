$(document).ready(runThisOnLoad);
var blackCounter = 0;
var redCounter = 0;

function runThisOnLoad() {
	makeCheckersBoard();
	clickHandler();
}

var initialRow = null;
var initialCol = null;
var destRow = null;
var destCol = null;

var blackTurn = true;
var redTurn = false;


var checkerBoardArray = [
	[' ', 'r', ' ', 'r', ' ', 'r', ' ', 'r'],
	['r', ' ', 'r', ' ', 'r', ' ', 'r', ' '],
	[' ', 'r', ' ', 'r', ' ', 'r', ' ', 'r'],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	['b', ' ', 'b', ' ', 'b', ' ', 'b', ' '],
	[' ', 'b', ' ', 'b', ' ', 'b', ' ', 'b'],
	['b', ' ', 'b', ' ', 'b', ' ', 'b', ' ']
];

function makeCheckersBoard() {
	var switcher = 0;
	for (var rowI = 0; rowI < 8; rowI++) {
		switcher = 1 - switcher;
		for (var colI = 0; colI < 8; colI++) {
			var gameBoard = $('.gameboard');
			if (switcher) {
				var divMake = $('<div>').addClass('board-square red-square').attr({
					'row': rowI,
					'col': colI
				});
				switcher = 1 - switcher;
			} else {
				if (checkerBoardArray[rowI][colI] === 'r') {
					var divMake = $('<div>').addClass('board-square black-square').attr({
						'row': rowI,
						'col': colI
					});
					var divMake2 = $('<div>').addClass('board-square red-checker play-checker-tile').attr({
						'row': rowI,
						'col': colI
					});
					divMake.append(divMake2);
					switcher = 1 - switcher;
				} else if (checkerBoardArray[rowI][colI] === 'b') {
					var divMake = $('<div>').addClass('board-square black-square').attr({
						'row': rowI,
						'col': colI
					});
					var divMake2 = $('<div>').addClass('board-square black-checker play-checker-tile').attr({
						'row': rowI,
						'col': colI
					});
					divMake.append(divMake2);
					switcher = 1 - switcher;
				} else {
					var divMake = $('<div>').addClass('board-square black-square').attr({
						'row': rowI,
						'col': colI
					});
					var divMake2 = $('<div>').addClass('board-square play-checker-tile').attr({
						'row': rowI,
						'col': colI
					});
					divMake.append(divMake2);
					switcher = 1 - switcher;
				}
			}
			gameBoard.append(divMake);

		}
	}
}

function clickHandler() {
	$(".gameboard").on('click', '.black-checker', highlightBlack);
	$(".gameboard").on('click', '.red-checker', highlightRed);
	$(".gameboard").on("click", ".highlight", handleCheckerMove);
	$(".gameboard").on("click", ".redking", highlightRedKing);
	$(".gameboard").on("click", ".blackking", highlightBlackKing);
	$(".reset-button").on("click", resetGame);
}

function highlightBlack(){ // function for when black checker is selected
	if (blackTurn){
			$('.play-checker-tile').removeClass('highlight highlight2'); //removes previous possible movement highlights
			initialRow = parseInt($(this).attr('row'));
			initialCol = parseInt($(this).attr('col'));
			$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).addClass('highlight2'); //adds green highlight to current selected checker
		var oneMoveRowLeft = initialRow-1;
		var oneMoveColLeft = initialCol-1;
		var oneMoveRowRight = initialRow-1;
		var oneMoveColRight = initialCol+1;
		var twoMovesRowLeft = initialRow-2; //general calculations for possible movement directions
		var twoMovesColLeft = initialCol-2;
		var twoMovesRowRight = initialRow-2;
		var twoMovesColRight = initialCol+2;
    
		if (0 <= oneMoveRowLeft && 0 <= oneMoveColLeft) {
			if (checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === ' ') {
				$(`.play-checker-tile[row=${oneMoveRowLeft}][col=${oneMoveColLeft}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === 'r' && 0 <= twoMovesRowLeft && 0 <= twoMovesColLeft){  //calculations for left movements
				if(checkerBoardArray[twoMovesRowLeft][twoMovesColLeft] === ' '){	
					$(`.play-checker-tile[row=${twoMovesRowLeft}][col=${twoMovesColLeft}]`).addClass('highlight');
				}
			} else if (checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === 'rk' && 0 <= twoMovesRowLeft && 0 <= twoMovesColLeft) {
				if (checkerBoardArray[twoMovesRowLeft][twoMovesColLeft] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowLeft}][col=${twoMovesColLeft}]`).addClass('highlight');
				}
			}
		}
		if (checkerBoardArray.length > oneMoveRowRight && checkerBoardArray.length > oneMoveColRight) {
			if (checkerBoardArray[oneMoveRowRight][oneMoveColRight] === ' ') {
				$(`.play-checker-tile[row=${oneMoveRowRight}][col=${oneMoveColRight}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowRight][oneMoveColRight] === 'r' && 0 <= twoMovesRowRight && 0 <= twoMovesColRight){ //calculations for right movement
				if(checkerBoardArray[twoMovesRowRight][twoMovesColRight] === ' '){
					$(`.play-checker-tile[row=${twoMovesRowRight}][col=${twoMovesColRight}]`).addClass('highlight');
				}
			} else if (checkerBoardArray[oneMoveRowRight][oneMoveColRight] === 'rk' && 0 <= twoMovesRowRight && 0 <= twoMovesColRight) {
				if (checkerBoardArray[twoMovesRowRight][twoMovesColRight] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowRight}][col=${twoMovesColRight}]`).addClass('highlight');
				}
			}
		}
	} else {
		return;
	}
}

function highlightRed(){
	if (redTurn){
			$('.play-checker-tile').removeClass('highlight highlight2'); //removes previous possible movement highlights
			initialRow = parseInt($(this).attr('row'));
			initialCol = parseInt($(this).attr('col'));
			$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).addClass('highlight2'); //adds green highlight to current selected checker
		var oneMoveRowLeft = initialRow+1;
		var oneMoveColLeft = initialCol-1;
		var oneMoveRowRight = initialRow+1;
		var oneMoveColRight = initialCol+1;
		var twoMovesRowLeft = initialRow+2; //general calculations for possible movement directions
		var twoMovesColLeft = initialCol-2;
		var twoMovesRowRight = initialRow+2;
		var twoMovesColRight = initialCol+2;

		if(checkerBoardArray.length > oneMoveRowLeft && checkerBoardArray.length > oneMoveColLeft){	//calculations for left movement
			if(checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowLeft}][col=${oneMoveColLeft}]`).addClass('highlight');
			} else if (checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === 'b' && checkerBoardArray.length > twoMovesRowLeft && checkerBoardArray.length > twoMovesColLeft) {
				if (checkerBoardArray[twoMovesRowLeft][twoMovesColLeft] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowLeft}][col=${twoMovesColLeft}]`).addClass('highlight');
				}
			} else if (checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === 'bk' && checkerBoardArray.length > twoMovesRowLeft && checkerBoardArray.length > twoMovesColLeft) {
				if (checkerBoardArray[twoMovesRowLeft][twoMovesColLeft] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowLeft}][col=${twoMovesColLeft}]`).addClass('highlight');
				}
			}		
		}	 
		if(checkerBoardArray.length > oneMoveRowRight && checkerBoardArray.length > oneMoveColRight){	//calculations for right movement
			if(checkerBoardArray[oneMoveRowRight][oneMoveColRight] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowRight}][col=${oneMoveColRight}]`).addClass('highlight');
			} else if (checkerBoardArray[oneMoveRowRight][oneMoveColRight] === 'b' && checkerBoardArray.length > twoMovesRowRight && checkerBoardArray.length > twoMovesColRight) {
				if (checkerBoardArray[twoMovesRowRight][twoMovesColRight] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowRight}][col=${twoMovesColRight}]`).addClass('highlight');
				}
			} else if (checkerBoardArray[oneMoveRowRight][oneMoveColRight] === 'bk' && checkerBoardArray.length > twoMovesRowRight && checkerBoardArray.length > twoMovesColRight) {
				if (checkerBoardArray[twoMovesRowRight][twoMovesColRight] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowRight}][col=${twoMovesColRight}]`).addClass('highlight');
				}
			}
		}
	} else {
		return;
	}
}

function highlightRedKing(){ //function for when red king is clicked on
	if (redTurn){
			$('.play-checker-tile').removeClass('highlight highlight2'); //removes previous possible movement highlights
			initialRow = parseInt($(this).attr('row'));
			initialRow = parseInt($(this).attr('row'));
			initialCol = parseInt($(this).attr('col'));
			$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).addClass('highlight2'); //adds green highlight to current selected checker
		var oneMoveRowLeftDown = initialRow+1;
		var oneMoveColLeftDown = initialCol-1;
		var oneMoveRowRightDown = initialRow+1;
		var oneMoveColRightDown = initialCol+1;
		var twoMovesRowLeftDown = initialRow+2;
		var twoMovesColLeftDown = initialCol-2;
		var twoMovesRowRightDown = initialRow+2;
		var twoMovesColRightDown = initialCol+2; //general calculations for possible movement directions
		var oneMoveRowLeftUp = initialRow-1;
		var oneMoveColLeftUp = initialCol-1;
		var oneMoveRowRightUp = initialRow-1;
		var oneMoveColRightUp = initialCol+1;
		var twoMovesRowLeftUp = initialRow-2;
		var twoMovesColLeftUp = initialCol-2;
		var twoMovesRowRightUp = initialRow-2;
		var twoMovesColRight = initialCol+2;

		if(checkerBoardArray.length > oneMoveRowLeftDown && checkerBoardArray.length > oneMoveColLeftDown){	 //calculations for left and down movement
			if(checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowLeftDown}][col=${oneMoveColLeftDown}]`).addClass('highlight');
			} else if (checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === 'b' && checkerBoardArray.length > twoMovesRowLeftDown && checkerBoardArray.length > twoMovesColLeftDown) {
				if (checkerBoardArray[twoMovesRowLeftDown][twoMovesColLeftDown] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowLeftDown}][col=${twoMovesColLeftDown}]`).addClass('highlight');
				}
			} else if (checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === 'bk' && checkerBoardArray.length > twoMovesRowLeftDown && checkerBoardArray.length > twoMovesColLeftDown) {
				if (checkerBoardArray[twoMovesRowLeftDown][twoMovesColLeftDown] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowLeftDown}][col=${twoMovesColLeftDown}]`).addClass('highlight');
				}
			}
		}	 
		if(checkerBoardArray.length > oneMoveRowRightDown && checkerBoardArray.length > oneMoveColRightDown){	 //calculations for right and down movement
			if(checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowRightDown}][col=${oneMoveColRightDown}]`).addClass('highlight');
			} else if (checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === 'b' && checkerBoardArray.length > twoMovesRowRightDown && checkerBoardArray.length > twoMovesColRightDown) {
				if (checkerBoardArray[twoMovesRowRightDown][twoMovesColRightDown] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowRightDown}][col=${twoMovesColRightDown}]`).addClass('highlight');
				}
			} else if (checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === 'bk' && checkerBoardArray.length > twoMovesRowRightDown && checkerBoardArray.length > twoMovesColRightDown) {
				if (checkerBoardArray[twoMovesRowRightDown][twoMovesColRightDown] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowRightDown}][col=${twoMovesColRightDown}]`).addClass('highlight');
				}
			}
		}
		if (0 <= oneMoveRowLeftUp && 0 <= oneMoveColLeftUp) {
			if (checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === ' ') {
				$(`.play-checker-tile[row=${oneMoveRowLeftUp}][col=${oneMoveColLeftUp}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === 'b' && 0 <= twoMovesRowLeftUp && 0 <= twoMovesColLeftUp){ //calculations for left and up movement
				if(checkerBoardArray[twoMovesRowLeftUp][twoMovesColLeftUp] === ' '){	
					$(`.play-checker-tile[row=${twoMovesRowLeftUp}][col=${twoMovesColLeftUp}]`).addClass('highlight');
				}
			} else if (checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === 'bk' && 0 <= twoMovesRowLeftUp && 0 <= twoMovesColLeftUp) {
				if (checkerBoardArray[twoMovesRowLeftUp][twoMovesColLeftUp] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowLeftUp}][col=${twoMovesColLeftUp}]`).addClass('highlight');
				}
			}
		}
		if (0 <= oneMoveRowRightUp && 0 <= oneMoveColRightUp) {
			if (checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === ' ') {
				$(`.play-checker-tile[row=${oneMoveRowRightUp}][col=${oneMoveColRightUp}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === 'b' && 0 <= twoMovesRowRightUp && 0 <= twoMovesColRight){ //calculations for right and up movement
				if(checkerBoardArray[twoMovesRowRightUp][twoMovesColRight] === ' '){
					$(`.play-checker-tile[row=${twoMovesRowRightUp}][col=${twoMovesColRight}]`).addClass('highlight');
				}
			} else if (checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === 'bk' && 0 <= twoMovesRowRightUp && 0 <= twoMovesColRight) {
				if (checkerBoardArray[twoMovesRowRightUp][twoMovesColRight] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowRightUp}][col=${twoMovesColRight}]`).addClass('highlight');
				}
			}
		}
	} else {
		return;
	}
}

function highlightBlackKing(){
	if (blackTurn){
			$('.play-checker-tile').removeClass('highlight highlight2');//removes previous possible movement highlights
			initialRow = parseInt($(this).attr('row'));
			initialCol = parseInt($(this).attr('col'));
			$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).addClass('highlight2'); //adds green highlight to current selected checker
		var oneMoveRowLeftDown = initialRow+1;
		var oneMoveColLeftDown = initialCol-1;
		var oneMoveRowRightDown = initialRow+1;
		var oneMoveColRightDown = initialCol+1;
		var twoMovesRowLeftDown = initialRow+2;
		var twoMovesColLeftDown = initialCol-2;
		var twoMovesRowRightDown = initialRow+2; //general calculations for possible movement directions
		var twoMovesColRightDown = initialCol+2;
		var oneMoveRowLeftUp = initialRow-1;
		var oneMoveColLeftUp = initialCol-1;
		var oneMoveRowRightUp = initialRow-1;
		var oneMoveColRightUp = initialCol+1;
		var twoMovesRowLeftUp = initialRow-2;
		var twoMovesColLeftUp = initialCol-2;
		var twoMovesRowRightUp = initialRow-2;
		var twoMovesColRight = initialCol+2;

		if(checkerBoardArray.length > oneMoveRowLeftDown && checkerBoardArray.length > oneMoveColLeftDown){	//calculations for left and down movement
			if(checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowLeftDown}][col=${oneMoveColLeftDown}]`).addClass('highlight');
			} else if (checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === 'r' && checkerBoardArray.length > twoMovesRowLeftDown && checkerBoardArray.length > twoMovesColLeftDown) {
				if (checkerBoardArray[twoMovesRowLeftDown][twoMovesColLeftDown] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowLeftDown}][col=${twoMovesColLeftDown}]`).addClass('highlight');
				}
			} else if (checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === 'rk' && checkerBoardArray.length > twoMovesRowLeftDown && checkerBoardArray.length > twoMovesColLeftDown) {
				if (checkerBoardArray[twoMovesRowLeftDown][twoMovesColLeftDown] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowLeftDown}][col=${twoMovesColLeftDown}]`).addClass('highlight');
				}
			}
		}	 
		if(checkerBoardArray.length > oneMoveRowRightDown && checkerBoardArray.length > oneMoveColRightDown){	//calculations for right and down movement
			if(checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowRightDown}][col=${oneMoveColRightDown}]`).addClass('highlight');
			} else if (checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === 'r' && checkerBoardArray.length > twoMovesRowRightDown && checkerBoardArray.length > twoMovesColRightDown) {
				if (checkerBoardArray[twoMovesRowRightDown][twoMovesColRightDown] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowRightDown}][col=${twoMovesColRightDown}]`).addClass('highlight');
				}
			} else if (checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === 'rk' && checkerBoardArray.length > twoMovesRowRightDown && checkerBoardArray.length > twoMovesColRightDown) {
				if (checkerBoardArray[twoMovesRowRightDown][twoMovesColRightDown] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowRightDown}][col=${twoMovesColRightDown}]`).addClass('highlight');
				}
			}
		}
		if (0 <= oneMoveRowLeftUp && 0 <= oneMoveColLeftUp) {
			if (checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === ' ') {
				$(`.play-checker-tile[row=${oneMoveRowLeftUp}][col=${oneMoveColLeftUp}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === 'r' && 0 <= twoMovesRowLeftUp && 0 <= twoMovesColLeftUp){ //calculations for left and up movement
				if(checkerBoardArray[twoMovesRowLeftUp][twoMovesColLeftUp] === ' '){	
					$(`.play-checker-tile[row=${twoMovesRowLeftUp}][col=${twoMovesColLeftUp}]`).addClass('highlight');
				}
			} else if (checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === 'rk' && 0 <= twoMovesRowLeftUp && 0 <= twoMovesColLeftUp) {
				if (checkerBoardArray[twoMovesRowLeftUp][twoMovesColLeftUp] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowLeftUp}][col=${twoMovesColLeftUp}]`).addClass('highlight');
				}
			}
		}
		if (0 <= oneMoveRowRightUp && 0 <= oneMoveColRightUp) {
			if (checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === ' ') {
				$(`.play-checker-tile[row=${oneMoveRowRightUp}][col=${oneMoveColRightUp}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === 'r' && 0 <= twoMovesRowRightUp && 0 <= twoMovesColRight){ //calculations for right and up movement
				if(checkerBoardArray[twoMovesRowRightUp][twoMovesColRight] === ' '){
					$(`.play-checker-tile[row=${twoMovesRowRightUp}][col=${twoMovesColRight}]`).addClass('highlight');
				}
			} else if (checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === 'rk' && 0 <= twoMovesRowRightUp && 0 <= twoMovesColRight) {
				if (checkerBoardArray[twoMovesRowRightUp][twoMovesColRight] === ' ') {
					$(`.play-checker-tile[row=${twoMovesRowRightUp}][col=${twoMovesColRight}]`).addClass('highlight');
				}
			}
		}
	} else {
		return;
	}
}
//This function will switch player 1 & player 2
function switchPlayer() {
	if (blackTurn) {
		blackTurn = false;
		redTurn = true;
		$(".player2-image").css("border-color", "red");
		$(".player1-image").css("border-color", "green");
		$('.play-checker-tile').removeClass('highlight highlight2');
	} else if(redTurn){
		redTurn = false;
		blackTurn = true;
		$(".player1-image").css("border-color", "red");
		$(".player2-image").css("border-color", "green");
		$('.play-checker-tile').removeClass('highlight highlight2');
	}
}

//This function will move a checker from it's last position to it's new position
function movePiece() {
	//if red king,
	if (checkerBoardArray[initialRow][initialCol] === 'rk') {
		//adding class for destination position
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('redking');
		//removing class for initial position
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('redking');
		//updating javascript array
		checkerBoardArray[destRow][destCol] = 'rk';
		checkerBoardArray[initialRow][initialCol] = ' ';
	}
	//if black king, (doing the same funcionality as - if red king)
	if (checkerBoardArray[initialRow][initialCol] === 'bk') {
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('blackking');
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('blackking');
		checkerBoardArray[destRow][destCol] = 'bk';
		checkerBoardArray[initialRow][initialCol] = ' ';
	}
	//if red checker,
	if (checkerBoardArray[initialRow][initialCol] === 'r') {
		//adding class for destination position
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('red-checker');
		//removing class for initial position
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('red-checker');
		//updating javascript array
		checkerBoardArray[destRow][destCol] = 'r';
		checkerBoardArray[initialRow][initialCol] = ' ';
		//if red checker reaches the bottom of the board,
		if (destRow === 7) {
			//git it a class of red king
			$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('redking').removeClass('red-checker');
			checkerBoardArray[destRow][destCol] = 'rk';
		}
		//if black checker, (doing the same funcionality as - if red checker)
	} else if (checkerBoardArray[initialRow][initialCol] === 'b') {
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('black-checker');
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('black-checker');
		checkerBoardArray[destRow][destCol] = 'b';
		checkerBoardArray[initialRow][initialCol] = ' ';
		if (destRow === 0) {
			$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('blackking').removeClass('black-checker');
			checkerBoardArray[destRow][destCol] = 'bk';
		}
	}
}
//This function will remove the opponent's checker
function removeOpponentPiece() {
	var destinationPiece = checkerBoardArray[destRow][destCol];
	//if its a king
	if (checkerBoardArray[destRow][destCol].indexOf('k') !== -1) {
		var color = '';
		//remove class depending on if its black or red
		if (destinationPiece.indexOf('b')) {
			color = 'black';
		} else {
			color = 'red';
		}
		var removeCheckerClass = color + '-checker';
		var removeKingClass = color + 'king';
		var classesToRemove = `${removeCheckerClass} ${removeKingClass}`;
		//if checker moves to the right side
		if (destCol - initialCol > 0) {
			//right up
			if (destRow - initialRow < 0) {
				$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol+1}]`).removeClass(classesToRemove);
				checkerBoardArray[(initialRow - 1)][(initialCol + 1)] = ' ';
				//right down
			} else if (destRow - initialRow > 0) {
				$(`.play-checker-tile[row=${initialRow+1}][col=${initialCol+1}]`).removeClass(classesToRemove);
				checkerBoardArray[(initialRow + 1)][(initialCol + 1)] = ' ';
			}
			// if the checker moves to the left side
		} else if (destCol - initialCol < 0) {
			//left up	
			debugger;
			if (destRow - initialRow < 0) {
				$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol-1}]`).removeClass(classesToRemove);
				checkerBoardArray[(initialRow - 1)][(initialCol - 1)] = ' ';
				//left down
			} else if (destRow - initialRow > 0) {
				$(`.play-checker-tile[row=${initialRow+1}][col=${initialCol-1}]`).removeClass(classesToRemove);
				checkerBoardArray[(initialRow + 1)][(initialCol - 1)] = ' ';
			}
		}
		if (color === 'black') {
			blackCounter++
		} else if (color === 'red') {
			redCounter++
		}
	}
	//if black checker
	if (checkerBoardArray[destRow][destCol] === 'b') {
		//if moved up right
		if (destCol - initialCol > 0) {
			$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol+1}]`).removeClass("red-checker");
			checkerBoardArray[(initialRow - 1)][(initialCol + 1)] = ' ';
			blackCounter++;
		}
		//if moved up left
		else if (destCol - initialCol < 0) {
			$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol-1}]`).removeClass("red-checker");
			checkerBoardArray[(initialRow - 1)][(initialCol - 1)] = ' ';
			blackCounter++;
		}
	}
	//else if red checker
	else if (checkerBoardArray[destRow][destCol] === 'r') {
		//moved down right
		if (destCol - initialCol > 0) {
			$(`.play-checker-tile[row=${destRow-1}][col=${destCol-1}]`).removeClass("black-checker");
			checkerBoardArray[(destRow - 1)][(destCol - 1)] = ' ';
			redCounter++;
		}
		//moved down left
		else if (destCol - initialCol < 0) {
			$(`.play-checker-tile[row=${destRow-1}][col=${destCol+1}]`).removeClass("black-checker");
			checkerBoardArray[(destRow - 1)][(destCol + 1)] = ' ';
			redCounter++;
		}
	}
	//add win counter onto DOM
	$("#player1score").text(redCounter);
	$("#player2score").text(blackCounter);
	// if you win,
	if (blackCounter === 12) {
		$('#player2win').text("You Won!");
	} else if (redCounter === 12) {
		$('#player1win').text("You Won!");
	}
}

//This function calls appropriate functions depending on the checker's move
function handleCheckerMove() {
	$('.play-checker-tile').removeClass('highlight');
	destRow = parseInt($(this).attr('row'));
	destCol = parseInt($(this).attr('col'));
	//if jumped over an opponent's checker
	if (Math.abs(destRow - initialRow) === 2) {
		movePiece();
		removeOpponentPiece();
		switchPlayer();
	}
	//if just moving
	else if (Math.abs(destRow - initialRow) === 1) {
		movePiece();
		switchPlayer();
	}
}

//This function resets the whole game
function resetGame() {
	$(".gameboard").empty();
	initialRow = null;
	initialCol = null;
	destRow = null;
	destCol = null;
	checkerBoardArray = [
		[' ', 'r', ' ', 'r', ' ', 'r', ' ', 'r'],
		['r', ' ', 'r', ' ', 'r', ' ', 'r', ' '],
		[' ', 'r', ' ', 'r', ' ', 'r', ' ', 'r'],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['b', ' ', 'b', ' ', 'b', ' ', 'b', ' '],
		[' ', 'b', ' ', 'b', ' ', 'b', ' ', 'b'],
		['b', ' ', 'b', ' ', 'b', ' ', 'b', ' ']
	];
	makeCheckersBoard();
}