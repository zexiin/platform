
	var context = document.querySelector("canvas").getContext("2d");
	var H = context.canvas.height = 1000;
	var W = context.canvas.width = 800;
	var SCALE = 30;

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
 
	  sprite.prototype.stepX = function(dir) {

	    // left
	    if (dir.type == "left") {
	  	this.x_vel -= 1;
	    } 
	    else if (dir.type == "right") {
	  	// right
	  	this.x_vel += 1;
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

				// for each row
				var i;
				for (i = 0; i < this.height; i++) {
					var row = plan[i]

			    // for each column
				    var j;
					for (j = 0; j < this.width; j++) {

						var pix = row[j];
						 if (pix == 'o') {
						 	var coin1 = new coin(j, i);
						 	coin1.draw();
						 }

						 else if (pix == 'x') {
						 	var wall1 = new wall(j, i);
						 	wall1.draw();
						 }

				   }

				}
			}



			var player = new sprite();


			 loop = function() {

			 	context.fillStyle = "#eaf7fc";
     context.fillRect(0, 0, W, H);// x, y, width, height
          

			 	if (control.right) {
			 		player.stepX(right);
			 	}

			 	else if (control.left) {
			 		player.stepX(left);
			 	}


	  	player.y_vel += 1; //gravity
	   player.x += player.x_vel;
	   player.y += player.y_vel;

			 player.draw();

				level(simpleLevelPlan);

			 	window.requestAnimationFrame(loop);

	    
			 }


	  window.addEventListener("keydown", control.keyListener);
	  window.addEventListener("keyup", control.keyListener);
	  window.requestAnimationFrame(loop);
			