
/**********

this file contains the contructor and instance methods for
the Player class.

**********/



function Player() {
	this.x = 100;
	this.y = 0;
	
	
	
	this.xinit = 100;
	this.yinit = 0;
	this.x_vel = 0;
	this.y_vel = 0;
	this.jumping = false;

	this.camCoords = { /*x:100, y:0 */}; //temp

	this.GRAVITY = 0.3;
	this.X_ACCEL = 0.5;
	this.Y_ACCEL = 15;
	this.FRICTION = 0.83;
	this.w = 32*scaleFactor;
	this.h = 32*scaleFactor;
	
	// define sprite bounding box
	this.bound = {
		x:0, 
		y:0,
		x_prev: 0,
		y_prev: 0,
		w: 10*scaleFactor, //13
		h: 19*scaleFactor, // 19
		x_offset: 11.5*scaleFactor, // 10
		y_offset: 13*scaleFactor
	};
}


Player.prototype.update = function() {
	if (control.up && this.jumping === false) {
      this.y_vel -= this.Y_ACCEL;
      this.jumping = true;
  	}
  	
    if (control.left) {
      this.x_vel -= this.X_ACCEL;
  	}
    if (control.right) {
      this.x_vel += this.X_ACCEL;
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

Player.prototype.draw = function() {
	context.drawImage(sprite, 0, 0, 32, 32, this.camCoords.x, this.camCoords.y, this.w, this.h);
};
