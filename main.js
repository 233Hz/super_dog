import { Player } from './player.js';
import { InputHandler } from './InputHandler.js';
import { Backgroud } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemy.js';

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80; // 地面高度
      this.speed = 0; // 背景每次移动距离
      this.maxSpeed = 2; // 背景每次移动距离
      this.backgroud = new Backgroud(this);
      this.player = new Player(this);
      this.input = new InputHandler();
      this.enemys = [];
    }

    update(deltaTime) {
      this.backgroud.update();
      this.player.update(this.input.keys, deltaTime);
    }

    draw(context) {
      this.backgroud.draw(context);
      this.player.draw(context);
    }
    addEnemy() {
      this.enemys.push(new FlyingEnemy(this));
      this.enemys.push(new GroundEnemy(this));
      this.enemys.push(new ClimbingEnemy(this));
    }
  }

  const game = new Game(canvas.width, canvas.height);
  console.log(game);

  let lastTime = 0; // 上一次动画的时间戳

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime; // 增量时间
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
