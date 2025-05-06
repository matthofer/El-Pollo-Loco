class Cloud extends MovableObject {
  y = 10;
  height = 400;

  constructor() {
    super().loadImage(
      "img/5_background/layers/4_clouds/" + this.randomCloud() + ".png"
    );
    this.x = Math.random() * 8632;
    this.animate();
    this.width = 800;
    this.speed = 0.12 + Math.random() * 0.35;
  }

  /**
   * Starts the movement animation.
   */
  animate() {
    intervalManager.register(
      setInterval(() => {
        this.moveLeft();
        if (this.x < -1000) {
          this.x = 7000;
        }
      }, 1000 / 60)
    );
  }

  /**
   * Returns a random cloud image number (1 or 2).
   * @returns {number} - 1 or 2
   */
  randomCloud() {
    return Math.floor(Math.random() * 2 + 1);
  }
}
