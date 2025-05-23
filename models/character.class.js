class Character extends MovableObject {
  height = 350;
  width = 180;
  speed = 12;
  y = 0;
  offset = {
    top: 155,
    bottom: 13,
    left: 35,
    right: 50,
  };
  afterJump = false;
  gettingHit = false;
  isJumping = false;
  jumpAnimationInterval;
  lastActionTime = Date.now();
  isLongIdle = false;
  deathAnimationFinished = false;
  isWalkingSoundPlaying = false;
  isSleepingSoundPlaying = false;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGE_JUMPING_UP = "img/2_character_pepe/3_jump/J-35.png";
  IMAGE_JUMPING_MID = "img/2_character_pepe/3_jump/J-36.png";
  IMAGE_JUMPING_DOWN = "img/2_character_pepe/3_jump/J-37.png";
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  world;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages([
      this.IMAGE_JUMPING_UP,
      this.IMAGE_JUMPING_MID,
      this.IMAGE_JUMPING_DOWN,
    ]);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the core animation handlers.
   */
  animate() {
    this.handleMovement();
    this.handleAnimation();
    this.handleIdle();
  }

  /**
   * Handles movement input and updates camera position.
   */
  handleMovement() {
    intervalManager.register(
      setInterval(() => {
        if (this.isDead()) return;
        this.handleDirectionalInput();
        this.handleJumpInput();
        this.handleActionTimestamp();
        this.world.camera_x = -this.x + 250;
      }, 20)
    );
  }

  /**
   * Checks directional input and moves character accordingly.
   */
  handleDirectionalInput() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (this.world.keyboard.LEFT && this.x > -150) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /**
   * Checks if jump key is pressed and triggers jump if on ground.
   */
  handleJumpInput() {
    if (
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      !this.isAboveGround()
    ) {
      this.jump();
    }
  }

  /**
   * Updates last action timestamp if movement/interaction keys are pressed.
   */
  handleActionTimestamp() {
    if (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.SPACE ||
      this.world.keyboard.D ||
      this.world.keyboard.UP
    ) {
      this.lastActionTime = Date.now();
    }
  }

  /**
   * Starts the character's animation state evaluation loop.
   */
  handleAnimation() {
    intervalManager.register(
      setInterval(() => this.evaluateAnimationState(), 80)
    );
  }

  /**
   * Evaluates the character's animation state.
   */
  evaluateAnimationState() {
    const isMoving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    const onGround = !this.isAboveGround();

    if (this.isDead()) this.playDeathAnimation();
    else if (this.gettingHit || this.isHurt())
      this.playAnimation(this.IMAGES_HURT);
    else if (!onGround) this.handleJumping();
    else this.handleWalking(isMoving);
  }

  /**
   * Handles the character's jumping animation and sound.
   */
  handleJumping() {
    if (this.speedY > 0) {
      this.img = this.imageCache[this.IMAGE_JUMPING_UP];
      playSound(JUMP_AUDIO, { volume: 0.8, timeout: true, time: 440 });
    } else if (this.speedY < 25 && this.speedY > -25)
      this.img = this.imageCache[this.IMAGE_JUMPING_MID];
    else this.img = this.imageCache[this.IMAGE_JUMPING_DOWN];

    this.stopWalkingSound();
    this.afterJump = true;
  }

  /**
   * Starts or stops walking animation and walking sound.
   * @param {boolean} isMoving - true if the character is moving.
   */
  handleWalking(isMoving) {
    if (isMoving) this.startWalking();
    else this.stopWalking();
    this.afterJump = false;
  }

  /**
   * Starts walking animation and sound.
   */
  startWalking() {
    this.playAnimation(this.IMAGES_WALKING);
    if (!this.isWalkingSoundPlaying) {
      this.isWalkingSoundPlaying = true;
      this.walkSoundInterval = setInterval(() => this.playWalkSound(), 350);
      intervalManager.register(this.walkSoundInterval);
    }
  }

  /**
   * Stops walking sound.
   */
  stopWalking() {
    if (this.isWalkingSoundPlaying) this.stopWalkingSound();
  }

  /**
   * Clears walking sound interval and resets sound.
   */
  stopWalkingSound() {
    clearInterval(this.walkSoundInterval);
    pauseSound(WALK_AUDIO);
    WALK_AUDIO.currentTime = 0;
    this.isWalkingSoundPlaying = false;
  }

  /**
   * Plays walking sound if character is moving and on ground.
   */
  playWalkSound() {
    if (
      (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
      !this.isAboveGround() &&
      !this.isDead()
    ) {
      playSound(WALK_AUDIO, { volume: 0.7 });
    }
  }

  /**
   * Handles the idle animation logic based on player inactivity.
   */
  handleIdle() {
    intervalManager.register(
      setInterval(() => {
        if (
          !this.world.keyboard.RIGHT &&
          !this.world.keyboard.LEFT &&
          !this.world.keyboard.SPACE &&
          !this.world.keyboard.D &&
          !this.isDead() &&
          !this.isAboveGround() &&
          !this.isHurt()
        ) {
          this.playIdleAnimation();
        }
      }, 200)
    );
  }

  /**
   * Triggers short or long idle animation depending on inactivity duration.
   */
  playIdleAnimation() {
    const now = Date.now();
    const idleTooLong = now - this.lastActionTime > 12000;

    if (idleTooLong !== this.isLongIdle) {
      this.isLongIdle = idleTooLong;
      this.updateIdleState();
    }

    const images = this.isLongIdle ? this.IMAGES_LONG_IDLE : this.IMAGES_IDLE;
    this.playAnimation(images);
  }

  /**
   * Updates audio state depending on idle status.
   */
  updateIdleState() {
    if (
      this.isLongIdle &&
      !this.sleepingSoundPlaying &&
      !this.isDead() &&
      !this.world.gameWon
    ) {
      playSound(SLEEP_AUDIO, { loop: true, volume: 0.1 });
      this.sleepingSoundPlaying = true;
    } else if (!this.isLongIdle && this.sleepingSoundPlaying) {
      pauseSound(SLEEP_AUDIO);
      SLEEP_AUDIO.currentTime = 0;
      this.sleepingSoundPlaying = false;
    }
  }

  /**
   * Reduces energy on hit and temporarily sets character into a hit state.
   */
  takingHit() {
    if (!this.gettingHit) {
      this.hit();
      this.gettingHit = true;
      this.speed = 6;
      playSound(HURT_AUDIO, 0.8);
      setTimeout(() => {
        this.gettingHit = false;
        this.speed = 12;
      }, 500);
    }
  }

  /**
   * Triggers the death animation sequence.
   */
  playDeathAnimation() {
    if (this.deathAnimationPlaying) return;

    this.deathAnimationPlaying = true;
    this.speedY = 48;
    clearInterval(this.walkInterval);
    clearInterval(this.hurtInterval);

    this.startDeathAnimationFrames();
    playSound(GAME_LOST_AUDIO);
    pauseSound(SLEEP_AUDIO);
    SLEEP_AUDIO.currentTime = 0;
  }

  /**
   * Plays each frame of the death animation and marks it as finished.
   */
  startDeathAnimationFrames() {
    let frame = 0;
    this.deathInterval = setInterval(() => {
      if (frame < this.IMAGES_DEAD.length) {
        this.img = this.imageCache[this.IMAGES_DEAD[frame]];
        frame++;
      } else {
        clearInterval(this.deathInterval);
        this.deathAnimationFinished = true;
        this.img = this.imageCache[this.IMAGES_DEAD.at(-1)];
      }
    }, 100);
    intervalManager.register(this.deathInterval);
  }
}
