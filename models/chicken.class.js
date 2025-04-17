class Chicken extends MovableObject {
  height = 110;
  width = 95;
  offset = {
    top: 10,
    bottom: 10,
    left: -1,
    right: 1,
  };
  energy = 1;
  movementInterval;
  animationInterval;

  IMAGES_WALKING = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["../img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage(
      "../img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 3000;
    this.y = this.y + 230;
    this.speed = 0.25 + Math.random() * 0.3;
    this.animate();
  }

  animate() {
    this.movementInterval = setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      if (this.isDead()) {
        this.showDeadImage();
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 13);
  }

  showDeadImage() {
    this.img = this.imageCache[this.IMAGES_DEAD[0]];
  }
}
