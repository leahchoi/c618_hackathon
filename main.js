$(document).ready(runThisOnLoad);
function runThisOnLoad() {
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
var oppositePiece = null;
var oppositePieceKing = null;

var oneMoveRowLeftDown = null;
var oneMoveColLeftDown = null;
var oneMoveRowRightDown = null;
var oneMoveColRightDown = null;
var twoMovesRowLeftDown = null;
var twoMovesColLeftDown = null;
var twoMovesRowRightDown = null;
var twoMovesColRightDown = null; //general calculations for possible movement directions
var oneMoveRowLeftUp = null;
var oneMoveColLeftUp = null;
var oneMoveRowRightUp = null;
var oneMoveColRightUp = null;
var twoMovesRowLeftUp = null;
var twoMovesColLeftUp = null;
var twoMovesRowRightUp = null;
var twoMovesColRight = null;

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
		createMovementCalcs();
	} else{
		return;
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
		createMovementCalcs();
	} else{
		return;
	}
}
function createMovementCalcs(){
	oneMoveRowLeftDown = initialRow+1;
	oneMoveColLeftDown = initialCol-1;
	oneMoveRowRightDown = initialRow+1;
	oneMoveColRightDown = initialCol+1;
	twoMovesRowLeftDown = initialRow+2;
	twoMovesColLeftDown = initialCol-2;
	twoMovesRowRightDown = initialRow+2;
	twoMovesColRightDown = initialCol+2; //general calculations for possible movement directions
	oneMoveRowLeftUp = initialRow-1;
	oneMoveColLeftUp = initialCol-1;
	oneMoveRowRightUp = initialRow-1;
	oneMoveColRightUp = initialCol+1;
	twoMovesRowLeftUp = initialRow-2;
	twoMovesColLeftUp = initialCol-2;
	twoMovesRowRightUp = initialRow-2;
	twoMovesColRightUp = initialCol+2;
	currentPiece = checkerBoardArray[initialRow][initialCol];
	decideMovements();	
}
function decideMovements(){
	switch(currentPiece){
		case 'r':
		oppositePiece = 'b';
		oppositePieceKing = 'bk';
		checkDownLeft();
		checkDownRight();
		break;
		case 'b':
		oppositePiece = 'r';
		oppositePieceKing = 'rk';
		checkUpLeft();
		checkUpRight();
		break;
		case 'rk':
		oppositePiece = 'b';
		oppositePieceKing = 'bk';
		checkDownLeft();
		checkDownRight();
		checkUpLeft();
		checkUpRight();
		break;
		case 'bk':
		oppositePiece = 'r';
		oppositePieceKing = 'rk';
		checkDownLeft();
		checkDownRight();
		checkUpLeft();
		checkUpRight();
		break; 
	}
}
function checkDownLeft(){
	if (8 > oneMoveRowLeftDown && 8 > oneMoveColLeftDown && -1 < oneMoveRowLeftDown && -1 < oneMoveColLeftDown){
		if(checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === ' ' && !doubleJumpFlag){
			$(`.play-checker-tile[row=${oneMoveRowLeftDown}][col=${oneMoveColLeftDown}]`).addClass('highlight');
		} else if(checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === oppositePiece || checkerBoardArray[oneMoveRowLeftDown][oneMoveColLeftDown] === oppositePieceKing){
			checkJump(twoMovesRowLeftDown, twoMovesColLeftDown);
		} else {
			return;
		}
	}
}
function checkDownRight(){
	if (8 > oneMoveRowRightDown && 8 > oneMoveColRightDown && -1 < oneMoveRowRightDown && -1 < oneMoveColRightDown){
		if(checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === ' ' && !doubleJumpFlag){
			$(`.play-checker-tile[row=${oneMoveRowRightDown}][col=${oneMoveColRightDown}]`).addClass('highlight');
		} else if(checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === oppositePiece || checkerBoardArray[oneMoveRowRightDown][oneMoveColRightDown] === oppositePieceKing){
			checkJump(twoMovesRowRightDown, twoMovesColRightDown);
		} else {
			return;
		}
	}
}
function checkUpLeft(){
	
	if (8 > oneMoveRowLeftUp && 8 > oneMoveColLeftUp && -1 < oneMoveRowLeftUp && -1 < oneMoveColLeftUp){
		if(checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === ' ' && !doubleJumpFlag){
			$(`.play-checker-tile[row=${oneMoveRowLeftUp}][col=${oneMoveColLeftUp}]`).addClass('highlight');
		} else if(checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === oppositePiece || checkerBoardArray[oneMoveRowLeftUp][oneMoveColLeftUp] === oppositePieceKing){
			checkJump(twoMovesRowLeftUp, twoMovesColLeftUp);
		} else {
			return;
		}
	}
}	
function checkUpRight(){
	if (8 > oneMoveRowRightUp && 8 > oneMoveColRightUp && -1 < oneMoveRowRightUp && -1 < oneMoveColRightUp){
		if(checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === ' ' && !doubleJumpFlag){
			$(`.play-checker-tile[row=${oneMoveRowRightUp}][col=${oneMoveColRightUp}]`).addClass('highlight');
		} else if(checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === oppositePiece || checkerBoardArray[oneMoveRowRightUp][oneMoveColRightUp] === oppositePieceKing){
			checkJump(twoMovesRowRightUp, twoMovesColRightUp);
		} else {
			return;
		}
	}
}
function checkJump(jumpRowDirection, jumpColDirection){
	if(8 > jumpRowDirection && 8 > jumpColDirection && -1 < jumpRowDirection && -1 < jumpColDirection){
		if(checkerBoardArray[jumpRowDirection][jumpColDirection] === ' '){
			$(`.play-checker-tile[row=${jumpRowDirection}][col=${jumpColDirection}]`).addClass('highlight');
			possibleJumps++;
		} else {
			return;
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
	var jumpedRow;
	var jumpedCol;
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
	createMovementCalcs();
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
	makeCheckersBoard();
}