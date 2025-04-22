class Bottle extends MovableObject {
  x =
    440 + Math.floor(Math.random() * 4200) + Math.floor(Math.random() * 15 + 6);
  y = 445;
  width = 100;
  height = 90;
  offset = {
    top: 20,
    bottom: 10,
    left: 40,
    right: 25,
  };

  IMAGES_BOTTLE = [
    "../img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "../img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_BOTTLE[Math.round(Math.random())]);
  }
}
