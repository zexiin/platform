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

	this.camCoords = { x:100, y:0 }; //temp
}

Player.prototype.update = function() {
	if (control.up && this.jumping === false) {
      this.y_vel -= 15;
      this.jumping = true;
  	}
  	
    if (control.left) {
      this.x_vel -= 0.7;
  	}
    if (control.right) {
      this.x_vel += 0.7;
  	}

    this.y_vel += 0.5; //gravity
    this.x += this.x_vel;
    this.y += this.y_vel;

    // friction (more friction when not jumping)
	if (this.jumping) {
	  this.x_vel *= 0.9;
	  this.y_vel *= 0.9;
	}
	else {
	  this.x_vel *= 0.83;
	  this.y_vel *= 0.83;
	}	

	// player's camera coordinates are updated in Camera.update()

};

Player.prototype.draw = function() {
	//context.drawImage(sprite, 0, 0, 32, 32, this.x, this.y, 64, 64);
	context.drawImage(sprite, 0, 0, 32, 32, this.camCoords.x, this.camCoords.y, 64, 64);
};
