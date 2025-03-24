class BackgroundObject extends MovableObject {
  width = 1080;
  height = 600;

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 600 - this.height;
  }
}
