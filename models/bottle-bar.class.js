class BottleBar extends DrawableObject {
  IMAGES = [
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];
  percentage = 0;
  height = 60;
  width = 270;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 100;
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 0) {
      return 0;
    } else if (this.percentage > 80) {
      return 1;
    } else if (this.percentage > 60) {
      return 2;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 4;
    } else {
      return 5;
    }
  }
}
