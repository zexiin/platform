
/**********

this file contains the main game functions??

**********/

var context = document.querySelector("canvas").getContext("2d");
var canvas = context.canvas;
	canvas.height = 400;
	canvas.width = 500;
var scaleFactor = 2;
var coinCount = 0;
var livesCount = 5;
var levelNo = 1;
var killCount = 0;
var deathTexts = [];
var paused = false;


context.font = "15px Arial";    
context.textBaseline = "top"; 
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

	    case 80: // pause
	    	if(event.type == "keydown") togglePause();
	    	break;		  
			  
  		}
	},


	mouse_x: 0, mouse_y: 0, mouse_down: false, mouse_up: false,


	mouseListener: function(event) {
		var canvasRect = canvas.getBoundingClientRect();
		control.mouse_x = event.clientX - canvasRect.x;
		control.mouse_y = event.clientY - canvasRect.y;

		switch(event.type) {
			case "mousedown": 
				control.mouse_down = true;
				control.mouse_up = false; 
				break;
			case "mouseup": 
				control.mouse_up = true;
				control.mouse_down = false; 
				break;
			default: break;
		}

	}

};

function togglePause() { paused = !paused; }


sleep = function(ms) { // lol
	for (let i = 0; i < ms*100000; i++) { }
};


drawGame = function() {

	context.fillStyle = bg_color;
	context.fillRect(0,0,canvas.width,canvas.height);

	cam.draw();
	fx.draw();
	player.draw();
	enemies.draw();
	bullets.draw();
	cam.drawOverlay();
	
	levelText.draw();
	deathTexts.forEach(function(element) {
        element.display();
    });

    statBar.draw();
    
}

updateGame = function() {
	
	player.update();
	//collisionHandler(player, collision_map);
	if(player.stop) return;

	fx.update();
	enemies.update(); 
	bullets.update();
	cam.update();


	document.getElementById("insert").innerHTML = "coins: " + coinCount;
	document.getElementById("lives").innerHTML = "lives: " + livesCount;
	document.getElementById("level").innerHTML = "level: " + levelNo;
	document.getElementById("kills").innerHTML = "kills: " + killCount;	
	time++;

}



/**** function calls in here ****/

var start = new SplashScreen();

// don't start game loop until all images have been preloaded
var tilesheet = new Image();
tilesheet.onload = function() { startLoop(); };
tilesheet.src = "../assets/arcadesheet.png";


function startLoop() {start.loop(); window.requestAnimationFrame(startLoop);}












var player, map, cam, collision_map, enemies, animate, time, bullets, fx;
var bg_color;
var statBar = new StatBar();



function init(mapNo) {
	
	sound.bag[9].play();
	window.cancelAnimationFrame(animate); 


	time = 0;

	levelText.reset();

	play = true;
	//canvas.height = Math.min(mapNo.row * 32, 200 * scaleFactor);
   	//canvas.width = Math.min(mapNo.col * 16, 250 * scaleFactor);

	context.imageSmoothingEnabled = false;

	map = new TileMap(tilesheet,16,16*scaleFactor, mapNo.col, mapNo.row, mapNo.map);
	collision_map = new CollisionMap(tilesheet,16,16*scaleFactor, mapNo.col, mapNo.row, mapNo.map);

	let bg_map, overlay_map;
	if (mapNo.map_bg !== undefined) bg_map = new BGMap(tilesheet,16,16*scaleFactor, mapNo.col, mapNo.row, mapNo.map_bg);
	if (mapNo.map_overlay !== undefined) overlay_map = new OverlayMap(tilesheet,16,16*scaleFactor, mapNo.col, mapNo.row, mapNo.map_overlay);
	if (mapNo.bg_color !== undefined) bg_color = mapNo.bg_color;
	else bg_color = "#bae4ef";

	cam = new Camera(player, map, bg_map, overlay_map);

	
	if (mapNo.level === 1) {player.speedUp();}

	enemies = new Enemies(map.tiles);
	bullets = new Bag();
	fx = new Bag();
	
	loop(); // finish initializing and start the game loop

}


function loop() {

	if(!paused) {
		sound.bag[9].play();
		if(!player.inWater) {sound.bag[7].pause();}
		else if(sound.bag[7].paused || sound.bag[7].duration === 0) {
			console.log("inwater" + player.inWater);
			sound.bag[7].play();
		}
		updateGame();
		drawGame();
	}
	else {
		sound.bag[9].pause();
		sound.bag[7].pause();
		context.font = "70px arial";
		context.fillStyle = "black";
		context.textAlign = "center";
		context.fillText("paused",canvas.width/2,canvas.height/3);
	}


    animate = window.requestAnimationFrame(loop);
}








window.addEventListener("keydown", control.keyListener);
window.addEventListener("keyup", control.keyListener);
canvas.addEventListener("mousemove", control.mouseListener);
canvas.addEventListener("mousedown", control.mouseListener);
canvas.addEventListener("mouseup", control.mouseListener);
