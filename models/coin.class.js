class Coin extends MovableObject {
  width = 100;
  height = 100;

  offset = {
    top: 35,
    bottom: 35,
    left: 35,
    right: 35,
  };
  floatDirection = 1;
  baseY;
  randomYOffset;

  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x, y) {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.x = x + 500;
    this.randomYOffset =
      Math.floor(y * Math.random()) + (Math.floor(Math.random() * 10) + 1) + 60;
    this.baseY = this.randomYOffset;
    this.y = this.baseY;
    this.animate();
    this.float();
  }

  /**
   * Starts the coin animation.
   */
  animate() {
    intervalManager.register(
      setInterval(() => {
        this.playAnimation(this.IMAGES_COIN);
      }, 250)
    );
  }

  /**
   * Causes the coin to float up and down.
   */
  float() {
    intervalManager.register(
      setInterval(() => {
        this.y = this.baseY + Math.sin(Date.now() / 200) * 2;
      }, 40)
    );
  }
}
