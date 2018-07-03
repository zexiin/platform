
/**********

this file contains the contructors and instance methods for
the Map and Camera classes.

**********/



class Camera {

	constructor(following, map, bg, overlay) {

		// x,y are the map coords of the top left corner of camera
		this.x = 0;
		this.y = 0;
		this.w = canvas.width;
		this.h = canvas.height;

		this.xMax = map.cols*map.scaled - this.w;
		this.yMax = map.rows*map.scaled - this.h;
		if (this.xMax < 0) this.xMax = 0;
		if (this.yMax < 0) this.yMax = 0;


		this.following = following;  // usually the player object
		this.map = map;              // the map duh



		if(bg !== undefined) this.hasBG = true;
		if(overlay !== undefined) this.hasOverlay = true;
		if(this.hasBG) this.bgmap = bg;
		if(this.hasOverlay) this.overlaymap = overlay;

	}

	update() {

		this.x = this.following.x - this.w*0.5 + 32;
		this.y = this.following.y - this.h*0.5 + 32;
		this.x = this.following.x - this.w*0.5 + this.following.w*0.5;
		this.y = this.following.y - this.h*0.5 + this.following.h*0.5;

		// make sure camera hasn't moved beyond bounds
		this.x = Math.max(Math.min(this.x,this.xMax), 0);
		this.y = Math.max(Math.min(this.y,this.yMax), 0);


		this.following.camCoords = this.mapToCam(this.following.x, this.following.y);

	}

	getTileFrame(tile_ID) {
		switch(tile_ID) {

			case 159: return coinAnimation.getFrame();
				case 159.1: return gotCoin.getFrame(0);
				case 159.2: return gotCoin.getFrame(1);
				case 159.3: return gotCoin.getFrame(2);
				case 159.4: return gotCoin.getFrame(3);

			default: 
				return {
					x: (tile_ID - 1) * this.map.tsize % this.map.tilesheet.width,
					y: Math.floor((tile_ID - 1) * this.map.tsize / this.map.tilesheet.width) * this.map.tsize
				};
		}

	}

	// draw background (if exists) and tiles
	draw() {

		// calculate which rows/cols are visible.
		let leftCol = Math.floor(this.x / this.map.scaled);  
		let rightCol = Math.ceil((this.x + this.w )/ this.map.scaled);
		let topRow = Math.floor(this.y / this.map.scaled);
		let bottomRow = Math.ceil((this.y + this.h) / this.map.scaled);

		for (var c = leftCol; c <= rightCol; c++) {
			for (var r = topRow; r <= bottomRow; r++) {


				if(this.hasBG) var bgtile = this.bgmap.getTile(c,r);
				var tile = this.map.getTile(c,r);
				var xyTarget = this.mapToCam(c*this.map.scaled, r*this.map.scaled);

				// draw all layers.
				if(this.hasBG) this.drawTile(bgtile,xyTarget);
				this.drawTile(tile,xyTarget);

			}
		}
	}

	// draw() and drawOverlay() are separate because the player/enemies need to be drawn in between

	// draw overlay tiles (if they exist)
	drawOverlay() {

		if(this.hasOverlay) {
			// calculate which rows/cols are visible.
			let leftCol = Math.floor(this.x / this.map.scaled);  
			let rightCol = Math.ceil((this.x + this.w )/ this.map.scaled);
			let topRow = Math.floor(this.y / this.map.scaled);
			let bottomRow = Math.ceil((this.y + this.h) / this.map.scaled);

			for (var c = leftCol; c <= rightCol; c++) {
				for (var r = topRow; r <= bottomRow; r++) {
					this.drawTile(this.overlaymap.getTile(c,r),this.mapToCam(c*this.map.scaled, r*this.map.scaled));
				}
			}
		}

	}




	//// helper functions ////

	// convert coordinates
	mapToCam(x,y) {return { x: x - this.x, y: y - this.y };}
	camToMap(x,y) {return {x: x + this.x, y: y + this.y };}
	// context.drawImage is a long ass function so
	drawTile(tile, xyTarget) {
		context.drawImage(
			this.map.tilesheet, // image src
			this.getTileFrame(tile).x, // start clipping x
			this.getTileFrame(tile).y, // start clipping y
			this.map.tsize, // src width (clipped)
			this.map.tsize, // src height (clipped)
			xyTarget.x, // target x
			xyTarget.y, // target y
			this.map.scaled, this.map.scaled  // target w,h
		);
	}



}

