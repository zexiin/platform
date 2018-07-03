
/**********

this file contains menus n displays n text n shit maybe ???????

**********/



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


StatBar.prototype.update = function() {

};


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






// DEATH TEXT OBJECT

function DeathText() {
	this.time = 200;
    this.x = 20;
	this.y = 90; 
	this.opacity = 1.0; 
	this.size = 20;
}

DeathText.prototype.display = function() {

	if (this.time > 0) {
 	 context.font = this.size + "px verdana";
 	 context.fillStyle = "#99CCBB";
 	 context.globalAlpha = this.opacity;
 	 this.opacity -= 0.005;
     context.fillText("dying is more painful if you wince", this.x, this.y);
     this.x += 0.8;
     this.y += 0.2;
     this.time--;
	}
	context.globalAlpha = 1.0;
}

var levelText = { 
	time: 100,
	x: 10,
	y: 120, 
	opacity: 1.0 
};

levelText.reset = function() {
	this.time = 100;
	this.x = 10;
	this.y = 120;
	this.opacity = 1.0;
};

levelText.draw = function() {
	if (this.time > 0) {
 	 context.font = "bold 90px gadget";
 	 context.fillStyle = "#accadb";
 	 context.globalAlpha = this.opacity;
 	 this.opacity -= 0.0025;
 	 let text1 = ("level " + levelNo).split("").join(String.fromCharCode(8201));
     context.fillText(text1, this.x, this.y);
     //this.x += 0.5;
     //this.y += 0.3;
     this.time--;
	}
	context.globalAlpha = 1.0;
};

/*
for (let i = 1; i <= 8; i++) {

	let s = "level" + i;
	document.getElementById().onclick = function() {
		levelNo = i;
		startLevel(i);
	}
}*/


document.getElementById("level1").onclick = function() {
levelNo = 1;
startLevel(1);
};
document.getElementById("level2").onclick = function() {
levelNo = 2;
startLevel(2);
};
document.getElementById("level3").onclick = function() {
levelNo = 3;
startLevel(3);
};
document.getElementById("level4").onclick = function() {
levelNo = 4;
startLevel(4);
};
document.getElementById("level5").onclick = function() {
levelNo = 5;	
startLevel(5);
};
document.getElementById("level6").onclick = function() {
levelNo = 6;
startLevel(6);
};
document.getElementById("level7").onclick = function() {
levelNo = 7;
startLevel(7);
};
document.getElementById("level8").onclick = function() {
levelNo = 8;
startLevel(8);
};

function startLevel(no) {
		player.stop = true;

		terminate(player);
		terminate(map);
		terminate(cam);
		enemies.terminateAll();
		bullets.terminateAll();
		terminate(bullets);
		terminate(enemies);
		terminate(collision_map);
		init(mapArr[no-1]);
		return;
}


/*
levelTextFunction = function(levelText) {

	if (levelText.time > 0) {
 	 context.font = "70px georgia";
 	 context.fillStyle = "#339999";
 	 context.globalAlpha = levelText.opacity;
 	 levelText.opacity -= 0.0025;
 	 let text1 = ("level " + levelNo).split("").join(String.fromCharCode(8201));
     context.fillText(text1, levelText.x, levelText.y);
     levelText.x += 0.5;
     levelText.y += 0.3;
     levelText.time--;
	}
	context.globalAlpha = 1.0;
}
*/









