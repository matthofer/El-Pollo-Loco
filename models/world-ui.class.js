class WorldUI {
    constructor(world) {
      this.world = world;
    }
  
    /**
     * Draws the entire game scene, including movable objects and UI.
     */
    draw() {
      const ctx = this.world.ctx;
      const canvas = this.world.canvas;
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(this.world.camera_x, 0);
      this.drawMovableObjects();
      ctx.translate(-this.world.camera_x, 0);
      this.drawFixedUI();
      this.handleEndScreenDraw();
  
      if (!this.world.gameOver && !this.world.gameWon) {
        requestAnimationFrame(() => {
          this.draw();
          this.world.checkOtherDirection();
        });
      }
    }
  
    /**
     * Draws all movable objects in the world.
     */
    drawMovableObjects() {
      this.world.addObjectsToMap(this.world.level.backgroundObjects);
      this.world.addObjectsToMap(this.world.level.clouds);
      this.world.addToMap(this.world.character);
      this.world.addObjectsToMap(this.world.level.enemies);
      this.world.addObjectsToMap(this.world.throwableObjects);
      this.world.addObjectsToMap(this.world.level.coins);
      this.world.addObjectsToMap(this.world.level.bottles);
    }
  
    /**
     * Draws all fixed UI elements like status bars.
     */
    drawFixedUI() {
      this.world.addToMap(this.world.statusBar);
      this.world.addToMap(this.world.bottleBar);
      this.world.addToMap(this.world.coinBar);
      if (this.world.endbossBar.visible) {
        this.world.addToMap(this.world.endbossBar);
      }
    }
  
    /**
     * Handles drawing the end screen if the game is over or won.
     */
    handleEndScreenDraw() {
      if (this.world.gameOver || this.world.gameWon) {
        this.showEndScreen();
      }
    }
  
    /**
     * Displays the end screen based on game state.
     */
    showEndScreen() {
      if (
        this.world.character.isDead() &&
        this.world.character.deathAnimationFinished
      ) {
        this.world.gameOver = true;
        showEndScreen(false);
        return;
      }
      this.world.level.enemies.forEach((enemy) => this.checkEndbossWin(enemy));
    }
  
    /**
     * Checks if the endboss is defeated and triggers win screen.
     * @param {MovableObject} enemy - The enemy to check.
     */
    checkEndbossWin(enemy) {
      if (
        enemy instanceof Endboss &&
        enemy.isDead() &&
        enemy.deathAnimationFinished
      ) {
        this.world.gameWon = true;
        showEndScreen(true);
      }
    }
  }