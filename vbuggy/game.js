
/**********

this file contains the main game functions??

**********/

var context = document.querySelector("canvas").getContext("2d");
var canvas = context.canvas;
var mapArr = [];
var scaleFactor = 2;
var coinCount = 0;
var livesCount = 3;
var levelNo = 1;

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
tilesheet.onload = function() { init(map1);  }; // on loading this, load next
tilesheet.src = "../arcadesheet.png";

var player, map, cam, collision_map;

var map1 = {
	map: "\
 ]                                 [X \
 ]                                 [X \
 ]                                 [X \
 ]                     dmb         [X \
 ]                                 [X \
 ]              db           %%    [X \
 ]                            %    [X \
 ]           %     dmmb            [X \
 ]                        dmmmmb   [X \
 ]       r====7                    [X \
 ]       ixxxxl       %            [X \
 ========xxxxxx====================== \
 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ",
   row: 13, 
   col: 38

}

 var map2 = {
    map: "\
]                        o        [X\
]                                 [X\
]            o    o               [X\
]                     vt   o      [X\
]        o          dmmmb         [X\
]    o          o         o       [X\
]       o   dmmmb   o     o   o   [X\
]       2          o     o        [X\
] o  dmmmb  o    o    o  o        [X\
]            vvv     o   o      o [X\
]    o   o  dmmmb        vv  o    [X\
]                   o  dmmmb      [X\
]v o        o  o  2         o     [X\
8445    dmmmb      dmmmmb         [X\
XXX]              ! o       o     [X\
9776   o    %     dmmb o  o !o    [X\
]o        %  !  o    o   dmmmmb   [X\
]! oooo dmmmmb o o      o  o  o   [X\
]2   o  ixxxxl   ovvvvo !    !  o [X\
========xxxxxx======================\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  row: 21,
  col: 36

 }

 var map3 = {
    map: "\
X]                        o        [XX\
X]                                 [XX\
X]  dmb          o    o            [XX\
X8445                     v    o   [XX\
XXXX]        o          dmb        [XX\
XXXX]    o          o         o    [XX\
X9776       o   dmmmb   o     o   o[XX\
X]       2          o     o    dmb [XX\
X] o  dmb  o    o    o  o          [XX\
X]            vvv     o   o      o [XX\
X]    o   o  dmb        vv  o      [XX\
X]                   o  dmb        [XX\
X]v o        o  o  2         o     [XX\
X8445    dmmmb      dmb            [XX\
XXXX]              ! o       o     [XX\
X9776   o    %     dmmb o  o !o    [XX\
X]o        %  !  o    o   dmmmmb   [XX\
X]! dmmmmmmmmmb o o      o  o  o   [XX\
X]!!!!!!!ixxxxl!!!!!!!!!!!!!!!!!!!![XX\
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
	map = new Map(tilesheet, 16, 16 * scaleFactor);
	map.init(mapNo.col, mapNo.row, mapNo.map);

	cam = new Camera(player, map);
	loop(); // finish initializing and start the game loop

	collision_map = new CollisionMap(map);
	collision_map.init("\
 ]                                 [  \
 ]                                 [  \
 ]                                 [  \
 ]                     d=b         [  \
 ]                                 [  \
 ]              db           %%    [  \
 ]                            %    [  \
 ]           %     d==b            [  \
 ]                        d====b   [  \
 ]       d====b                    [  \
 ]       [    ]       %            [  \
 ========      ====================== \
                                      ");

}

function loop() {

	// clearRect functions below but if u redraw the bg every time it's not necessary
	//context.clearRect(player.camCoords.x,player.camCoords.y,64,64); 
	//context.clearRect(0,0,cam.w,cam.h); 
	context.fillStyle = '#e1ecf2';
	context.fillRect(0,0,canvas.width,canvas.height);
	
	player.update();

	collisionHandler(player, collision_map);

    
	cam.update();
	// coinRemove(player);
	// spike(player);
	cam.draw();
	player.draw();
	
    window.requestAnimationFrame(loop);
}

window.addEventListener("keydown", control.keyListener);
window.addEventListener("keyup", control.keyListener);