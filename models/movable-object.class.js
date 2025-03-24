class MovableObject {
  x = 120;
  y = 195;
  img;
  height = 180;
  width = 100;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    this.x += 10;
    console.log("Moving right");
  }

  moveLeft() {
    this.x -= 10;
    console.log("Moving left");
  }
}
