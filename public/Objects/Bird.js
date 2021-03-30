function mutate(x) {
	// mutate %10 chance
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Bird {
	constructor(brain){
		this.x = 64;
		this.y = 100;
		this.w = 50;
		this.gravity = 0.5;
		this.velocity = 0;

		// if there is a brain then copy
		if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4, 4, 1);
    }

		this.score = 0;
		this.fitness = 0;
	}

	myMutate(){
		this.brain.mutate(mutate);
	}

	think(pipes){
		// get the nearest(available) pipe to the bird.
		let nearestPipe = pipes[nearestPipeIndex];
		// set the inputs and normalized
		let inputs = [];
		inputs[0] = this.y / height;
		inputs[1] = nearestPipe.top / height;
		inputs[2] = (height - nearestPipe.bottom) / height;
		inputs[3] = nearestPipe.x / width;

		// predict the output
		let outputs = this.brain.predict(inputs);
		
		if (outputs[0] > 0.5){
			this.jump();
		}
	}

	update(){
		this.velocity += this.gravity;
		this.y += this.velocity;
		
		if(this.y >= height - this.w){
			this.y = height - this.w;
			return true;
		}if(this.y < 0){
			this.y = 0;
			return true;
		}

		this.score++;

		return false;
	}

	jump(){
		this.velocity = -10;
	}


	show(){
		stroke(0);
		fill(0);
		ellipse(this.x,this.y,this.w,this.w);
	}
}