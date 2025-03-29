class Chick extends MovableObject {
  height = 80;
  width = 80;
  offset = {
    top: 10,
    bottom: 15,
    left: 15,
    right: 15,
  };
  IMAGES_WALKING = [
    "../img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 500 + Math.random() * 500;
    this.y = this.y + 255;
    this.speed = 0.2 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 13);
  }
}
