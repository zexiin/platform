
/**********

this file contains the main game functions??

**********/

var context = document.querySelector("canvas").getContext("2d");
var canvas = context.canvas;
var scaleFactor = 2;
var coinCount = 0;
var livesCount = 5;
var levelNo = 1;
var killCount = 0;
var deathTexts = [];

context.font = "15px Arial";    
context.textBaseline="top"; 
context.fillText("Top",5,100);    

// canvas.height = 500;
//canvas.width = 480;

var control = {
	left: false, right: false, up: false, down: false, attack: false,

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
	    case 90: // attack
	    	control.attack = key_state;
	    	event.preventDefault();
	    	break;			  
			  
  		}
	}
};


sleep = function(ms) { // lol
	for (let i = 0; i < ms*100000; i++) { }
};


drawGame = function() {
	cam.draw();
	player.draw();
	enemies.draw();
	bullets.draw();
	
	//levelTextFunction(levelText);
	levelText.draw();
	deathTexts.forEach(function(element) {
        element.display();
    });

    statBar.draw();
    
}

updateGame = function() {
	
	player.update();
	collisionHandler(player, collision_map);
	if (player.stop) return;

	enemies.update(); 
	bullets.update();
	cam.update();
	time++;

}



/**** function calls in here ****/

// don't start game loop until all images have been preloaded
var tilesheet = new Image();
tilesheet.onload = function() { init(mapArr[0]); }; // on loading this, load next
tilesheet.src = "../assets/arcadesheet.png";

var player, map, cam, collision_map, enemies, animate, time, bullets;

var statBar = new StatBar();



function init(mapNo) {
	
	window.cancelAnimationFrame(animate);

	time = 0;

	levelText.reset();

	play = true;
	canvas.height = Math.min(mapNo.row * 32, 200 * scaleFactor);
   	canvas.width = Math.min(mapNo.col * 16, 250 * scaleFactor);

	context.imageSmoothingEnabled = false;
	// player = new Player();
	map = new Map(tilesheet, 16, 16 * scaleFactor);
	map.init(mapNo.col, mapNo.row, mapNo.map);

	cam = new Camera(player, map);
	collision_map = new CollisionMap(map);
	collision_map.init(mapNo.map);
	
	if (mapNo.level === 1) player.speedUp();

	enemies = new Enemies(map.tiles);
	bullets = new Bullets();
	
	loop(); // finish initializing and start the game loop

}


function loop() {
	context.fillStyle = '#e1ecf2';
	context.fillRect(0,0,canvas.width,canvas.height);

	updateGame();
	drawGame();
    animate = window.requestAnimationFrame(loop);

}












window.addEventListener("keydown", control.keyListener);
window.addEventListener("keyup", control.keyListener);
