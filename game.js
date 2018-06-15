
	var context = document.querySelector("canvas").getContext("2d");
	var H = context.canvas.height = 500;
	var W = context.canvas.width = 800;
	var SCALE = 16;
	var FRICTION = 0.8;


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
	    this.rad = 8;
	    this.jumping = true;

	    this.x = 2;
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
          this.y_vel -= 0.1;
          this.jumping = true;
	  }

	  sprite.prototype.update = function() {

	  	player.y_vel += 0.001; //gravity
	   player.x += player.x_vel;
	   player.y += player.y_vel;

	   if (player.x < 8) {
      player.x_vel = -1 *player.x_vel;
      player.x = 8;
    }
    
    if (player.x > (W - 8)) {
      player.x_vel = -1 *player.x_vel;
      player.x = (W - 8);
    }

    if (player.y > (H - 8)) {
      player.y_vel = -1 *player.y_vel;
      player.y = (H - 8);
    }

	  }

	  sprite.prototype.draw = function() {
	  	context.fillStyle = "#ff0000";
				          context.beginPath();
				          context.arc(this.x * SCALE, this.y * SCALE, SCALE/3, 0, 2*Math.PI);
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

	  function overlap(first, second) {

	  	  if ((first.y * SCALE + SCALE/2) < (second.y * SCALE) && (first.y * SCALE - SCALE/2) > (second.y * SCALE)) {
	  	  	player.y_vel = -1 * FRICTION *player.y_vel;
	  	  }

	  } 

			       var simpleLevelPlan = [
			  "                      ",
			  "          o           ",
			  "  x              = x  ",
			  "  x      o  o o    x  ",
			  "  x @      xxxxx   x  ",
			  "  xxxxx            x  ",
			  "      x!!!!!!!!!!!!x  ",
			  "      xxxxxxxxxxxxxx  ",
			  "                      "
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
						 	var wall1 = new wall(i, j);
						 	wall1.draw();
						 }

				   }

				}
			}

			var player = new sprite();

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

	  	player.update();

			 player.draw();

				level(simpleLevelPlan);

			 	window.requestAnimationFrame(loop);

	    
			 }


	  window.addEventListener("keydown", control.keyListener);
	  window.addEventListener("keyup", control.keyListener);
	  window.requestAnimationFrame(loop);
			
