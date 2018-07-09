/**********

this file contains vars/methods for animation.

**********/


  ////////////
 // PLAYER //
////////////

Player.prototype.animation = {
	prev_state: "idle",
	state: "idle",
	delay: 15,
	cur_frame: 0,
	max_frames: 4, // just so cur_frame doesn't get huge i gues

	idle: {},

	walk_right: {
		no_frames: 4,
		frames: [{x:32,y:0}, {x:64,y:0}, {x:0,y:32}, {x:64,y:0}]
	},

	walk_left: {
		no_frames: 4,
		frames: [{x:32,y:304}, {x:64,y:304}, {x:64,y:336}, {x:64,y:304} ]
	},

	jump_right: {
		no_frames: 1,
		frames: [{x:32,y:32}]
	},

	jump_left: {
		no_frames: 1,
		frames: [{x:32,y:336}]
	},

	land_right: {
		no_frames: 1,
		frames: [{x:64,y:32}]
	},

	land_left: {
		no_frames: 1,
		frames: [{x:0,y:336}]
	},

	attack_right: {
		no_frames: 4,
		frames: [{x:0,y:400}, {x:32,y:400}, {x:64,y:400}, {x:96,y:400} ]
	},

	attack_left: {
		no_frames: 4,
		frames: [{x:96,y:368}, {x:64,y:368}, {x:32,y:368}, {x:0,y:368} ]
	},


};

Player.prototype.setAnimationFrame = function() { 
// this could probably be simplified considering theres so much repetition

	switch(this.animation.state) {

		case "jump_right":
			this.frame.x = this.animation.jump_right.frames[(this.animation.cur_frame % this.animation.jump_right.no_frames)].x;
			this.frame.y = this.animation.jump_right.frames[(this.animation.cur_frame % this.animation.jump_right.no_frames)].y;
			break;
		case "land_right":
			this.frame.x = this.animation.land_right.frames[(this.animation.cur_frame % this.animation.land_right.no_frames)].x;
			this.frame.y = this.animation.land_right.frames[(this.animation.cur_frame % this.animation.land_right.no_frames)].y;
			break;
		case "walk_right":
			this.frame.x = this.animation.walk_right.frames[(this.animation.cur_frame % this.animation.walk_right.no_frames)].x;
			this.frame.y = this.animation.walk_right.frames[(this.animation.cur_frame % this.animation.walk_right.no_frames)].y;
			break;
		case "attack_right":
			this.frame.x = this.animation.attack_right.frames[(this.animation.cur_frame % this.animation.attack_right.no_frames)].x;
			this.frame.y = this.animation.attack_right.frames[(this.animation.cur_frame % this.animation.attack_right.no_frames)].y;
			if (this.animation.cur_frame === this.animation.attack_right.no_frames-1) this.attack.state = "delay";
			break;
		case "idle_right":
			this.frame.x = 0;
			this.frame.y = 0;
			break;

		case "jump_left":
			this.frame.x = this.animation.jump_left.frames[(this.animation.cur_frame % this.animation.jump_left.no_frames)].x;
			this.frame.y = this.animation.jump_left.frames[(this.animation.cur_frame % this.animation.jump_left.no_frames)].y;
			break;
		case "land_left":
			this.frame.x = this.animation.land_left.frames[(this.animation.cur_frame % this.animation.land_left.no_frames)].x;
			this.frame.y = this.animation.land_left.frames[(this.animation.cur_frame % this.animation.land_left.no_frames)].y;
			break;
		case "walk_left":
			this.frame.x = this.animation.walk_left.frames[(this.animation.cur_frame % this.animation.walk_left.no_frames)].x;
			this.frame.y = this.animation.walk_left.frames[(this.animation.cur_frame % this.animation.walk_left.no_frames)].y;
			break;
		case "attack_left":
			this.frame.x = this.animation.attack_left.frames[(this.animation.cur_frame % this.animation.attack_left.no_frames)].x;
			this.frame.y = this.animation.attack_left.frames[(this.animation.cur_frame % this.animation.attack_left.no_frames)].y;
			if (this.animation.cur_frame === this.animation.attack_left.no_frames-1) this.attack.state = "delay";
			break;
		case "idle_left":
			this.frame.x = 0;
			this.frame.y = 304;
			break;

	}
}


Player.prototype.updateAnimation = function() {

	// frame delay for all player animations .. idk theres probably a more elegant way to do this
	if (time%this.animation.delay === 0 ) this.animation.cur_frame = (this.animation.cur_frame+1) % this.animation.max_frames;


	if (this.facingRight) {
		if (this.attack.state === "ongoing") this.animation.state = "attack_right";
		else if (this.y_vel < -0.5) this.animation.state = "jump_right";
		else if (this.y_vel > 0.5) this.animation.state = "land_right";
		else if (control.right) this.animation.state = "walk_right";
		else this.animation.state = "idle_right";
	}
	else {
		if (this.attack.state === "ongoing") this.animation.state = "attack_left";
		else if (this.y_vel < -0.5) this.animation.state = "jump_left";
		else if (this.y_vel > 0.5) this.animation.state = "land_left";
		else if (control.left) this.animation.state = "walk_left";
		else this.animation.state = "idle_left";
	}

	// if it's a new animation state, start frames from 0.
	if (this.animation.prev_state !== this.animation.state) this.animation.cur_frame = 0;
	this.animation.prev_state = this.animation.state;

	this.setAnimationFrame();

};








  //////////
 // COIN //
//////////


var coinAnimation = {
	cur_frame: 0,
	no_frames: 4,
	frames: [{x:64,y:112}, {x:80,y:112}, {x:96,y:112}, {x:112,y:112}],
	lastUpdate: 0,
	delay: 17
};

coinAnimation.getFrame = function() {
	if (time%this.delay === 0 && time != this.lastUpdate) {
		this.cur_frame = (this.cur_frame+1) % this.no_frames; // update current frame after delay
		this.lastUpdate = time;
	}
	return this.frames[this.cur_frame];
};



  ///////////
 // ENEMY //
///////////


Blue_Enemy.prototype.animation = {
	state: "walk_right",
	delay: 30,
	cur_frame: 0,
	max_frames: 2, // just so cur_frame doesn't get huge i gues
	lastUpdate: 0,


	walk_right: {
		no_frames: 2,
		frames: [{x:112,y:304}, {x:128,y:304}]
	},

	walk_left: {
		no_frames: 2,
		frames: [{x:96,y:0}, {x:112,y:0}]
	},

};


Jump_Enemy.prototype.animation = {
	state: "walk_right",
	delay: 40,
	cur_frame: 0,
	max_frames: 2, // just so cur_frame doesn't get huge i gues
	lastUpdate: 0,


	walk_right: {
		no_frames: 2,
		frames: [{x:128,y:320}, {x:112,y:320}]
	},

	walk_left: {
		no_frames: 2,
		frames: [{x:96,y:16}, {x:112,y:16}]
	},

};

Tank_Enemy.prototype.animation = {
	state: "walk_right",
	delay: 20,
	cur_frame: 0,
	max_frames: 2, // just so cur_frame doesn't get huge i gues
	lastUpdate: 0,


	walk_right: {
		no_frames: 2,
		frames: [{x:144,y:304}, {x:176,y:304}]
	},

	walk_left: {
		no_frames: 2,
		frames: [{x:0,y:64}, {x:32,y:64}]
	},

};

Bullet.prototype.animation = {
	state: "walk_right",
	delay: 100000,
	cur_frame: 0,
	max_frames: 1, // just so cur_frame doesn't get huge i gues
	lastUpdate: 0,

	walk_right: {
		no_frames: 1,
		frames: [{x:80,y:64}]
	},

	walk_left: {
		no_frames: 1,
		frames: [{x:80,y:64}]
	},

};

// this function can be used for all enemies as long as ani state names match up
Enemy.prototype.setAnimationFrame = function() {

	switch(this.animation.state) {

		case "walk_right":
			this.frame.x = this.animation.walk_right.frames[(this.animation.cur_frame % this.animation.walk_right.no_frames)].x;
			this.frame.y = this.animation.walk_right.frames[(this.animation.cur_frame % this.animation.walk_right.no_frames)].y;
			break;
		case "walk_left":
			this.frame.x = this.animation.walk_left.frames[(this.animation.cur_frame % this.animation.walk_left.no_frames)].x;
			this.frame.y = this.animation.walk_left.frames[(this.animation.cur_frame % this.animation.walk_left.no_frames)].y;
			break;

	}
};

// should probably replace this with individual updateAni functions for each type of enemy
// if animations get more complex beyond just walk right/ walk left ?
Enemy.prototype.updateAnimation = function() {

	// frame delay for all Enemy animations .. idk theres probably a more elegant way to do this
	if (time%this.animation.delay === 0 && time != this.animation.lastUpdate) {
		this.animation.cur_frame = (this.animation.cur_frame+1) % this.animation.max_frames;
		this.animation.lastUpdate = time;
	}

	if (this.x_vel >= 0) this.animation.state = "walk_right";
	else this.animation.state = "walk_left";

	this.setAnimationFrame();

};














  ///////////
 // EFFEX //
///////////

/* 

these are objects that have position/velocity/animation
but are merely for visual effect and have no collisions/interactions

ALSO VisFX assumes that each effect only has one animation state and expires after it plays


e.g.
ice breaking
water bubbles
splash
smoke puffs
coin sparkles can go here too proably
windy? leaves blowing thru the air? im dying

*/


class VisFX { // visual effects that add nothing worthwhile to the game.

	constructor(x, y, x_vel, y_vel, w, h) {
		this.x = x;
		this.y = y;
		this.x_vel = x_vel;
		this.y_vel = y_vel;
		this.w = w * scaleFactor;
		this.h = h * scaleFactor;
		this.frame = {x:0, y:0};
		this.animation = this.camCoords = {}; // oi
		this.repeat = false;
	}

	update() {
		this.x += this.x_vel;
		this.y += this.y_vel;
		this.camCoords = cam.mapToCam(this.x, this.y);
		this.updateAnimation();
	}

	stop() {
		this.x = this.y = -100;
		this.x_vel = this.y_vel = 0;
	}

	updateAnimation() {

		if (time%this.animation.delay === 0) {
			if (this.animation.cur_frame+1 === this.animation.no_frames && !this.repeat) this.stop();
			else this.animation.cur_frame = (this.animation.cur_frame+1) % this.animation.no_frames;
		}

		this.frame.x = this.animation.frames[this.animation.cur_frame].x;
		this.frame.y = this.animation.frames[this.animation.cur_frame].y;

	}

	draw() {
		if(this.x+this.w >= cam.x && this.x <= cam.x+cam.w 
			&& this.y+this.h >= cam.y && this.y <= cam.y+cam.h) {

			context.drawImage(tilesheet, 
				this.frame.x, this.frame.y, this.w/scaleFactor, this.h/scaleFactor, 
				this.camCoords.x, this.camCoords.y, this.w, this.h );

		}
	}

}


class Sparkles extends VisFX {
	constructor(x,y) {
		super(x, y, 0 , 0, 16, 16);
		this.animation = {
			delay: 16,
			cur_frame: 0,
			no_frames: 4,
			frames:[{x:128,y:112}, {x:144,y:112}, {x:160,y:112}, {x:176,y:112}],

		};
	}
}


class IceParticles extends VisFX {
	constructor(x,y) {
		super(x, y, 0 , 0.8*scaleFactor, 16, 16);
		this.animation = {
			delay: 30,
			cur_frame: 0,

			no_frames: 3,
			frames: [/*{x:96, y:128},*/{x:144, y:336},{x:160, y:336},{x:176, y:336},{x:192, y:336}/*,{x:208, y:336}*/], 

		};
	}
}

class Poof extends VisFX {
	constructor(x,y) {
		super(x, y, 0 , 0, 16, 16);
		this.animation = {
			delay: 10,
			cur_frame: 0,

			no_frames: 5,
			frames: [{x:0, y:128},{x:16, y:128},{x:32, y:128},{x:48, y:128},{x:64, y:128}], 

		};
	}
}


class WaterSplash extends VisFX {
	constructor(x,y) {
		super(x, y, 0 , 0, 32, 32);
		this.animation = {
			delay: 10,
			cur_frame: 0,

			no_frames: 5,
			frames: [{x:224, y:320},{x:224, y:320},{x:256, y:320},{x:224, y:352},{x:256, y:352}], // temp frames lmfao

		};
	}
}

// [!] don't know how/when/where in the code to generate these for watertop.. 
class Shimmer extends VisFX {
	constructor(x,y) {
		super(x, y, 0.03*scaleFactor , 0, 16, 16);
		this.frame = {x:336,y:128};
		this.dist = 0;
	}
	update() {
		this.x += this.x_vel;
		this.dist += this.x_vel;
		if (Math.abs(this.dist) > 2*scaleFactor) {
			this.x_vel *= -1;
			this.dist = 0;
		}
		this.camCoords = cam.mapToCam(this.x, this.y); 
		// disappear if off camera. this is probably temporary
		if(this.camCoords.x+this.w < 0 || this.camCoords.x > cam.w 
			|| this.camCoords.y+this.h < 0 || this.camCoords.y > cam.h) this.stop();
		
	}
}

var water_depth; // idk where else to put this variable soz
class Bubbles extends VisFX {
	constructor(x,y,x_vel) {
		super(x, y, x_vel , -0.8, 16, 16);
		this.max_y;
		this.animation = {
			delay: 20,
			cur_frame: 0,
			no_frames: 3,
			frames: [{x:144, y:352},{x:160, y:352},{x:176, y:352}],
		};
	}
	update() {
		super.update(); 
		if(this.y < water_depth) this.stop();
	}
}

















