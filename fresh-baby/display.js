
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

	addImg(img,x,y, scaleRatio, clipx, clipy, clipw, cliph) { // scaling and clipping optional
		if (scaleRatio === undefined) scaleRatio = 1;
		if (clipx === undefined) {
			clipx = 0; clipy = 0; clipw = img.width; cliph = img.height;
		}
		var image = {
			draw: function() { 
				context.drawImage(img,clipx,clipy,clipw,cliph,x,y, clipw*scaleRatio, cliph*scaleRatio); 
			},
		};
		this.images.push(image);
	}

	addRect(x,y,w,h,color, strokeColor) { // stroke optional
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

	addRoundedRect(x,y,w,h, r, color, strokeColor) { // stroke is optional
		if(strokeColor === undefined) strokeColor = color;

		var rect = {
			x:x, y:y, w:w, h:h, r: r, color:color, stroke:strokeColor,

			draw: function() { 


				roundedRectPath(this.x,this.y,this.w,this.h,this.r);


				context.fillStyle = this.color;
				context.fill();
				context.strokeStyle = this.stroke;
				context.lineWidth = 2;
				context.stroke();
			 },
		};

		this.images.push(rect);

	}

	addTxt(string,x,y,font,color, stroke) { // stroke is optional
		var txt = {
			text:string, x:x, y:y, font:font, color:color, stroke: stroke,
			draw: function() {
				context.font = this.font;
				context.fillStyle = this.color;
				context.textAlign = "left";
				context.fillText(this.text, this.x, this.y);
				if(this.stroke != undefined) {
					context.strokeStyle = this.stroke;
					context.strokeText(this.text, this.x, this.y);
				}

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
		this.text_idle = "#FFFFFF";
		this.text_hover = "#FFFFFF";
		this.bg_idle = "#ef6c58";
		this.bg_hover = "#81e0ef";
		this.stroke_on = false;
		this.hover = false;
		this.clickable = false;
		this.onclick = function() {return;};
	}

	setColors(text_idle, text_hover, bg_idle, bg_hover, stroke_on) {
		this.text_idle = text_idle;
		this.text_hover = text_hover;
		this.bg_idle = bg_idle;
		this.bg_hover = bg_hover;
		this.stroke_on = stroke_on;
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
			if(this.stroke_on) {
				context.strokeStyle = txt_color; context.lineWidth =2; context.stroke();
			}
			

			/*
			context.fillStyle = bg_color;
			context.fillRect(this.x,this.y,this.w,this.h);
			context.strokeStyle = txt_color;
			context.lineWidth = 2;
			context.strokeRect(this.x,this.y,this.w,this.h);
			*/

			context.font = "17px 'Nunito'";
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

	//// create background and title
	let bg = new Image();
	bg.onload = function() {screen.addImg(bg,0,0);};
	bg.src = "../assets/startbg.png";

	screen.addTxt("RADish", 130,100,"80px 'Jua'","white");


	///// create START button
	let start_btn = new Button("START", 200, 200, 100, 40, screen);
	let startGame = function() { ///////// START GAME FUNCTION HERE ////////////
		resetGame();
		screen.on = false;
		init(mapArr[0]);
		sfx.push(new SFX("bgm"));
		sfx.push(new SFX("underwater"));
	};
	start_btn.setOnClick(startGame);
	screen.addButton(start_btn);



	let instr_btn = new Button("GUIDE", 200, 250,100,40,screen);
	instr_btn.setOnClick(function() {
		screen.on = false;
		instr_scr.on = true;
	});
	screen.addButton(instr_btn);

	let credits_btn = new Button("CREDITS", 200, 300,100,40,screen);
	credits_btn.setOnClick(function() {
		screen.on = false;
		credits_scr.on = true;
	});
	screen.addButton(credits_btn);


	
	//// create another fucking button who fuckign i dont
	let anoth_btn = new Button("?",canvas.width-45,canvas.height-45,40,40,screen);
	let goAnother = function() {
		screen.on = false;
		another.on = true;
	};
	anoth_btn.setOnClick(goAnother);
	screen.addButton(anoth_btn);



}

function createAnotherScreen(screen) {

	screen.setBGColor("#f9eeca");


	let back_btn = new Button("BACK",canvas.width-75,canvas.height-45,70,40,screen);
	back_btn.setOnClick(function() {
		screen.on = false;
		start_scr.on = true;
	});
	screen.addButton(back_btn);

	let rut = new Image();
	rut.onload = function() {screen.addImg(rut, -10,0);};
	rut.src = "../assets/rutabaga.jpg";

	screen.addTxt("m other why", 50,200, "30px courier", "white");


}

function createPauseScreen(screen) {

	screen.setBGColor("rgba(247, 239, 215, 0.005)");
	screen.addRoundedRect(100,50,300,300, 35, "#ffffff");
	screen.addTxt("PAUSED", 135, 80, "bold 60px Nunito", "#c4eaed");


	let resume_btn = new Button("RESUME", (canvas.width-100)/2, 170, 100, 40, screen);
	let resume = function() {
		togglePause();
	}
	resume_btn.setOnClick(resume);
	screen.addButton(resume_btn);

	let vol_btn = new Button("VOLUME", (canvas.width-100)/2, 220, 100, 40, screen)
	let adjust_vol = function() {
		vol_scr.on = true;
	}
	vol_btn.setOnClick(adjust_vol);
	screen.addButton(vol_btn);


	let quit_btn = new Button("QUIT", (canvas.width-100)/2, 270, 100, 40, screen);
	let quit = function() {
		resetGame();
		togglePause();
		
		start_scr.on = true;
	}
	quit_btn.setOnClick(quit);
	screen.addButton(quit_btn);


	
}


function createVolScreen(screen) {

	let w = 250; let h = 180;
	let x = (canvas.width-w)/2;
	let y = (canvas.height-h)/2;

	screen.addRoundedRect(x,y,w,h, 35, "#eaf2f0");

	let return_btn = new Button("DONE",(canvas.width-100)/2, 230, 100, 40, screen);
	return_btn.setOnClick(function() {screen.on = false;});
	screen.addButton(return_btn);

	let bg_vol = new Slider(x+(w-100)/2+20, y+50, 100, 10);
	bg_vol.setFunction(window.setVolume);
	let sfx_vol = new Slider(x+(w-100)/2+20, y+75, 100, 10);
	sfx_vol.setFunction(setSoundEffects);

	screen.addSlider(bg_vol);
	screen.addSlider(sfx_vol);

	screen.addTxt("BGM:", x+50, y+46, "11pt 'Nunito'", "#ef6c58");
	screen.addTxt(" SFX:", x+50, y+71, "11pt 'Nunito'", "#ef6c58");

}

function createInstrScreen(screen) {

	screen.setBGColor("#81d4ef");

	let back_btn = new Button("BACK",canvas.width-75,canvas.height-45,70,40,screen);
	back_btn.setOnClick(function() {
		screen.on = false;
		start_scr.on = true;
	});
	screen.addButton(back_btn);

	screen.addTxt("HOW TO PLAY", 40, 20,"40px 'Nunito'","white");


	screen.addTxt("press the arrow keys", 160, 100, "20px 'Nunito", "white");
	screen.addTxt("to move around and jump", 160, 125, "15px 'Nunito", "white");
	let up = new Image(); 
	up.onload = function() {screen.addImg(up, 70, 90, 0.4)};
	up.src = "../assets/Keyboard_White_Arrow_Up.png";
	let down = new Image();
	down.onload = function() {screen.addImg(down, 70, 120, 0.4)};
	down.src = "../assets/Keyboard_White_Arrow_Down.png";
	let left = new Image();
	left.onload = function() {screen.addImg(left, 38, 120, 0.4)};
	left.src = "../assets/Keyboard_White_Arrow_Left.png";
	let right = new Image();
	right.onload = function() {screen.addImg(right, 102, 120, 0.4)};
	right.src = "../assets/Keyboard_White_Arrow_Right.png";

	screen.addTxt("press the 'Z' key", 160, 235, "20px 'Nunito", "white");
	screen.addTxt("to attack! (hint: you can also jump to attack)", 160, 260, "15px 'Nunito", "white");
	let z = new Image();
	z.onload = function() {screen.addImg(z, 70, 180, 0.4)};
	z.src = "../assets/Keyboard_White_P.png"; 

	screen.addTxt("press the 'P' key", 160, 175, "20px 'Nunito", "white");
	screen.addTxt("to pause, adjust settings, or quit", 160, 200, "15px 'Nunito", "white");
	let p = new Image();
	p.onload = function() {screen.addImg(p, 70, 240, 0.4)};
	p.src = "../assets/Keyboard_White_Z.png";

	let sprites = new Image();
	sprites.onload = function() {
		context.imageSmoothingEnabled = false;
		screen.addImg(sprites, 50,290,2, 0,0,32,32); // player
		screen.addTxt("you", 70,360,"15px 'Nunito'", "white");

		screen.addImg(sprites, 150,322,2, 64,112,16,16); // coin
		screen.addImg(sprites, 182,322,2, 192,16,16,16); // superjump
		screen.addTxt("good", 165,360,"15px 'Nunito'", "white");

		screen.addImg(sprites, 250, 290,2, 0,64,32,32); // tank
		screen.addImg(sprites, 290, 322,2, 96,0,16,16); // blue
		screen.addImg(sprites, 310, 290,2, 96,16,16,32); // jump
		screen.addImg(sprites, 330,322,2, 144,64,16,16); // pink
		screen.addTxt("bad", 290,360,"15px 'Nunito'", "white");

	};
	sprites.src = "../assets/arcadesheet.png"





}

function createCredits(screen) {

	screen.setBGColor("#161616");

	let back_btn = new Button("BACK",canvas.width-75,canvas.height-45,70,40,screen);
	back_btn.setOnClick(function() {
		screen.on = false;
		start_scr.on = true;
	});
	screen.addButton(back_btn);

	screen.addTxt("CREDITS", 40,40,"40px 'Nunito'","white");

	screen.addTxt("sound effects from https://www.zapsplat.com", 65, 110, "15px 'Nunito'", "white");
	screen.addTxt("background music from https://ozzed.net", 65, 130, "15px 'Nunito'", "white");
	screen.addTxt("tileset by GrafxKid on https://opengameart.org", 65, 150, "15px 'Nunito'", "white");
	screen.addTxt("with plenty of coding help from:", 65, 170, "15px 'Nunito'", "white");
		screen.addTxt("- PothOnProgramming on YouTube", 90, 190, "15px 'Nunito'", "white");
		screen.addTxt("- https://www.w3schools.com", 90, 210, "15px 'Nunito'", "white");
		screen.addTxt("- https://stackoverflow.com", 90, 230, "15px 'Nunito'", "white");

	screen.addTxt("game by Ze-Xin Koh, Kevin Ramos, & Jamie Guo", 65, 270, "15px 'Nunito'", "white");


}



var start_scr = new Screen();
createStartScreen(start_scr);

var another = new Screen();
createAnotherScreen(another);

var pause_scr = new Screen();
createPauseScreen(pause_scr);

var vol_scr = new Screen();
createVolScreen(vol_scr);

var instr_scr = new Screen();
createInstrScreen(instr_scr);

var credits_scr = new Screen();
createCredits(credits_scr);







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
	this.key = { x:160, y:192 };
	this.superjump = { x:176, y:192 };
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

	// write level
	context.font = "14px 'Press Start 2P'";
	context.fillStyle = "white";
	context.textAlign = "center";
	context.fillText("LEVEL "+levelNo, canvas.width/2, 10);
	
	// KEY
    if (player.key) {
	context.drawImage(tilesheet, this.key.x, this.key.y, this.icon_w * 2, this.icon_w * 2,
	43*scaleFactor + 20, 4*scaleFactor, this.icon_scaled, this.icon_scaled);
    }

    // superjump
    // KEY
    if (player.superjump.state) {
	context.drawImage(tilesheet, this.superjump.x, this.superjump.y, this.icon_w * 2, this.icon_w * 2,
	43*scaleFactor + 40, 4*scaleFactor, this.icon_scaled, this.icon_scaled);
    }

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
		context.fillStyle = "#ff0000";
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





