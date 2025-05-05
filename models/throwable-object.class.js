class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  hasHit = false;

  constructor(x, y, character, direction = 1) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 90;
    this.character = character;
    this.direction = direction;
    this.throw();
    this.animate();
  }

  /**
   * Starts the rotation animation of the bottle.
   */
  animate() {
    this.rotationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    }, 50);
  }

  /**
   * Throws the object forward and applies gravity.
   */
  throw() {
    if (!this.character.isDead()) {
      this.speedY = 12;
      this.applyGravity();
      playSound(BOTTLE_THROW_AUDIO);
      this.throwInterval = setInterval(() => {
        this.x += 20 * this.direction;
      }, 20);
    }
  }

  /**
   * Plays splash animation and marks object for deletion.
   */
  splash() {
    clearInterval(this.throwInterval);
    clearInterval(this.gravityInterval);
    clearInterval(this.rotationInterval);
    let frame = 0;
    const splashAnim = setInterval(() => {
      if (frame < this.IMAGES_SPLASH.length) {
        this.img = this.imageCache[this.IMAGES_SPLASH[frame]];
        frame++;
      } else {
        clearInterval(splashAnim);
        this.markedForDeletion = true;
      }
    }, 10);
  }

  /**
   * Handles visual and audio effects when the bottle breaks.
   */
  shatterBottle() {
    this.splash();
    playSound(BOTTLE_SPLASH_AUDIO, { volume: 0.8 });
  }
}
