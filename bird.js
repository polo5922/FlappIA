class Bird {
  constructor(brain) {

    this.y = height/2;
    this.x = 64;

    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4, 4, 2);
    }


  }

  show() {
    image(bird_loadImg, this.x, this.y);
    bird_createImg.position(this.x, this.y);
  }

  up() {
    this.velocity = this.lift;
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  think(pipes) {

    let closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = pipes[i].x - this.x;
      if (diff < record && diff > 0) {
        record = diff;
        closest = pipes[i];
      }
    }


    if(closest != null) {
      let inputs = [];
      inputs[0] = this.y / height;
      inputs[1] = closest.top / height;
      inputs[2] = closest.bottom / height;
      inputs[3] = closest.x / width;


      //let inputs = [1.0,0.5,0.2,0.3];
      let output = this.brain.predict(inputs);

      if (output[0] > output[1]) {
        this.up();
      }
    }
  }


  update() {
    this.score ++;
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if(this.y > height-90) {
      this.y = height-90;
      this.velocity = 0;
    }

    if(this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}
