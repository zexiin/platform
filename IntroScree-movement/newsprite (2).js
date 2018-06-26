//Global variables

  var currentKey;          
  var charStep = 2;       
  var charSpeed = 400; 

  //(default position)
  $(document).ready(function() {
 
	$('#character').addClass('front-stand');
 
  });
  //KeyDown Function
  // no currentKey down, execute charWalk
  $(document).keydown(function(e) {
    if (!currentKey) {
      //the currentKey to the key that is down
      currentKey = e.keyCode;
      //character movement function charWalk('direction')
      switch(e.keyCode) {
      case 38: moveChar('up');    break;
      case 39: moveChar('right'); break;
      case 40: moveChar('down');  break;
      case 37: moveChar('left');  break;
      }
 
    }
 
  });
 
  //KeyUp Function
  $(document).keyup(function(e) {
    //only stop the walk if the key that started the walk is released
    if (e.keyCode == currentKey) {
 
      //set the currentKey to false
      currentKey = false;
 
      //clear the walk timer
      clearInterval(TimerWalk);
 
      $('#character').stop(true, true);
 
    }
 
  });
 function moveChar(dir) {
 
  //a player could switch key mid-animation
  //record the key that was down when animation started
  var currentKeyCheck = currentKey;
 
  //adjust from lang to code
  if (dir == 'up') dir = 'back';
  if (dir == 'down') dir = 'front';
 
  charStep++;
  if (charStep == 5) charStep = 1;
 
  //remove the current class
  $('#character').removeAttr('class');
 
  //add the new class
  switch(charStep) {
    case 1: 
      $('#character').addClass(dir+'-stand'); 
      setTimeout(function() { 
        charStep++;
        if (charStep == 5) charStep = 1;
        $('#character').removeAttr('class');
        $('#character').addClass(dir+'-right'); 
      }, (charSpeed/3));
      setTimeout(function() { 
        charStep++;
        if (charStep == 5) charStep = 1;
        $('#character').removeAttr('class');
        $('#character').addClass(dir+'-stand'); 
      }, ((charSpeed/3)*2));
    break;
    case 2: 
      $('#character').addClass(dir+'-right');
      setTimeout(function() { 
        charStep++;
        if (charStep == 5) charStep = 1;
        $('#character').removeAttr('class');
        $('#character').addClass(dir+'-stand'); 
      }, (charSpeed/3));
      setTimeout(function() { 
        charStep++;
        if (charStep == 5) charStep = 1;
        $('#character').removeAttr('class');
        $('#character').addClass(dir+'-left'); 
      }, ((charSpeed/3)*2));
    break;
    case 3: 
      $('#character').addClass(dir+'-stand');
      setTimeout(function() { 
        charStep++;
        if (charStep == 5) charStep = 1;
        $('#character').removeAttr('class');
        $('#character').addClass(dir+'-left'); 
      }, (charSpeed/3));
      setTimeout(function() { 
        charStep++;
        if (charStep == 5) charStep = 1;
        $('#character').removeAttr('class');
        $('#character').addClass(dir+'-stand'); 
      }, ((charSpeed/3)*2)); 
    break;
    case 4: 
      $('#character').addClass(dir+'-left');
      setTimeout(function() { 
        charStep++;
        if (charStep == 5) charStep = 1;
        $('#character').removeAttr('class');
        $('#character').addClass(dir+'-stand'); 
      }, (charSpeed/3));
      setTimeout(function() { 
        charStep++;
        if (charStep == 5) charStep = 1;
        $('#character').removeAttr('class');
        $('#character').addClass(dir+'-right'); 
      }, ((charSpeed/3)*2));
    break;
  }
 
  //move the char
  switch(dir) {
    case'front':
      $('#character').animate({top: '+=32'}, charSpeed, "linear", function() {
        if (currentKey == currentKeyCheck) moveChar(dir);
      });
    break;
    case'back':
      if ($('#character').position().top > 0) {
        $('#character').animate({top: '-=32'}, charSpeed, "linear", function() {
          if (currentKey == currentKeyCheck) moveChar(dir);
        });
      }
    break;
    case'left':
      if ($('#character').position().left > 0) {
        $('#character').animate({left: '-=32'}, charSpeed, "linear", function() {
          if (currentKey == currentKeyCheck) moveChar(dir);
        });
      }
    break;
    case'right':
      $('#character').animate({left: '+=32'}, charSpeed, "linear", function() {
        if (currentKey == currentKeyCheck) moveChar(dir);
      });
    break;
  }
 }