$(document).ready(runThisOnLoad);
function runThisOnLoad() {
	makeCheckBoardArray();
	makeCheckersBoard();
	clickHandler();
}
var blackCounter = 0;
var redCounter = 0;
var doubleJumpFlag = false;

var initialRow = null;
var initialCol = null;
var destRow = null;
var destCol = null;
var possibleJumps = 0;

var currentPiece = null;
const oppPieceObj = { 'r':{'oppositePiece': 'b', 'oppositeKing': 'bk'}, 'b':{'oppositePiece': 'r', 'oppositeKing': 'rk'}}

var blackTurn = true;
var redTurn = false;
var checkerBoardArray = makeCheckBoardArray();
function makeCheckBoardArray(){
	return checkerBoardArray = [
	[' ', 'r', ' ', 'r', ' ', 'r', ' ', 'r'],
	['r', ' ', 'r', ' ', 'r', ' ', 'r', ' '],
	[' ', 'r', ' ', 'r', ' ', 'r', ' ', 'r'],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	['b', ' ', 'b', ' ', 'b', ' ', 'b', ' '],
	[' ', 'b', ' ', 'b', ' ', 'b', ' ', 'b'],
	['b', ' ', 'b', ' ', 'b', ' ', 'b', ' ']
];}
function makeCheckersBoard() {
	let switcher = 0;
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
	$(".gameboard").on('click', '.black-checker', handleBlackClick);
	$(".gameboard").on('click', '.red-checker', handleRedClick);
	$(".gameboard").on("click", ".highlight", handleHighlightClick);
	$(".gameboard").on("click", ".redking", handleRedClick);
	$(".gameboard").on("click", ".blackking", handleBlackClick);
	$(".reset-button").on("click", resetGame);
}
function handleRedClick(){
	if(!doubleJumpFlag){
		$('.play-checker-tile').removeClass('highlight highlight2');
		initialRow = parseInt($(this).attr('row'));
		initialCol = parseInt($(this).attr('col'));
	}
	if(redTurn){
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).addClass('highlight2');
		decideMovements();
	}
}
function handleBlackClick(){
	if(!doubleJumpFlag){
		$('.play-checker-tile').removeClass('highlight highlight2');
		initialRow = parseInt($(this).attr('row'));
		initialCol = parseInt($(this).attr('col'));
	}
	if(blackTurn){
		$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).addClass('highlight2');
		decideMovements();
	}
}
function decideMovements(){
	currentPiece = checkerBoardArray[initialRow][initialCol];
	switch(currentPiece){
		case 'r':
		checkDownLeft();
		checkDownRight();
		break;
		case 'b':
		checkUpLeft();
		checkUpRight();
		break;
		case 'rk':
		checkDownLeft();
		checkDownRight();
		checkUpLeft();
		checkUpRight();
		break;
		case 'bk':
		checkDownLeft();
		checkDownRight();
		checkUpLeft();
		checkUpRight();
		break; 
	}
}
function checkDownLeft(){
	let oneMoveRowLeftDown = initialRow+1;
	let oneMoveColLeftDown = initialCol-1;
	let twoMovesRowLeftDown = initialRow+2;
	let twoMovesColLeftDown = initialCol-2;
	if (8 > oneMoveRowLeftDown && 8 > oneMoveColLeftDown && -1 < oneMoveRowLeftDown && -1 < oneMoveColLeftDown){
		if(checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === ' ' && !doubleJumpFlag){
			$(`.play-checker-tile[row=${oneMoveRowLeftDown}][col=${oneMoveColLeftDown}]`).addClass('highlight');
		} else if(checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === oppPieceObj[currentPiece].oppositePiece || checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === oppPieceObj[currentPiece].oppositeKing){
			checkJump(twoMovesRowLeftDown, twoMovesColLeftDown);
		}
	}
}
function checkDownRight(){
	let oneMoveRowRightDown = initialRow+1;
	let oneMoveColRightDown = initialCol+1;
	let twoMovesRowRightDown = initialRow+2;
	let twoMovesColRightDown = initialCol+2;
	if (8 > oneMoveRowRightDown && 8 > oneMoveColRightDown && -1 < oneMoveRowRightDown && -1 < oneMoveColRightDown){
		if(checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === ' ' && !doubleJumpFlag){
			$(`.play-checker-tile[row=${oneMoveRowRightDown}][col=${oneMoveColRightDown}]`).addClass('highlight');
		} else if(checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === oppPieceObj[currentPiece].oppositePiece || checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === oppPieceObj[currentPiece].oppositeKing){
			checkJump(twoMovesRowRightDown, twoMovesColRightDown);
		}
	}
}
function checkUpLeft(){
	let oneMoveRowLeftUp = initialRow-1;
	let oneMoveColLeftUp = initialCol-1;
	let twoMovesRowLeftUp = initialRow-2;
	let twoMovesColLeftUp = initialCol-2;
	if (8 > oneMoveRowLeftUp && 8 > oneMoveColLeftUp && -1 < oneMoveRowLeftUp && -1 < oneMoveColLeftUp){
		if(checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === ' ' && !doubleJumpFlag){
			$(`.play-checker-tile[row=${oneMoveRowLeftUp}][col=${oneMoveColLeftUp}]`).addClass('highlight');
		} else if(checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === oppPieceObj[currentPiece].oppositePiece || checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === oppPieceObj[currentPiece].oppositeKing){
			checkJump(twoMovesRowLeftUp, twoMovesColLeftUp);
		}
	}
}	
function checkUpRight(){
	let oneMoveRowRightUp = initialRow-1;
	let oneMoveColRightUp = initialCol+1;
	let twoMovesRowRightUp = initialRow-2;
	let twoMovesColRightUp = initialCol+2;
	if (8 > oneMoveRowRightUp && 8 > oneMoveColRightUp && -1 < oneMoveRowRightUp && -1 < oneMoveColRightUp){
		if(checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === ' ' && !doubleJumpFlag){
			$(`.play-checker-tile[row=${oneMoveRowRightUp}][col=${oneMoveColRightUp}]`).addClass('highlight');
		} else if(checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === oppPieceObj[currentPiece].oppositePiece || checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === oppPieceObj[currentPiece].oppositeKing){
			checkJump(twoMovesRowRightUp, twoMovesColRightUp);
		}
	}
}
function checkJump(jumpRowDirection, jumpColDirection){
	if(8 > jumpRowDirection && 8 > jumpColDirection && -1 < jumpRowDirection && -1 < jumpColDirection){
		if(checkerBoardArray[jumpRowDirection][jumpColDirection] === ' '){
			$(`.play-checker-tile[row=${jumpRowDirection}][col=${jumpColDirection}]`).addClass('highlight');
			possibleJumps++;
		}
	}
}
function handleHighlightClick(){
	destRow = parseInt($(this).attr('row'));
	destCol = parseInt($(this).attr('col'));
	if(Math.abs(destRow - initialRow) === 1){
		movePiece();
	} else if(Math.abs(destRow - initialRow) === 2){
		jumpPiece();
	}
}
function movePiece(){
	switch(currentPiece){
		case 'r':
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('red-checker');
		break;
		case 'b':
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('black-checker');
		break;
		case 'rk':
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('redking');
		break;
		case 'bk':
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('blackking');
		break; 
	}
	$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('red-checker black-checker redking blackking');
	if(destRow === 7 && currentPiece === 'r'){
		currentPiece = 'rk';
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).removeClass('red-checker').addClass('redking');
	}
	if(destRow === 0 && currentPiece === 'b'){
		currentPiece = 'bk';
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).removeClass('black-checker').addClass('blackking');
	}	
	checkerBoardArray[destRow][destCol] = currentPiece;
	checkerBoardArray[initialRow][initialCol] = ' ';
	switchPlayer();
}
function jumpPiece(){
	let jumpedRow;
	let jumpedCol;
	if(destRow<initialRow){
		jumpedRow = initialRow-1;
	} else {
		jumpedRow = initialRow+1;
	}
	if(destCol<initialCol){
		jumpedCol = initialCol-1;
	} else {
		jumpedCol = initialCol+1;
	}
	$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).removeClass('red-checker black-checker redking blackking');
	$(`.play-checker-tile[row=${jumpedRow}][col=${jumpedCol}]`).removeClass('red-checker black-checker redking blackking');
	switch(currentPiece){
		case 'r':
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('red-checker');
		redCounter++;
		break;
		case 'b':
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('black-checker');
		blackCounter++;
		break;
		case 'rk':
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('redking');
		redCounter++;
		break;
		case 'bk':
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).addClass('blackking');
		blackCounter++;
		break; 
	}
	if(destRow === 7 && currentPiece === 'r'){
		currentPiece = 'rk';
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).removeClass('red-checker').addClass('redking');
	}
	if(destRow === 0 && currentPiece === 'b'){
		currentPiece = 'bk';
		$(`.play-checker-tile[row=${destRow}][col=${destCol}]`).removeClass('black-checker').addClass('blackking');
	}			
	checkerBoardArray[destRow][destCol] = currentPiece;
	checkerBoardArray[initialRow][initialCol] = ' ';
	checkerBoardArray[jumpedRow][jumpedCol] = ' ';
	if(possibleJumps > 0){
		doubleJumpFlag = true;
	}
	possibleJumps = 0;
	checkDoubleJump();
	winMessage();
	if(possibleJumps === 0){
		if(currentPiece === 'r' || currentPiece === 'rk'){
			redTurn = true;
		} else{
			blackTurn = true;
		}
		doubleJumpFlag = false;
		switchPlayer();
	}
}
function checkDoubleJump(){
	initialRow = destRow;
	initialCol = destCol;
	$('.play-checker-tile').removeClass('highlight highlight2');
	decideMovements();
	$(`.play-checker-tile[row=${initialRow}][col=${initialCol}]`).addClass('highlight2');
	if(possibleJumps > 0){
		if(currentPiece === 'r' || currentPiece === 'rk'){
			$('#player1win').text('DOUBLE JUMP').css('color', 'green');
			redTurn = false;
		} else{
			$('#player2win').text('DOUBLE JUMP').css('color', 'green');
			blackTurn = false;
		}
	} else{
		doubleJumpFlag = false;
		$('#player2win').text(' ');
		$('#player1win').text(' ');
		return;
	}		
}

function switchPlayer() {
	if (blackTurn) {
		blackTurn = false;
		redTurn = true;
		$("#player2score").text(blackCounter);
		$(".player2-image").css("border-color", "white");
		$(".player1-image").css("border-color", "green");
		$('.play-checker-tile').removeClass('highlight highlight2');
	} else if(redTurn){
		redTurn = false;
		blackTurn = true;
		$("#player1score").text(redCounter);
		$(".player1-image").css("border-color", "white");
		$(".player2-image").css("border-color", "green");
		$('.play-checker-tile').removeClass('highlight highlight2');
	}
}
function winMessage(){
	if(redCounter === 12){
		$('#player1win').text('WINNER!').css('color', '#94112B');
		$(".player2-image").css("border-color", "white");
		$(".player1-image").css("border-color", "green");
		redTurn = false;
		blackTurn = false;
	}
	if(blackCounter === 12){
		$('#player2win').text('WINNER!').css('color', '#111111');
		$(".player1-image").css("border-color", "white");
		$(".player2-image").css("border-color", "green");
		redTurn = false;
		blackTurn = false;
	}
}
function resetGame() {
	$(".gameboard").empty();
	blackTurn = true;
	redTurn = false;
	blackCounter = 0;
	redCounter = 0;
	$(".player1-image").css("border-color", "white");
	$(".player2-image").css("border-color", "green");
	$("#player2score").text(blackCounter);
	$("#player1score").text(redCounter);
	$('#player2win').text(' ');
	$('#player1win').text(' ');
	checkerBoardArray = makeCheckBoardArray();
	makeCheckersBoard();
}