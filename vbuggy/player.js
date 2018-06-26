
/**********

this file contains the contructor and instance methods for
the Player class.

**********/



function Player() {
	this.x = this.xinit = 160;
	this.y = this.yinit = 0;
	this.x_vel = 0;
	this.y_vel = 0;
	this.jumping = false;

	this.camCoords = {}; 
	
    	this.GRAVITY = 0.15*scaleFactor; //0.15
	this.X_ACCEL = 0.25*scaleFactor; // 0.25
	this.Y_ACCEL = 9*scaleFactor;
	this.FRICTION = 0.83;
	this.w = 32*scaleFactor;
	this.h = 32*scaleFactor;

	// define sprite bounding box
	this.bound = {
		x:0, 
		y:0,
		x_prev: 0,
		y_prev: 0,
		w: 14*scaleFactor, //13
		h: 14*scaleFactor, // 19
		x_offset: 9*scaleFactor, // 10
		y_offset: 18*scaleFactor
	};

	this.frame = { // clipping coordinates of current animation frame
		x: 0,
		y: 0
	};
	this.facingRight = true;

	this.animation = {
		state: "idle",
		cur_frame: 0,
		max_frames: 64, // just so cur_frame doesn't get huge i gues

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
	};
}


  ////////////////////
 // update physics //
////////////////////


Player.prototype.update = function() {

	// handle controls
		if (control.up && !this.jumping) {
	      this.y_vel -= this.Y_ACCEL;
	      this.jumping = true;
	  	}
	    if (control.left) {
	      this.x_vel -= this.X_ACCEL;
	      this.facingRight = false;
	  	}
	    if (control.right) {
	      this.x_vel += this.X_ACCEL;
	      this.facingRight = true;
	  	}

    this.y_vel += this.GRAVITY;
    this.x += this.x_vel;
    this.y += this.y_vel;

    // friction (more friction when not jumping)
	if (this.jumping) {
	  this.x_vel *= 0.9;
	  this.y_vel *= 0.9;
	}
	else {
	  this.x_vel *= this.FRICTION;
	  this.y_vel *= this.FRICTION;
	}	
	// player's camera coordinates are updated in Camera.update()

	this.updateBoundingBox();

};

Player.prototype.updateBoundingBox = function() {
	// update bounding box coords. separate function bc this is used for collision
	this.bound.x_prev = this.bound.x;
	this.bound.y_prev = this.bound.y;
	this.bound.x = this.x + this.bound.x_offset;
	this.bound.y = this.y + this.bound.y_offset;
};


  //////////////////
 // draw/animate //
//////////////////


Player.prototype.draw = function() {
	this.updateAnimation();
	context.drawImage(tilesheet, this.frame.x, this.frame.y, 32, 32, this.camCoords.x, this.camCoords.y, this.w, this.h);
};


Player.prototype.setAnimationFrame = function() {

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
		case "idle_left":
			this.frame.x = 0;
			this.frame.y = 304;
			break;

	}

}


Player.prototype.updateAnimation = function() {

	// frame delay for all player animations .. idk theres probably a more elegant way to do this
	if (time%10 === 0 ) this.animation.cur_frame = (this.animation.cur_frame+1) % this.animation.max_frames;


	if (this.facingRight) {
		if (this.y_vel < -1) this.animation.state = "jump_right";
		else if (this.y_vel > 1) this.animation.state = "land_right";
		else if (this.x_vel > 1) this.animation.state = "walk_right";
		else this.animation.state = "idle_right";

	}

	else {
		if (this.y_vel < -1) this.animation.state = "jump_left";
		else if (this.y_vel > 1) this.animation.state = "land_left";
		else if (this.x_vel < -1) this.animation.state = "walk_left";
		else this.animation.state = "idle_left";
	}

	this.setAnimationFrame();


};




  ///////////
 // other //
///////////



Player.prototype.stop = function() {
	this.x = this.y = -100;
	this.x_vel = this.y_vel = this.GRAVITY = this.X_ACCEL = this.Y_ACCEL = 0;
};

Player.prototype.reset = function() {
	this.x = this.xinit;
	this.y = this.yinit;
	this.x_vel = 0;
	this.y_vel = 0;
	this.jumping = false;
};

Player.prototype.slowDown = function() {

	this.GRAVITY = 0.2*scaleFactor*0.5; //0.15
	this.X_ACCEL = 0.4*scaleFactor*0.5; // 0.25
	//this.Y_ACCEL = 8*scaleFactor*0.5;
	//this.FRICTION = 0.83*0.5;

};
Player.prototype.speedUp = function() {

	this.GRAVITY = 0.2*scaleFactor*1.5; //0.15
	this.X_ACCEL = 0.4*scaleFactor*2; // 0.25
	this.Y_ACCEL = 8*scaleFactor*1.3;
	//this.FRICTION = 0.83*0.5;

};





