var sound = new Bag();

sound.bag.push(new Audio("../assets/audio/win.mp3")); // 0
sound.bag.push(new Audio("../assets/audio/negative_long.mp3")); // 1 DYING
sound.bag.push(new Audio("../assets/audio/coin.mp3")); // 2
sound.bag.push(new Audio("../assets/audio/water_drip.mp3")); // 3
sound.bag.push(new Audio("../assets/audio/water_exit.mp3")); // 4

sound.bag.push(new Audio("../assets/audio/bounce.mp3")); // 5
sound.bag.push(new Audio("../assets/audio/footstep_short.wav")); // 6 - currently unused
sound.bag.push(new Audio("../assets/audio/underwater.mp3")); // 7
sound.bag.push(new Audio("../assets/audio/icecrack4.mp3")); // 8
sound.bag.push(new Audio("../assets/audio/01 Frozen Langos.mp3")); // 9


window.SetVolume = function(val)
{
    sound.bag[9].volume = val / 100;
}

function SetSoundEffects(val)
{
	for (let i = 0; i < 9; i++) {
    sound.bag[i].volume = val / 100;
    } 
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


