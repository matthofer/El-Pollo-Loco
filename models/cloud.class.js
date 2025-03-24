class Cloud extends MovableObject {
  y = 20;
  height = 350;

  constructor() {
    super().loadImage("../img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 1080;
    this.animate();
    this.width = 500;
    this.speed = 0.12 + Math.random() * 0.25;
  }

  animate() {
    this.moveLeft();
  }
}
