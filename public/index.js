const TOTAL_BIRDS = 1000;
let FRAMERATE = 60;

let birds = [];
let diedBirds = [];
let pipes = [];
let counter = 0;
let score = 0;
let generationCount = 0;
let nearestPipeIndex = 0;

let slider;


function setup() {
  createCanvas(800, 600);

  reset();
  for(let i = 0; i<TOTAL_BIRDS;i++){
    birds[i] = new Bird();
  }
  slider = createSlider(60,600,FRAMERATE);
  slider.position(350,620);
  frameRate(FRAMERATE);
  let button = createButton('Save last bird');
  let button2 = createButton('Get best bird');
  button.position(20, 650);
  button.mousePressed(setLastBirdBrain);
  button2.position(20, 680);
  button2.mousePressed(getLastBirdBrain);
}
  
function draw() {
  background(220);
  frameRate(slider.value());
  
  for(let i = 0; i<pipes.length; i++){
    const pipe = pipes[i];
    pipe.update();

    // show the nearest pipe another color
    if(nearestPipeIndex === i){
      pipe.show(0);
    }else{
      pipe.show();
    }

    for(let j = 0; j<birds.length;j++){
      // set the global score
      if(pipe.score(birds[j])){
        score = pipe.index + 1;
      }
      // pipe collision detection
      if(pipe.collide(birds[j])){
        diedBirds.push(birds.splice(j,1)[0]);
      }
    }
    // if pipe is offscrean then delete it
    if(pipe.offScreen()){
      nearestPipeIndex = i;
      pipes.splice(i,1);
    }
  }
  
  
  let strongest = -Infinity;
  let bestbird;
  for(let j = 0; j<birds.length;j++){
    const bird = birds[j];
    // bird brain!
    if(pipes.length > 0) bird.think(pipes);
    // update the birds
    const isDead = bird.update();
    if(isDead) diedBirds.push(birds.splice(j,1)[0]);
    // get strongest bird to draw if you want to show 1 bird in the screen
    if(bird.fitness > strongest){
      strongest = bird.fitness;
      bestbird = bird;
    }
    //show all birds in the list
    bird.show();
  }
  // show best bird only
  // bestbird?.show();

  if(birds.length === 0){
    // reset();
    // get next generation and reset everying else
    nextGeneration();
    generationCount++;
    console.log(`Generation : ${generationCount}, Score : ${score}`);
    pipes = [];
    pipeCounter = 0;
    counter = 1;
    score = 0;
    nearestPipeIndex = 0;
    pipes.push(new Pipe());
  }


  if(counter % 100 == 0){
    pipes.push(new Pipe());
    // console.log("Alive birds :",birds.length);
  }

  counter++;

  textSize(32);
  text(`Score ${score}`,10,30);
  textSize(32);
  text(`Alive ${birds.length}`,10,60);

}

function reset(){
  birds[0] = new Bird();
  pipes = [];
  counter = 0;
  score = 0;
  pipeCounter = 0;
  generationCount++;
  nearestPipeIndex = 0;
}

function setLastBirdBrain(){
  localStorage.setItem('bestBrain', birds[0].brain.serialize())

}

function getLastBirdBrain(){
  const brainstr = localStorage.getItem('bestBrain')
  if(brainstr){
    const brain = NeuralNetwork.deserialize(brainstr);
    nextGeneration(brain);
    reset();
    return;
  }

  console.log("You have to save the bird.");
}

// function mousePressed(){
//   birds[0].jump();
// }