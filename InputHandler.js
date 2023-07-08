export class InputHandler {
  constructor() {
    this.keys = [];
    this.effectiveKey = ['Enter', 'a', 'd', 'w', 's'];
    window.addEventListener('keydown', e => {
      const key = e.key.toLowerCase();
      if (this.effectiveKey.includes(key) && !this.keys.includes(key)) {
        this.keys.push(key);
      }
    });
    window.addEventListener('keyup', e => {
      const key = e.key.toLowerCase();
      if (this.effectiveKey.includes(key)) {
        this.keys.splice(this.keys.indexOf(key), 1);
      }
    });
  }
}
