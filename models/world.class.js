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
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Links character and enemies to this world instance.
   */
  setWorld() {
    this.character.world = this;
    this.totalCoins = this.level.coins.length;
    this.totalBottles = this.level.bottles.length;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Starts the main game loop (called every 10ms).
   */
  run() {
    intervalManager.register(setInterval(() => this.update(), 10));
  }

  /**
   * Updates the world state every frame.
   */
  update() {
    if (this.gameOver || this.gameWon) return;

    this.checkThrowObjects();
    this.checkCollisions();
    this.checkThrowableCollisions();
    this.checkDeathsAfterCollision();
    this.checkEndbossActivation();
    this.updateEndbossBarVisibility();
    this.collectCoins();
    this.collectBottles();
  }

  /**
   * Manages bottle throwing logic and removes used bottles.
   */
  checkThrowObjects() {
    this.handleBottleThrow();
    this.cleanupThrowables();
  }

  /**
   * Initiates bottle throwing if allowed and updates UI accordingly.
   */
  handleBottleThrow() {
    const now = Date.now();
    const cooldown = 800;

    if (this.canThrowBottle(now, cooldown)) {
      this.createAndThrowBottle();
      this.updateBottleBar();
    }
  }

  /**
   * Checks whether a bottle can be thrown based on input and cooldown.
   * @param {number} now - Current timestamp.
   * @param {number} cooldown - Cooldown duration in ms.
   * @returns {boolean} True if bottle can be thrown.
   */
  canThrowBottle(now, cooldown) {
    return (
      this.keyboard.D &&
      now - this.lastThrowTime > cooldown &&
      this.collectedBottles > 0
    );
  }

  /**
   * Creates and throws a new bottle object in the direction the character is facing.
   */
  createAndThrowBottle() {
    const direction = this.character.otherDirection ? -1 : 1;
    const bottle = new ThrowableObject(
      this.character.x + (direction === -1 ? -30 : 100),
      this.character.y + 100,
      this.character,
      direction
    );
    this.throwableObjects.push(bottle);
    this.collectedBottles--;
    this.lastThrowTime = Date.now();
  }

  /**
   * Updates the bottle status bar based on collected bottles.
   */
  updateBottleBar() {
    const percentage = (this.collectedBottles / this.totalBottles) * 100;
    this.bottleBar.setPercentage(percentage);
  }

  /**
   * Removes bottles marked for deletion from the array.
   */
  cleanupThrowables() {
    this.throwableObjects = this.throwableObjects.filter(
      (obj) => !obj.markedForDeletion
    );
  }

  /**
   * Checks collisions between character and all enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => this.handleEnemyCollision(enemy));
  }

  /**
   * Handles a single enemy collision with the character.
   * @param {MovableObject} enemy - The enemy to check against.
   */
  handleEnemyCollision(enemy) {
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
        this.handleCharacterDamage(enemy);
      }
    }
  }

  /**
   * Applies damage to the character and plays hurt animation.
   * @param {MovableObject} enemy - The enemy that collided with the character.
   */
  handleCharacterDamage(enemy) {
    if (!this.character.isHurt() && !this.character.gettingHit) {
      if (enemy instanceof Endboss) enemy.startAttackAnimation();

      this.character.takingHit();
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  /**
   * Determines if collision occurred from above the enemy.
   * @param {MovableObject} enemy - The enemy object to compare with.
   * @returns {boolean} - True if character is above enemy head.
   */
  isCollisionFromAbove(enemy) {
    if (!this.character.isColliding(enemy)) return false;

    const characterFeet =
      this.character.y + this.character.height - this.character.offset.bottom;
    const enemyHead = enemy.y + enemy.offset.top;

    return characterFeet >= enemyHead - 30 && characterFeet <= enemyHead + 40;
  }

  /**
   * Iterates over bottles and enemies to check for collisions.
   */
  checkThrowableCollisions() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        this.checkBottleEnemyCollision(bottle, enemy);
      });
    });
  }

  /**
   * Handles the effects when a bottle collides with an enemy.
   * @param {ThrowableObject} bottle - The thrown bottle.
   * @param {MovableObject} enemy - The enemy being hit.
   */
  checkBottleEnemyCollision(bottle, enemy) {
    if (bottle.isColliding(enemy) && !bottle.hasHit) {
      bottle.hasHit = true;
      bottle.shatterBottle();

      if (enemy instanceof Endboss) {
        enemy.hitByBottle();
      } else {
        enemy.hit();
      }
    }
  }

  /**
   * Clears and redraws the game canvas including movable and fixed objects.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawMovableObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawFixedObjects();
    this.handleEndScreenDraw();

    if (!this.gameOver && !this.gameWon) {
      requestAnimationFrame(() => {
        this.draw();
        this.checkOtherDirection();
      });
    }
  }

  /**
   * Draws movable game elements.
   */
  drawMovableObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
  }

  /**
   * Draws static UI elements like health bars.
   */
  drawFixedObjects() {
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    if (this.endbossBar.visible) this.addToMap(this.endbossBar);
  }

  /**
   * Shows the end screen when the game is over or won.
   */
  handleEndScreenDraw() {
    if (this.gameOver || this.gameWon) {
      this.showEndScreen();
    }
  }

  /**
   * Adds an array of objects to the canvas.
   * @param {DrawableObject[]} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((obj) => this.addToMap(obj));
  }

  /**
   * Adds a single object to the canvas, applying mirroring if needed.
   * @param {DrawableObject} mo
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Flips a canvas object horizontally.
   * @param {DrawableObject} mo
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = -mo.x;
  }

  /**
   * Restores canvas after horizontal flip.
   * @param {DrawableObject} mo
   */
  flipImageBack(mo) {
    mo.x = -mo.x;
    this.ctx.restore();
  }

  /**
   * Updates character orientation based on keyboard direction input.
   */
  checkOtherDirection() {
    if (this.keyboard.LEFT && !this.character.speed == 0)
      this.character.otherDirection = true;

    if (this.keyboard.RIGHT && !this.character.speed == 0)
      this.character.otherDirection = false;
  }

  /**
   * Removes dead enemies or sets win/lose state if needed.
   */
  checkDeathsAfterCollision() {
    this.level.enemies = this.level.enemies.filter((enemy) =>
      this.handleEnemyDeath(enemy)
    );
    if (this.character.isDead() && this.character.deathAnimationFinished) {
      this.gameOver = true;
    }
  }

  /**
   * Handles cleanup or triggers win condition when enemy dies.
   * @param {MovableObject} enemy
   * @returns {boolean} Whether to keep the enemy.
   */
  handleEnemyDeath(enemy) {
    if (enemy instanceof Endboss) {
      if (enemy.isDead() && enemy.deathAnimationFinished) {
        this.gameWon = true;
        playSound(GAME_WON_AUDIO);
      }
      return true;
    }
    return !(enemy.isDead() && enemy.deathAnimationFinished);
  }

  /**
   * Triggers boss alert if player gets close enough.
   */
  checkEndbossActivation() {
    const boss = this.level.enemies.find((e) => e instanceof Endboss);
    if (boss && !boss.hadFirstContact) {
      const distance = Math.abs(this.character.x - boss.x);
      if (distance < 600) {
        boss.hadFirstContact = true;
        playSound(BOSS_INTRO_AUDIO);
        boss.startAlert();
      }
    }
  }

  /**
   * Shows/hides the endboss health bar depending on endboss visibility.
   */
  updateEndbossBarVisibility() {
    const endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (!endboss) {
      this.endbossBar.visible = false;
      return;
    }
    const screenLeft = -this.camera_x;
    const screenRight = screenLeft + this.canvas.width;
    this.endbossBar.visible =
      endboss.x + endboss.width > screenLeft && endboss.x < screenRight;
  }

  /**
   * Collects coins when the character touches them.
   */
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

  /**
   * Collects bottles when the character touches them.
   */
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

  /**
   * Displays the correct end screen based on win/loss condition.
   */
  showEndScreen() {
    if (this.character.isDead() && this.character.deathAnimationFinished) {
      this.gameOver = true;
      showEndScreen(false);
      return;
    }

    this.level.enemies.forEach((enemy) => this.checkEndbossWin(enemy));
  }

  /**
   * Triggers end screen if endboss is dead and animation finished.
   * @param {MovableObject} enemy
   */
  checkEndbossWin(enemy) {
    if (
      enemy instanceof Endboss &&
      enemy.isDead() &&
      enemy.deathAnimationFinished
    ) {
      this.gameWon = true;
      showEndScreen(true);
    }
  }
}
