
/**********

this file contains the main game functions??

**********/

var context = document.querySelector("canvas").getContext("2d");
var canvas = context.canvas;
canvas.height = 500;
canvas.width = 480;

var control = {
	left: false, right: false, up: false, down: false,

	keyListener: function(event) {
	  // switch the keystate
	  var key_state = (event.type == "keydown")?true:false;

	  switch(event.keyCode) {
	    case 37: // left
	      control.left = key_state;
	      break;
	    case 38: // up
	      control.up = key_state;
	      break;
	    case 39: // right
	      control.right = key_state;
	      break;
	    case 40: // down
	    	control.down = key_state;
	    	break;
  		}
	}
};



/**** function calls in here ****/

// don't start game loop until all images have been preloaded
var tilesheet = new Image();
tilesheet.onload = function() { sprite.onload(); }; // on loading this, load next
tilesheet.src = "../sheet.png";
var sprite = new Image();
sprite.onload = function() { init(); }; // on loading this, start initialize the game.
sprite.src = "../characters.png";



var player, map, cam;

function init() {

	context.imageSmoothingEnabled = false;
	player = new Player();
	map = new Map(tilesheet, 16, 32);
/*	map.init(23, 11, "\
 ]                  [X \
 ]                  [X \
 ]                  [X \
 8445     o         [X \
 XXX]               [X \
 9776   o    %      [X \
 ]o        o     o  [X \
 ]! oooo dmmmmb o o [X \
 ]    o  ixxxxl   o [X \
 ========xxxxxx======= \
 xxxxxxxxxxxxxxxxxxxxx ");*/


	map.init(38, 21, "\
X]                        o        [XX\
X]                                 [XX\
X]            o    o               [XX\
X]                     v    o      [XX\
X]        o          dmmmb         [XX\
X]    o          o         o       [XX\
X]       o   dmmmb   o     o   o   [XX\
X]       2          o     o        [XX\
X] o  dmmmb  o    o    o  o        [XX\
X]            vvv     o   o      o [XX\
X]    o   o  dmmmb        vv  o    [XX\
X]                   o  dmmmb      [XX\
X]v o  %%%     o  o  2         o   [XX\
X8445    %%%%      dmmmmb          [XX\
XXXX]              ! o       o     [XX\
X9776   o    %     dmmb o  o !o    [XX\
X]o        %  !  o    o   dmmmmb   [XX\
X]! oooo dmmmmb o o      o  o  o   [XX\
X]2   o  ixxxxl   ovvvvo !    !  o [XX\
=========xxxxxx=======================\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");


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
	/*
	// temp floor collision
	if(player.y >= 220) {
		player.y = 220;
		player.y_vel = 0;
		player.jumping = false;
	};*/

	collisionHandler(player, map);

	cam.update();
	coinRemove(player);
	spike(player);
	cam.draw();
	player.draw();

	//console.log(player.y_vel);
	
    window.requestAnimationFrame(loop);
}




window.addEventListener("keydown", control.keyListener);
window.addEventListener("keyup", control.keyListener);
