// map for starting positions of enemy

// needs acceleration, x, y 

function Enemy(x, y, a) {
	
		this.x = x;
		this.y = y;
		this.x_vel = 0.4;
		this.X_ACCEL = a;
}

// with each update: update x-vel of enemy
// check for collision with edge of platform, if is, reverse x_vel
// it's not rly collision tho

Enemy.prototype.update = function() {
	this.x_vel += this.X_ACCEL;

	this.x += this.x_vel;

	this.checkKill();

}

Enemy.prototype.checkKill = function() {

	if (this.x >= player.bound.x && this.x<= (player.bound.x + player.bound.w) 
		&& this.y >= player.bound.y && this.y <= (player.bound.y + player.bound.h)) {

		livesCount--;
		// move somewhere else
		player.reset();
		
	}

	let xx = this.x + 16 * scaleFactor;
	let yy = this.y + 16 * scaleFactor;

	if (this.xx >= player.bound.x && this.xx <= (player.bound.x + player.bound.w) 
		&& this.yy >= player.bound.y && this.yy <= (player.bound.y + player.bound.h)) {

		livesCount--;
		// move somewhere else
		player.reset();
		
	}



	
}

Enemy.prototype.die = function() {



}

Enemy.prototype.draw = function(cam) {

	// if his x & y coordinates are within the x y coordiantes of the camera, draw:
	// draw him at the camera coordinates

	if (this.x >= cam.x && this.x <= (cam.x + cam.w) && this.y >= cam.y && this.y <= (cam.y + cam.h)) {

		let xyTarget = cam.mapToCam(this.x, this.y);

		context.drawImage(
				map.tilesheet, // image src
				6 * map.tsize % map.tilesheet.width, // start clipping x
				Math.floor(6 * map.tsize / 
					map.tilesheet.width) * map.tsize, // start clipping y
				map.tsize, // src width (clipped)
				map.tsize, // src height (clipped)
				xyTarget.x, // target x
				xyTarget.y, // target y
				map.scaled, map.scaled  // target w,h
				);

	}
}
