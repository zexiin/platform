
/**********

this file contains the contructor and instance methods for
the Player class.

**********/



function Player(x, y) {
	this.x = this.xinit = x;
	this.y = this.yinit = y;
	this.x_vel = 0;
	this.y_vel = 0;
	this.jumping = true;
	this.stop = false;
	
	this.attack = {
		state: "idle",
		time: -1,
		delay_time: 20
	}

	this.camCoords = {}; 

	this.setPhysics();

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
	this.inWater = false;

}



  /////////////
 // update  //
/////////////


Player.prototype.update = function() {

	// handle controls
		if (control.up && !this.jumping) {
	      this.y_vel -= this.Y_ACCEL;
	      if (!this.inWater) this.jumping = true;
	  	}
	    if (control.left) {
	      this.x_vel -= this.X_ACCEL;
	      this.facingRight = false;
	  	}
	    if (control.right) {
	      this.x_vel += this.X_ACCEL;
	      this.facingRight = true;
	  	}
	  	if (control.down && this.inWater) {
	  		this.y_vel += this.Y_ACCEL*0.5;
	  	}

	  	if(this.y_vel < 0) {this.y_vel *= this.Y_FLOAT;}

    this.y_vel += this.GRAVITY;
    this.x += this.x_vel;
    this.y += this.y_vel;

    // friction (more friction when not jumping)
	if (this.jumping) {
	  this.x_vel *= 0.9;
	  this.y_vel *= 0.9;
	}
	else {
	  this.x_vel *= this.X_FRICTION;
	  this.y_vel *= this.Y_FRICTION;
	}	


	// player's camera coordinates are updated in Camera.update()
	
	// ATTACK updates
	  	if (control.attack && this.attack.state === "idle") {
	  		console.log("start");
	  		this.attack.state = "ongoing";
	  		this.attack.time = this.attack.delay_time;
	  	}
        
	  	if (this.attack.state === "delay") {
	  		console.log("delaying");
	  		this.attack.time--;
	  	}

	  	if (this.attack.time == 0) {
	  		console.log("finish attack");
	  		this.attack.state = "idle";
	  		this.attack.time = -1;
	  	}


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
	
	// DEBUGGIN

	   if(this.attack.state == "ongoing"){
		context.fillStyle = '#FF00FF';
		context.fillRect(0,30,30,30);
	    }

	    if(this.attack.state == "delay"){
		context.fillStyle = '#FF0000';
		context.fillRect(0,30,30,30);
	    }
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
	this.inWater = false;
	this.setPhysics();
	this.updateBoundingBox();
};

Player.prototype.die = function() {

	sleep(2000);
	deathTexts.push(new DeathText());
	livesCount--;
	this.reset();
	
	enemies.terminateAll();
	bullets.terminateAll();

	enemies = new Enemies(map.tiles);
	bullets = new Bullets();

};




  /////////////
 // physics //
/////////////


Player.prototype.setPhysics = function () { // reset regular player physics
	this.GRAVITY = 0.15*scaleFactor; //0.15
	this.X_ACCEL = 0.2*scaleFactor; // 0.25
	this.Y_ACCEL = 6*scaleFactor;
	this.Y_FLOAT = 1 + 0.03*scaleFactor; // idk lol
	this.X_FRICTION = this.Y_FRICTION = 0.83;
}

Player.prototype.slowDown = function() {

	this.GRAVITY = this.GRAVITY * 0.75; //0.15
	this.X_ACCEL = this.X_ACCEL * 0.5; // 0.25

};

Player.prototype.speedUp = function() {

	this.GRAVITY = this.GRAVITY * 2;
	this.X_ACCEL = this.X_ACCEL * 2;
	this.Y_ACCEL = this.Y_ACCEL * 1.5;
	this.animation.delay = 10;
	this.Y_FLOAT = 1.04;
};

Player.prototype.setWater = function () { 
	this.GRAVITY = 0.05*scaleFactor; 
	this.X_ACCEL = 0.17*scaleFactor; 
	this.Y_ACCEL = 0.3*scaleFactor;
	this.Y_FLOAT = 1 + 0.03*scaleFactor; 
	this.X_FRICTION = this.Y_FRICTION = 0.73;
};

Player.prototype.setIce = function() {
	this.X_ACCEL = 0.05*scaleFactor;
	this.Y_ACCEL = 5*scaleFactor;
	this.X_FRICTION = 0.99;

};








