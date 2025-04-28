class Endboss extends MovableObject {
  height = 500;
  width = 400;
  offset = {
    top: 20,
    bottom: 20,
    left: 50,
    right: 70,
  };
  bottleHits = 0;
  deathAnimationFinished = false;
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

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  hadFirstContact = false;

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
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
    clearInterval(this.walkInterval);

    this.walkInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    clearInterval(this.walkAnimInterval);
    this.walkAnimInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 10);
  }

  hitByBottle() {
    this.bottleHits++;

    let remainingLife = Math.max(0, 100 - this.bottleHits * 20);
    if (this.world && this.world.endbossBar) {
      this.world.endbossBar.setPercentage(remainingLife);
    }

    clearInterval(this.alertInterval);
    clearInterval(this.walkAnimInterval);
    clearInterval(this.walkInterval);

    if (this.bottleHits >= 5) {
      this.die();
    }

    let frame = 0;
    this.hurtInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_HURT[frame]];
      frame++;

      if (frame >= this.IMAGES_HURT.length) {
        clearInterval(this.hurtInterval);

        if (!this.isDead()) {
          this.startWalking();
        }
      }
    }, 120);
  }

  die() {
    this.energy = 0;
    let frame = 0;
    clearInterval(this.walkAnimInterval);
    clearInterval(this.walkInterval);

    this.deathInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_DEAD[frame]];
      frame++;

      if (frame >= this.IMAGES_DEAD.length) {
        clearInterval(this.deathInterval);
        this.img =
          this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
        this.deathAnimationFinished = true;
      }
    }, 200);
  }
}
