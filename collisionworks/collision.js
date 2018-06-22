

/**********

this file contains functions for collision detection ??? maybe ??? :^(

**********/



/**
things to add in the future after u get this bumsack to actually Work:
- map layers
- separate logic grid (instead of map.getTile)
  • collision types, incl tiles that don't occupy the full 16x16 tilespace
**/



function CollisionMap(map) {
	this.cols = map.cols;
	this.rows = map.rows;
	this.scaled = map.scaled;
}

CollisionMap.prototype.init = function(stringRep) { 
	this.tiles = stringRep; 
};

CollisionMap.prototype.getTile = function(col, row) {
	let tile = this.tiles.charAt(row * this.cols + col);
	switch(tile) {

    	case "%": return 1;  // solid 
    	case "]": return 2;  // right 
    	case "[": return 3;  // left
    	case "_": return 4;  // bottom
    	case "=": return 5;  // top
    	case "d": return 6;  // top & left
    	case "b": return 7;  // top & right
    	
    	
    	default: return;

    }

};




function collisionHandler(player, map) {



	// because the player's bounding box is 14x14, it can overlap with up to 4 tiles at once
	// get coordinates for each overlapping tile and check for collision on each.


	// these values get updated with each check because the collide function can change player coords
	let colMin, colMax, rowMin, rowMax, tile;

	// nw
	colMin = Math.floor(player.bound.x/map.scaled);
	rowMin = Math.floor(player.bound.y/map.scaled);
	tile = { col: colMin, row: rowMin, tsize: map.scaled };
	collide(player, tile, map);

	// ne
	colMax = Math.floor((player.bound.x+player.bound.w)/map.scaled);
	rowMin = Math.floor(player.bound.y/map.scaled);
	tile = { col: colMax, row: rowMin, tsize: map.scaled };
	collide(player, tile, map);

	/* // these checks are unnecessary unless the sprite gets longer lol
	//  w
	colMin = Math.floor(player.bound.x/map.scaled);
	rowMin = Math.floor(player.bound.y/map.scaled);
	tile = { col: colMin, row: rowMin+1, tsize: map.scaled };
	collide(player, tile, map);

	//  e
	colMax = Math.floor((player.bound.x+player.bound.w)/map.scaled);
	rowMin = Math.floor(player.bound.y/map.scaled);
	tile = { col: colMax, row: rowMin+1, tsize: map.scaled };
	collide(player, tile, map);
	*/

	// sw
	colMin = Math.floor(player.bound.x/map.scaled);
	rowMax = Math.floor((player.bound.y+player.bound.h)/map.scaled);
	tile = { col: colMin, row: rowMax, tsize: map.scaled };
	collide(player, tile, map);

	// se
	colMax = Math.floor((player.bound.x+player.bound.w)/map.scaled);
	rowMax = Math.floor((player.bound.y+player.bound.h)/map.scaled);
	tile = { col: colMax, row: rowMax, tsize: map.scaled };
	collide(player, tile, map);



	
	// debugging drawings
		let nw = { 
			col: colMin, 
			row: rowMin };
		let ne = { 
			col: colMax, 
			row: rowMin };
		let sw = { 
			col: colMin, 
			row: rowMax };
		let se = { 
			col: colMax, 
			row: rowMax };

		// draw bounding box. 
		context.strokeStyle = "#ff5132";
		context.strokeRect(player.bound.x - cam.x,player.bound.y - cam.y, player.bound.w, player.bound.h);

		// draw the tiles around player bounding box
		context.fillStyle = "rgba(149, 96, 229,0.3)"; // nw, purple
		context.fillRect(nw.col *map.scaled- cam.x, nw.row*map.scaled - cam.y, map.scaled, map.scaled);
		context.fillRect(ne.col *map.scaled- cam.x, ne.row*map.scaled - cam.y, map.scaled, map.scaled);
		context.fillRect(sw.col *map.scaled- cam.x, sw.row*map.scaled - cam.y, map.scaled, map.scaled);
		context.fillRect(se.col *map.scaled- cam.x, se.row*map.scaled - cam.y, map.scaled, map.scaled);
	


}



// given a tile id#, returns object that tells which sides to check for collisions.
// replace with logic grid instead of maptiles for less code repetition
function collisionType(tile_ID) {
	var collisions = { n: false, s: false, e: false, w: false };
	switch(tile_ID) {

		case 1: // all sides
			collisions.n = true; collisions.s = true; collisions.e = true; collisions.w = true;
			return collisions;

		case 2: // right
			collisions.e = true;
			return collisions;

		case 3: // left
			collisions.w = true;
			return collisions;

		case 4: // bottom
			collisions.s = true;
			return collisions;

		case 5: // top
			collisions.n = true;
			return collisions;

		case 6: // top & left
			collisions.n = true; collisions.w = true;
			return collisions;

		case 7: // top & right
			collisions.n = true; collisions.e = true;
			return collisions;
	


		default: return collisions; // default: no collision.
	};
}




// given a layer tile that the player overlaps, determine whether there is a collision based on coordinates and velocity
function collide(player, tile_obj, layer) {  // tile_obj should be a {col, row, tsize} object

	// already know that the tile overlaps with the player's bounding box. 
	// check how much they overlap in which diretions, whther tile has collision there and player is going in that direction
	let tile = {
		id: layer.getTile(tile_obj.col, tile_obj.row),
		x: tile_obj.col*layer.scaled,
		y: tile_obj.row*layer.scaled,
		w: tile_obj.tsize, 
		h: tile_obj.tsize
	};
	tile.collisions = collisionType(tile.id);

	const saveMePlease = 2*scaleFactor; // I GUESS ??????????????

	if(tile.collisions.n) {
		// if player is moving down into a tile with north collision
		if (player.bound.y+player.bound.h > tile.y &&  player.bound.y_prev+player.bound.h <= tile.y + saveMePlease) { 
			// for debug // console.log("collide north of tile "+tile.id);
			player.y = tile.y - player.bound.h - player.bound.y_offset - 0.1;
			player.y_vel = 0;
			player.jumping = false;


			player.updateBoundingBox();

			return;
		}

	}
	if(tile.collisions.e) {

		// if player is moving left into a tile with east collision
		if (player.bound.x < tile.x+tile.w && player.bound.x_prev >= tile.x+tile.w - saveMePlease) {
			// for debug // console.log("collide east of tile "+tile.id);
			player.x = tile.x + tile.w - player.bound.x_offset + 0.1;
			player.x_vel = 0;


			player.updateBoundingBox();

			return;
		}

	}
	if(tile.collisions.w) {
		// if player is moving right into a tile with west collision
		if (player.bound.x+player.bound.w > tile.x && player.bound.x_prev+player.bound.w <= tile.x + saveMePlease) {
			// for debug // console.log("collide west of tile "+tile.id);
			player.x = tile.x - player.bound.w - player.bound.x_offset - 0.1;
			player.x_vel = 0;


			player.updateBoundingBox();

			return;
		}

	}
	if(tile.collisions.s) {

		// if player is moving up into a tile with south collision
		if (player.bound.y < tile.y+tile.h && player.bound.y_prev >= tile.y+tile.h - saveMePlease) {
			// for debug // console.log("collide south of tile "+tile.id);
			player.y = tile.y + tile.h - player.bound.y_offset + 0.1;
			player.y_vel = 0; 

			player.updateBoundingBox();

			return;
		}


	}


} 







