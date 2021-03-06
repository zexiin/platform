
/**********

this file contains the contructors and instance methods for
the Map and Camera classes.

**********/

/*
// test for collision of player with any of the coins, then filters that coin out of the array
// AND tests for next level if u hit the treaaaaasure
 function coinRemove(player) {

 	let col = Math.ceil((player.x + player.w/2) / map.scaled);
	let row = Math.ceil((player.y + player.h/2) / map.scaled); 

	let playerIndex = row * this.map.cols + col;
	let playerIndex2 = playerIndex - 1; 

	if (this.map.arrayRep[playerIndex] == "t") {
		levelNo++;
		init(mapArr[levelNo]);
	};


	if (this.map.arrayRep[playerIndex] == "o") {
		delete(this.map.arrayRep[playerIndex]);
		 coinCount += 1;

	};

	if (this.map.arrayRep[playerIndex2] == "o") {
		delete(this.map.arrayRep[playerIndex2]);
		 coinCount += 1;

	};

}


function spike(player) {

	
	let col = Math.ceil((player.x + player.w/2)/ map.scaled);
	let row = Math.ceil((player.y + player.h/2)/ map.scaled); 

	let playerIndex = row * this.map.cols + col;

	if (this.map.arrayRep[playerIndex] == "!") {
		livesCount--;
		//freeze

		// move somewhere else
		player.x = player.xinit;
		player.y = player.yinit;


	};

}*/

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
	this.tiles = stringRep; 

	this.arrayRep = stringRep.split('');
};

Map.prototype.getTile = function(col, row) {

    // i switched it to an array
	let tile = this.arrayRep[row * this.cols + col];

	// let tile = this.tiles.charAt(row * this.cols + col);

	switch(tile) {
    	case " ": return 0;  //blank
    	case "%": return 136; // solid yello
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
    	case "v": return 117;
    	case "o": return 135;
    	case "2": return 102;
    	case "t": return 85;
    	// case "-": return 46; // blue middle platform
    	case "!": return 119; // spike bloc
    	
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


Camera.prototype.draw = function() {


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
	if (this.map.levelText.time > 0) {
 	 context.font = "70px georgia";
 	 context.fillStyle = "#339999";
 	 context.globalAlpha = this.map.levelText.opacity;
 	 this.map.levelText.opacity -= 0.0025;
 	 let text1 = ("level " + levelNo).split("").join(String.fromCharCode(8201));
     context.fillText(text1, this.map.levelText.x, this.map.levelText.y);
     this.map.levelText.x += 0.5;
     this.map.levelText.y += 0.3;
     this.map.levelText.time--;

	}
	context.globalAlpha = 1.0;

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


