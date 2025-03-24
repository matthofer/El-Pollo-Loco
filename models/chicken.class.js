class Chicken extends MovableObject {
  height = 110;
  width = 95;
  IMAGES_WALKING = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 500 + Math.random() * 500;
    this.y = this.y + 230;
    this.speed = 0.2 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 13);
  }
}
