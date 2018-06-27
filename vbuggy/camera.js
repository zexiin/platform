
/**********

this file contains the contructors and instance methods for
the Map and Camera classes.

**********/



function Map(tilesheet, tilesize, scaledsize) {
	this.tilesheet = tilesheet;
	this.tsize = tilesize;
	this.scaled = scaledsize;

	// only writes the text the first 150? frames
	this.levelText = { 
		time: 350,
		x: 10,
		y: 90, 
		opacity: 1.0 
	}
}

Map.prototype.init = function(c, r, stringRep) { 
	this.cols = c;
	this.rows = r;

	this.tiles = stringRep.split('');

	// find player and initialise player object
	this.findPlayer();


};

// find and create player 
Map.prototype.findPlayer = function() {

	for(let i = 0; i < this.tiles.length; i++) {
    if (this.tiles[i] === "P") {

    	let y = Math.floor(i / this.cols);
		let x = Math.floor(i % this.cols);

		player = new Player(x * scaleFactor * 16, y * scaleFactor * 16);

		break;

       }
    }

}

Map.prototype.getTile = function(col, row) {

	let tile = this.tiles[row * this.cols + col];

	switch(tile) {
        case " ": return 0;  //blank
	
        case "]": return 1;  //left invisible wall
        case "[": return 2;  //right invisible wall
        case "X": return 3;  //solid invisible wall		
			
    	case "%": return 155; // solid
    	//case "]": return 242; - this makes them black
    	//case "[": return 242;
    	case "d": return 80;
    	case "x": return 125;
    	//case "X": return 242;
    	case "m": return 81;
    	case "b": return 82;
    	case "i": return 124;
    	case "l": return 126;
    	case "=": return 103;
    	case "r": return 102;
    	case "7": return 104;
       


    	case "o": return 159;
    	case "t": return 163;
    	case "!": return 98; // spike bloc
    	
    	default: return;

    }

};


Map.prototype.levelTextFunction = function(levelText) {

	if (levelText.time > 0) {
 	 context.font = "70px georgia";
 	 context.fillStyle = "#339999";
 	 context.globalAlpha = levelText.opacity;
 	 levelText.opacity -= 0.0025;
 	 let text1 = ("level " + levelNo).split("").join(String.fromCharCode(8201));
     context.fillText(text1, levelText.x, levelText.y);
     levelText.x += 0.5;
     levelText.y += 0.3;
     levelText.time--;
	}
	context.globalAlpha = 1.0;
}



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
	if (this.xMax < 0) this.xMax = 0;
	if (this.yMax < 0) this.yMax = 0;


	this.following = following;  // usually the player object
	this.map = map;              // the map duh
	this.enemies = new Enemies(this.map.tiles);

}



Camera.prototype.update = function() {
	
	this.enemies.update();

	this.x = this.following.x - this.w*0.5 + 32;
	this.y = this.following.y - this.h*0.5 + 32;
	this.x = this.following.x - this.w*0.5 + this.following.w*0.5;
	this.y = this.following.y - this.h*0.5 + this.following.h*0.5;

	if (this.x < 0) this.x = 0;
	else if (this.x > this.xMax) this.x = this.xMax;
	if (this.y < 0) this.y = 0;
	else if (this.y > this.yMax) this.y = this.yMax;
	// can replace these checks with a compound Math.min/max statement 


	this.following.camCoords = this.mapToCam(this.following.x, this.following.y);
	


};


Camera.prototype.getTileFrame = function(tile_ID) {

	switch(tile_ID) {

		case 159: return coinAnimation.getFrame();

		default: 
			return {
				x: (tile_ID - 1) * this.map.tsize % this.map.tilesheet.width,
				y: Math.floor((tile_ID - 1) * this.map.tsize / this.map.tilesheet.width) * this.map.tsize
			};
	}
}


Camera.prototype.draw = function() {
	this.enemies.draw();
	
	deathTexts.forEach(function(element) {
        element.display();
        });

	// calculate which rows/cols are visible.
	let leftCol = Math.floor(this.x / this.map.scaled);  
	let rightCol = Math.ceil((this.x + this.w )/ this.map.scaled);
	let topRow = Math.floor(this.y / this.map.scaled);
	let bottomRow = Math.ceil((this.y + this.h) / this.map.scaled);

	for (var c = leftCol; c <= rightCol; c++) {
		for (var r = topRow; r <= bottomRow; r++) {

			var tile = this.map.getTile(c,r);

			if (tile <= 3) continue; // skip if blank tile/invisible walls
			var xyTarget = this.mapToCam(c*this.map.scaled, r*this.map.scaled);

			context.drawImage(
				this.map.tilesheet, // image src
				this.getTileFrame(tile).x, // start clipping x
				this.getTileFrame(tile).y, // start clipping y
				this.map.tsize, // src width (clipped)
				this.map.tsize, // src height (clipped)
				xyTarget.x, // target x
				xyTarget.y, // target y
				this.map.scaled, this.map.scaled  // target w,h
			);
		}
	}
	

    // i'm sorry i'm so extra 
	this.map.levelTextFunction(this.map.levelText);

   document.getElementById("insert").innerHTML = "coins: " + coinCount;
   document.getElementById("lives").innerHTML = "lives: " + livesCount;
   document.getElementById("level").innerHTML = "level: " + levelNo;
   document.getElementById("kills").innerHTML = "kills: " + killCount;	
	

};


// helper functions for converting map and camera coordinates.
Camera.prototype.mapToCam = function(x,y) {
	return { x: x - this.x, y: y - this.y };
};
Camera.prototype.camToMap = function(x,y) {
	return {x: x + this.x, y: y + this.y };
};

// DEATH TEXT OBJECT

function DeathText() {
	this.time = 200;
    this.x = 20;
	this.y = 90; 
	this.opacity = 1.0; 
	this.size = 30;
}

DeathText.prototype.display = function() {

	if (this.time > 0) {
 	 context.font = this.size + "px courier";
 	 context.fillStyle = "#661144";
 	 context.globalAlpha = this.opacity;
 	 this.opacity -= 0.005;
 	 // let text1 = ("level " + levelNo).split("").join(String.fromCharCode(8201));
     context.fillText("death is inevitable", this.x, this.y);
     this.x += 0.8;
     this.y += 0.2;
     this.time--;
	}
	context.globalAlpha = 1.0;
}



