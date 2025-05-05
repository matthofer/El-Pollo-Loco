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
  deathAnimationFinished = false;
  hasPlayedDeathSound = false;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage(
      "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 6300;
    this.y = this.y + 230;
    this.speed = 0.25 + Math.random() * 0.3;
    this.animate();
  }

  /**
   * Starts movement and animation loops.
   */
  animate() {
    this.startMovement();
    this.startAnimation();
  }

  /**
   * Moves the chicken to the left if it's alive.
   */
  startMovement() {
    this.movementInterval = setInterval(() => {
      if (!this.isDead()) this.moveLeft();
    }, 1000 / 60);
    intervalManager.register(this.movementInterval);
  }

  /**
   * Plays walking animation or handles death when dead.
   */
  startAnimation() {
    this.animationInterval = setInterval(() => {
      if (this.isDead()) this.handleDeath();
      else this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 13);
    intervalManager.register(this.animationInterval);
  }

  /**
   * Handles death logic and plays death sound.
   */
  handleDeath() {
    this.showDeadImage();
    if (!this.hasPlayedDeathSound) {
      const deathSound = new Audio("audio/chicken-hurt.mp3");
      deathSound.volume = 0.7;
      deathSound.muted = soundMuted;
      deathSound.play();
      this.hasPlayedDeathSound = true;
    }
  }

  /**
   * Displays dead image and marks animation as finished.
   */
  showDeadImage() {
    this.img = this.imageCache[this.IMAGES_DEAD[0]];
    setTimeout(() => {
      this.deathAnimationFinished = true;
    }, 300);
  }
}
