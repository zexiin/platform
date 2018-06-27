
/**********

this file contains the contructor and instance methods for
the Player class.

**********/



function Player() {
	this.x = this.xinit = 160;
	this.y = this.yinit = 0;
	this.x_vel = 0;
	this.y_vel = 0;
	this.jumping = true;

	this.camCoords = {}; 
	
    	this.GRAVITY = 0.15*scaleFactor; //0.15
	this.X_ACCEL = 0.2*scaleFactor; // 0.25
	this.Y_ACCEL = 6*scaleFactor;
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

	  	if(this.y_vel < 0) {this.y_vel *=1.05}

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


// **** animation functions & frame information are in animation.js





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
	this.jumping = true;
	deathTexts.push(new DeathText());
};

Player.prototype.slowDown = function() {

	this.GRAVITY = 0.2*scaleFactor*0.5; //0.15
	this.X_ACCEL = 0.4*scaleFactor*0.5; // 0.25
	//this.Y_ACCEL = 8*scaleFactor*0.5;
	//this.FRICTION = 0.83*0.5;

};
Player.prototype.speedUp = function() {

	this.GRAVITY = 0.14*scaleFactor*1.5; //0.15
	this.X_ACCEL = 0.4*scaleFactor*2; // 0.25
	this.Y_ACCEL = 7*scaleFactor*1.3;
	//this.FRICTION = 0.83*0.5;
	this.animation.delay = 10;

};





