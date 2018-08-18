
/*               _ _       
                | (_)      
 _____ _   _  __| |_  ___  
(____ | | | |/ _  | |/ _ \ 
/ ___ | |_| ( (_| | | |_| |
\_____|____/ \____|_|\___/ 
                           
*/



function setVolume(val) {
	sfx.bag[0].volume = val;
}

function setSoundEffects(val) {
	sfx.volume = val;

}
/*
var win = new Audio("../assets/audio/win.mp3");
var die = new Audio("../assets/audio/negative_long.mp3");
var coin_sound = new Audio("../assets/audio/coin.mp3");
var water_enter = new Audio("../assets/audio/water_drip.mp3");
var water_exit = new Audio("../assets/audio/water_exit.mp3");

var bounce = new Audio("../assets/audio/bounce.mp3");
var footstep = new Audio("../assets/audio/footstep_short.wav");
var underwater = new Audio("../assets/audio/underwater.mp3");

var icecrack = new Audio("../assets/audio/icecrack4.mp3");
var bg_music = new Audio("../assets/audio/01 Frozen Langos.mp3");

*/



class AudioBag extends Bag { // note: bag[0] should always be bgm and bag[1] should always be underwater.

	constructor() {
		super();
		this.volume = 1;
	}

	update() {
		this.bag.forEach(function(element, i, bag) {
			if(i > 0) element.volume = sfx.volume;
			if(element.ended) { 
				terminate(element);
				bag.splice(i,1);
			}

		});
	}
	play() {
		this.bag.forEach(function(element) {element.play();}); 
	}
	pause() {
		this.bag.forEach(function(element) {element.pause();}); 
	}
	terminateAll() { 
		this.bag.forEach(function(element) {terminate(element)}); 
	}
}




class SFX {
	constructor(sfx_type) {
		switch(sfx_type) {
			case "bgm": 
				let bgm = new Audio("../assets/audio/01 Frozen Langos.mp3");
				bgm.loop = true;
				return bgm;
			case "underwater": 
				let underwater = new Audio("../assets/audio/underwater.mp3");
				underwater.loop = true;
				underwater.muted = true;
				return underwater;
			case "icecrack": return new Audio("../assets/audio/icecrack4.mp3");
			case "die": return new Audio("../assets/audio/negative_long.mp3");
			case "coin": return new Audio("../assets/audio/coin.mp3");
			case "water_enter": return new Audio("../assets/audio/water_drip.mp3");
			case "water_exit": return new Audio("../assets/audio/water_exit.mp3");
			case "bounce": return new Audio("../assets/audio/bounce.mp3");
			case "win": return new Audio("../assets/audio/win.mp3");
		}
	}
	
	
}








