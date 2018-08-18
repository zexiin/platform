class Key {
	constructor(x, y) {
		this.x = this.xinit = x;
		this.y = this.yinit = y;
		this.w = this.h = 16 * scaleFactor;
	}

	reset() {
	this.x = this.xinit;
	this.y = this.yinit;
	player.key = false;
    };

	update() {
		console.log(player.key);
		
		if (overlap(this, player.bound)) {
			player.key = true;
			this.x = this.y = -100;
		}
	}

	draw() {
		if(this.x+this.w >= cam.x && this.x <= cam.x+cam.w 
			&& this.y+this.h >= cam.y && this.y <= cam.y+cam.h) {


			let xyTarget = cam.mapToCam(this.x, this.y);

		        context.drawImage(
				map.tilesheet, // image src
				274 * map.tsize % map.tilesheet.width,
				Math.floor(274 * map.tsize / map.tilesheet.width) * map.tsize,
				map.tsize, // src width (clipped)
				map.tsize, // src height (clipped)
				xyTarget.x, // target x
				xyTarget.y, // target y
				map.scaled, map.scaled  // target w,h
				);

		}
	}
}
