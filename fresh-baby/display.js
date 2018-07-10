
/**********

this file contains menus n displays n text n shit maybe ???????

**********/


// this class currently just makes the start screen. will better modularize so it can make screens in general iguess idk
class SplashScreen {

	constructor() {
		this.on = true;
		this.bgColor = "#f9eae5";
		this.buttons = new Bag();


		let start_btn = new Button("start", 200, 200, 100, 60, this);
		let startie = function() {
			this.screen.on = false;
			window.cancelAnimationFrame(animate);
			init(mapArr[0]);
		};


		start_btn.setOnClick(startie);
		this.addButton(start_btn);



	}

	addButton(button) {
		this.buttons.bag.push(button);
	}

	draw() {

		context.fillStyle = this.bgColor;
		context.fillRect(0,0,canvas.width,canvas.height);
		context.font = "50px comic sans ms";
		context.fillStyle = "#fcc955";
		context.textAlign = "left";
		context.fillText("hey blease",100,100);

		this.buttons.draw();

		


	}


	update() {
		this.buttons.update();

		if(control.mouse_down) document.getElementById("mousey").style = "color: red";
		else document.getElementById("mousey").style = "color: blue";
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
		this.text_idle = "blue";
		this.text_hover = "red";
		this.bg_idle = "gold";;
		this.bg_hover = "black";
		this.hover = false;
		this.click = false;
		this.onclick = function() {return;};
	}

	setColors(text_idle, text_hover, bg_idle, bg_hover) {
		this.text_idle = text_idle;
		this.text_hover = text_hover;
		this.bg_idle = bg_idle;
		this.bg_hover = bg_hover;
	}

	setOnClick(func) {
		this.onclick = func;
	}

	update() {
		if(control.mouse_x > this.x && control.mouse_x < this.x+this.w 
			&& control.mouse_y > this.y && control.mouse_y < this.y+this.h) {
			this.hover = true;
			if(control.mouse_down) this.onclick();

		}
		else { this.hover = false; }

	}

	draw() {
		let bg_color = this.bg_idle; let txt_color = this.text_idle;
		if(this.hover) {
			bg_color = this.bg_hover;
			txt_color = this.text_hover;
		}
		context.fillStyle = bg_color;
		context.fillRect(this.x,this.y,this.w,this.h);
		context.strokeStyle = txt_color;
		context.strokeRect(this.x,this.y,this.w,this.h);

		context.font = "20px sans-serif";
		context.fillStyle = txt_color;
		context.textAlign="center";
		context.fillText(this.txt,this.x+this.w/2,this.y+this.h/4);

	}



}











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






// DEATH TEXT OBJECT hehe

function DeathText() {
	this.time = 200;
    this.x = 20;
	this.y = 90; 
	this.opacity = 1.0; 
	this.size = 30;
}

DeathText.prototype.display = function() {

	if (this.time > 0) {
 	 context.font = this.size + "px courier";
 	 context.fillStyle = "#661144";
 	 context.globalAlpha = this.opacity;
 	 this.opacity -= 0.005;
     context.fillText("death is inevitable", this.x, this.y);
     this.x += 0.8;
     this.y += 0.2;
     this.time--;
	}
	context.globalAlpha = 1.0;
}

var levelText = { 
	time: 350,
	x: 10,
	y: 90, 
	opacity: 1.0 
};

levelText.reset = function() {
	this.time = 350;
	this.x = 10;
	this.y = 90;
	this.opacity = 1.0;
};

levelText.draw = function() {
	if (this.time > 0) {
 	 context.font = "70px georgia";
 	 context.fillStyle = "#339999";
 	 context.globalAlpha = this.opacity;
 	 this.opacity -= 0.0025;
 	 let text1 = ("level " + levelNo).split("").join(String.fromCharCode(8201));
     context.fillText(text1, this.x, this.y);
     this.x += 0.5;
     this.y += 0.3;
     this.time--;
	}
	context.globalAlpha = 1.0;
};




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





