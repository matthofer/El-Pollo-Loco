class Endboss extends MovableObject {
  height = 500;
  width = 400;
  offset = {
    top: 20,
    bottom: 20,
    left: 50,
    right: 70,
  };
  world;
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  hadFirstContact = false;

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.x = 5000;
    this.y = 70;
    this.speed = 0.8;
  }

  startAlert() {
    if (this.alertInterval) return;

    this.alertInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
    }, 250);

    setTimeout(() => {
      clearInterval(this.alertInterval);
      this.startWalking();
    }, 2000);
  }

  startWalking() {
    this.walkInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    this.walkAnimInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 10);
  }
}
