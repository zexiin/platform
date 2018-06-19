

/**********

this file contains functions for collision detection ??? maybe ??? :^(

**********/





function collisionCheck(player, map) {

	// check each side of player for a collision tile
	// use map getTile to determine what sides should collide
	// do relevant collision check based on direction of player + location&type of tile

	// after u figure this out use a separate logic grid rather than map.getTile()


	// convert player coords to map col,row

	var curTile = { 
		col: Math.ceil(player.x / map.scaled), 
		row: Math.ceil(player.y / map.scaled) 
	}; 

	// bounding box of player in map coordinates (not location of 32x32 tile)
	var playerBound = {
		x: player.x + 19,
		y: player.y + 25,
		w: 29,
		h: 39
	};




	// do a check on NINE(?) adjacent tiles (incl current tile).
	// for each adj tile, check which type of collision there should be
	// and then check for each collision... probably. idk man

	// currently only checking cardinal four.


	// get each tile id
	let above = map.getTile(curTile.col, curTile.row - 1);
	let below = map.getTile(curTile.col, curTile.row + 1);
	let right = map.getTile(curTile.col + 1, curTile.row);
	let  left = map.getTile(curTile.col - 1, curTile.row);


	// for debugging. draw the adj tiles to make sure theyre the right ones lmfao
		// above [blue]
		context.fillStyle = "rgba(66, 134, 244,0.3)";
		let x = curTile.col * map.scaled - cam.x;
		let y = (curTile.row-1) * map.scaled - cam.y;
		context.fillRect(x, y, 32, 32);
		// below [pink]
		context.fillStyle = "rgba(244, 65, 160,0.3)";
		x = curTile.col * map.scaled - cam.x;
		y = (curTile.row+1) * map.scaled - cam.y;
		context.fillRect(x, y, 32, 32);
		// right [green]
		context.fillStyle = "rgba(109, 226, 86,0.3)";
		x = (curTile.col+1) * map.scaled - cam.x;
		y = curTile.row * map.scaled - cam.y;
		context.fillRect(x, y, 32, 32);
		// left [yello]
		context.fillStyle = "rgba(255, 199, 58,0.3)";
		x = (curTile.col-1) * map.scaled - cam.x;
		y = curTile.row * map.scaled - cam.y;
		context.fillRect(x, y, 32, 32);


	// draw player bounding box. 
	context.strokeStyle = "#ff5132";
	context.strokeRect(playerBound.x - cam.x,playerBound.y - cam.y, playerBound.w, playerBound.h);





	var tyle = collisionType(above);
	// if player is going up and tile above has collision on southern edge,
	if (tyle.s && player.y_vel < 0) {
		player.y_vel = 0;
	};
	// if player is going left and tile left has collision on eastern edge,
	tyle = collisionType(left);
	if (tyle.e && player.x_vel < 0) { 
		player.x += player.X_ACCEL;
		player.x_vel = 0; 
	}
	// if player is going right and tile right has collision on western edge,
	tyle = collisionType(right);
	if (tyle.w && player.x_vel > 0) { 
		player.x -= player.X_ACCEL;
		player.x_vel = 0; 
	}
	// if player is going down and tile below has collision on northern edge,
	tyle = collisionType(below);
	if (tyle.n && player.y_vel > 0) { 
		player.y -= player.GRAVITY;
		player.y_vel = 0; 
		player.jumping = false; 
	}







}



// given a tile id#, returns object that tells which sides to check for collisions.
// replace with logic grid instead of maptiles for less code repetition
function collisionType(tileChar) {
	var collisions = { n: false, s: false, e: false, w: false };
	switch(tileChar) {
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



		default: return collisions; // default: no collision.
	};
}








