const TOTAL = 50;
var birds = [];
var savedBirds = [];
var pipes = [];
var counter = 0;
var generation = 1;
var widthWindows = window.innerWidth;
var heightWindows = window.innerHeight;
var bird_loadImg, bird_createImg;


function preload() {
  bird_loadImg = loadImage("img/bird.gif");
  bird_createImg = createImg("img/bird.gif");
}


function setup() {
  createCanvas(400, 600);
  bg = loadImage('img/bg.png');
  for (let i = 0 ; i < TOTAL; i++) {
    birds[i] = new Bird;
  }
}

function draw() {
  background(bg);
  if (counter % 80 == 0) {
    pipes.push(new Pipe());
  }
  counter++;

  textSize(40);
  text("génération : " + generation,20 ,height/3);
  //text("score : " + scoreGame,width/2,height/2);
  //text("speed : " + speed,width/2 + 200,height-300);
  for (let bird of birds) {
    bird.think(pipes);
    bird.update();
    bird.show();
    if(bird.y > height-90){
      savedBirds.push(birds.splice(j, 1)[0]);
    }
  }
  fill(0, 102, 153);

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();


    for (let j = birds.length-1; j >= 0; j--) {
      if (pipes[i].hits(birds[j])) {
        savedBirds.push(birds.splice(j, 1)[0]);
      }
      pipes[i].score(birds[j]);

    }


    if (pipes[i].offscreen()) {
      pipes.splice(i,1);
    }
  }

  if (birds.length === 0) {
    counter = 0;
    nextGeneration();
    pipes = [];
  }



}
