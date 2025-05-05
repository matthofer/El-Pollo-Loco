class MovableObject extends DrawableObject {
  x = 50;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 5;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  energy = 100;
  lastHit = 0;

  /**
   * Applies gravity by adjusting vertical position and speed.
   */
  applyGravity() {
    const groundLevel = this instanceof ThrowableObject ? 455 : 180;
    if (this.isDead() && this.deathAnimationFinished) return;
  
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
  
      if (this.y >= groundLevel) {
        this.handleGroundContact(groundLevel);
      }
    }, 1000 / 25);
  }
  
  /**
   * Handles logic when the object reaches the ground level.
   * @param {number} groundLevel - The Y-position of the ground.
   */
  handleGroundContact(groundLevel) {
    this.y = groundLevel;
    this.speedY = 0;
  
    if (this instanceof ThrowableObject && !this.hasHit) {
      this.hasHit = true;
      this.shatterBottle();
    }
  
    clearInterval(this.gravityInterval);
  }

  /**
   * Checks if the object is above the ground level.
   * @returns {boolean}
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) return true;
    return this.y < 180;
  }

  /**
   * Checks for collision with another movable object.
   * @param {MovableObject} mo - The other object to check collision with.
   * @returns {boolean}
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces energy when hit and stores the hit timestamp.
   */
  hit() {
    this.energy -= 10;
    this.lastHit = Date.now();
    if (this.energy <= 0) this.energy = 0;
  }

  /**
   * Checks if the object has no energy left.
   * @returns {boolean}
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object was recently hit.
   * @returns {boolean}
   */
  isHurt() {
    let timePassed = Date.now() - this.lastHit;
    return timePassed / 1000 < 0.75;
  }

  /**
   * Plays the next animation frame from an image list.
   * @param {string[]} images - Array of image paths.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    this.img = this.imageCache[images[i]];
    this.currentImage++;
  }

  /** Moves the object to the right. */
  moveRight() {
    this.x += this.speed;
  }

  /** Moves the object to the left. */
  moveLeft() {
    this.x -= this.speed;
  }

  /** Makes the object jump. */
  jump() {
    this.speedY = 20;
    this.y = this.speedY;
    this.afterJump = true;
  }
}
