// keyboard controls

   const Control = function() {
      left:false,
      right:false,
      up:false,

      keyListener:function(event) {

        // switch the keystate
        var key_state = (event.type == "keydown") ? true:false;

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

    Control.prototype = {
    	constructor : Control
 
    };
