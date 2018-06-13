  <html>
    <canvas>
    <head>
    </head>
    <body>

    <script>
  
  var context, control, sprite, loop;

  context = document.querySelector("canvas").getContext("2d");

  context.canvas.height = 180;
  context.canvas.width = 320 * 5;

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


  loop = function() {

          // press up and not already jumping
          if (control.up && sprite.jumping == false) {
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
    if (sprite.y > 180 - 16 - 32) {

      sprite.jumping = false;
      sprite.y = 180 - 16 - 32;
      sprite.y_vel = 0;

    }
    
    if (sprite.x < 8) {
      sprite.x_vel = -1 *sprite.x_vel;
      sprite.x = 8;
    }
    
    if (sprite.x > (320 * 5 - 8)) {
      sprite.x_vel = -1 *sprite.x_vel;
      sprite.x = (320 * 5 - 8);
    }

          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, 320 * 5, 180);// x, y, width, height
          context.fillStyle = "#ff0000";
          context.beginPath();
          context.arc(sprite.x, sprite.y, sprite.rad, 0,         2*Math.PI);
          context.stroke();
    
          window.requestAnimationFrame(loop);
      };

  window.addEventListener("keydown", control.keyListener);
  window.addEventListener("keyup", control.keyListener);
  window.requestAnimationFrame(loop);

 </script>
   </body>
   </canvas>

  </html>


