var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
context.fillStyle = "red";
context.fillRect(0, 0, canvas.width, canvas.height);

var gameStarted = false;

document.body.addEventListener("keydown", function(event){

	if(event.keyCode == 13 && !gameStarted){
		startGame();
	}
		if(event.keyCode == 37 && !gameStarted){
		startGame();
	}	if(event.keyCode == 38 && !gameStarted){
		startGame();
	}	if(event.keyCode ==  39 && !gameStarted){
		startGame();
	}	if(event.keyCode == 40 && !gameStarted){
		startGame();
	}

});

intro_screen();

function intro_screen(){
	context.font = "50px Impact";
	context.fillStyle = "#000000";
	context.textAlign = "center";
	context.fillText("Game That is Boring Right Now", canvas.width/2, canvas.height/2);

	context.font = "20px Arial";
	context.fillText("Press click click To Start", canvas.width/2, canvas.height/2 + 50);
}

function startGame(){
	gameStarted = true;
	clearCanvas();

	setInterval(function(){
		clearCanvas();
		loop();
	}, 1000/30)
}

function loop(){
	console.log('game running');
}

function clearCanvas(){
	context.clearRect(0, 0, 640, 360);
}