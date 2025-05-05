class DrawableObject {
  x = 150;
  y = 185;
  height = 180;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Loads a single image and sets it as the object's image.
   * @param {string} path - The image file path.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image of this object on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // drawFrame(ctx) {
  //   if (
  //     this instanceof Character ||
  //     this instanceof Chicken ||
  //     this instanceof Chick ||
  //     this instanceof Endboss ||
  //     this instanceof Coin ||
  //     this instanceof Bottle
  //   ) {
  //     ctx.beginPath();
  //     ctx.lineWidth = "2";
  //     ctx.strokeStyle = "blue";
  //     ctx.rect(
  //       this.x + this.offset.left,
  //       this.y + this.offset.top,
  //       this.width - this.offset.left - this.offset.right,
  //       this.height - this.offset.top - this.offset.bottom
  //     );
  //     ctx.stroke();
  //   }
  // }

  /**
   * Loads multiple images into the image cache.
   * @param {string[]} arr - Array of image file paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
