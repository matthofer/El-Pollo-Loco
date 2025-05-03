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
  endbossBar = new EndbossBar();
  throwableObjects = [];
  lastThrowTime = 0;
  collectedCoins = 0;
  collectedBottles = 0;
  gameOver = false;
  gameWon = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.gameOverImg = new Image();
    this.gameOverImg.src =
      "../img/9_intro_outro_screens/game_over/oh no you lost!.png";
    this.gameWonImg = new Image();
    this.gameWonImg.src =
      "../img/9_intro_outro_screens/game_over/game over!.png";
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.totalCoins = this.level.coins.length;
    this.totalBottles = this.level.bottles.length;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
      }
    });
  }

  run() {
    setInterval(() => {
      if (this.gameOver || this.gameWon) {
        return;
      }
      this.checkThrowObjects();
      this.checkCollisions();
      this.checkThrowableCollisions();
      this.checkDeathsAfterCollision();
      this.checkEndbossActivation();
      this.updateEndbossBarVisibility();
      this.collectCoins();
      this.collectBottles();
    }, 10);
  }

  checkThrowObjects() {
    const now = Date.now();
    const cooldown = 500;

    if (
      this.keyboard.D &&
      now - this.lastThrowTime > cooldown &&
      this.collectedBottles > 0
    ) {
      let direction = this.character.otherDirection ? -1 : 1;

      let bottle = new ThrowableObject(
        this.character.x + (direction === -1 ? -30 : 100),
        this.character.y + 100,
        this.character,
        direction
      );
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.lastThrowTime = now;

      let percentage = (this.collectedBottles / this.totalBottles) * 100;
      this.bottleBar.setPercentage(percentage);
    }

    this.throwableObjects = this.throwableObjects.filter(
      (obj) => !obj.markedForDeletion
    );
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        enemy.isColliding(this.character) &&
        !enemy.isDead() &&
        !this.character.isDead()
      ) {
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

  checkThrowableCollisions() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !bottle.hasHit) {
          bottle.hasHit = true;
          bottle.shatterBottle();

          if (enemy instanceof Endboss) {
            enemy.hitByBottle();
          } else {
            enemy.hit();
          }
        }
      });
    });
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
    this.addObjectsToMap(this.level.bottles);

    this.ctx.translate(-this.camera_x, 0);
    // --------- space for fixed objects --------
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    if (this.endbossBar.visible) {
      this.addToMap(this.endbossBar);
    }
    if (this.gameOver || this.gameWon) {
      this.showEndScreen();
    }

    let self = this;
    if (!this.gameOver && !this.gameWon) {
      requestAnimationFrame(function () {
        self.draw();
        self.checkOtherDirection();
      });
    }
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
    // mo.drawFrame(this.ctx);

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
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (enemy instanceof Endboss) {
        if (enemy.isDead() && enemy.deathAnimationFinished) {
          this.gameWon = true;
        }
        return true;
      } else {
        if (enemy.isDead() && enemy.deathAnimationFinished) {
          return false;
        }
        return true;
      }
    });

    if (this.character.isDead() && this.character.deathAnimationFinished) {
      this.gameOver = true;
    }
  }

  checkEndbossActivation() {
    const boss = this.level.enemies.find((e) => e instanceof Endboss);
    if (boss && !boss.hadFirstContact) {
      const distance = Math.abs(this.character.x - boss.x);
      if (distance < 600) {
        boss.hadFirstContact = true;
        boss.startAlert();
      }
    }
  }

  updateEndbossBarVisibility() {
    const endboss = this.level.enemies.find((e) => e instanceof Endboss);

    if (!endboss) {
      this.endbossBar.visible = false;
      return;
    }

    const screenLeft = -this.camera_x;
    const screenRight = screenLeft + this.canvas.width;

    if (endboss.x + endboss.width > screenLeft && endboss.x < screenRight) {
      this.endbossBar.visible = true;
    } else {
      this.endbossBar.visible = false;
    }
  }

  collectCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        coin.markedForDeletion = true;
        this.collectedCoins++;
        let percentage = (this.collectedCoins / this.totalCoins) * 100;
        this.coinBar.setPercentage(percentage);
        playSound(COIN_AUDIO);
      }
    });

    this.level.coins = this.level.coins.filter((c) => !c.markedForDeletion);
  }

  collectBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        bottle.markedForDeletion = true;
        this.collectedBottles++;
        let percentage = (this.collectedBottles / this.totalBottles) * 100;
        this.bottleBar.setPercentage(percentage);
        playSound(BOTTLE_COLLECT_AUDIO);
      }
    });

    this.level.bottles = this.level.bottles.filter((b) => !b.markedForDeletion);
  }

  showEndScreen() {
    if (this.character.isDead() && this.character.deathAnimationFinished) {
      this.gameOver = true;
      showEndScreen(false);
      return;
    }

    this.level.enemies.forEach((enemy) => {
      if (
        enemy instanceof Endboss &&
        enemy.isDead() &&
        enemy.deathAnimationFinished
      ) {
        this.gameWon = true;
        showEndScreen(true);
      }
    });
  }
}
