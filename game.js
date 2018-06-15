
		var context = document.querySelector("canvas").getContext("2d");
		var H = context.canvas.height = 500;
		var W = context.canvas.width = 800;
		var SCALE = 16;
		var FRICTION = 0.8;
		var walls = [];

				// COIN
		function coin(x, y) {
					    this.x = x;
					    this.y = y;
		}

	coin.prototype.draw = function() {

					    context.fillStyle = "#ffd175";
					          context.beginPath();
					          context.arc(this.x * SCALE, this.y * SCALE, SCALE/3, 0, 2*Math.PI);
					          context.fill();

					  };

			    function wall(x,y) {
			    	this.x = x;
				    this.y = y;
			    }

			wall.prototype.draw = function() {

					    context.fillStyle = "#aed891";
			            context.fillRect(this.x * SCALE, this.y * SCALE, SCALE, SCALE);

					  };

		    function sprite() {
		    this.rad = 0.3;
		    this.jumping = true;

		    this.x = 9;
		    this.y = 2;

		    this.x_vel = 0;
		    this.y_vel = 0;
		  };
	 
		  sprite.prototype.left = function() {
		  	this.x_vel -= 0.01;
		  }

		  sprite.prototype.right = function() {
		  	this.x_vel += 0.01;
		  }

		  sprite.prototype.jump = function() {
	          this.y_vel -= 0.3;
	          this.jumping = true;
		  }

		  sprite.prototype.update = function() {

		  	player.y_vel += 0.01; //gravity
		   player.x += player.x_vel;
		   player.y += player.y_vel;

	    if (player.y > (H - 8)) {
	      player.y_vel = -1 *player.y_vel;
	      player.y = (H - 8);
	    }

		  }

		  sprite.prototype.draw = function() {
		  	context.fillStyle = "#ff0000";
					          context.beginPath();
					          context.arc(this.x * SCALE, this.y * SCALE, SCALE*0.3, 0, 2*Math.PI);
					          context.fill();
		  }


		  var control = {
		    left:false,
		    right:false,
		    up:false,

		    keyListener:function(event) {

		      // switch the keystate
		      var key_state = (event.type == "keydown")?true:false;

		      switch(event.keyCode) {

		        case 37: // left
		          control.left = key_state;
		          alert(left);
		          break;

		        case 38: // up
		          control.up = key_state;
		          alert(up);
		          break;

		        case 39: // right
		          control.right = key_state;
		          break;

		      }
		    }
		  };

		  function thing(x, y) {
		  	this.x = x;
		  	this.y = y;
		  }

		  function overlap(first, second) {

		  	  if ((first.y * SCALE + SCALE/2) < (second.y * SCALE) && (first.y * SCALE - SCALE/2) > (second.y * SCALE)) {
		  	  	first.y_vel = -1 * FRICTION * first.y_vel;
		  	  }

		  } 


		  function collide(player) {

	    
		  	var yStart = player.y - player.rad;
		  	var yEnd = player.y + player.rad;
		  	var xStart = player.x - player.rad;
		  	var xEnd = player.x + player.rad;
	    
	    // if there's a wall within the range then collide

		    var k;
		    for (k = 0; k < walls.length; k++) {

	      let right = walls[k].x + 1;
	      let left = walls[k].x;
	      let top = walls[k].y;
	      let bottom = walls[k].y + 1;

		    	// if player is going left and hits right side of object

		    	if ((yStart <= bottom && yStart >= top) || (yEnd <= bottom && yEnd >= top)) {
	      if (player.x_vel < 0 && xStart <= right && xEnd >= right) {
	          player.x_vel = 0;
	          player.x = right + player.rad;
	      }
	      
	      
	      // if player is going right and hits left side of object
	      if (player.x_vel > 0 && xEnd >= left && xStart <= left) {
	          player.x_vel = 0;
	          player.x = left - player.rad;
	      }
	      
	      }

	      	if ((xStart >= left && xStart <= right) || (xEnd >= left && xEnd <= right)) {

	      // if player is going down and hits top of object
	      if (player.y_vel > 0 && yEnd >= top && yStart <= top) {

	          player.y_vel = 0;
	          player.y = top - player.rad;
	          player.jumping = false;
	      }
	      
	      // if player is going up and hits bottom of object
	      if (player.y_vel < 0 && yStart <= bottom && yEnd >= bottom) {
	          player.y_vel = 0;
	          player.y = bottom + player.rad;
	      }

	     }
	      
		    }
		  }


				      				       var simpleLevelPlan = [
				  "                    xxx                         ",
				  "          o                        xxx          ",
				  "  x              = x  x                         ",
				  "  x      o  o o    x        xx                  ",
				  "  x @      xxxxx   x             xxx            ",
				  "  xxxxx            x       xxxx                 ",
				  "      x!!!!!!!!!!!!x                            ",
				  "      xxxxxxxxxxxxxx                   o        ",
				  "           xxxxx                   o            ",
				  "                                xxxxx           ",
				  "                                                ",
				  "                xxxx                            ",
				  "                              xxx               "
				];

				function level(plan) {

					this.height = plan.length;
					this.width = plan[0].length;
					// window.alert(this.height);
					// window.alert(this.width);

					// j is column and i is row 
					var j;
					for (j = 0; j < this.height; j++) {
						var row = plan[j]

				    // for each column
					    var i;
						for (i = 0; i < this.width; i++) {

							var pix = row[i];
							 if (pix == 'o') {
							 	var coin1 = new coin(i, j);
							 	coin1.draw();
							 }

							 else if (pix == 'x') {
							 	// let wall1 = new wall(i, j);


							 	walls.push(new wall(i, j));
							 //	alert(walls[0]);
							 	walls[walls.length - 1].draw();
							 }

					   }

					}
				}

				var player = new sprite();
				level(simpleLevelPlan);

				 loop = function() {

				 	context.fillStyle = "#eaf7fc";
	     context.fillRect(0, 0, W, H);// x, y, width, height
	          

				 	// press up and not already jumping
	      if (control.up && player.jumping === false) {
	          player.jump();
	      }
	          if (control.left) {
	          player.left();
	      }
	          if (control.right) {
	          player.right();
	      }

	 collide(player);

		  	player.update();

				 player.draw();

					level(simpleLevelPlan);

				 window.requestAnimationFrame(loop);

		    
				 }


		  window.addEventListener("keydown", control.keyListener);
		  window.addEventListener("keyup", control.keyListener);
		  window.requestAnimationFrame(loop);
				
