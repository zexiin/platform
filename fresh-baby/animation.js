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

var gotCoin = {
	cur_frame: 0,
	no_frames: 4,
	frames: [{x:128,y:112}, {x:144,y:112}, {x:160,y:112}, {x:176,y:112}],
	delay: 15
};

gotCoin.getFrame = function(frame_num) {

	let imdying;

	switch (frame_num) {
		case 0:
			imdying = getAllIndexes(map.tiles, "À");
			for (let i = 0; i < imdying.length; i++) 
				setTimeout(function() {map.tiles[imdying[i]] = collision_map.tiles[i] = "Á";}, 100);
			break;
		case 1:
			imdying = getAllIndexes(map.tiles, "Á");
			for (let i = 0; i < imdying.length; i++) 
				setTimeout(function() {map.tiles[imdying[i]] = collision_map.tiles[i] = "Â";}, 100);
			break;
		case 2:
			imdying = getAllIndexes(map.tiles, "Â");
			for (let i = 0; i < imdying.length; i++) 
				setTimeout(function() {map.tiles[imdying[i]] = collision_map.tiles[i] = "Ã";}, 100);
			break;
		case 3:
			imdying = getAllIndexes(map.tiles, "Ã");
			for (let i = 0; i < imdying.length; i++) 
				setTimeout(function() {map.tiles[imdying[i]] = collision_map.tiles[i] = "\u0020";}, 100);
			break;
	}

	return this.frames[frame_num];
};


  ///////////
 // ENEMY //
///////////


Enemy.prototype.frame = {
	x: 96, y:0
}

Enemy.prototype.animation = {
	state: "walk_right",
	delay: 40,
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












