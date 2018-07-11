$(document).ready(runThisOnLoad);

function runThisOnLoad(){
	makeCheckersBoard();
}

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
var blackCounter = 0;
var redCounter = 0;
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
