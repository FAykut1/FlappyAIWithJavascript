let pipeCounter = 0
class Pipe {
	constructor(){
		this.index = pipeCounter++;
		let spacing = 200;
		let centery = random(spacing, height - spacing);
		this.top = centery - spacing/2;
		this.bottom = height - (centery + spacing / 2);
		this.x = width;
		this.w = 120;
		this.speed = 4;
	}

	collide(bird){
		// pipe collision
		if(bird.x + bird.w/2 >= this.x && bird.x <=  this.x + this.w &&
			(bird.y - bird.w/2 < this.top || bird.y + bird.w/2 > height - this.bottom)){
			return true;
		}
		return false;
	}

	score(bird){
		
		if(bird.x + bird.w / 2 >= this.x + this.w/2 && bird.x <=  this.x + this.w && 
			(bird.y > this.top || bird.y + bird.w < height - this.bottom)){
			return true;
		}
		return false;
	}

	update(){
		this.x -= this.speed;
	}

	show(color = 200){
		stroke(255);
		fill(color);
		rect(this.x, 0, this.w, this.top);
		rect(this.x, height - this.bottom, this.w, this.bottom);
	}

	offScreen(){
			if(this.x + this.w < 0){
				return true;
			}else{
				return false;
			}
	}
}