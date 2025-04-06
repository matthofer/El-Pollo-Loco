class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage(
      "../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 90;
    this.throw();
  }

  throw() {
    if (!this.character.isDead()) {
      this.speedY = 10;
      this.applyGravity();
      setInterval(() => {
        this.x += 15;
      }, 20);
    }
  }
}
