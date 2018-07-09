

/**********

this file contains functions for collision detection ??? maybe ??? :^(

**********/



function collisionHandler(player, map) {

	// because the player's bounding box is 14x14, it can overlap with up to 4 tiles at once
	// get coordinates for each overlapping tile and check for collision on each.


	// these values get updated with each check because the collide function can change player coords
	let colMin, colMax, rowMin, rowMax, tile;

	// currently checks 4 tiles because that's the max space current sprite can occupy
	// if sprite bounding box exceeds 16x16, add more checks accordingly

	// nw
	colMin = Math.floor(player.bound.x/map.scaled);
	rowMin = Math.floor(player.bound.y/map.scaled);
	tile = { col: colMin, row: rowMin, tsize: map.scaled };
	collide(player, tile, map);
	if (player.stop) return;

	// ne
	colMax = Math.floor((player.bound.x+player.bound.w)/map.scaled);
	rowMin = Math.floor(player.bound.y/map.scaled);
	tile = { col: colMax, row: rowMin, tsize: map.scaled };
	collide(player, tile, map);
	if (player.stop) return;

	// sw
	colMin = Math.floor(player.bound.x/map.scaled);
	rowMax = Math.floor((player.bound.y+player.bound.h)/map.scaled);
	tile = { col: colMin, row: rowMax, tsize: map.scaled };
	collide(player, tile, map);
	if (player.stop) return;

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
	*/


}



// given a tile id#, returns object that tells which sides to check for collisions.
// replace with logic grid instead of maptiles for less code repetition
function collisionType(tile_ID) {
	var collisions = { n: false, s: false, e: false, w: false, 
					   coin: false, treasure: false, spike: false, 
					   water: false, ice: false, ice2: false, ice3: false };
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

		case 8: // bottom & left
			collisions.s = true; collisions.w = true;
			return collisions;

		case 9: // bottom & right
			collisions.s = true; collisions.e = true;
			return collisions;


		case 20: // COIN
			collisions.coin = true;
			return collisions;	

	    case 21: // TREASURE
			collisions.treasure = true;
			return collisions;	

	    case 22: // SPIKE
			collisions.spike = true;
			return collisions;	

		case 30: // water
			collisions.water = true;
			return collisions;

		case 31: // ice
			collisions.n = true; collisions.s = true; collisions.e = true; collisions.w = true;
			collisions.ice = true;
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

	if (tile.collisions.coin) {

		let tileIndex = tile_obj.row * map.cols + tile_obj.col;
		layer.tiles[tileIndex] = map.tiles[tileIndex] = "\u0020";
		fx.bag.push(new Sparkles(tile.x, tile.y));

		coinCount += 1;
		return;

	}

	if (tile.collisions.treasure) {
		win.play();
		player.stop = true;

		terminate(player);
		terminate(map);
		terminate(cam);
		enemies.terminateAll();
		bullets.terminateAll();
		fx.terminateAll();
		terminate(fx);
		terminate(bullets);
		terminate(enemies);
		levelNo++;
		init(mapArr[levelNo-1]);
		return;

	}

	if (tile.collisions.spike) {

		player.die();
		return;

	}


	if (tile.collisions.water) {

		// if player is moving down into water
		if (player.bound.y+player.bound.h > tile.y+tile.h*0.5 && !player.inWater) { 
			//console.log("collide north of water");
			player.inWater = true;
			player.setWater();
			player.jumping = false;
			player.y += player.y_vel;
			water_depth = tile.y+tile.h*0.5;
			fx.bag.push(new WaterSplash(player.x,player.y+8*scaleFactor));
			fx.bag.push(new Shimmer(player.x, player.bound.y+10));
			return;
		}

		// if player is moving up out of water
		if (player.bound.y+player.bound.h < tile.y+tile.h*0.5 && player.inWater) {
			//console.log("collide south of water: " +player.x.toFixed(2) +","+player.y.toFixed(2));
			player.inWater = false;
			player.Y_ACCEL = player.Y_ACCEL*3;
			player.GRAVITY = 0.1*scaleFactor;
			return;
		}

	}

	


	const saveMePlease = 2*scaleFactor; // I GUESS ??????????????

	if(tile.collisions.n) {
		// if player is moving down into a tile with north collision
		if (player.bound.y+player.bound.h > tile.y &&  player.bound.y_prev+player.bound.h <= tile.y + saveMePlease) { 
			// for debug // console.log("collide north of tile "+tile.id);
			if (!player.inWater) player.setPhysics();
			if (tile.collisions.ice) {
				player.setIce();
				// check if break ice
				if (player.y_vel > 2.5) {
					iceHandler(tile_obj, layer);
				}
			}

			
			player.y = tile.y - player.bound.h - player.bound.y_offset - 0.1;
			player.y_vel = 0;
			player.jumping = false;


			return;
		}

	}
	if(tile.collisions.e) {

		// if player is moving left into a tile with east collision
		if (player.bound.x < tile.x+tile.w && player.bound.x_prev >= tile.x+tile.w - saveMePlease) {
			// for debug // console.log("collide east of tile "+tile.id);
			player.x = tile.x + tile.w - player.bound.x_offset + 0.1;
			player.x_vel = 0;


			return;
		}

	}
	if(tile.collisions.w) {
		// if player is moving right into a tile with west collision
		if (player.bound.x+player.bound.w > tile.x && player.bound.x_prev+player.bound.w <= tile.x + saveMePlease) {
			// for debug // console.log("collide west of tile "+tile.id);
			player.x = tile.x - player.bound.w - player.bound.x_offset - 0.1;
			player.x_vel = 0;

			return;
		}

	}
	if(tile.collisions.s) {

		// if player is moving up into a tile with south collision
		if (player.bound.y < tile.y+tile.h && player.bound.y_prev >= tile.y+tile.h - saveMePlease) {
			// for debug // console.log("collide south of tile "+tile.id);
			player.y = tile.y + tile.h - player.bound.y_offset + 0.1;
			player.y_vel = 0; 

			if (tile.collisions.ice) iceHandler(tile_obj, layer);

			return;
		}


	}


} 


function iceHandler(tile_obj, layer) {
	let tileIndex = tile_obj.row * map.cols + tile_obj.col;

	switch(map.tiles[tileIndex]) {
		case "I":
			map.tiles[tileIndex] = "È";
			return;
		case "È":
			map.tiles[tileIndex] = "Ê";
			return;
		case "Ê":
			map.tiles[tileIndex] = "\u0020";
			layer.tiles[tileIndex] = "\u0020";

			let x = tile_obj.col * map.scaled;
			let y = tile_obj.row * map.scaled;

			fx.bag.push(new IceParticles(x, y));
			return;
	}

}




