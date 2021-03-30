const nextGeneration = (brain) => {
  calculateFitness();
  for (let i = 0; i < TOTAL_BIRDS; i++) {
    birds[i] = brain ? new Bird(brain): pickOne();
  }
  birds[0] = brain ? new Bird(brain): pickOne();
  //reset the died birds
  diedBirds = [];
}

const pickOne = () => {
  // pick the bird
  let bird = diedBirds[diedBirds.length - 1];
  // copy the brain
  let mutableBird = new Bird(bird.brain);
  // mutate the brain for better results
  mutableBird.myMutate();
  return mutableBird;
}

const calculateFitness = () => {
  // get sum of the fitnesses
  let sum = 0;
  for (let bird of diedBirds){
    sum += bird.score;
  }
  // normalize fitness
  for(let bird of diedBirds){
    bird.fitness = bird.score/sum;
  }
}