class World {
  character = new Character();
  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 100;
  statusBar = new StatusBar();
  bottleBar = new BottleBar();
  coinBar = new CoinBar();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkThrowObjects();
      this.checkCollisions();
      this.checkDeathsAfterCollision();
    }, 10);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        this.character
      );
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isColliding(this.character) && !enemy.isDead()) {
        if (this.isCollisionFromAbove(enemy)) {
          this.character.afterJump = false;
          enemy.hit();
          this.character.jump();
        } else {
          if (!this.character.isHurt() && !this.character.gettingHit) {
            this.character.takingHit();
            this.statusBar.setPercentage(this.character.energy);
          }
        }
      }
    });
  }

  isCollisionFromAbove(enemy) {
    if (!this.character.isColliding(enemy)) return false;

    const characterFeet =
      this.character.y + this.character.height - this.character.offset.bottom;
    const enemyHead = enemy.y + enemy.offset.top;

    return characterFeet >= enemyHead - 30 && characterFeet <= enemyHead + 40;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);

    this.ctx.translate(-this.camera_x, 0);
    // --------- space for fixed objects --------
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
      self.checkOtherDirection();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = -mo.x;
  }

  flipImageBack(mo) {
    mo.x = -mo.x;
    this.ctx.restore();
  }

  checkOtherDirection() {
    if (this.keyboard.LEFT && !this.character.speed == 0)
      this.character.otherDirection = true;

    if (this.keyboard.RIGHT && !this.character.speed == 0)
      this.character.otherDirection = false;
  }

  checkDeathsAfterCollision() {
    if (this.level.enemies.length > 0) {
      this.checkEnemiesDeaths();
    }
  }

  checkEnemiesDeaths() {
    for (let enemy of this.level.enemies) {
      if (enemy.isDead()) {
        this.removeDeadEnemy(enemy);
        break;
      }
    }
  }

  removeDeadEnemy(enemy) {
    setTimeout(() => {
      this.level.enemies = this.level.enemies.filter((e) => e !== enemy);
    }, 150);
  }
}
