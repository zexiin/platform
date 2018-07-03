
/**********

this file contains the contructors and instance methods for
the Map and Camera classes.

**********/



function Map(tilesheet, tilesize, scaledsize) {
	this.tilesheet = tilesheet;
	this.tsize = tilesize;
	this.scaled = scaledsize;
	this.init = function(c, r, stringRep) { 
		this.cols = c;
		this.rows = r;

		this.tiles = stringRep.split('');
		// find player and initialise player object
		this.findPlayer();
	};
}


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
        case "]": return 1;
    	case "[": return 2;
    	case "X": return 3;

    	case "%": return 155; // solid
    	
    	case "d": return 80;
    	case "x": return 125;
    	
    	case "m": return 81;
    	case "b": return 82;
    	case "i": return 124;
    	case "l": return 126;
    	case "=": return 103;
    	case "r": return 102;
    	case "k": return 104;
    	case "-": return 213; // dirt top
    	case "y": return 212; // dirt topleft corner
    	case "j": return 214; // dirt topright

    	case "_": return 147;

    	case "~": return 176; // water
    	case "I": return 133;
       


    	case "o": return 159; // coin
    	// coin shinies this is not productive but i want pretty sparkles ok
    		case "À": return 159.1;
    		case "Á": return 159.2;
    		case "Â": return 159.3;
    		case "Ã": return 159.4;
    	case "t": return 163;
    	case "!": return 98; // spike bloc
    	
    	default: return;

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
	if (this.xMax < 0) this.xMax = 0;
	if (this.yMax < 0) this.yMax = 0;


	this.following = following;  // usually the player object
	this.map = map;              // the map duh

}



Camera.prototype.update = function() {

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
			case 159.1: return gotCoin.getFrame(0);
			case 159.2: return gotCoin.getFrame(1);
			case 159.3: return gotCoin.getFrame(2);
			case 159.4: return gotCoin.getFrame(3);

		default: 
			return {
				x: (tile_ID - 1) * this.map.tsize % this.map.tilesheet.width,
				y: Math.floor((tile_ID - 1) * this.map.tsize / this.map.tilesheet.width) * this.map.tsize
			};
	}
}


Camera.prototype.draw = function() {

	//context.fillRect();

	// calculate which rows/cols are visible.
	let leftCol = Math.floor(this.x / this.map.scaled);  
	let rightCol = Math.ceil((this.x + this.w )/ this.map.scaled);
	let topRow = Math.floor(this.y / this.map.scaled);
	let bottomRow = Math.ceil((this.y + this.h) / this.map.scaled);

	for (var c = leftCol; c <= rightCol; c++) {
		for (var r = topRow; r <= bottomRow; r++) {

			var tile = this.map.getTile(c,r);

			if (tile <= 3) continue; // skip if blank tile
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


