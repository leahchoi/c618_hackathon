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
				['b', ' ', 'b', ' ', 'b', ' ', 'b', ' ']
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
  	$(".gameboard").on("click", "redking", highlightRedKing);
  	$(".gameboard").on("click", "blackking", highlightBlackKing);
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

		if(0 <= oneMoveRowLeft && 0 <= oneMoveColLeft){	
			if(checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowLeft}][col=${oneMoveColLeft}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === 'r' && 0 <= twoMovesRowLeft && 0 <= twoMovesColLeft){
				if(checkerBoardArray[twoMovesRowLeft][twoMovesColLeft] === ' '){	
					$(`.play-checker-tile[row=${twoMovesRowLeft}][col=${twoMovesColLeft}]`).addClass('highlight');
				}	
			}
		}	 
		if(checkerBoardArray.length > oneMoveRowRight && checkerBoardArray.length > oneMoveColRight){	
			if(checkerBoardArray[oneMoveRowRight][oneMoveColRight] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowRight}][col=${oneMoveColRight}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowRight][oneMoveColRight] === 'r' && 0 <= twoMovesRowRight && 0 <= twoMovesColRight){
				if(checkerBoardArray[twoMovesRowRight][twoMovesColRight] === ' '){
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

		if(checkerBoardArray.length > oneMoveRowLeft && checkerBoardArray.length > oneMoveColLeft){	
			if(checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowLeft}][col=${oneMoveColLeft}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === 'b' && checkerBoardArray.length > twoMovesRowLeft && checkerBoardArray.length > twoMovesColLeft){
				if(checkerBoardArray[twoMovesRowLeft][twoMovesColLeft] === ' '){	
					$(`.play-checker-tile[row=${twoMovesRowLeft}][col=${twoMovesColLeft}]`).addClass('highlight');
				}	
			}
		}	 
		if(checkerBoardArray.length > oneMoveRowRight && checkerBoardArray.length > oneMoveColRight){	
			if(checkerBoardArray[oneMoveRowRight][oneMoveColRight] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowRight}][col=${oneMoveColRight}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowRight][oneMoveColRight] === 'b' && checkerBoardArray.length > twoMovesRowRight && checkerBoardArray.length > twoMovesColRight){
				if(checkerBoardArray[twoMovesRowRight][twoMovesColRight] === ' '){
					$(`.play-checker-tile[row=${twoMovesRowRight}][col=${twoMovesColRight}]`).addClass('highlight');
				}
			}
		}	 
	} else {
		return;
	}	
}

function highlightRedKing(){
	if (redTurn){
			$('.play-checker-tile').removeClass('highlight');
			initialRow = parseInt($(this).attr('row'));
			initialCol = parseInt($(this).attr('col'));
		var oneMoveRowLeftDown = initialRow+1;
		var oneMoveColLeftDown = initialCol-1;
		var oneMoveRowRightDown = initialRow+1;
		var oneMoveColRightDown = initialCol+1;
		var twoMovesRowLeftDown = initialRow+2;
		var twoMovesColLeftDown = initialCol-2;
		var twoMovesRowRightDown = initialRow+2;
		var twoMovesColRightDown = initialCol+2;
		var oneMoveRowLeftUp = initialRow-1;
		var oneMoveColLeftUp = initialCol-1;
		var oneMoveRowRightUp = initialRow-1;
		var oneMoveColRightUp = initialCol+1;
		var twoMovesRowLeftUp = initialRow-2;
		var twoMovesColLeftUp = initialCol-2;
		var twoMovesRowRightUp = initialRow-2;
		var twoMovesColRight = initialCol+2;

		if(checkerBoardArray.length > oneMoveRowLeftDown && checkerBoardArray.length > oneMoveColLeftDown){	
			if(checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowLeftDown}][col=${oneMoveColLeftDown}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === 'b' && checkerBoardArray.length > twoMovesRowLeftDown && checkerBoardArray.length > twoMovesColLeftDown){
				if(checkerBoardArray[twoMovesRowLeftDown][twoMovesColLeftDown] === ' '){	
					$(`.play-checker-tile[row=${twoMovesRowLeftDown}][col=${twoMovesColLeftDown}]`).addClass('highlight');
				}	
			}
		}	 
		if(checkerBoardArray.length > oneMoveRowRightDown && checkerBoardArray.length > oneMoveColRightDown){	
			if(checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowRightDown}][col=${oneMoveColRightDown}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === 'b' && checkerBoardArray.length > twoMovesRowRightDown && checkerBoardArray.length > twoMovesColRightDown){
				if(checkerBoardArray[twoMovesRowRightDown][twoMovesColRightDown] === ' '){
					$(`.play-checker-tile[row=${twoMovesRowRightDown}][col=${twoMovesColRightDown}]`).addClass('highlight');
				}
			}
		}
		if(0 <= oneMoveRowLeftUp && 0 <= oneMoveColLeftUp){	
			if(checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowLeftUp}][col=${oneMoveColLeftUp}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === 'b' && 0 <= twoMovesRowLeftUp && 0 <= twoMovesColLeftUp){
				if(checkerBoardArray[twoMovesRowLeftUp][twoMovesColLeftUp] === ' '){	
					$(`.play-checker-tile[row=${twoMovesRowLeftUp}][col=${twoMovesColLeftUp}]`).addClass('highlight');
				}	
			}
		}	 
		if(checkerBoardArray.length > oneMoveRowRightUp && checkerBoardArray.length > oneMoveColRightUp){	
			if(checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowRightUp}][col=${oneMoveColRightUp}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === 'b' && 0 <= twoMovesRowRightUp && 0 <= twoMovesColRight){
				if(checkerBoardArray[twoMovesRowRightUp][twoMovesColRight] === ' '){
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
			$('.play-checker-tile').removeClass('highlight');
			initialRow = parseInt($(this).attr('row'));
			initialCol = parseInt($(this).attr('col'));
		var oneMoveRowLeftDown = initialRow+1;
		var oneMoveColLeftDown = initialCol-1;
		var oneMoveRowRightDown = initialRow+1;
		var oneMoveColRightDown = initialCol+1;
		var twoMovesRowLeftDown = initialRow+2;
		var twoMovesColLeftDown = initialCol-2;
		var twoMovesRowRightDown = initialRow+2;
		var twoMovesColRightDown = initialCol+2;
		var oneMoveRowLeftUp = initialRow-1;
		var oneMoveColLeftUp = initialCol-1;
		var oneMoveRowRightUp = initialRow-1;
		var oneMoveColRightUp = initialCol+1;
		var twoMovesRowLeftUp = initialRow-2;
		var twoMovesColLeftUp = initialCol-2;
		var twoMovesRowRightUp = initialRow-2;
		var twoMovesColRight = initialCol+2;

		if(checkerBoardArray.length > oneMoveRowLeftDown && checkerBoardArray.length > oneMoveColLeftDown){	
			if(checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowLeftDown}][col=${oneMoveColLeftDown}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === 'r' && checkerBoardArray.length > twoMovesRowLeftDown && checkerBoardArray.length > twoMovesColLeftDown){
				if(checkerBoardArray[twoMovesRowLeftDown][twoMovesColLeftDown] === ' '){	
					$(`.play-checker-tile[row=${twoMovesRowLeftDown}][col=${twoMovesColLeftDown}]`).addClass('highlight');
				}	
			}
		}	 
		if(checkerBoardArray.length > oneMoveRowRightDown && checkerBoardArray.length > oneMoveColRightDown){	
			if(checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowRightDown}][col=${oneMoveColRightDown}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === 'r' && checkerBoardArray.length > twoMovesRowRightDown && checkerBoardArray.length > twoMovesColRightDown){
				if(checkerBoardArray[twoMovesRowRightDown][twoMovesColRightDown] === ' '){
					$(`.play-checker-tile[row=${twoMovesRowRightDown}][col=${twoMovesColRightDown}]`).addClass('highlight');
				}
			}
		}
		if(0 <= oneMoveRowLeftUp && 0 <= oneMoveColLeftUp){	
			if(checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowLeftUp}][col=${oneMoveColLeftUp}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === 'r' && 0 <= twoMovesRowLeftUp && 0 <= twoMovesColLeftUp){
				if(checkerBoardArray[twoMovesRowLeftUp][twoMovesColLeftUp] === ' '){	
					$(`.play-checker-tile[row=${twoMovesRowLeftUp}][col=${twoMovesColLeftUp}]`).addClass('highlight');
				}	
			}
		}	 
		if(checkerBoardArray.length > oneMoveRowRightUp && checkerBoardArray.length > oneMoveColRightUp){	
			if(checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === ' '){
				$(`.play-checker-tile[row=${oneMoveRowRightUp}][col=${oneMoveColRightUp}]`).addClass('highlight');
			} else if(checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === 'r' && 0 <= twoMovesRowRightUp && 0 <= twoMovesColRight){
				if(checkerBoardArray[twoMovesRowRightUp][twoMovesColRight] === ' '){
					$(`.play-checker-tile[row=${twoMovesRowRightUp}][col=${twoMovesColRight}]`).addClass('highlight');
				}
			}
		}		 
	} else {
		return;
	}	
}
		


function switchPlayer(){
	
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
	if(checkerBoardArray[initialRow][initialCol] === 'r'){
        $(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('red-checker');
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('red-checker');
		checkerBoardArray[destRow][destCol] = 'r';
		checkerBoardArray[initialRow][initialCol] = ' ';
	} else if (checkerBoardArray[initialRow][initialCol] === 'b'){
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('black-checker');
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('black-checker');
		checkerBoardArray[destRow][destCol] = 'b';
		checkerBoardArray[initialRow][initialCol] = ' ';
	}
}

function removePiece(){
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
		removePiece();
		switchPlayer();
	}
	else if(Math.abs(destRow - initialRow) === 1){
		movePiece();
		switchPlayer();
	}
}
