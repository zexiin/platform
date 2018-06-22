
/**********

this file contains the main game functions??

**********/

var context = document.querySelector("canvas").getContext("2d");
var canvas = context.canvas;
canvas.height = 300;
canvas.width = 500;

var control = {
	left: false, right: false, up: false, down: false,

	keyListener: function(event) {		

		// switch the keystate
		var key_state = (event.type == "keydown")?true:false;

		switch(event.keyCode) {
			case 37: // left
				control.left = key_state;
				event.preventDefault(); // preventDefault prevents arrow keys from scrolling the page.
				break;
			case 38: // up
				control.up = key_state;
				event.preventDefault();
				break;
			case 39: // right
				control.right = key_state;
				event.preventDefault();
				break;
			case 40: // down
				control.down = key_state;
				event.preventDefault();
				break;
		}
	}
};



/**** function calls in here ****/

// don't start game loop until all images have been preloaded
var tilesheet = new Image();
tilesheet.onload = function() { sprite.onload(); }; // on loading this, load next
tilesheet.src = "../assets/sheet.png";
var sprite = new Image();
sprite.onload = function() { init(); }; // on loading this, start initialize the game.
sprite.src = "../assets/characters.png";


var scaleFactor = 2;
var player, map, cam;

function init() {

	context.imageSmoothingEnabled = false;
	player = new Player();
	map = new Map(tilesheet, 16, 16*scaleFactor);
	map.init(38, 13, "\
 ]                                 [X \
 ]                                 [X \
 ]                                 [X \
 ]                     dmb         [X \
 ]                                 [X \
 8445           db           %%    [X \
 XXX]                         %    [X \
 9776        %     dmmb            [X \
 ]                        dmmmmb   [X \
 ]       dmmmmb                    [X \
 ]       ixxxxl       %            [X \
 ========xxxxxx====================== \
 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ");
	cam = new Camera(player, map);
	loop(); // finish initializing and start the game loop

}





function loop() {


	// clearRect functions below but if u redraw the bg every time it's not necessary
	//context.clearRect(player.camCoords.x,player.camCoords.y,64,64); 
	//context.clearRect(0,0,cam.w,cam.h); 
	context.fillStyle = '#e1ecf2';
	context.fillRect(0,0,canvas.width,canvas.height);
	
	//drawMap();
	player.update();
	// temp floor collision
	if(player.y >= 10*map.scaled) {
		player.y = 10*map.scaled;
		player.y_vel = 0;
		player.jumping = false;
	};

	collisionHandler(player, map);

	cam.update();
	cam.draw();
	//drawMap();
	player.draw();

	
    window.requestAnimationFrame(loop);
}




window.addEventListener("keydown", control.keyListener);
window.addEventListener("keyup", control.keyListener);

