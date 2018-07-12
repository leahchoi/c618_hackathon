$(document).ready(runThisOnLoad);
var blackCounter = 0;
var redCounter = 0;
function runThisOnLoad(){
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
				[' ', ' ', ' ', 'r', ' ', ' ', ' ', ' '], 
				['b', ' ', 'b', ' ', 'b', ' ', 'b', ' '], 
				[' ', 'b', ' ', 'b', ' ', 'b', ' ', 'b'],
				['b', ' ', 'rk', ' ', 'b', ' ', 'b', ' ']
				];

function makeCheckersBoard(){
	var switcher = 0;
	for(var rowI = 0; rowI<8; rowI++){
		switcher = 1 - switcher;
		for(var colI = 0; colI<8; colI++){
			var gameBoard = $('.gameboard');
			if(switcher){
				var divMake = $('<div>').addClass('board-square red-square').attr({'row': rowI, 'col': colI});
				switcher = 1 - switcher;
			} else {
				if(checkerBoardArray[rowI][colI] === 'r'){
					var divMake = $('<div>').addClass('board-square black-square').attr({'row': rowI, 'col': colI});
					var divMake2 = $('<div>').addClass('board-square red-checker play-checker-tile').attr({'row': rowI, 'col': colI});
					divMake.append(divMake2);
					switcher = 1 - switcher;
				} else if(checkerBoardArray[rowI][colI] === 'b'){
					var divMake = $('<div>').addClass('board-square black-square').attr({'row': rowI, 'col': colI});
					var divMake2 = $('<div>').addClass('board-square black-checker play-checker-tile').attr({'row': rowI, 'col': colI});
					divMake.append(divMake2);
					switcher = 1 - switcher;
				} else {
					var divMake = $('<div>').addClass('board-square black-square').attr({'row': rowI, 'col': colI});
					var divMake2 = $('<div>').addClass('board-square play-checker-tile').attr({'row': rowI, 'col': colI});
					divMake.append(divMake2);
					switcher = 1 - switcher;
				}
			}
			gameBoard.append(divMake);

		}
	}
}

function clickHandler(){
	$(".gameboard").on('click', '.black-checker', highlightBlack);
	$(".gameboard").on('click', '.red-checker', highlightRed);
  	$(".gameboard").on("click", ".highlight", handleCheckerMove);
}

function highlightBlack(){

	if (blackTurn){
			$('.play-checker-tile').removeClass('highlight');
			initialRow = parseInt($(this).attr('row'));
			initialCol = parseInt($(this).attr('col'));
		var oneMoveRowLeft = initialRow-1;
		var oneMoveColLeft = initialCol-1;
		var oneMoveRowRight = initialRow-1;
		var oneMoveColRight = initialCol+1;
		var twoMovesRowLeft = initialRow-2;
		var twoMovesColLeft = initialCol-2;
		var twoMovesRowRight = initialRow-2;
		var twoMovesColRight = initialCol+2;

		if(checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === ' '){ // if left space is open
			$(`.play-checker-tile[row=${oneMoveRowLeft}][col=${oneMoveColLeft}]`).addClass('highlight');
		} else if(checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === 'r' && checkerBoardArray[twoMovesRowLeft][twoMovesColLeft] === ' '){ // if left is enemy and behind is open
			$(`.play-checker-tile[row=${twoMovesRowLeft}][col=${twoMovesColLeft}]`).addClass('highlight');
		} else{ }
		if(checkerBoardArray[oneMoveRowRight][oneMoveColRight] === ' '){ // if right space is open
			$(`.play-checker-tile[row=${oneMoveRowRight}][col=${oneMoveColRight}]`).addClass('highlight');
		} else if(checkerBoardArray[oneMoveRowRight][oneMoveColRight] === 'r' && checkerBoardArray[twoMovesRowRight][twoMovesColRight] === ' '){ // if right is enemy and behind is open
			$(`.play-checker-tile[row=${twoMovesRowRight}][col=${twoMovesColRight}]`).addClass('highlight');
		} else{ }
	} else{
		return;
	}
}
function highlightRed(){
	if (redTurn){
			$('.play-checker-tile').removeClass('highlight');
			initialRow = parseInt($(this).attr('row'));
			initialCol = parseInt($(this).attr('col'));
		var oneMoveRowLeft = initialRow+1;
		var oneMoveColLeft = initialCol-1;
		var oneMoveRowRight = initialRow+1;
		var oneMoveColRight = initialCol+1;
		var twoMovesRowLeft = initialRow+2;
		var twoMovesColLeft = initialCol-2;
		var twoMovesRowRight = initialRow+2;
		var twoMovesColRight = initialCol+2;

		if(checkerBoardArray[(oneMoveRowLeft)][(oneMoveColLeft)] === ' '){
			$(`.play-checker-tile[row=${oneMoveRowLeft}][col=${oneMoveColLeft}]`).addClass('highlight');
		} else if(checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === 'b' && checkerBoardArray[twoMovesRowLeft][twoMovesColLeft] === ' '){
			$(`.play-checker-tile[row=${twoMovesRowLeft}][col=${twoMovesColLeft}]`).addClass('highlight');
		} else{ }
		if(checkerBoardArray[(oneMoveRowRight)][(oneMoveColRight)] === ' '){
			$(`.play-checker-tile[row=${oneMoveRowRight}][col=${oneMoveColRight}]`).addClass('highlight');
		} else if(checkerBoardArray[oneMoveRowRight][oneMoveColRight] === 'b' && checkerBoardArray[twoMovesRowRight][twoMovesColRight] === ' '){
			$(`.play-checker-tile[row=${twoMovesRowRight}][col=${twoMovesColRight}]`).addClass('highlight');
		} else{ }
	} else {
		return;
	}	
}

function switchPlayer(){
	debugger;
	if(blackTurn){
		blackTurn = false;
		redTurn = true;
	} else if(redTurn){
		redTurn = false;
		blackTurn = true;
	}
}

//This function will move a checker from it's last position to it's new position
function movePiece(){
//if red king,
	if(checkerBoardArray[initialRow][initialCol] === 'rk') {
//adding class for destination position
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('red-checker redking');
//removing class for initial position
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('red-checker redking');
//updating javascript array
		checkerBoardArray[destRow][destCol] = 'rk';
		checkerBoardArray[initialRow][initialCol] = ' ';
	}
//if black king, (doing the same funcionality as - if red king)
	if(checkerBoardArray[initialRow][initialCol] === 'bk') {
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('black-checker blackking');
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('black-checker blackking');
		checkerBoardArray[destRow][destCol] = 'bk';
		checkerBoardArray[initialRow][initialCol] = ' ';
	}
//if red checker,
	if(checkerBoardArray[initialRow][initialCol] === 'r'){
//adding class for destination position
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('red-checker');
//removing class for initial position
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('red-checker');
//updating javascript array
		checkerBoardArray[destRow][destCol] = 'r';
		checkerBoardArray[initialRow][initialCol] = ' ';
//if red checker reaches the bottom of the board,
		if(destRow === 7){
//git it a class of red king
			$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('redking');
			checkerBoardArray[destRow][destCol] = 'rk';
		}
//if black checker, (doing the same funcionality as - if red checker)
	} else if (checkerBoardArray[initialRow][initialCol] === 'b'){
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('black-checker');
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('black-checker');
		checkerBoardArray[destRow][destCol] = 'b';
		checkerBoardArray[initialRow][initialCol] = ' ';
		if(destRow === 0){
			$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('blackking');
			checkerBoardArray[destRow][destCol] = 'bk';
		}
	}
}
//This function will remove the opponent's checker
function removeOpponentPiece(){
//if black king, 
	if(checkerBoardArray[destRow][destCol] === 'bk'){
//if the checker moved right,
		if(destCol-initialCol > 0 ) {
//if the checker moved right up,
			if(destRow - initialRow > 0){
				$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol+1}]`).removeClass("red-checker");
				checkerBoardArray[(initialRow-1)][(initialCol+1)] = ' ';
//if the checker moved right down,
			} else if (destRow - initialRow < 0) {
				$(`.play-checker-tile[row=${initialRow+1}][col=${initialCol+1}]`).removeClass("red-checker");
				checkerBoardArray[(initialRow+1)][(initialCol+1)] = ' ';
			}
//else if the checker moved left
		} else if(destCol-initialCol < 0 ) {
// if the checker moved left up
			if(destRow - initialRow > 0){
				$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol-1}]`).removeClass("red-checker");
				checkerBoardArray[(initialRow-1)][(initialCol+1)] = ' ';
// if the checker moved left down
			} else if (destRow - initialRow < 0) {
				$(`.play-checker-tile[row=${initialRow+1}][col=${initialCol-1}]`).removeClass("red-checker");
				checkerBoardArray[(initialRow+1)][(initialCol+1)] = ' ';
			}
		}
	}
//if red king
	if(checkerBoardArray[destRow][destCol] === 'rk'){
//if checker moved right,
		if(destCol-initialCol > 0 ) {
//right up
			if(destRow - initialRow > 0){
				$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol+1}]`).removeClass("black-checker");
				checkerBoardArray[(initialRow-1)][(initialCol+1)] = ' ';
//right down
			} else if (destRow - initialRow < 0) {
				$(`.play-checker-tile[row=${initialRow+1}][col=${initialCol+1}]`).removeClass("black-checker");
				checkerBoardArray[(initialRow+1)][(initialCol+1)] = ' ';
// if checker moved left
			}else if(destCol-initialCol < 0 ) {
//left up
				if(destRow - initialRow > 0){
					$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol-1}]`).removeClass("black-checker");
					checkerBoardArray[(initialRow-1)][(initialCol+1)] = ' ';
//left down
				} else if (destRow - initialRow < 0) {
					$(`.play-checker-tile[row=${initialRow+1}][col=${initialCol-1}]`).removeClass("black-checker");
					checkerBoardArray[(initialRow+1)][(initialCol+1)] = ' ';
				}
			}
		}
	}
//if black checker
	if(checkerBoardArray[destRow][destCol] === 'b'){
//if moved up right
		if(destCol-initialCol > 0 ) {
			$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol+1}]`).removeClass("red-checker");
			checkerBoardArray[(initialRow-1)][(initialCol+1)] = ' ';
		}
//if moved up left
		else if (destCol-initialCol < 0 ) {
			$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol-1}]`).removeClass("red-checker");
			checkerBoardArray[(initialRow-1)][(initialCol-1)] = ' ';
		}
		blackCounter++;
	}
//else if red checker
	else if(checkerBoardArray[destRow][destCol] === 'r'){
//moved down right
		if(destCol-initialCol > 0 ) {
			$(`.play-checker-tile[row=${destRow-1}][col=${destCol-1}]`).removeClass("black-checker");
			checkerBoardArray[(destRow-1)][(destCol-1)] = ' ';
		}
//moved down left
		else if (destCol-initialCol < 0 ) {
			$(`.play-checker-tile[row=${destRow-1}][col=${destCol+1}]`).removeClass("black-checker");
			checkerBoardArray[(destRow-1)][(destCol+1)] = ' ';
		}
		redCounter++;
	}
}
//This function calls appropriate functions depending on the checker's move
function handleCheckerMove(){
	destRow = parseInt($(this).attr('row'));
	destCol = parseInt($(this).attr('col'));
//if jumped over an opponent's checker
	if(Math.abs(destRow - initialRow) === 2){
		movePiece();
		removeOpponentPiece();
		switchPlayer();
	}
//if just moving
	else if(Math.abs(destRow - initialRow) === 1){
		movePiece();
		switchPlayer();
	}
}
