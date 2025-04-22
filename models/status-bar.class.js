class StatusBar extends DrawableObject {
  IMAGES = [
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
  ];
  percentage = 100;
  height = 60;
  width = 210;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 0;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage >= 100) return 0;
    else if (this.percentage > 75) return 1;
    else if (this.percentage > 50) return 2;
    else if (this.percentage > 25) return 3;
    else if (this.percentage > 0) return 4;
    else return 5;
  }
}
