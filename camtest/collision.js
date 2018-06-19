

/**********

this file contains functions for collision detection ??? maybe ??? :^(

**********/





function collisionHandler(player, map) {

	// check each side of player for a collision tile
	// use map getTile to determine what sides should collide
	// do relevant collision check based on direction of player + location&type of tile

	// after u figure this out use a separate logic grid rather than map.getTile()



	// bounding box of player in map coordinates (not location of 32x32 tile)
	var playerBound = {
		x: player.x + 19,
		y: player.y + 25,
		w: 29,
		h: 39
	};

	// draw player bounding box. 
	context.strokeStyle = "#ff5132";
	context.strokeRect(playerBound.x - cam.x,playerBound.y - cam.y, playerBound.w, playerBound.h);







	let nw = { 
		col: Math.round((playerBound.x - map.scaled)/map.scaled), 
		row: Math.round((playerBound.y - map.scaled)/map.scaled) };
	let  n = { 
		col: Math.round(playerBound.x/map.scaled), 
		row: Math.round((playerBound.y - map.scaled)/map.scaled) };
	let ne = { 
		col: Math.round((playerBound.x + map.scaled)/map.scaled), 
		row: Math.round((playerBound.y - map.scaled)/map.scaled) };


	let  w = { 
		col: Math.round((playerBound.x - map.scaled)/map.scaled), 
		row: Math.round(playerBound.y/map.scaled)
	 };
	 let  e = { 
		col: Math.round((playerBound.x + map.scaled)/map.scaled),
		row: Math.round(playerBound.y /map.scaled)
	 };

	 let sw = { 
		col: Math.round((playerBound.x - map.scaled)/map.scaled), 
		row: Math.round((playerBound.y + map.scaled)/map.scaled) };
	let  s = { 
		col: Math.round(playerBound.x/map.scaled), 
		row: Math.round((playerBound.y + map.scaled)/map.scaled) };
	let se = { 
		col: Math.round((playerBound.x + map.scaled)/map.scaled), 
		row: Math.round((playerBound.y + map.scaled)/map.scaled) };




	// for each side of the player bounding box, check if its x/y align with tile grid
	// if it aligns, get the tiles that are touching 
	// for every tile that it touches, add that tile to a list of tiles to check for collision. (or just check it)

	// check 8 tiles with possible collision 

	if ((playerBound.x/map.scaled).toFixed(2)%1 <= 0.15) { 
		// playerbound left aligns with tile grid. set western tile.
		w.tile = map.getTile(w.col, w.row);
		w.touching = true;	
	};
	if (((playerBound.x+playerBound.w)/map.scaled).toFixed(2)%1 <= 0.15 ) { 
		// playerbound right aligns with tile grid. set eastern tile.
		e.tile = map.getTile(e.col, e.row);
		e.touching = true;
	};
	if ((playerBound.y/map.scaled).toFixed(2)%1 <= 0.15) { 
		// playerbound top aligns with tile grid. set northern tile.
		n.tile = map.getTile(n.col, n.row);
		n.touching = true;

		// check nw and ne
		if(w.touching) {
			nw.tile = map.getTile(nw.col, nw.row);
			nw.touching = true;
		}
		if(e.touching) {
			ne.tile = map.getTile(ne.col, ne.row);
			ne.touching = true;
		}

	};
	if (((playerBound.y+playerBound.h)/map.scaled).toFixed(2)%1 <= 0.15) { 
		// playerbound bottom aligns with tile grid. set southern tile.
		s.tile = map.getTile(s.col, s.row);
		s.touching = true;

		// check sw and se
		if(w.touching) {
			sw.tile = map.getTile(sw.col, sw.row);
			sw.touching = true;
		}
		if(e.touching) {
			se.tile = map.getTile(se.col, se.row);
			se.touching = true;
		}
	};




	// for debugging: draw the 8 tiles around player bounding box
		context.fillStyle = "rgba(149, 96, 229,0.3)"; // nw, purple
		context.fillRect(nw.col *map.scaled- cam.x, nw.row*map.scaled - cam.y, 32, 32);
		context.fillStyle = "rgba(0, 0, 0,0.3)"; // n, black
		context.fillRect(n.col *map.scaled- cam.x, n.row*map.scaled - cam.y, 32, 32);
		context.fillStyle = "rgba(65, 242, 139,0.3)"; // ne, green
		context.fillRect(ne.col *map.scaled- cam.x, ne.row*map.scaled - cam.y, 32, 32);

		context.fillStyle = "rgba(255, 229, 63,0.3)"; // w, yellow
		context.fillRect(w.col *map.scaled- cam.x, w.row*map.scaled - cam.y, 32, 32);	
		context.fillStyle = "rgba(239, 58, 31,0.3)"; // e, red
		context.fillRect(e.col *map.scaled- cam.x, e.row*map.scaled - cam.y, 32, 32);

		context.fillStyle = "rgba(255, 84, 166,0.3)"; // sw, pink
		context.fillRect(sw.col *map.scaled- cam.x, sw.row*map.scaled - cam.y, 32, 32);
		context.fillStyle = "rgba(255, 255, 255, 0.6)"; // s, white
		context.fillRect(s.col *map.scaled- cam.x, s.row*map.scaled - cam.y, 32, 32);
		context.fillStyle = "rgba(66, 134, 244,0.3)"; // se, blue
		context.fillRect(se.col *map.scaled- cam.x, se.row*map.scaled - cam.y, 32, 32);


	// if player is moving left and the tile there is touching and it has eastern collision,
	if (w.touching && player.x_vel < 0) {
		if (collisionType(w.tile).e) { collide(player, "left"); }
	}
	// if player is moving right and the tile there is touching and it has western collision,
	if (e.touching && player.x_vel > 0) {
		if (collisionType(e.tile).w) { collide(player, "right"); }
	}
	// if player is moving up and the tile there is touching and it has southern collision,
	if(n.touching && player.y_vel < 0) { 
		if(collisionType(n.tile).s) { collide(player, "up"); }
	 }
	 // if player is moving down and the tile there is touching and it has northern collision,
	if(s.touching && player.y_vel > 0) { 
		if(collisionType(s.tile).n) { collide(player, "down"); }
	}

	// if player is moving nw and the tile there is touch and it has s/e collision,
	if(nw.touching && (player.x_vel < 0 || player.y_vel < 0)) {
		let hasCollision = collisionType(nw.tile);
		if (hasCollision.e) { collide(player, "left"); }
		if (hasCollision.s) { collide(player, "up"); }
	}

	// if player is moving ne and the tile there is touch and it has s/w collision,
	if(ne.touching && (player.x_vel > 0|| player.y_vel < 0)) {
		let hasCollision = collisionType(ne.tile);
		if (hasCollision.w) { collide(player, "right"); }
		if (hasCollision.s) { collide(player, "up"); }
	}

	// if player is moving sw and the tile there is touch and it has n/e collision,
	if(sw.touching && (player.x_vel < 0 || player.y_vel > 0)) {
		let hasCollision = collisionType(sw.tile);
		if (hasCollision.e) { collide(player, "left"); }
		if (hasCollision.n) { collide(player, "down"); }
	}

	// if player is moving se and the tile there is touch and it has n/w collision,
	if(se.touching && (player.x_vel > 0 || player.y_vel > 0)) {
		let hasCollision = collisionType(se.tile);
		if (hasCollision.w) { collide(player, "right"); }
		if (hasCollision.n) { collide(player, "down"); }
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

// adjust player coordinates if there is a collision.
function collide(player, direction) { // direction is the direction player is moving in and hits object
	switch(direction) {
		case "left":
			player.x += player.X_ACCEL;
			player.x_vel = 0; 
			break;
		case "right":
			player.x -= player.X_ACCEL;
			player.x_vel = 0; 
			break;
		case "up":
			player.y_vel = 0;
			break;
		case "down":
			player.y -= player.GRAVITY;
			player.y_vel = 0; 
			player.jumping = false; 
			break;

		default: return;
	}
}








