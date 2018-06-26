
/**********

this file contains the main game functions??

**********/

var context = document.querySelector("canvas").getContext("2d");
var canvas = context.canvas;
var scaleFactor = 2;
var coinCount = 0;
var livesCount = 3;
var levelNo = 1;
var killCount = 0;

context.font = "15px Arial";    
context.textBaseline="top"; 
context.fillText("Top",5,100);    

// canvas.height = 500;
//canvas.width = 480;

var control = {
	left: false, right: false, up: false, down: false,

	keyListener: function(event) {
	  // switch the keystate
	  var key_state = (event.type == "keydown")?true:false;

	  switch(event.keyCode) {
	    case 37: // left
			control.left = key_state;
			event.preventDefault();
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
tilesheet.onload = function() { init(mapArr[0]); }; // on loading this, load next
tilesheet.src = "../assets/arcadesheet.png";

var player, map, cam, collision_map;




var animate;
function init(mapNo) {
	
	window.cancelAnimationFrame(animate);
	
	play = true;
	canvas.height = Math.min(mapNo.row * 32, 350);
   	canvas.width = Math.min(mapNo.col * 16, 480);

	context.imageSmoothingEnabled = false;
	player = new Player();
	map = new Map(tilesheet, 16, 16 * scaleFactor);
	map.init(mapNo.col, mapNo.row, mapNo.map);

	cam = new Camera(player, map);
	collision_map = new CollisionMap(map);
	collision_map.init(mapNo.map);
	
	if (mapNo.level === 1) player.speedUp();
	
	loop(); // finish initializing and start the game loop

}

var time = 0;
var blink = true;

function loop() {
	

	


	context.fillStyle = '#e1ecf2';
	context.fillRect(0,0,canvas.width,canvas.height);
	
	player.update();

	collisionHandler(player, collision_map);

    
	cam.update();
	cam.draw();
	player.draw();


	if(time%29 === 0) blink = !blink;
	time++;
	if(blink){
		context.fillStyle = '#FF00FF';
		context.fillRect(0,0,30,30);
	}
	
    animate = window.requestAnimationFrame(loop);

}












window.addEventListener("keydown", control.keyListener);
window.addEventListener("keyup", control.keyListener);
