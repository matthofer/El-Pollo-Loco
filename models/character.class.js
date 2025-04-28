class Character extends MovableObject {
  height = 350;
  width = 180;
  speed = 12;
  y = 0;
  offset = {
    top: 130,
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
  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_IDLE = [
    "../img/2_character_pepe/1_idle/idle/I-1.png",
    "../img/2_character_pepe/1_idle/idle/I-2.png",
    "../img/2_character_pepe/1_idle/idle/I-3.png",
    "../img/2_character_pepe/1_idle/idle/I-4.png",
    "../img/2_character_pepe/1_idle/idle/I-5.png",
    "../img/2_character_pepe/1_idle/idle/I-6.png",
    "../img/2_character_pepe/1_idle/idle/I-7.png",
    "../img/2_character_pepe/1_idle/idle/I-8.png",
    "../img/2_character_pepe/1_idle/idle/I-9.png",
    "../img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "../img/2_character_pepe/1_idle/long_idle/I-11.png",
    "../img/2_character_pepe/1_idle/long_idle/I-12.png",
    "../img/2_character_pepe/1_idle/long_idle/I-13.png",
    "../img/2_character_pepe/1_idle/long_idle/I-14.png",
    "../img/2_character_pepe/1_idle/long_idle/I-15.png",
    "../img/2_character_pepe/1_idle/long_idle/I-16.png",
    "../img/2_character_pepe/1_idle/long_idle/I-17.png",
    "../img/2_character_pepe/1_idle/long_idle/I-18.png",
    "../img/2_character_pepe/1_idle/long_idle/I-19.png",
    "../img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGE_JUMPING_UP = "../img/2_character_pepe/3_jump/J-35.png";
  IMAGE_JUMPING_MID = "../img/2_character_pepe/3_jump/J-37.png";
  IMAGE_JUMPING_DOWN = "../img/2_character_pepe/3_jump/J-38.png";
  IMAGES_DEAD = [
    "../img/2_character_pepe/5_dead/D-51.png",
    "../img/2_character_pepe/5_dead/D-52.png",
    "../img/2_character_pepe/5_dead/D-53.png",
    "../img/2_character_pepe/5_dead/D-54.png",
    "../img/2_character_pepe/5_dead/D-55.png",
    "../img/2_character_pepe/5_dead/D-56.png",
  ];
  IMAGES_HURT = [
    "../img/2_character_pepe/4_hurt/H-41.png",
    "../img/2_character_pepe/4_hurt/H-42.png",
    "../img/2_character_pepe/4_hurt/H-43.png",
  ];

  world;

  constructor() {
    super().loadImage("../img/2_character_pepe/1_idle/idle/I-1.png");
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

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        return;
      }
      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x &&
        !this.isDead()
      ) {
        this.moveRight();
        this.otherDirection = false;
        this.lastActionTime = Date.now();
      }

      if (this.world.keyboard.LEFT && this.x > -150 && !this.isDead()) {
        this.moveLeft();
        this.otherDirection = true;
        this.lastActionTime = Date.now();
      }

      if (
        this.world.keyboard.SPACE &&
        !this.isAboveGround() &&
        !this.isDead()
      ) {
        this.jump();
        this.lastActionTime = Date.now();
      }

      if (this.world.keyboard.D && !this.isDead()) {
        this.lastActionTime = Date.now();
      }

      this.world.camera_x = -this.x + 150;
    }, 20);

    setInterval(() => {
      if (this.isDead()) {
        this.playDeathAnimation();
      } else if (this.gettingHit || this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        if (this.speedY > 0) {
          this.img = this.imageCache[this.IMAGE_JUMPING_UP];
        } else if (this.speedY < 25 && this.speedY > -25) {
          this.img = this.imageCache[this.IMAGE_JUMPING_MID];
        } else {
          this.img = this.imageCache[this.IMAGE_JUMPING_DOWN];
        }
        this.afterJump = true;
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
        this.afterJump = false;
      }
    }, 80);

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
        const now = Date.now();
        if (now - this.lastActionTime > 15000) {
          this.playAnimation(this.IMAGES_LONG_IDLE);
          this.isLongIdle = true;
        } else {
          this.playAnimation(this.IMAGES_IDLE);
          this.isLongIdle = false;
        }
      }
    }, 200);
  }

  takingHit() {
    if (!this.gettingHit) {
      this.hit();
      this.gettingHit = true;
      setTimeout(() => {
        this.gettingHit = false;
      }, 500);
    }
  }

  playDeathAnimation() {
    if (this.deathAnimationPlaying) {
      return;
    }
    this.deathAnimationPlaying = true;

    this.speedY = 48;

    let frame = 0;
    clearInterval(this.walkInterval);
    clearInterval(this.hurtInterval);

    this.deathInterval = setInterval(() => {
      if (frame < this.IMAGES_DEAD.length) {
        this.img = this.imageCache[this.IMAGES_DEAD[frame]];
        frame++;
      } else {
        clearInterval(this.deathInterval);
        this.deathAnimationFinished = true;
        this.img =
          this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
      }
    }, 100);
  }
}
