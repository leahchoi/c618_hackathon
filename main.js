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
