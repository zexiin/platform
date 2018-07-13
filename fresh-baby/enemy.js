
/**********

trying to class enemies too

**********/


class Enemy {

	constructor(gen, physics, boundary) {
		/* PARAMETERS. so many dam
			gen: {x, y, w, h, path_length}
			physics: {x_vel, y_vel, x_accel, y_accel, gravity}
			boundary: {w, h, x_offset, y_offset}
		*/

		this.x = this.xinit = gen.x;
		this.y = this.yinit = gen.y;

		this.x_vel = physics.x_vel * scaleFactor;
		this.y_vel = physics.y_vel * scaleFactor;

		this.camCoords = {}; 
		this.setPhysics(physics.x_accel, physics.y_accel, physics.gravity);

		this.w = gen.w*scaleFactor;
		this.h = gen.h*scaleFactor;

		this.bound = {
			x:gen.x, 
			y:gen.y,
			x_prev: 0,
			y_prev: 0,
			w: boundary.w*scaleFactor, //13
			h: boundary.h*scaleFactor, // 19
			x_offset: boundary.x_offset*scaleFactor, // 10
			y_offset: boundary.y_offset*scaleFactor
		};

		this.frame = {}; // clipping coordinates of current animation frame
		
		this.length = gen.path_length;
		this.curDist = 0;

	}

	setPhysics(x_ac, y_ac, g) {
		this.GRAVITY = g*scaleFactor; //0.15
		this.X_ACCEL = x_ac*scaleFactor; // 0.25
		this.Y_ACCEL = y_ac*scaleFactor;
		this.Y_FLOAT = 1 + 0.01*scaleFactor; // idk lol
		this.X_FRICTION = this.Y_FRICTION = 0.83;
	}

	update() {

		this.x_vel += this.X_ACCEL;
		this.x += this.x_vel;
		this.curDist += this.x_vel;
		this.y_vel += this.GRAVITY;
		this.y += this.y_vel;

		if (Math.abs(this.curDist) > this.length) this.turn();

		this.checkKill();

		this.updateBoundingBox();
		this.camCoords = cam.mapToCam(this.x, this.y);
	}

	updateBoundingBox() {
		this.bound.x_prev = this.bound.x;
		this.bound.y_prev = this.bound.y;
		this.bound.x = this.x + this.bound.x_offset;
		this.bound.y = this.y + this.bound.y_offset;
	}

	die() {
		this.x = this.y = -100;
		this.setPhysics(0,0,0);
		this.x_vel = this.y_vel = 0;
	}

	checkKill() {

		let enemy_left = this.bound.x; let enemy_top = this.bound.y;
		let enemy_right = this.bound.x + this.bound.w; let enemy_bottom = this.bound.y + this.bound.h;


		if(overlap(this.bound,player.bound)) {

			if (player.bound.y + player.bound.h > enemy_top && player.bound.y_prev+player.bound.h <= enemy_top) {
				sfx.push(new SFX("bounce"));
				killCount++;
				this.die();
				player.y_vel *= -3;
			}

			else if (player.attack.state === "ongoing") {
				killCount++;
				this.die();
			}

			else {
				player.die();
			}

		}

	}


	turn() {
		this.x_vel *= -1;
		this.curDist = 0;
	}

	draw() {
		this.updateAnimation();
		if(this.bound.x+this.bound.w >= cam.x && this.bound.x <= cam.x+cam.w 
			&& this.bound.y+this.bound.h >= cam.y && this.bound.y <= cam.y+cam.h) {

			context.drawImage(tilesheet, 
				this.frame.x, this.frame.y, this.w/scaleFactor, this.h/scaleFactor, 
				this.camCoords.x, this.camCoords.y, this.w, this.h );

		}

	}

}






class Blue_Enemy extends Enemy {

	constructor(x, y, path_length) {
		let gen = { 
			x: x, y: y,
			w: 16, h: 16,
			path_length: path_length
		};
		let physics = {
			x_vel: 0.2*scaleFactor, y_vel: 0, x_accel: 0, y_accel: 0, gravity: 0
		};
		let boundary = {
			w: 10, h: 11, x_offset:3, y_offset: 5,
		};
		super(gen, physics, boundary);
		this.frame = {x:96,y:0};
	}

	die() {
		fx.bag.push(new Poof(this.x,this.y));
		super.die();
	}

}










class Jump_Enemy extends Enemy {

	constructor(x, y, path_length) {
		let gen = { 
			x: x, y: y,
			w: 16, h: 32,
			path_length: path_length
		};
		let physics = {
			x_vel: 0.25*scaleFactor, y_vel: 0, x_accel: 0, y_accel: -1*scaleFactor, gravity: 0.05*scaleFactor
		};
		let boundary = {
			w: 12, h: 16, x_offset:1, y_offset: 16,
		};
		super(gen, physics, boundary);
		this.frame = {x:96,y:16}; // replace w animation 
	}

	update() {
		super.update();
		if (this.y > this.yinit) {

			this.y = this.yinit;
			this.y_vel = this.Y_ACCEL;
		}

		if (this.y_vel < 0) {
			this.y_vel *= 1.02;
		}
	}

}











class Tank_Enemy extends Enemy {

	constructor(x, y, path_length) {
		let gen = { 
			x: x, y: y,
			w: 32, h: 32,
			path_length: path_length
		};
		let physics = {
			x_vel: 0.25*scaleFactor, y_vel: 0, x_accel: 0, y_accel: 0, gravity: 0
		};
		let boundary = {
			w: 24, h: 26, x_offset:3, y_offset: 6, // this big boi can intersect 9 tiles at once
		};
		super(gen, physics, boundary);
		this.bulletDelay = 500;
		this.frame = {x:0,y:64}; // replace w animation 
	}

	update() {
		super.update();
		if(time%this.bulletDelay === 0) {
			let x_offset = -6*scaleFactor;
			let y_offset = 13*scaleFactor;
			if(this.x_vel > 0) x_offset = 21*scaleFactor; // facing right
			bullets.bag.push(new Bullet(this.x+x_offset,this.y+y_offset,this.x_vel,this.y_vel));
		}
	}


}



class Bullet extends Enemy {

	constructor(x, y, x_dir, y_dir) {
		let gen = { 
			x: x, y: y,
			w: 16, h: 16, // 16,16
			path_length: 0
		};
		let physics = {
			x_vel: x_dir, y_vel: y_dir, x_accel: 0, y_accel: 0, gravity: 0
		};
		let boundary = {
			w: 4, h: 4, x_offset:6, y_offset: 7,  // 4,4,6,7
		};
		super(gen, physics, boundary);
		this.frame = {x:80,y:64}; // replace w animation 
	}

	update() {
		if(overlap(this.bound, player.bound)) player.die();
		else {
			this.x += this.x_vel;
			this.y += this.y_vel;
			this.updateBoundingBox();
			this.camCoords = cam.mapToCam(this.x, this.y);
		}

	}

}



/// this class prob dosesnt belong here but shruggy
class Bag {
	constructor() { this.bag = []; }
	update() {
		this.bag.forEach(function(element, i, bag) {
			element.update();
			if(map != undefined && (element.x+element.w < 0 || element.x > map.cols*map.scaled 
				|| element.y+element.h < 0 || element.y > map.rows*map.scaled)) { 
				terminate(element);
				bag.splice(i,1);
			}

		});
	}
	draw() {
		this.bag.forEach(function(element) {element.draw();});
	}
	terminateAll() { 
		this.bag.forEach(function(element) {terminate(element)}); 
	}
	push(element) {
		this.bag.push(element);
	}
}




class Enemies extends Bag {
	constructor(arrayRep) {
		super();
		
		for (let i = 0; i < arrayRep.length; i++) {
			// if arrayRep[i] = 2-9, J or R then remember which index & create lol
			let value = return_enemies(arrayRep[i]);

			if (value < 0) { continue; }

			let y = Math.floor(i / map.cols);
			let x = Math.floor(i % map.cols);

			if (value == "R") { 
				this.bag.push(new Tank_Enemy(x * scaleFactor * 16, y * scaleFactor * 16, 16 * scaleFactor * 4)); 
				continue;
			}

			else if (value == "J") { 
				this.bag.push(new Jump_Enemy(x * scaleFactor * 16, y * scaleFactor * 16, 16 * scaleFactor * 6));
				continue;

			}

			else {
				for (let j = 2; j <= 9; j++) {
				if (j == value) {
					this.bag.push(new Blue_Enemy(x * scaleFactor * 16, y * scaleFactor * 16, 16 * scaleFactor * j));
				 }
			   }
		    }

		}

		
	}
}











  /////////////
 // helpers //
/////////////

// returns index if it is that thing otherwise returns -1
function return_enemies(char) {

	for (let i = 2; i <= 9; i++) {
		if (char == i) return char;
	}
	if ((char == "J") || (char == "R")) return char;

	return -1;

}

function getAllIndexes(arr, val) {

    var indices = []; 
    let i = -1;

    while ((i = arr.indexOf(val, i+1)) != -1) indices.push(i);

    return indices;
}

// checks if two rectangular boxes overlap
// the arguments are two objects: each must have an x, y, w, and h
function overlap(first, second) {
	
	return (first.x < (second.x + second.w) && (first.x + first.w) > second.x
             && first.y < (second.y + second.h) && (first.y + second.h) > second.y);
}


function terminate(object) {
	object = null;
	delete object;
}








