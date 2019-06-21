var scoreGame = 0;
var speed = 10;
class Pipe {
  constructor() {

    let spacing = 125;
    let centery = random(spacing, height-90 - spacing);


    this.top = centery - spacing / 2;
    this.bottom = height - (centery + spacing / 2);
    this.x = width;
    this.w = 80;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;

  }

  score(bird) {
    if(bird != null) {
      if (bird.y > this.top && bird.y < height - this.bottom) {
        if (bird.x > this.x && bird.x < this.x + 10) {
          //console.log("score + 1");
          //console.log(birds.length);
          scoreGame += (1);
          return;
          //speed =speed + 0.001;
        }
      }
    }
  }


  show() {
    stroke(255);
    fill(32, 229, 35);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
    rect(this.x-5, this.top, this.w+10, 30);
    rect(this.x-5,height - this.bottom, this.w+10, 30);
  }


  update() {
    this.x -= speed;
  }


  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
