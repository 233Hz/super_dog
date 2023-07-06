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
    this.player.frameY = 5;
  }
  inputHandler(input) {
    if (input.includes('a') || input.includes('d')) this.player.setState(states.RUNNING);
  }
}

export class Running extends State {
  constructor(player) {
    super(states.RUNNING);
    this.player = player;
  }
  enter() {
    this.player.frameY = 3;
  }
  inputHandler(input) {
    if (input.includes('s')) this.player.setState(states.SITTING);
    else if (input.includes('w')) this.player.setState(states.JUMPING);
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
    this.player.frameY = 1;
  }
  inputHandler(input) {
    if (this.player.vy < this.player.weight) this.player.setState(states.FALLING);
  }
}

export class Falliing extends State {
  constructor(player) {
    super(states.RUNNING);
    this.player = player;
  }
  enter() {
    this.player.frameY = 2;
  }
  inputHandler(input) {
    if (this.player.onGround()) this.player.setState(states.RUNNING);
  }
}
