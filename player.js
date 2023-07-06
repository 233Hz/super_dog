import { Sitting, Running, Jumping, Falliing } from './playerState.js';

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.vyStep = 30;
    this.weight = 1;
    this.frameX = 0;
    this.frameY = 0;
    this.image = document.getElementById('player');
    this.speed = 0;
    this.maxSpeed = 10;
    this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falliing(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
  }

  update(input) {
    this.currentState.inputHandler(input);
    // 水平移动
    this.x += this.speed;
    if (input.includes('d')) this.speed = this.maxSpeed;
    else if (input.includes('a')) this.speed = -this.maxSpeed;
    else this.speed = 0;

    if (this.x < 0) this.x = 0;
    else if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

    // 垂直移动
    this.y -= this.vy;
    if (!this.onGround()) this.vy -= this.weight;
    else this.vy = 0;
  }

  draw(context) {
    console.log(this.frameY);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  onGround() {
    return this.y >= this.game.height - this.height;
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}
