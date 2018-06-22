

/**********

this file contains functions for collision detection ??? maybe ??? :^(

**********/



/**
things to add in the future after u get this bumsack to actually Work:
- map layers
- separate logic grid (instead of map.getTile)
  • collision types, incl tiles that don't occupy the full 16x16 tilespace
**/


function collisionHandler(player, map) {

	// because the player's bounding box is 10x19, it can overlap with up to 6 tiles at once
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



	/*
	// debugging drawings
		let nw = { 
			col: colMin, 
			row: rowMin };
		nw.tile = map.getTile(nw.col, nw.row);

		let ne = { 
			col: colMax, 
			row: rowMin };
		ne.tile = map.getTile(ne.col, ne.row);

		let sw = { 
			col: colMin, 
			row: rowMax };
		sw.tile = map.getTile(sw.col, sw.row);	

		let se = { 
			col: colMax, 
			row: rowMax };
		se.tile = map.getTile(se.col, se.row);


		// draw bounding box. 
		context.strokeStyle = "#ff5132";
		context.strokeRect(player.bound.x - cam.x,player.bound.y - cam.y, player.bound.w, player.bound.h);

		// draw the tiles around player bounding box
		context.fillStyle = "rgba(149, 96, 229,0.3)"; // nw, purple
		context.fillRect(nw.col *map.scaled- cam.x, nw.row*map.scaled - cam.y, map.scaled, map.scaled);
		context.fillRect(ne.col *map.scaled- cam.x, ne.row*map.scaled - cam.y, map.scaled, map.scaled);
		context.fillRect(sw.col *map.scaled- cam.x, sw.row*map.scaled - cam.y, map.scaled, map.scaled);
		context.fillRect(se.col *map.scaled- cam.x, se.row*map.scaled - cam.y, map.scaled, map.scaled);
	*/


}



// given a tile id#, returns object that tells which sides to check for collisions.
// replace with logic grid instead of maptiles for less code repetition
function collisionType(tile_ID) {
	var collisions = { n: false, s: false, e: false, w: false };
	switch(tile_ID) {
		case 136: 
			collisions.n = true; collisions.s = true; collisions.e = true; collisions.w = true;
			return collisions;
		case 99:
			collisions.e = true;
			return collisions;
		case 12:
			collisions.n = true;
			return collisions;
		case 8:
			collisions.n = true;
			return collisions;
		case 30: collisions.e = true; return collisions;
		case 11: collisions.w = true; collisions.n = true; return collisions;
		case 13: collisions.e = true; collisions.n = true; return collisions;
		case 28: collisions.w = true; return collisions;



		default: return collisions; // default: no collision.
	};
}




// given a layer tile that the player overlaps, determine whether there is a collision based on coordinates and velocity
function collide(player, tile_obj, layer) {  // tile_obj should be a {col, row, tsize} object

	// already know that the tile overlaps with the player's bounding box. 
	// check how much they overlap in which diretions, whther tile has collision there and player is going in that direction
	let tile = {
		id: layer.getTile(tile_obj.col, tile_obj.row),
		x: tile_obj.col*map.scaled,
		y: tile_obj.row*map.scaled,
		w: tile_obj.tsize, 
		h: tile_obj.tsize
	};
	
	// special tiles: 
	let tileIndex = tile_obj.row * map.cols + tile_obj.col;
    
        // coin
	if (tile.id == 135) {
		delete(map.arrayRep[tileIndex]);
		coinCount += 1;
		return;
	}  
	// treasure: next level
	else if (tile.id == 85) {
		
		levelNo++;
		init(mapArr[levelNo]);
		return;

	}
	// spike
	else if (tile.id == 119) {
		livesCount--;
		// move somewhere else
		player.x = player.xinit;
		player.y = player.yinit;
		return;
	}
	
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







