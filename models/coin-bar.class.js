class CoinBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];
  percentage = 0;
  height = 60;
  width = 210;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 50;
    this.setPercentage(0);
  }

  /**
   * Sets the percentage value and updates the displayed image accordingly.
   * @param {number} percentage - The current bottle percentage (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the current percentage.
   * @returns {number} - Index of the image to display.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) return 5;
    else if (this.percentage > 75) return 4;
    else if (this.percentage > 50) return 3;
    else if (this.percentage > 25) return 2;
    else if (this.percentage > 0) return 1;
    else return 0;
  }
}
