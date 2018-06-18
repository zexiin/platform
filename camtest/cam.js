
var context = document.querySelector("canvas").getContext("2d");
var canvas = context.canvas;
canvas.height = 260;
canvas.width = 400;


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


function Player() {
	this.x = 100;
	this.y = 0;
	this.x_vel = 0;
	this.y_vel = 0;
	this.jumping = false;

	this.camCoords = { x:100, y:0 }; //temp
}

Player.prototype.update = function() {
	if (control.up && this.jumping === false) {
      this.y_vel -= 18;
      this.jumping = true;
  	}
  	
    if (control.left) {
      this.x_vel -= 0.8;
  	}
    if (control.right) {
      this.x_vel += 0.8;
  	}

    this.y_vel += 0.6; //gravity
    this.x += this.x_vel;
    this.y += this.y_vel;

    // friction (more friction when not jumping)
	if (this.jumping) {
	  this.x_vel *= 0.9;
	  this.y_vel *= 0.9;
	}
	else {
	  this.x_vel *= 0.83;
	  this.y_vel *= 0.83;
	}	
	// player's camera coordinates are updated in Camera.update()

};

Player.prototype.draw = function() {
	//context.drawImage(sprite, 0, 0, 32, 32, this.x, this.y, 64, 64);
	context.drawImage(sprite, 0, 0, 32, 32, this.camCoords.x, this.camCoords.y, 64, 64);
};






function Map(tilesheet, tilesize, scaledsize) {
	this.tilesheet = tilesheet;
	this.tsize = tilesize;
	this.scaled = scaledsize;
}

Map.prototype.init = function(c, r, stringRep) { 
	this.cols = c;
	this.rows = r;
	this.tiles = stringRep; 
};

Map.prototype.getTile = function(col, row) {
	let tile = this.tiles.charAt(row * this.cols + col);
	switch(tile) {
    	case " ": return 0; //35 for blank, 136 for solid yellow
    	case "4": return 81;
    	case "5": return 82;
    	case "6": return 116;
    	case "7": return 115;
    	case "8": return 95;
    	case "9": return 78;
    	case "]": return 99;
    	case "[": return 97;
    	case "d": return 11;
    	case "x": return 29;
    	case "X": return 98;
    	case "m": return 12;
    	case "b": return 13;
    	case "i": return 28;
    	case "l": return 30;
    	case "=": return 8;

    }

};





// this function isn't actually used in-game; it's just for debugging purposes.
drawMap = function() {
	for (var c = 0; c < map.cols; c++) {
	  	for (var r = 0; r < map.rows; r++) {
	    var tile = map.getTile(c, r);
	    if (tile !== 0) { // 0 => empty tile
		      context.drawImage(
		        tilesheet, // image
		        (tile - 1) * map.tsize % tilesheet.width , // source x
		        Math.floor((tile - 1) * map.tsize / tilesheet.width) * map.tsize , // source y
		        map.tsize, // source width
		        map.tsize, // source height
		        c * map.scaled, // target x
		        r * map.scaled, // target y
		        map.scaled, // target width
		        map.scaled // target height
		      );
		    } 
  		}
	}
};





function Camera(following, map) {

	// x,y are the map coords of the top left corner of camera
	this.x = 0;
	this.y = 0;
	this.w = canvas.width;
	this.h = canvas.height;

	this.xMax = map.cols*map.scaled - this.w;
	this.yMax = map.rows*map.scaled - this.h;


	this.following = following;  // usually the player object
	this.map = map;              // the map duh

}

Camera.prototype.update = function() {

	this.x = this.following.x - this.w*0.5 + 32;
	this.y = this.following.y - this.h*0.5 + 32;

	if (this.x < 0) this.x = 0;
	else if (this.x > this.xMax) this.x = this.xMax;
	if (this.y < 0) this.y = 0;
	else if (this.y > this.yMax) this.y = this.yMax;
	// can replace these checks with a compound Math.min/max statement 


	this.following.camCoords = this.mapToCam(this.following.x, this.following.y);


};


Camera.prototype.draw = function() {

	// calculate which rows/cols are visible.
	var leftCol = Math.floor(this.x / this.map.scaled);  
	var rightCol = Math.ceil((this.x + this.w )/ this.map.scaled);
	var topRow = Math.floor(this.y / this.map.scaled);
	var bottomRow = Math.ceil((this.y + this.h) / this.map.scaled);

	for (var c = leftCol; c <= rightCol; c++) {
		for (var r = topRow; r <= bottomRow; r++) {

			var tile = this.map.getTile(c,r);
			if (tile === 0) continue; // skip if blank tile
			var xyTarget = this.mapToCam(c*this.map.scaled, r*this.map.scaled);

			context.drawImage(
				this.map.tilesheet, // image src
				(tile - 1) * this.map.tsize % this.map.tilesheet.width, // start clipping x
				Math.floor((tile - 1) * this.map.tsize / 
					this.map.tilesheet.width) * this.map.tsize, // start clipping y
				this.map.tsize, // src width (clipped)
				this.map.tsize, // src height (clipped)
				xyTarget.x, // target x
				xyTarget.y, // target y
				this.map.scaled, this.map.scaled  // target w,h
				);

		}
	}

};

// helper functions for converting map and camera coordinates.
Camera.prototype.mapToCam = function(x,y) {
	return { x: x - this.x, y: y - this.y };
};
Camera.prototype.camToMap = function(x,y) {
	return {x: x + this.x, y: y + this.y };
};






/**** function calls start here ****/

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
	map.init(23, 10, "\
 ]                  [X \
 ]                  [X \
 8445               [X \
 XXX]               [X \
 9776               [X \
 ]                  [X \
 ]       dmmmmb     [X \
 ]       ixxxxl     [X \
 ========xxxxxx======= \
 xxxxxxxxxxxxxxxxxxxxx ");
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
	if(player.y >= 200) {
		player.y = 200;
		player.y_vel = 0;
		player.jumping = false;
	};

	cam.update();
	cam.draw();
	player.draw();
	
    window.requestAnimationFrame(loop);
}




window.addEventListener("keydown", control.keyListener);
window.addEventListener("keyup", control.keyListener);


