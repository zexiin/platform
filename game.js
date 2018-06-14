	// movements

	const Game = function() {

	}

	Game.prototype {
		constructor : Game
	}

 
	Game.Sprite  = function() {

		rad:8,
	    jumping:true,
	    x:160,
	    y:0,
	    x_vel:0,
	    y_vel:0,

	    jump:function() { 
	    	 this.y_vel -= 20;
             this.jumping = true;
         },

	    moveLeft:function() { this.x_vel -= 1; },
	    moveRight:function() { this.x_vel += 1; },

	    update:function() {
	    	this.y_vel += 1; //gravity
            this.x += sprite.x_vel;
            this.y += sprite.y_vel;
            this.x_vel *= 0.9;
            this.y_vel *= 0.9;
	    }

	};

	Game.Sprite.prototype = {
		constructor : Movement.Sprite

	};

	function collisionIDK(player, object) {
	        let right = object.x + object.width;
	        let left = object.x;
	        let top = object.y;
	        let bottom = object.y + object.height;
	        let friction = 0.7;

	        // if player is going left and hits right side of object

	        if (player.x_vel < 0 && player.x <= right + player.rad && player.x >= right && player.y >= object.y && player.y <= object.y + object.height) {
	            player.x_vel = -friction * player.x_vel;
	            player.x = right + player.rad;
	        }



	        // if player is going right and hits left side of object

	        if (player.x_vel > 0 && player.x >= left - player.rad && player.x <= left && player.y >= object.y && player.y <= object.y + object.height) {
	            player.x_vel = -friction * player.x_vel;
	            player.x = left - player.rad;
	        }

	        // if player is going down and hits top of object

	        if (player.y_vel > 0 && player.x >= object.x && player.x <= object.x+ object.width && player.y >= top - player.rad && player.y <= bottom) {
	            player.y_vel = -friction * player.y_vel;
	            player.y = top - player.rad;
	            player.jumping = false;
	        }

	        // if player is going up and hits bottom of object

	        if (player.y_vel < 0 && player.x >= object.x && player.x <= object.x+ object.width && player.y <= bottom && player.y >= top) {
	            player.y_vel = -friction * player.y_vel;
	            player.y = bottom+player.rad;
	        }


	    }