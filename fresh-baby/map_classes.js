
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
		this.findPlayer_and_key();
	}

	findPlayer_and_key() {
		for(let i = 0; i < this.tiles.length; i++) {
		    if (this.tiles[i] === "P") {

		    	let y = Math.floor(i / this.cols);
				let x = Math.floor(i % this.cols);

				player = new Player(x * scaleFactor * 16, y * scaleFactor * 16);
		    }

		    else if (this.tiles[i] === "*") {

		    	let y = Math.floor(i / this.cols);
				let x = Math.floor(i % this.cols);

				key = new Key(x * scaleFactor * 16, y * scaleFactor * 16);

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

	    	case "%": if(winter_on) return 135; else return 155; // solid
	    	case "+": if(winter_on) return 83; else return 87; // bridge
	    	
	    	
	    	case "x": if(winter_on) return 129; else return 125;

	    	case "d": if(winter_on) return 84; else return 80; // floating platforms
	    	case "m": if(winter_on) return 85; else return 81;
	    	case "b": if(winter_on) return 86; else return 82;

	    	case "r": if(winter_on) return 106; else return 102; // top of ground
	    	case "=": if(winter_on) return 107; else return 103;
	    	case "k": if(winter_on) return 108; else return 104;

	    	case "i": if(winter_on) return 128; else return 124; // middle dirt layer
	    	case "x": if(winter_on) return 129; else return 125;
	    	case "l": if(winter_on) return 130; else return 126;
	    	
	    	
	    	case "y": if(winter_on) return 216; else return 212; // dirt topleft corner
	    	case "-": if(winter_on) return 217; else return 213; // dirt top
	    	case "j": if(winter_on) return 218; else return 214; // dirt topright

	    	case "L": if(winter_on) return 150; else return 146; // dirt bottom left
	    	case "_": if(winter_on) return 151; else return 147;// dirt bottom
	    	case "K": if(winter_on) return 152; else return 148; //dirt bottom right


	    	case "A": if(winter_on) return 172; else return 168; // top of ground (LITE) (TOP COLLISION ONLY)
	    	case "#": if(winter_on) return 173; else return 169;
	    	case "E": if(winter_on) return 174; else return 170;

	    	case "a": if(winter_on) return 194; else return 190; // middle dirt layer (LITE) (NO COLLISION)
	    	case "`": if(winter_on) return 195; else return 191;
	    	case "e": if(winter_on) return 196; else return 192;


	    	case "~": return 220; // water blue 176
	    	case "I": return 133; // ice
		    	case "È": return 182;
		    	case "Ê": return 183;
	       


	    	case "o": return 159; // coin
	    	case "t": return 39; // nxt lv

	    	case "!": return 232; // spike, facing upwards
	    	case ">": return 253; // spike, facing RGHT
	    	case "<": return 254; // spike, facing LEFT
	    	case "|": return 231; // spike, facing DOWN


	    	case "U": return 276; // superjump powerup
	    	
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
	    	case "+": return 5;  // top
	    	case "A": return 5;  // top
	    	case "#": return 5;  // top
	    	case "E": return 5;  // top

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

	        // ADD CASES 
	        case "!": return 22; // SPIKE, DIE
	        case ">": return 22; // SPIKE, DIE
	        case "<": return 22; // SPIKE, DIE
	        case "|": return 22; // SPIKE, DIE

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
	    	case "w": return 132; // water, solid bg

	    	case "v": if(winter_on) return 109; else return 105; // lil grass sprout or stone


	    	// holy shit lol
	    	case "1": if(winter_on) return 18; else return 14; // tree1
	    	case "2": if(winter_on) return 19; else return 15; // tree2
	    	case "3": if(winter_on) return 20; else return 16; // tree3
	    	case "4": if(winter_on) return 40; else return 36; // tree4
	    	case "5": if(winter_on) return 41; else return 37; // tree5
	    	case "6": if(winter_on) return 42; else return 38; // tree6
	    	case "7": if(winter_on) return 62; else return 58; // tree7
	    	case "8": if(winter_on) return 63; else return 59; // tree8
	    	case "9": if(winter_on) return 64; else return 60; // tree9


	    	// biggie clouds
	    	case "a": if(winter_on) return 321; else return 309;
	    	case ":": if(winter_on) return 343; else return 331; // white
	    	case "b": if(winter_on) return 344; else return 332;
	    	case "c": if(winter_on) return 345; else return 333;
	    	case "d": if(winter_on) return 346; else return 334;
	    	case "e": if(winter_on) return 347; else return 335;

	    	case ".": if(winter_on) return 300; else return 287; // b for bitch (blue)
	    	case "C": if(winter_on) return 278; else return 290; // single cloud
	    	case "{": if(winter_on) return 278; else return 265; // halfcloud left
	    	case "}": if(winter_on) return 279; else return 266; // halfcloud right

	    	case "f": if(winter_on) return 366; else return 353; // hillz
	    	case "g": if(winter_on) return 367; else return 354;
	    	case "F": if(winter_on) return 388; else return 375;
	    	case "G": if(winter_on) return 389; else return 376;



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

	    	case "w": return 88; // transparent water, full tile
	    	case "~": return 66; // transparent water border

	    	case "v": if(winter_on) return 109; else return 105; // lil grass sprout or stone


	    	// holy shit lol
	    	case "1": if(winter_on) return 18; else return 14; // tree1
	    	case "2": if(winter_on) return 19; else return 15; // tree2
	    	case "3": if(winter_on) return 20; else return 16; // tree3
	    	case "4": if(winter_on) return 40; else return 36; // tree4
	    	case "5": if(winter_on) return 41; else return 37; // tree5
	    	case "6": if(winter_on) return 42; else return 38; // tree6
	    	case "7": if(winter_on) return 62; else return 58; // tree7
	    	case "8": if(winter_on) return 63; else return 59; // tree8
	    	case "9": if(winter_on) return 64; else return 60; // tree9



	    	default: return;

	    }
	}

}
