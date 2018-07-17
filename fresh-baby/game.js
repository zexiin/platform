
/**********

this file contains the main game functions??

**********/


var scaleFactor = 2;

var player, map, cam, collision_map, enemies, animate, time, bullets, fx, sfx, statBar, bg_color;
var coinCount, livesCount, levelNo, killCount, deathTexts;


context.font = "15px Arial";    
context.textBaseline = "top"; 
context.fillText("Top",5,100);    

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
	    	if(event.type == "keydown") if(game_on) togglePause();
	    	break;		  
			  
  		}
	},


	mouse_x: 0, mouse_y: 0, mouse_down: false, mouse_up: false,


	mouseListener: function(event) {
		var canvasRect = canvas.getBoundingClientRect();
		control.mouse_x = event.clientX - canvasRect.left;
		control.mouse_y = event.clientY - canvasRect.top;

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

function togglePause() { 
	paused = !paused; 
	pause_scr.on = !pause_scr.on;
	vol_scr.on = false;
}


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
    sfx.play();
    
}

updateGame = function() {
	
	player.update();
	if(player.stop) return;

	fx.update();
	enemies.update(); 
	bullets.update();
	cam.update();
	sfx.update();


	document.getElementById("insert").innerHTML = "coins: " + coinCount;
	document.getElementById("lives").innerHTML = "lives: " + livesCount;
	document.getElementById("level").innerHTML = "level: " + levelNo;
	document.getElementById("kills").innerHTML = "kills: " + killCount;	
	time++;

}

function resetGame() {
	coinCount = 0;
	livesCount = 5;
	levelNo = 1;
	killCount = 0;
	deathTexts = [];
	statBar = new StatBar();
	sfx = new AudioBag();
	player = map = cam = collision_map = enemies = time = bullets = fx = animate = undefined;
	paused = game_on = false;
}






function init(mapNo) {
	game_on = true;


	time = 0;

	levelText.reset();


	context.imageSmoothingEnabled = false;

	map = new TileMap(tilesheet,16,16*scaleFactor, mapNo.col, mapNo.row, mapNo.map);
	collision_map = new CollisionMap(tilesheet,16,16*scaleFactor, mapNo.col, mapNo.row, mapNo.map);

	let bg_map, overlay_map;
	if (mapNo.map_bg !== undefined) bg_map = new BGMap(tilesheet,16,16*scaleFactor, mapNo.col, mapNo.row, mapNo.map_bg);
	if (mapNo.map_overlay !== undefined) overlay_map = new OverlayMap(tilesheet,16,16*scaleFactor, mapNo.col, mapNo.row, mapNo.map_overlay);
	if (mapNo.bg_color !== undefined) bg_color = mapNo.bg_color;
	else bg_color = "#bae4ef";

	cam = new Camera(player, map, bg_map, overlay_map);
	enemies = new Enemies(map.tiles);
	bullets = new Bag();
	fx = new Bag();

}

function gameLoop() {
	if(!paused) {
		updateGame();
		drawGame();

		
	}
}



/**** function calls start here ****/

// don't start game loop until all images have been preloaded
var tilesheet = new Image();
tilesheet.onload = function() { start_scr.on = true; mainLoop(); }; 
tilesheet.src = "../assets/arcadesheet.png";



function mainLoop() {

	if(start_scr.on) start_scr.loop();
	else if (instr_scr.on) instr_scr.loop();
	else if (credits_scr.on) credits_scr.loop();
	else if (another.on) another.loop();
	else if (game_on && !pause_scr.on) gameLoop();
	else if (game_on && pause_scr.on) { 
		sfx.pause();
		if(vol_scr.on) vol_scr.loop();
		else pause_scr.loop();
	}


	animate = window.requestAnimationFrame(mainLoop);

}





window.addEventListener("keydown", control.keyListener);
window.addEventListener("keyup", control.keyListener);
canvas.addEventListener("mousemove", control.mouseListener);
canvas.addEventListener("mousedown", control.mouseListener);
canvas.addEventListener("mouseup", control.mouseListener);
