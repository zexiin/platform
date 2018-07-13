
/**********

this file contains menus n displays n text n shit maybe ???????

**********/

var context = document.querySelector("canvas").getContext("2d");
var canvas = context.canvas;
	canvas.height = 400;
	canvas.width = 500;





/*                                  
   __________________  ___  ____  _____
  / ___/ ___/ ___/ _ \/ _ \/ __ \/ ___/
 (__  ) /__/ /  /  __/  __/ / / (__  ) 
/____/\___/_/   \___/\___/_/ /_/____/  

*/

// basic screen class (need to use functions to actually make screens)
class Screen {

	constructor() {
		this.on = false;
		this.bgColor = "rgba(0,0,0,0)";
		this.gui = new Bag(); // contains buttons, sliders, anything else u interact w
		this.images = new Bag();
		this.texts = new Bag();

	}

	setBGColor(color) {this.bgColor = color;}

	addButton(button) {
		this.gui.push(button);
	}

	addSlider(slider) {
		this.gui.push(slider);
	}

	addImg(img,x,y) {
		var image = {
			img:img, x:x, y:y,
			draw: function() { context.drawImage(this.img,this.x,this.y); },
		};
		this.images.push(image);
	}

	addRect(x,y,w,h,color, strokeColor) {
		if(strokeColor === undefined) strokeColor = color;

		var rect = {
			x:x, y:y, w:w, h:h, color:color, stroke:strokeColor,

			draw: function() { 
				context.fillStyle = this.color;
				context.fillRect(this.x, this.y, this.w, this.h);
				context.strokeStyle = this.stroke;
				context.lineWidth = 2;
				context.strokeRect(this.x, this.y, this.w, this.h);
			 },
		};

		this.images.push(rect);

	}

	addRoundedRect(x,y,w,h,color, strokeColor) {
		if(strokeColor === undefined) strokeColor = color;

		var rect = {
			x:x, y:y, w:w, h:h, color:color, stroke:strokeColor,

			draw: function() { 

				let r = 20;

				roundedRectPath(this.x,this.y,this.w,this.h,r);


				context.fillStyle = this.color;
				context.fill();
				context.strokeStyle = this.stroke;
				context.lineWidth = 2;
				context.stroke();
			 },
		};

		this.images.push(rect);

	}

	addTxt(string,x,y,font,color) {
		var txt = {
			text:string, x:x, y:y, font:font, color:color,
			draw: function() {
				context.font = this.font;
				context.fillStyle = this.color;
				context.textAlign = "left";
				context.fillText(this.text, this.x, this.y);

			}
		};
		this.texts.push(txt);
	}


	draw() {

		context.fillStyle = this.bgColor;
		context.fillRect(0,0,canvas.width,canvas.height);

		this.images.draw();
		this.texts.draw();
		this.gui.draw();
	}


	update() {
		this.gui.update();

		//if(control.mouse_down) document.getElementById("mousey").style = "color: red";
		//else document.getElementById("mousey").style = "color: blue";
		document.getElementById("mousey").innerHTML = "x: "+control.mouse_x +"   y: "+ control.mouse_y;
	}


	loop() {
		if(this.on) {
			this.update();
			this.draw();
		}
	}


}


class Button {

	constructor(text, x,y,w,h, screen) { // colors are defaults. can set with setColors() function
		this.txt = text;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.screen = screen; // the screen it belongs to
		this.text_idle = "#ef6c58";
		this.text_hover = "#ef4033";
		this.bg_idle = "#d0ede8";
		this.bg_hover = "#aee5e5";
		this.hover = false;
		this.clickable = false;
		this.onclick = function() {return;};
	}

	setColors(text_idle, text_hover, bg_idle, bg_hover) {
		this.text_idle = text_idle;
		this.text_hover = text_hover;
		this.bg_idle = bg_idle;
		this.bg_hover = bg_hover;
	}

	setImg(idle, active) {
		this.img_idle = this.img_hover = idle;
		if(active != undefined) this.img_hover = active;
		this.w = idle.width;
		this.h = idle.height;
	}

	setOnClick(func) {
		this.onclick = func;
	}

	update() {
		if(control.mouse_x > this.x && control.mouse_x < this.x+this.w 
			&& control.mouse_y > this.y && control.mouse_y < this.y+this.h) {
			this.hover = true;
			if(control.mouse_up) this.clickable = true; 
		}
		else { this.hover = false; this.clickable = false;}

		if(this.clickable && control.mouse_down) {
			control.mouse_down = false;
			this.onclick();
		}

	}

	draw() {

		if(this.img_idle != undefined) {
			if(this.hover) {
				context.drawImage(this.img_hover, this.x,this.y);
			}
			else context.drawImage(this.img_idle, this.x, this.y);

		}
		else {
			let bg_color = this.bg_idle; let txt_color = this.text_idle;
			if(this.hover) {
				bg_color = this.bg_hover;
				txt_color = this.text_hover;
			}

			roundedRectPath(this.x,this.y,this.w,this.h,10);
			context.fillStyle = bg_color; context.fill();
			context.strokeStyle = txt_color; context.lineWidth =2; context.stroke();

			/*
			context.fillStyle = bg_color;
			context.fillRect(this.x,this.y,this.w,this.h);
			context.strokeStyle = txt_color;
			context.lineWidth = 2;
			context.strokeRect(this.x,this.y,this.w,this.h);
			*/

			context.font = "20px sans-serif";
			context.fillStyle = txt_color;
			context.textAlign="center";
			context.fillText(this.txt,this.x+this.w/2,this.y+this.h/4);
		}

	}

}



class Slider {

	constructor(x,y,w,h) {
		this.x = x;
		this.y = y;
		this.screen = screen;
		this.w = w;
		this.h = h; 
		this.indicator = {
			x: this.x+this.w,
			y: this.y+this.h/2,
			color: "#ef6c58",
			active_color: "#ef4033",
		};
		this.barColor = "#aee5e5";
		this.clickable = false;

		this.value = 1; 
		this.onclick = function() { console.log(this.value); }; // onclick function passes in one arg: this.value

	}

	getVal() {
		return this.value; // this is a number from 0 to 1.
	}

	setColors(bar, indicator, indicator_active) {
		this.indicator.color = indicator;
		this.indicator.active_color = indicator_active;
		this.barColor = bar;
	}

	setFunction(func) {
		this.onclick = func;
	}

	update() {

		if(control.mouse_x > this.x && control.mouse_x < this.x+this.w 
			&& control.mouse_y > this.y && control.mouse_y < this.y+this.h && control.mouse_up) {
			this.clickable = true;
		}
		else if(control.mouse_up) this.clickable = false;

		if(this.clickable && control.mouse_down) {
			this.indicator.x = Math.max(Math.min(control.mouse_x,this.x+this.w),this.x);
			this.value = ((this.indicator.x - this.x)/this.w);
			this.onclick(this.value);
		}



	}

	draw() {

		// draw bar
		context.strokeStyle = this.barColor;
		context.beginPath();
		context.lineCap = "round";
		context.lineWidth = this.h*(1/3);
		context.moveTo(this.x, this.y+this.h/2);
		context.lineTo(this.x+this.w, this.y+this.h/2);
		context.stroke();

		// draw indicator thing
		context.fillStyle = this.indicator.color;
		if(this.clickable && control.mouse_down) context.fillStyle = this.indicator.active_color;
		context.beginPath();
		context.arc(this.indicator.x, this.indicator.y, this.h*(3/4), 0, 2*Math.PI);
		context.fill();



	}



}

function roundedRectPath(x,y,w,h,r) {
	context.beginPath();
	context.moveTo(x+r,y);
	context.lineTo(x+w-r,y);
	context.arcTo(x+w, y, x+w, y+r,r);
	context.lineTo(x+w, y+h-r);
	context.arcTo(x+w, y+h, x+w-r, y+h,r);
	context.lineTo(x+r, y+h);
	context.arcTo(x, y+h, x, y+h-r,r);
	context.lineTo(x,y+r);
	context.arcTo(x,y,x+r,y,r);	
}



//// create/define actual screens that we use

function createStartScreen(screen) {

	//// create background and title images
	let bg = new Image();
	bg.onload = function() {screen.addImg(bg,0,0);};
	bg.src = "../assets/startbg.png";
	let title = new Image();
	title.onload = function() {screen.addImg(title,(canvas.width-title.width)/2, canvas.height/4)};
	title.src = "../assets/title.png";


	///// create START button
	let start_btn = new Button("start", 200, 200, 100, 60, screen);
	let startGame = function() { ///////// START GAME FUNCTION HERE ////////////
		resetGame();
		screen.on = false;
		init(mapArr[0]);
		sfx.push(new SFX("bgm"));
		sfx.push(new SFX("underwater"));
	};

	let btn_idle = new Image();
	let btn_hover = new Image();
	btn_idle.onload = function() {btn_hover.onload();};
	btn_hover.onload = function() {start_btn.setImg(btn_idle,btn_hover);};
	btn_idle.src = "../assets/play_idl.png";
	btn_hover.src = "../assets/play_hov.png";

	start_btn.setOnClick(startGame);
	screen.addButton(start_btn);


	//// create another fucking button who fuckign i dont
	let anoth_btn = new Button("another",200,280,100,40,screen);
	let goAnother = function() {
		screen.on = false;
		another.on = true;
	};
	anoth_btn.setOnClick(goAnother);
	screen.addButton(anoth_btn);



}

function createAnotherScreen(screen) {

	screen.setBGColor("#f9eeca");


	let back_btn = new Button("back",20,20,100,40,screen);
	let goBack = function() {
		screen.on = false;
		start_scr.on = true;
	};
	back_btn.setOnClick(goBack);
	screen.addButton(back_btn);

	let rut = new Image();
	rut.onload = function() {screen.addImg(rut, -10,0);};
	rut.src = "../assets/rutabaga.jpg";

	screen.addTxt("m other why", 50,200, "30px courier", "white");


}

function createPauseScreen(screen) {

	screen.setBGColor("rgba(247, 239, 215, 0.005)");

	screen.addRoundedRect(100,50,300,300,"#f7fcfa","#ef6c58");


	let resume_btn = new Button("resume", (canvas.width-100)/2, 170, 100, 40, screen);
	let resume = function() {
		togglePause();
	}
	resume_btn.setOnClick(resume);
	screen.addButton(resume_btn);

	let vol_btn = new Button("volume", (canvas.width-100)/2, 220, 100, 40, screen)
	let adjust_vol = function() {
		vol_scr.on = true;
	}
	vol_btn.setOnClick(adjust_vol);
	screen.addButton(vol_btn);


	let quit_btn = new Button("quit", (canvas.width-100)/2, 270, 100, 40, screen);
	let quit = function() {
		resetGame();
		togglePause();
		
		start_scr.on = true;
	}
	quit_btn.setOnClick(quit);
	screen.addButton(quit_btn);

	



	screen.addTxt("paused", 135, 70, "bold 50pt arial", "#ef6c58");


	
}


function createVolScreen(screen) {

	let w = 250; let h = 180;
	let x = (canvas.width-w)/2;
	let y = (canvas.height-h)/2;

	screen.addRoundedRect(x,y,w,h, "#fcf7e5", "#ef6c58");

	let return_btn = new Button("done",(canvas.width-100)/2, 230, 100, 40, screen);
	return_btn.setOnClick(function() {screen.on = false;});
	screen.addButton(return_btn);

	let bg_vol = new Slider(x+(w-100)/2+20, y+50, 100, 10);
	bg_vol.setFunction(window.setVolume);
	let sfx_vol = new Slider(x+(w-100)/2+20, y+75, 100, 10);
	sfx_vol.setFunction(setSoundEffects);

	screen.addSlider(bg_vol);
	screen.addSlider(sfx_vol);

	screen.addTxt("BGM:", x+50, y+47, "10pt arial", "#ef6c58");
	screen.addTxt("SFX:", x+50, y+72, "10pt arial", "#ef6c58");

}



var start_scr = new Screen();
createStartScreen(start_scr);

var another = new Screen();
createAnotherScreen(another);

var pause_scr = new Screen();
createPauseScreen(pause_scr);

var vol_scr = new Screen();
createVolScreen(vol_scr);







/*
         __        __  __              
   _____/ /_____ _/ /_/ /_  ____ ______
  / ___/ __/ __ `/ __/ __ \/ __ `/ ___/
 (__  ) /_/ /_/ / /_/ /_/ / /_/ / /    
/____/\__/\__,_/\__/_.___/\__,_/_/     
                                       
*/




function StatBar() {


	this.icon_w = 8; // NOT scaled
	this.icon_scaled = 8*scaleFactor;
	this.coin = { x:56, y:144 };
	this.x = { x:64, y:144 };
	this.heart_full = { x:48, y:152 };
	this.heart_empty = { x:56, y:152 };
	this.nums = [
		{x:0, y:144}, //0
		{x:8, y:144}, //1
		{x:16, y:144}, //2
		{x:24, y:144}, //3
		{x:32, y:144}, //4
		{x:40, y:144}, //5
		{x:0, y:152}, //6
		{x:8, y:152}, //7
		{x:16, y:152}, //8
		{x:24, y:152}  //9
	];

} 



StatBar.prototype.draw = function() {

	context.fillStyle = '#000000';
	context.fillRect(0,0,canvas.width,map.scaled);

	 {}

	// draw lives
	for (let i = 1; i <= 5; i++) { // three lives rn
		if (livesCount >= i) {
			context.drawImage(tilesheet,
				this.heart_full.x, this.heart_full.y, this.icon_w, this.icon_w,
				i*8*scaleFactor, 4*scaleFactor, this.icon_scaled, this.icon_scaled);
		}
		else {
			context.drawImage(tilesheet,
				this.heart_empty.x, this.heart_empty.y, this.icon_w, this.icon_w,
				i*8*scaleFactor, 4*scaleFactor, this.icon_scaled, this.icon_scaled);
		}
	}

	// draw coin count
	context.drawImage(tilesheet, this.coin.x, this.coin.y, this.icon_w, this.icon_w,
		canvas.width - 48*scaleFactor, 4*scaleFactor, this.icon_scaled, this.icon_scaled);
	context.drawImage(tilesheet, this.x.x, this.x.y, this.icon_w, this.icon_w,
		canvas.width - 40*scaleFactor, 4*scaleFactor, this.icon_scaled, this.icon_scaled);
	let count = coinCount.toString();
	// hundreds digit
	let num = 0;
	if (coinCount > 99) num = count.charAt(count.length - 3);
	context.drawImage(tilesheet, this.nums[num].x, this.nums[num].y, this.icon_w, this.icon_w,
		canvas.width - 32*scaleFactor, 4*scaleFactor, this.icon_scaled, this.icon_scaled);
	// tens digit
	num = 0;
	if (coinCount > 9) num = count.charAt(count.length - 2);
	context.drawImage(tilesheet, this.nums[num].x, this.nums[num].y, this.icon_w, this.icon_w,
		canvas.width - 24*scaleFactor, 4*scaleFactor, this.icon_scaled, this.icon_scaled);
	// ones digit
	num = 0
	if (coinCount > 0) num = count.charAt(count.length - 1);
	context.drawImage(tilesheet, this.nums[num].x, this.nums[num].y, this.icon_w, this.icon_w,
		canvas.width - 16*scaleFactor, 4*scaleFactor, this.icon_scaled, this.icon_scaled);


};



/*
   __            __ 
  / /____  _  __/ /_
 / __/ _ \| |/_/ __/
/ /_/  __/>  </ /_  
\__/\___/_/|_|\__/  
                    
*/


// DEATH TEXT 

function DeathText() {
	this.time = 200;
    this.x = 180;
	this.y = 90; 
	this.opacity = 1.0; 
	this.size = 60;
}

DeathText.prototype.display = function() {

	if (this.time > 0) {
		context.font = "bold" + this.size + "px verdana";
		context.fillStyle = "#0099bb";
		context.globalAlpha = this.opacity;
		this.opacity -= 0.005;
		context.fillText("YOU DIED.", this.x, this.y);
		//this.x += 0.8;
		//this.y += 0.2;
		this.time--;
	}
	context.globalAlpha = 1.0;
}

var levelText = { 
	time: 350,
	x: 150,
	y: 90, 
	opacity: 1.0 
};

levelText.reset = function() {
	this.time = 350;
	this.x = 150;
	this.y = 90;
	this.opacity = 1.0;
};

levelText.draw = function() {
	if (this.time > 0) {
 	 context.font = "bold 80px verdana";
 	 context.fillStyle = "#accadb";
 	 context.globalAlpha = this.opacity;
 	 this.opacity -= 0.0025;
 	 let text1 = ("level " + levelNo).split("").join(String.fromCharCode(8201));
     context.fillText(text1, this.x, this.y);
     this.x += 0.5;
     this.y += 0.1;
     this.time--;
	}
	context.globalAlpha = 1.0;
};


/*__              
   ____  ____ __   __/ /_  ____ ______
  / __ \/ __ `/ | / / __ \/ __ `/ ___/
 / / / / /_/ /| |/ / /_/ / /_/ / /    
/_/ /_/\__,_/ |___/_.___/\__,_/_/     

*/



document.getElementById("level1").onclick = function() {startLevel(1);};
document.getElementById("level2").onclick = function() {startLevel(2);};
document.getElementById("level3").onclick = function() {startLevel(3);};
document.getElementById("level4").onclick = function() {startLevel(4);};
document.getElementById("level5").onclick = function() {startLevel(5);};
document.getElementById("level6").onclick = function() {startLevel(6);};
document.getElementById("level7").onclick = function() {startLevel(7);};
document.getElementById("level8").onclick = function() {startLevel(8);};
document.getElementById("level9").onclick = function() {startLevel(9);};
document.getElementById("level10").onclick = function() {startLevel(10);};

function startLevel(no) {
    console.log("levelno " + levelNo);
	player.stop = true;

	terminate(player);
	terminate(map);
	terminate(cam);
	enemies.terminateAll();
	bullets.terminateAll();
	terminate(bullets);
	terminate(enemies);
	terminate(collision_map);
	levelNo = no;
	init(mapArr[levelNo-1]);
	return;
}





