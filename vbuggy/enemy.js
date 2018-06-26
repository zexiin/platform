// map for starting positions of enemy

// needs acceleration, x, y 

// collection of enemies
function Enemies(arrayRep) {

	this.enemyBag = [];

	let enemyIndex = getAllIndexes(arrayRep, "Q");

	for (let i = 0; i < enemyIndex.length; i++) {

		let y = Math.floor(enemyIndex[i] / map.cols);
		let x = Math.floor(enemyIndex[i] % map.cols);

		this.enemyBag.push(new Enemy(x * scaleFactor * 16, y * scaleFactor * 16, 0, 64 * scaleFactor));
	}

}

Enemies.prototype.update = function() {

	this.enemyBag.forEach(function(element) {
    element.update();
   });
}

Enemies.prototype.draw = function() {

	this.enemyBag.forEach(function(element) {
    element.draw(cam);
   
   });
}

// helper method
function getAllIndexes(arr, val) {

    var indexes = []; 
    let i = -1;

    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }

    return indexes;
}

// single enemy
function Enemy(x, y, a, l) {
	
		this.x = x;
		this.y = y;
		this.x_vel = 0.3 * scaleFactor;
		this.X_ACCEL = a;
        
		this.length = l; // length of path enemy is to travel
		this.currDist = 0; // distance he has travelled on current path (if it reaches l it turns around)
}

// with each update: update x-vel of enemy
// check for collision with edge of platform, if is, reverse x_vel
// it's not rly collision tho

Enemy.prototype.update = function() {
	this.x_vel += this.X_ACCEL;

	this.x += this.x_vel;

	this.currDist += this.x_vel;

	if (Math.abs(this.currDist) > this.length) { 
		this.turn();
	}

	this.checkKill();

}

Enemy.prototype.checkKill = function() {

	if (this.x >= player.bound.x && this.x<= (player.bound.x + player.bound.w) 
		&& this.y >= player.bound.y && this.y <= (player.bound.y + player.bound.h)) {

		livesCount--;
		// move somewhere else
		player.reset();
		
	}
	
}

Enemy.prototype.turn = function() {

   this.x_vel *= -1;
   this.currDist = 0;

}


Enemy.prototype.draw = function() {

	// if his x & y coordinates are within the x y coordiantes of the camera, draw:
	// draw him at the camera coordinates

	if (this.x >= cam.x && this.x <= (cam.x + cam.w)
	 && this.y >= cam.y && this.y <= (cam.y + cam.h)) {

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
