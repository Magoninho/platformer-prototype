let map = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function intersects(rect1, rect2) {
	return (
		rect1.x < rect2.x + rect2.width &&
		rect1.x + rect1.width > rect2.x &&
		rect1.y < rect2.y + rect2.height &&
		rect1.height + rect1.y > rect2.y
	);
}


class Level {
	constructor(map) {
		this.map = map;
		this.tiles = [];
		for (let i = 0; i < this.map.length; i++) {
			for (let j = 0; j < this.map[i].length; j++) {
				if (this.map[j][i] == 1)
					this.tiles.push(new Tile(i * tilesize, j * tilesize, tilesize, tilesize));
			}
		}

	}

	render() {
		for (let i = 0; i < this.tiles.length; i++) {
			this.tiles[i].render();
		}
	}
}


class Tile {
	constructor(x, y, width, height) {
		this.rect = {
			x: x,
			y: y,
			width: width,
			height: height
		};
	}

	render() {
		noStroke();
		fill(50, 140, 100);
		rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
	}


}


const tilesize = 32;

function isSolidAt(x, y) {
	return map[y][x] != 0;
}



// player info
let playerX = 10;
let playerY = 10;

class Player {

	constructor(level) {
		this.rect = {
			x: 64,
			y: 220,
			width: tilesize,
			height: tilesize
		};

		this.level = level;
		this.color = "yellow";
		this.vx = 0;
		this.vy = 0.5;
		this.gravity = 0.5;
		this.jumping = false;
		this.areaAround = {
			x: this.rect.x - tilesize,
			y: this.rect.y - tilesize,
			width: 3 * tilesize,
			height: 3 * tilesize
		}
	}


	getTilePosition(offsetx = 0, offsety = 0) {
		return {
			x: Math.floor((this.rect.x + offsetx * tilesize) / tilesize) * tilesize,
			y: Math.floor((this.rect.y + offsety * tilesize) / tilesize) * tilesize
		}
	}



	update() {
		this.vx = 0;



		if (keyIsDown(RIGHT_ARROW)) {
			this.vx = 5;
		}

		if (keyIsDown(LEFT_ARROW)) {
			this.vx = -5;
		}

		if (keyIsDown(UP_ARROW) && !this.jumping) {
			this.vy = -10;
			this.jumping = true;
		}

		if (this.vy < 0 && this.jumping) {
			// pulando
			this.color = "red";
		} else if (this.vy > 0 && this.jumping) {
			// caindo
			this.color = "yellow"
		} else if (this.vx == 0 && !this.jumping) {
			// idle
			this.color = "purple";
		} else if (this.vx != 0) {
			this.color = "lightblue";
		}

		this.rect.x += this.vx;
		this.areaAround.x = this.rect.x - tilesize;
		player.checkHorizontalCollisions();
		this.rect.y += this.vy;
		this.vy += this.gravity;
		this.areaAround.y = this.rect.y - tilesize;
		player.checkVerticalCollisions();

		// console.log(this.vy)

	}

	render() {
		// fill(255, 0, 0);
		// let pos = this.getTilePosition(0, 1);
		// rect(pos.x, pos.y, tilesize, tilesize)
		fill(this.color);
		stroke(0);
		rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		fill(255, 255, 255, 0.5);
		rect(this.areaAround.x, this.areaAround.y, this.areaAround.width, this.areaAround.height);
	}

	checkVerticalCollisions() {
		// TODO: optimize for tiles around only
		for (const tile of this.level.tiles) {
			if (intersects(this.areaAround, tile.rect)) {
				if (intersects(this.rect, tile.rect)) {
					if (this.vy > 0) {
						this.vy = 0;
						this.rect.y = tile.rect.y - this.rect.height;
						this.jumping = false;
					}

					if (this.vy < 0) {
						this.vy = 0;
						this.rect.y = tile.rect.y + this.rect.height;
					}
					break;
				}
			}
		}
	}

	checkHorizontalCollisions() {
		for (const tile of this.level.tiles) {
			if (intersects(this.areaAround, tile.rect)) {
				if (intersects(this.rect, tile.rect)) {
					if (this.vx > 0) {
						this.vx = 0;
						this.rect.x = tile.rect.x - this.rect.width;
					}
					if (this.vx < 0) {
						this.vx = 0;
						this.rect.x = tile.rect.x + this.rect.width;
					}
					break;
				}
			}
		}
	}
}

let level = new Level(map);
let player = new Player(level);

function setup() {
	createCanvas(640, 640);
}

function update() {
	player.update();
}

function draw() {
	background(51);
	noStroke();
	fill(50, 140, 100);

	update();

	level.render();
	player.render();
}