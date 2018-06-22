
/**********

this file contains the main game functions??

**********/

var context = document.querySelector("canvas").getContext("2d");
var canvas = context.canvas;
var mapArr = [];
var scaleFactor = 2;

context.font = "15px Arial";    
context.textBaseline="top"; 
context.fillText("Top",5,100);    

canvas.height = 500;
canvas.width = 480;

var control = {
	left: false, right: false, up: false, down: false,

	keyListener: function(event) {		
+
+		// switch the keystate
+		var key_state = (event.type == "keydown")?true:false;
+
+		switch(event.keyCode) {
+			case 37: // left
+				control.left = key_state;
+				event.preventDefault(); // preventDefault prevents arrow keys from scrolling the page.
+				break;
+			case 38: // up
+				control.up = key_state;
+				event.preventDefault();
+				break;
+			case 39: // right
+				control.right = key_state;
+				event.preventDefault();
+				break;
+			case 40: // down
+				control.down = key_state;
+				event.preventDefault();
+				break;
+		}
	}
};

/**** function calls in here ****/

// don't start game loop until all images have been preloaded
var tilesheet = new Image();
tilesheet.onload = function() { sprite.onload(); }; // on loading this, load next
tilesheet.src = "../sheet.png";
var sprite = new Image();

// on loading this, start initialize the game.
sprite.onload = function() { 
init(map1); 
}; 

sprite.src = "../characters.png";

var player, map, cam;


var map1 = {
	map: "\
 ]                  [X \
 ]                  [X \
 ]                  [X \
 8445     o         [X \
 XXX]     %         [X \
 9776   o    %      [X \
 ]o        o     o  [X \
 ]! oooo dmmmmb o o [X \
 ]    o  ixxxxl t o [X \
 ========xxxxxx======= \
 xxxxxxxxxxxxxxxxxxxxx ",
   row: 11, 
   col: 23

}

 var map2 = {
 	name: "map2",
    map: "\
X]                        o        [XX\
X]                                 [XX\
X]            o    o               [XX\
X]                     vt   o      [XX\
X]        o          dmmmb         [XX\
X]    o          o         o       [XX\
X]       o   dmmmb   o     o   o   [XX\
X]       2          o     o        [XX\
X] o  dmmmb  o    o    o  o        [XX\
X]            vvv     o   o      o [XX\
X]    o   o  dmmmb        vv  o    [XX\
X]                   o  dmmmb      [XX\
X]v o        o  o  2         o     [XX\
X8445    dmmmb      dmmmmb         [XX\
XXXX]              ! o       o     [XX\
X9776   o    %     dmmb o  o !o    [XX\
X]o        %  !  o    o   dmmmmb   [XX\
X]! oooo dmmmmb o o      o  o  o   [XX\
X]2   o  ixxxxl   ovvvvo !    !  o [XX\
=========xxxxxx=======================\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  row: 21,
  col: 38

 }

 var map3 = {
 	name: "map2",
    map: "\
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
X]v o        o  o  2         o     [XX\
X8445    dmmmb      dmmmmb         [XX\
XXXX]              ! o       o     [XX\
X9776   o    %     dmmb o  o !o    [XX\
X]o        %  !  o    o   dmmmmb   [XX\
X]! oooo dmmmmb o o      o  o  o   [XX\
X]2   o  ixxxxl   ovvvvo !    !  o [XX\
=========xxxxxx=======================\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  row: 21,
  col: 38

 }

 mapArr[1] = map1;
 mapArr[2] = map2;
 mapArr[3] = map3;



function init(mapNo) {

	canvas.height = Math.min(mapNo.row * 32, 500);
    canvas.width = Math.min(mapNo.col * 16, 480);

	context.imageSmoothingEnabled = false;
	player = new Player();
	map = new Map(tilesheet, 16, 32);
	map.init(mapNo.col, mapNo.row, mapNo.map);

	cam = new Camera(player, map);
	loop(); // finish initializing and start the game loop

}

function loop() {

	// clearRect functions below but if u redraw the bg every time it's not necessary
	//context.clearRect(player.camCoords.x,player.camCoords.y,64,64); 
	//context.clearRect(0,0,cam.w,cam.h); 
	context.fillStyle = '#e1ecf2';
	context.fillRect(0,0,canvas.width,canvas.height);
	
	player.update();

	collisionHandler(player, map);

    
	cam.update();
	coinRemove(player);
	spike(player);
	cam.draw();
	player.draw();
	
    window.requestAnimationFrame(loop);
}

window.addEventListener("keydown", control.keyListener);
window.addEventListener("keyup", control.keyListener);
