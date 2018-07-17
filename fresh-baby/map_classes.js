
/**********

this file contains map constructors and instance methods/vars

**********/


class Map { // basic map constructor and functions. all others just override getTile function.
	// this class is used as a base for other maps, but itself is not used for the game
	// what was previously 'Map' is now the 'TileMap' class

	constructor(tilesheet, tilesize, scaledsize, c, r, stringRep) {
		// define instance properties
		this.tilesheet = tilesheet;
		this.tsize = tilesize;
		this.scaled = scaledsize;
		this.cols = c;
		this.rows = r;
		this.tiles = stringRep.split('');

	}

	getTile(col, row) {
		// child classes should override this function for their respective shit
	}

	// debugging function to view full map. 
	drawMap() {
		for (var c = 0; c < this.cols; c++) {
		  	for (var r = 0; r < this.rows; r++) {
		    var tile = this.getTile(c, r);
		    if (tile !== 0) { // 0 => empty tile
			      context.drawImage(
			        tilesheet, // image
			        (tile - 1) * this.tsize % tilesheet.width , // source x
			        Math.floor((tile - 1) * this.tsize / tilesheet.width) * this.tsize , // source y
			        this.tsize, // source width
			        this.tsize, // source height
			        c * this.scaled, // target x
			        r * this.scaled, // target y
			        this.scaled, // target width
			        this.scaled // target height
			      );
			    } 
	  		}
		}
	}


}

  /////////////////////
 // regular tilemap //
/////////////////////
class TileMap extends Map {

	constructor(tilesheet, tilesize, scaledsize, c, r, stringRep) {
		super(tilesheet, tilesize, scaledsize, c, r, stringRep);
		this.findPlayer();
	}

	findPlayer() {
		for(let i = 0; i < this.tiles.length; i++) {
		    if (this.tiles[i] === "P") {

		    	let y = Math.floor(i / this.cols);
				let x = Math.floor(i % this.cols);

				player = new Player(x * scaleFactor * 16, y * scaleFactor * 16);

				break;

		    }
		}
	}

	getTile(col, row) {

		let tile = this.tiles[row * this.cols + col];
		switch(tile) {
	        case " ": return 0;  //blank
	        case "]": return 0;
	    	case "[": return 0;
	    	case "X": return 0;

	    	case "%": return 155; // solid
	    	case "O": return 135; // green brick
	    	
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
	    	case "L": return 146; // dirt bottom left
	    	case "K": return 148; //dirt bottom right
	    	case "_": return 147;// dirt bottom

	    	case "~": return 220; // water blue 176
	    	case "I": return 133; // ice
		    	case "È": return 182;
		    	case "Ê": return 183;
	       


	    	case "o": return 159; // coin
	    	case "t": return 163;
	    	case "!": return 232; // spike bloc

	    	case "U": return 35; // superjump powerup
	    	
	    	default: return;

	    }
	}
}


  ///////////////////
 // collision map //
///////////////////

class CollisionMap extends Map {

	getTile(col, row) {

		let tile = this.tiles[row * this.cols + col];
		switch(tile) {

	    	case "%": return 1;  // solid 

	    	case "X": return 1;
	    	case "]": return 2;  // right 
	    	case "l": return 2;  // right 

	    	case "[": return 3;  // left
	    	case "i": return 3;  // left

	    	case "_": return 4;  // bottom
	    	case "=": return 5;  // top
	    	case "-": return 5;  // top
	    	case "m": return 5;  // top
	    	case "d": return 6;  // top & left
	    	case "y": return 6;  // top & left
	    	case "r": return 6;  // top & left
	    	case "b": return 7;  // top & right
	    	case "j": return 7;  // top & right
	    	case "k": return 7;  // top & right

	    	case "L": return 8;  // bottom & left
	    	case "K": return 9;  // bottom & right
	    	
	        case "o": return 20; // COIN
	        case "t": return 21; // TREASURE, NEXT LEVEL
	        case "!": return 22; // SPIKE, DIE

	        case "~": return 30; // WATER, pls
	        case "I": return 31; // ICE, pls

	        case "O": return 40; // brick with coin or smth. 0 coins collected
	        	case "Ô": return 40.1; // 1 coin collected
	        	case "Ö": return 40.2; // 2 coins collected
	        	case "Ò": return 40.3; // 3 coins collected
	        	case "Ó": return 40.4; // 4 coins collected

	        case "U": return 35; // superjump powerup


	    	default: return;
		}
	}

}


  ////////////////////
 // background map //
////////////////////

class BGMap extends Map {

	getTile(col, row) {

		let tile = this.tiles[row * this.cols + col];
		switch(tile) {

	    	case " ": return 0;
	    	case "w": return 218; // water, solid bg

	    	case "v": return 105; // lil grass sprout


	    	// holy shit lol
	    	case "1": return 14; // tree1
	    	case "2": return 15; // tree2
	    	case "3": return 16; // tree3
	    	case "4": return 36; // tree4
	    	case "5": return 37; // tree5
	    	case "6": return 38; // tree6
	    	case "7": return 58; // tree7
	    	case "8": return 59; // tree8
	    	case "9": return 60; // tree9


	    	// biggie clouds
	    	case "a": return 309;
	    	case ":": return 331; // white
	    	case "b": return 332;
	    	case "c": return 333;
	    	case "d": return 334;
	    	case "e": return 335;

	    	case ".": return 287; // b for bitch (blue)
	    	case "C": return 290; // single cloud
	    	case "{": return 265; // halfcloud left
	    	case "}": return 266; // halfcloud right

	    	case "f": return 353; // grassy hillz
	    	case "g": return 354;
	    	case "F": return 375;
	    	case "G": return 376;



	    	default: return;

	    }
	}

}


  /////////////////
 // overlay map //
/////////////////

class OverlayMap extends Map {

	getTile(col, row) {

		let tile = this.tiles[row * this.cols + col];
		switch(tile) {

	    	case " ": return 0;

	    	case "w": return 217; // transparent water, full tile (green)
	    	case "~": return 216; // transparent water border

	    	case "v": return 105; // lil grass sprout


	    	// holy shit lol
	    	case "1": return 14; // tree1
	    	case "2": return 15; // tree2
	    	case "3": return 16; // tree3
	    	case "4": return 36; // tree4
	    	case "5": return 37; // tree5
	    	case "6": return 38; // tree6
	    	case "7": return 58; // tree7
	    	case "8": return 59; // tree8
	    	case "9": return 60; // tree9



	    	default: return;

	    }
	}

}
