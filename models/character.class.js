class Character extends MovableObject {
  height = 350;
  width = 180;
  speed = 20;
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
  world;

  constructor() {
    super().loadImage("../img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > -150) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 150;
    }, 1000 / 20);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 20);
  }

  jump() {}
}
