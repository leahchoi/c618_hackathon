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


var checkerBoardArray = [
				[' ', 'r', ' ', 'r', ' ', 'r', ' ', 'r'], 
				['r', ' ', 'r', ' ', 'r', ' ', 'r', ' '], 
				[' ', 'r', ' ', 'r', ' ', 'r', ' ', 'r'], 
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], 
				[' ', ' ', ' ', 'r', ' ', ' ', ' ', ' '], 
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
	$('.black-checker').click(highlightBlack);
	$('.red-checker').click(highlightRed);
  $(".gameboard").on("click", ".highlight", handleCheckerMove);
}

function highlightBlack(){
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
		clickHandler();
	} else if(checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === 'r' && checkerBoardArray[twoMovesRowLeft][twoMovesColLeft] === ' '){ // if left is enemy and behind is open
		$(`.play-checker-tile[row=${twoMovesRowLeft}][col=${twoMovesColLeft}]`).addClass('highlight');
		clickHandler();
	} else{ }
	
	if(checkerBoardArray[oneMoveRowRight][oneMoveColRight] === ' '){ // if right space is open
		$(`.play-checker-tile[row=${oneMoveRowRight}][col=${oneMoveColRight}]`).addClass('highlight');
		clickHandler();
	} else if(checkerBoardArray[oneMoveRowRight][oneMoveColRight] === 'r' && checkerBoardArray[twoMovesRowRight][twoMovesColRight] === ' '){ // if right is enemy and behind is open
		$(`.play-checker-tile[row=${twoMovesRowRight}][col=${twoMovesColRight}]`).addClass('highlight');
		clickHandler();
	} else{ }

}
function highlightRed(){
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
		clickHandler();
	} else if(checkerBoardArray[oneMoveRowLeft][oneMoveColLeft] === 'b' && checkerBoardArray[twoMovesRowLeft][twoMovesColLeft] === ' '){
		$(`.play-checker-tile[row=${twoMovesRowLeft}][col=${twoMovesColLeft}]`).addClass('highlight');
		clickHandler();
	} else{ }
	
	if(checkerBoardArray[(oneMoveRowRight)][(oneMoveColRight)] === ' '){
		$(`.play-checker-tile[row=${oneMoveRowRight}][col=${oneMoveColRight}]`).addClass('highlight');
		clickHandler();
	} else if(checkerBoardArray[oneMoveRowRight][oneMoveColRight] === 'b' && checkerBoardArray[twoMovesRowRight][twoMovesColRight] === ' '){
		$(`.play-checker-tile[row=${twoMovesRowRight}][col=${twoMovesColRight}]`).addClass('highlight');
		clickHandler();
	} else{ }
}

//This function will just move a checker from it's last position to it's new position where a click was selected
function movePiece(){
	//Show piece on destination
	//Hide piece on initial
	if(checkerBoardArray[initialRow][initialCol] === 'r'){
        $(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('.red-checker');
        $(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('.red-checker');
	} else if (checkerBoardArray[initialRow][initialCol] === 'b'){
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('.black-checker');
        $(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('.black-checker');
	}
}

function removePiece(){
	if(".blackChecker"){
		if(destCol-initialCol > 0 ) {
			$(`.play-checker-tile[row=${destRow-1}][col=${destCol+1}]`).removeClass(".red-checker");
			checkerBoardArray[destRow-1][destCol+1] = ' ';
		}
		else if (destCol-initialCol < 0 ) {
			$(`.play-checker-tile[row=${destRow-1}][col=${destCol-1}]`).removeClass(".red-checker");
			checkerBoardArray[destRow-1][destCol-1] = ' ';
		}
		blackCounter++;
	}
	else if(".redChecker"){
		if(destCol-initialCol > 0 ) {
			$(`.play-checker-tile[row=${destRow-1}][col=${destCol+1}]`).removeClass(".black-checker");
			checkerBoardArray[destRow-1][destCol+1] = ' ';
		}
		else if (destCol-initialCol < 0 ) {
			$(`.play-checker-tile[row=${destRow-1}][col=${destCol-1}]`).removeClass(".black-checker");
			checkerBoardArray[destRow-1][destCol-1] = ' ';
		}
		redCounter++;
	}
}

function handleCheckerMove(){
	if(Math.abs(destRow - initialRow) === 2){
		movePiece();
		removePiece();
	}
	else if(Math.abs(destRow - initialRow) === 1){
		movePiece();
	}
}
