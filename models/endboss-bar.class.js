class EndbossBar extends DrawableObject {
  IMAGES = [
    "../img/7_statusbars/2_statusbar_endboss/100.png",
    "../img/7_statusbars/2_statusbar_endboss/80.png",
    "../img/7_statusbars/2_statusbar_endboss/60.png",
    "../img/7_statusbars/2_statusbar_endboss/40.png",
    "../img/7_statusbars/2_statusbar_endboss/20.png",
    "../img/7_statusbars/2_statusbar_endboss/0.png",
  ];
  percentage = 100;
  height = 60;
  width = 210;
  visible = false;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 850;
    this.y = 35;
    this.setPercentage(100);
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
    if (this.percentage >= 100) return 0;
    else if (this.percentage > 75) return 1;
    else if (this.percentage > 50) return 2;
    else if (this.percentage > 25) return 3;
    else if (this.percentage > 0) return 4;
    else return 5;
  }
}
