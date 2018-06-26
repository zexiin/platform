
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
};

Map.prototype.getTile = function(col, row) {

	let tile = this.tiles[row * this.cols + col];

	switch(tile) {
        case " ": return 0;  //blank
    	case "%": return 155; // solid
    	case "]": return 242;
    	case "[": return 242;
    	case "d": return 80;
    	case "x": return 125;
    	case "X": return 242;
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
	this.enemies = new Enemies(this.map.arrayRep);

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


Camera.prototype.draw = function() {
	
	this.enemies.update();
	this.enemies.draw();


	// calculate which rows/cols are visible.
	let leftCol = Math.floor(this.x / this.map.scaled);  
	let rightCol = Math.ceil((this.x + this.w )/ this.map.scaled);
	let topRow = Math.floor(this.y / this.map.scaled);
	let bottomRow = Math.ceil((this.y + this.h) / this.map.scaled);

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
	

    // i'm sorry i'm so extra 
	this.map.levelTextFunction(this.map.levelText);

   document.getElementById("insert").innerHTML = "coins: " + coinCount;
   document.getElementById("lives").innerHTML = "lives: " + livesCount;
   document.getElementById("level").innerHTML = "level: " + levelNo;

};


// helper functions for converting map and camera coordinates.
Camera.prototype.mapToCam = function(x,y) {
	return { x: x - this.x, y: y - this.y };
};
Camera.prototype.camToMap = function(x,y) {
	return {x: x + this.x, y: y + this.y };
};


