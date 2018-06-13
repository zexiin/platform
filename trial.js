var context, control, sprite, loop;

  context = document.querySelector("canvas").getContext("2d");
  var H = context.canvas.height = 1000;
  var W = context.canvas.width = 320;

 /*camera = {
    x:0,
    y:0,
    width:320,
    height:180,
    maxX: context.canvas.width - width,
    maxY: context.canvas.height - height
  }*/

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

var bloc = new Bloc(220, 320, 50, 20);
var bloc2 = new Bloc(40, 92, 80, 40);
var bloc3 = new Bloc(140, 192, 80, 40);
var bloc4 = new Bloc(40, 292, 80, 40);
  
  
  function collisionIDK(player, object) {
      let right = object.x + object.width;
      let left = object.x;
      let top = object.y;
      let bottom = object.y + object.height;
      
      // if player is going left and hits right side of object
      
    var friction = 0.7;
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
          sprite.x_vel *= 0.9;
          sprite.y_vel *= 0.9;
    

          // if rectangle is falling below floor line
    if (sprite.y > H - 16 - 32) {

      sprite.jumping = false;
      sprite.y = H - 16 - 32;
      sprite.y_vel = 0;

    }
    
    if (sprite.x < 8) {
      sprite.x_vel = -1 *sprite.x_vel;
      sprite.x = 8;
    }
    
    if (sprite.x > (W - 8)) {
      sprite.x_vel = -1 *sprite.x_vel;
      sprite.x = (W - 8);
    }
    
    collisionIDK(sprite, bloc);
    collisionIDK(sprite, bloc2);
    collisionIDK(sprite, bloc3);
    collisionIDK(sprite, bloc4)
    

          // draw bg
          context.fillStyle = "#eaf7fc";
          context.fillRect(0, 0, W, H);// x, y, width, height
          
          // draw sprite
          context.fillStyle = "#ffd175";
          context.beginPath();
          context.arc(sprite.x, sprite.y, sprite.rad, 0, 2*Math.PI);
          context.fill();
          
          // draw blocs
          context.fillStyle= "#94ccb9";
          context.fillRect(bloc.x,bloc.y,bloc.width,bloc.height);
          context.fillRect(bloc2.x,bloc2.y,bloc2.width,bloc2.height);
          context.fillRect(bloc3.x,bloc3.y,bloc3.width,bloc3.height);
          context.fillRect(bloc4.x,bloc4.y,bloc4.width,bloc4.height)

          window.requestAnimationFrame(loop);
      };

  window.addEventListener("keydown", control.keyListener);
  window.addEventListener("keyup", control.keyListener);
  window.requestAnimationFrame(loop);

