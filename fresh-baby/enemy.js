// map for starting positions of enemy

// needs acceleration, x, y 

// collection of enemies
function Enemies(arrayRep) {

	this.enemyBag = [];

	// j is the length of the path the enemy is supposed to travel along
	for (let j = 2; j <= 9; j++) {

		let enemyIndex = getAllIndexes(arrayRep, j.toString());

		for (let i = 0; i < enemyIndex.length; i++) {

		let y = Math.floor(enemyIndex[i] / map.cols);
		let x = Math.floor(enemyIndex[i] % map.cols);

		this.enemyBag.push(new Enemy(x * scaleFactor * 16, y * scaleFactor * 16, 0, 16 * scaleFactor * j, "blue"));
	    }

	}

	// TANK

	    let enemyIndex = getAllIndexes(arrayRep, "R");

		for (let i = 0; i < enemyIndex.length; i++) {

		let y = Math.floor(enemyIndex[i] / map.cols);
		let x = Math.floor(enemyIndex[i] % map.cols);

		this.enemyBag.push(new Enemy(x * scaleFactor * 16, y * scaleFactor * 16, 0, 16 * scaleFactor * 4, "tank"));

        }

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

Enemies.prototype.terminateAll = function() {

	this.enemyBag.forEach(function(element) {
    terminate(element);

   });
}

// single enemy
function Enemy(x, y, a, l, type) {

	    this.type = type;
	
		this.x = x;
		this.y = y;
		this.x_vel = 0.3 * scaleFactor;
		this.X_ACCEL = a;

        if (type == "blue") {
		this.w = 16 * scaleFactor;
		this.h = 16 * scaleFactor;
	    }

	    else if (type == "tank") {
	    this.w = 32 * scaleFactor;
		this.h = 32 * scaleFactor;	
	    }
  
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

Enemy.prototype.die = function() {
	this.x = this.y = -100;
	this.x_vel = this.X_ACCEL = 0;
}

Enemy.prototype.checkKill = function() {

	let xEnd = this.x + this.w;
	let yEnd = this.y + this.h;

	if (!(this.x < (player.bound.x + player.bound.w) && xEnd > player.bound.x)) return;

	// if player is moving down onto the enemy
	if (player.bound.y + player.bound.h > this.y &&  player.bound.y_prev + player.bound.h <= this.y) { 
            
            	killCount++;

            this.die();
            player.y_vel *= -4;
            return;

	}


	if (this.y < (player.bound.y + player.bound.h) && yEnd > player.bound.y ) {
		
		if (player.attack.state === "ongoing") { 
		   	killCount++;

		   this.die(); 
		   return;
	        }

    	player.die();

    }
	
}

Enemy.prototype.turn = function() {

   this.x_vel *= -1;
   this.currDist = 0;

   if (this.type == "tank") {

   	let dir = -1;

   	if (this.x_vel > 0) { dir = +1; }
    
    bullets.bulletBag.push(new Bullet(this.x, this.y, dir));
   }

}


Enemy.prototype.draw = function() {

	if (this.type == "tank") { generalDraw(this, /*51*/ 89, 2, 2); return; }

	this.updateAnimation();

	// if his x & y coordinates are within the x y coordiantes of the camera, draw:
	// draw him at the camera coordinates

	if ((this.x + this.w) >= cam.x && this.x <= (cam.x + cam.w)
	 && (this.y + this.h) >= cam.y && this.y <= (cam.y + cam.h)) {

	let xyTarget = cam.mapToCam(this.x, this.y);

		context.drawImage(
				map.tilesheet, // image src
				this.frame.x, // start clipping x
				this.frame.y, // start clipping y
				map.tsize, // src width (clipped)
				map.tsize, // src height (clipped)
				xyTarget.x, // target x
				xyTarget.y, // target y
				map.scaled, map.scaled  // target w,h
				);

	}
}

function Bullet(x, y, dir) {
	this.x = x;
	this.y = y;
	this.x_vel = dir * 1;

	this.w = 16*2/3 * scaleFactor;
	this.h = 16*2/3 * scaleFactor;
}

Bullet.prototype.update = function() {

	// COLLISION CHECK W PLAYER
    if (overlap(this, player.bound)) {
    	player.die();

    	// bullet disapppears
    	return;
    }

	this.x += this.x_vel;

}

Bullet.prototype.draw = function() {
	generalDraw(this, 94, 1);
}


// ALLLLL THE BULLETS
function Bullets() {
	this.bulletBag = [];
}

Bullets.prototype.update = function() {

	this.bulletBag.forEach(function(element) {
    element.update();
     });

}

Bullets.prototype.draw = function() {

	this.bulletBag.forEach(function(element) {
    element.draw();
    });

}

Bullets.prototype.terminateAll = function() {

	this.bulletBag.forEach(function(element) {
    terminate(element);

   });
}


// checks if two rectangular boxes overlap
// the arguments are two objects: each must have an x, y, w, and h
function overlap(first, second) {
	return (first.x < (second.x + second.w) && (first.x + first.w) > second.x
             && first.y < (second.y + second.h) && (first.y + second.h) > second.y);
}

function generalDraw(object, tileNo, k) {

	if ((object.x + object.w) >= cam.x && object.x <= (cam.x + cam.w)
	 && (object.y + object.h)>= cam.y && object.y <= (cam.y + cam.h)) {

	let xyTarget = cam.mapToCam(object.x, object.y);

		context.drawImage(
				map.tilesheet, // image src
				(tileNo - 1) * map.tsize % map.tilesheet.width,
				Math.floor((tileNo - 1) * map.tsize / map.tilesheet.width) * map.tsize,
				map.tsize * k, // src width (clipped)
				map.tsize * k, // src height (clipped)
				xyTarget.x, // target x
				xyTarget.y, // target y
				map.scaled * k, map.scaled * k  // target w,h
				);
	}
}

function terminate(object) {
	object = null;
	delete object;
}
