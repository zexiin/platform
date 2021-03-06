var context, control, sprite, loop;

  context = document.querySelector("canvas").getContext("2d");
  var H = context.canvas.height = 1000;
  var W = context.canvas.width = 800;
  var noBlocs = 180;

  /*
  const coin = function(x, y) {
  this.x = x,
  this.y = y
  }
  
  Coin.prototype = {
		constructor : Coin
	};*/

  sprite = {
    rad:8,
    jumping:true,
    x:160,
    y:0,
    x_vel:0,
    y_vel:0
  };

  control = {
    left:false,
    right:false,
    up:false,

    keyListener:function(event) {

      // switch the keystate
      var key_state = (event.type == "keydown")?true:false;

      switch(event.keyCode) {

        case 37: // left
          control.left = key_state;
          break;

        case 38: // up
          control.up = key_state;
          break;

        case 39: // right
          control.right = key_state;
          break;

      }
    }
  };
  
function Bloc(x, y, w, h) {
this.x = x;
this.y = y;
this.width = w;
this.height = h;
} 

function randomBloc() {
  this.x = Math.random() * W;
  this.y = Math.random() * H;  
  this.width = Math.random() * 0.1 * W + 10;
  this.height = 10;
}

var blocFLAT = new Bloc(0, 990, W, 20);

var arr = [10];

 var i;
 for (i = 0; i < noBlocs; i++) {
   let bloc = new randomBloc();
   arr.push(bloc);
 }
  
  function collisionIDK(player, object) {
      
      /* note !!1
       * calculations assume player is a circle (arc) 
       * with (x,y) being the center of the circle,
       * and object is a rectangle with (x,y) being
       * the top left corner of the rectangle.
       */
      
      let right = object.x + object.width;
      let left = object.x;
      let top = object.y;
      let bottom = object.y + object.height;
      
      // if player isn't moving or if player isn't touching object, return.
      if ((player.x_vel === 0 && player.y_vel === 0) || (player.x > right+player.rad && player.y > bottom && player.x < left && palyer.y < top-player.rad) ) {
          return;
      }
      
      // if player is going left and hits right side of object
      if (player.x_vel < 0 && player.x <= right + player.rad && player.x >= right && player.y + player.rad >= object.y && player.y - player.rad <= object.y + object.height) {
          player.x_vel = 0;
          player.x = right + player.rad;
      }
      
      
      // if player is going right and hits left side of object
      if (player.x_vel > 0 && player.x >= left - player.rad && player.x <= left && player.y + player.rad >= object.y && player.y - player.rad <= object.y + object.height) {
          player.x_vel = 0;
          player.x = left - player.rad;
      }
      
      // if player is going down and hits top of object
      if (player.y_vel > 0 && player.x >= object.x && player.x <= object.x+ object.width && player.y >= top - player.rad && player.y <= bottom) {
          player.y_vel = 0;
          player.y = top - player.rad;
          player.jumping = false;
      }
      
      // if player is going up and hits bottom of object
      if (player.y_vel < 0 && player.x >= object.x && player.x <= object.x+ object.width && player.y <= bottom && player.y >= top) {
          player.y_vel = 0;
          player.y = bottom+player.rad;
      }
  }

  loop = function() {

          // press up and not already jumping
          if (control.up && sprite.jumping === false) {
          sprite.y_vel -= 20;
          sprite.jumping = true;
      }
          if (control.left) {
          sprite.x_vel -= 1;
      }
          if (control.right) {
          sprite.x_vel += 1;
      }

          sprite.y_vel += 1; //gravity
          sprite.x += sprite.x_vel;
          sprite.y += sprite.y_vel;
          // friction (more friction when not jumping)
          if (sprite.jumping) {
              sprite.x_vel *= 0.9;
              sprite.y_vel *= 0.9;
          }
          else {
              sprite.x_vel *= 0.8;
              sprite.y_vel *= 0.8;
          }
    

          // if rectangle is falling below floor line
    /*
    if (sprite.y > H - 16 - 32) {

      sprite.jumping = false;
      sprite.y = H - 16 - 32;
      sprite.y_vel = 0;

    }*/
    
    if (sprite.x < 8) {
      sprite.x_vel = -1 *sprite.x_vel;
      sprite.x = 8;
    }
    
    if (sprite.x > (W - 8)) {
      sprite.x_vel = -1 *sprite.x_vel;
      sprite.x = (W - 8);
    }
    
        collisionIDK(sprite, blocFLAT);

    var i;
    for (i = 0; i < noBlocs; i++) {
       collisionIDK(sprite, arr[i]);
    }

          // draw bg
          context.fillStyle = "#eaf7fc";
          context.fillRect(0, 0, W, H);// x, y, width, height
          
          // draw sprite
          context.fillStyle = "#ffd175";
          context.beginPath();
          context.arc(sprite.x, sprite.y, sprite.rad, 0, 2*Math.PI);
          context.fill();
          
              context.fillStyle= "#aed891";

           context.fillRect(blocFLAT.x,blocFLAT.y,blocFLAT.width,blocFLAT.height);
  
    
    var i;
    for  (i = 0; i < noBlocs; i++) {
      context.fillRect(arr[i].x,arr[i].y,arr[i].width,arr[i].height);
    }

          window.requestAnimationFrame(loop);
      };

  window.addEventListener("keydown", control.keyListener);
  window.addEventListener("keyup", control.keyListener);
  window.requestAnimationFrame(loop);
