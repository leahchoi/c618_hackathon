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
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], 
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

//This function will just move a checker from it's last position to it's new position where a click was selected
function movePiece(){
	//Show piece on destination
	//Hide piece on initial
	if(checkerBoardArray[initialRow][initialCol] === 'rk') {
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('red-checker king');
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('red-checker king');
		checkerBoardArray[destRow][destCol] = 'rk';
		checkerBoardArray[initialRow][initialCol] = ' ';
	}
	if(checkerBoardArray[initialRow][initialCol] === 'bk') {
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('black-checker king');
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('black-checker king');
		checkerBoardArray[destRow][destCol] = 'bk';
		checkerBoardArray[initialRow][initialCol] = ' ';
	}

	//
	if(checkerBoardArray[initialRow][initialCol] === 'r'){
        $(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('red-checker');
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('red-checker');
		checkerBoardArray[destRow][destCol] = 'r';
		checkerBoardArray[initialRow][initialCol] = ' ';
		if(destRow === 7){
			$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('king');
			checkerBoardArray[destRow][destCol] = 'rk';
		}
	} else if (checkerBoardArray[initialRow][initialCol] === 'b'){
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('black-checker');
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('black-checker');
		checkerBoardArray[destRow][destCol] = 'b';
		checkerBoardArray[initialRow][initialCol] = ' ';
		if(destRow === 0){
			$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('king');
			checkerBoardArray[destRow][destCol] = 'bk';
		}
	}
}

function removeOpponentPiece(){
	//if checker is black king, 
	if(checkerBoardArray[destRow][destCol] === 'bk'){
		//if checker is up right,
		if(destCol-initialCol > 0 ) {
			//upright
			if(destRow - initialRow > 0){
				$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol+1}]`).removeClass("black-checker");
				checkerBoardArray[(initialRow-1)][(initialCol+1)] = ' ';
			} else if (destRow - initialRow < 0) {//downright
				$(`.play-checker-tile[row=${initialRow+1}][col=${initialCol+1}]`).removeClass("black-checker");
				checkerBoardArray[(initialRow+1)][(initialCol+1)] = ' ';
			}
		} else if(destCol-initialCol < 0 ) {
			//upright
			if(destRow - initialRow > 0){
				$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol-1}]`).removeClass("black-checker");
				checkerBoardArray[(initialRow-1)][(initialCol+1)] = ' ';
			} else if (destRow - initialRow < 0) {//downright
				$(`.play-checker-tile[row=${initialRow+1}][col=${initialCol-1}]`).removeClass("black-checker");
				checkerBoardArray[(initialRow+1)][(initialCol+1)] = ' ';
			}
		}
	}
	if(checkerBoardArray[destRow][destCol] === 'rk'){
		//if checker is up right,
		if(destCol-initialCol > 0 ) {
			//upright
			if(destRow - initialRow > 0){
				$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol+1}]`).removeClass("red-checker");
				checkerBoardArray[(initialRow-1)][(initialCol+1)] = ' ';
			} else if (destRow - initialRow < 0) {//downright
				$(`.play-checker-tile[row=${initialRow+1}][col=${initialCol+1}]`).removeClass("red-checker");
				checkerBoardArray[(initialRow+1)][(initialCol+1)] = ' ';
			}else if(destCol-initialCol < 0 ) {
				//upright
				if(destRow - initialRow > 0){
					$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol-1}]`).removeClass("black-checker");
					checkerBoardArray[(initialRow-1)][(initialCol+1)] = ' ';
				} else if (destRow - initialRow < 0) {//downright
					$(`.play-checker-tile[row=${initialRow+1}][col=${initialCol-1}]`).removeClass("black-checker");
					checkerBoardArray[(initialRow+1)][(initialCol+1)] = ' ';
				}
			}
		}
	}
	if(checkerBoardArray[destRow][destCol] === 'b'){
		if(destCol-initialCol > 0 ) {
			$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol+1}]`).removeClass("red-checker");
			checkerBoardArray[(initialRow-1)][(initialCol+1)] = ' ';
		}
		else if (destCol-initialCol < 0 ) {
			$(`.play-checker-tile[row=${initialRow-1}][col=${initialCol-1}]`).removeClass("red-checker");
			checkerBoardArray[(initialRow-1)][(initialCol-1)] = ' ';
		}
		blackCounter++;
	}
	else if(checkerBoardArray[destRow][destCol] === 'r'){
		if(destCol-initialCol > 0 ) {
			$(`.play-checker-tile[row=${destRow-1}][col=${destCol-1}]`).removeClass("black-checker");
			checkerBoardArray[(destRow-1)][(destCol-1)] = ' ';
		}
		else if (destCol-initialCol < 0 ) {
			$(`.play-checker-tile[row=${destRow-1}][col=${destCol+1}]`).removeClass("black-checker");
			checkerBoardArray[(destRow-1)][(destCol+1)] = ' ';
		}
		redCounter++;
	}
}
function handleCheckerMove(){
	$('.play-checker-tile').removeClass('highlight');
	destRow = parseInt($(this).attr('row'));
	destCol = parseInt($(this).attr('col'));
	if(Math.abs(destRow - initialRow) === 2){
		movePiece();
		removeOpponentPiece();
		switchPlayer();
	}
	else if(Math.abs(destRow - initialRow) === 1){
		movePiece();
		switchPlayer();
	}
}
