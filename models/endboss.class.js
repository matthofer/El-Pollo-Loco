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
    "../img/4_enemie_boss_chicken/1_walk/G1.png",
    "../img/4_enemie_boss_chicken/1_walk/G2.png",
    "../img/4_enemie_boss_chicken/1_walk/G3.png",
    "../img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "../img/4_enemie_boss_chicken/2_alert/G5.png",
    "../img/4_enemie_boss_chicken/2_alert/G6.png",
    "../img/4_enemie_boss_chicken/2_alert/G7.png",
    "../img/4_enemie_boss_chicken/2_alert/G8.png",
    "../img/4_enemie_boss_chicken/2_alert/G9.png",
    "../img/4_enemie_boss_chicken/2_alert/G10.png",
    "../img/4_enemie_boss_chicken/2_alert/G11.png",
    "../img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "../img/4_enemie_boss_chicken/4_hurt/G21.png",
    "../img/4_enemie_boss_chicken/4_hurt/G22.png",
    "../img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "../img/4_enemie_boss_chicken/5_dead/G24.png",
    "../img/4_enemie_boss_chicken/5_dead/G25.png",
    "../img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_ATTACK = [
    "../img/4_enemie_boss_chicken/3_attack/G16.png",
    "../img/4_enemie_boss_chicken/3_attack/G17.png",
    "../img/4_enemie_boss_chicken/3_attack/G18.png",
    "../img/4_enemie_boss_chicken/3_attack/G19.png",
    "../img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  hadFirstContact = false;

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = 7900;
    this.y = 70;
    this.speed = 2;
  }

  startAlert() {
    if (this.alertInterval) return;

    this.alertInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
    }, 250);
    intervalManager.register(this.alertInterval);

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
    intervalManager.register(this.walkInterval);

    clearInterval(this.walkAnimInterval);
    this.walkAnimInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 10);
    intervalManager.register(this.walkAnimInterval);
  }

  startAttackAnimation() {
    clearInterval(this.walkInterval);
    clearInterval(this.walkAnimInterval);
    playSound(BOSS_ATTACK_AUDIO, { volume: 0.7 });

    if (this.attackInterval || this.isDead()) return;

    this.animateAttack();
  }

  animateAttack() {
    let frame = 0;
    this.attackInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_ATTACK[frame]];
      frame++;

      if (frame >= this.IMAGES_ATTACK.length) {
        clearInterval(this.attackInterval);
        this.attackInterval = null;
        this.startWalking();
      }
    }, 140);
    intervalManager.register(this.attackInterval);
  }

  hitByBottle() {
    this.bottleHits++;
    const remainingLife = Math.max(0, 100 - this.bottleHits * 10);

    if (this.world?.endbossBar) {
      this.world.endbossBar.setPercentage(remainingLife);
      playSound(BOSS_HURT_AUDIO);
    }

    this.clearAllIntervals();

    if (this.bottleHits >= 10) {
      this.die();
      return;
    }

    this.playHurtAnimation();
  }

  clearAllIntervals() {
    clearInterval(this.alertInterval);
    clearInterval(this.walkAnimInterval);
    clearInterval(this.walkInterval);
  }

  playHurtAnimation() {
    let frame = 0;
    this.hurtInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_HURT[frame]];
      frame++;

      if (frame >= this.IMAGES_HURT.length) {
        clearInterval(this.hurtInterval);
        if (!this.isDead()) this.startWalking();
      }
    }, 120);
    intervalManager.register(this.hurtInterval);
  }

  die() {
    this.energy = 0;
    this.world.character.speedY = 38;
    clearInterval(this.walkAnimInterval);
    clearInterval(this.walkInterval);
    this.playDeathAnimation();
  }

  playDeathAnimation() {
    let frame = 0;
    this.deathInterval = setInterval(() => {
      if (frame < this.IMAGES_DEAD.length) {
        this.img = this.imageCache[this.IMAGES_DEAD[frame]];
        frame++;
      } else {
        clearInterval(this.deathInterval);
        playSound(BOSS_DEAD_AUDIO);
        this.img = this.imageCache[this.IMAGES_DEAD.at(-1)];
        this.deathAnimationFinished = true;
      }
    }, 200);
    intervalManager.register(this.deathInterval);
  }
}
