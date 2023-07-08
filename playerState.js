const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class Sitting extends State {
  constructor(player) {
    super(states.SITTING);
    this.player = player;
  }
  enter() {
    this.frameX = 0;
    this.player.frameY = 5;
    this.player.maxFrameX = 4;
  }
  inputHandler(input) {
    if (input.includes('a') || input.includes('d')) this.player.setState(states.RUNNING, 1);
  }
}

export class Running extends State {
  constructor(player) {
    super(states.RUNNING);
    this.player = player;
  }
  enter() {
    this.frameX = 0;
    this.player.frameY = 3;
    this.player.maxFrameX = 8;
  }
  inputHandler(input) {
    if (input.includes('s')) this.player.setState(states.SITTING, 0);
    else if (input.includes('w')) this.player.setState(states.JUMPING, 1);
  }
}

export class Jumping extends State {
  constructor(player) {
    super(states.RUNNING);
    this.player = player;
  }
  enter() {
    // 垂直移动
    if (this.player.onGround()) this.player.vy += this.player.vyStep;
    this.frameX = 0;
    this.player.frameY = 1;
    this.player.maxFrameX = 6;
  }
  inputHandler(input) {
    if (this.player.vy < this.player.weight) this.player.setState(states.FALLING, 1);
  }
}

export class Falliing extends State {
  constructor(player) {
    super(states.RUNNING);
    this.player = player;
  }
  enter() {
    this.frameX = 0;
    this.player.frameY = 2;
    this.player.maxFrameX = 6;
  }
  inputHandler(input) {
    if (this.player.onGround()) this.player.setState(states.RUNNING, 1);
  }
}
