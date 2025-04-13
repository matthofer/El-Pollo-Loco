let level1;

function initLevel() {
  level1 = new Level(
    (enemies = [
      new Chicken(),
      new Chick(),
      new Chicken(),
      new Chick(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chick(),
      new Chicken(),
      new Chick(),
      new Chicken(),
      new Chick(),
      new Endboss(),
    ]),

    (clouds = [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
    ]),

    (backgroundObjects = [
      new BackgroundObject("img/5_background/layers/air.png", -1079),
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 1079),
      new BackgroundObject("img/5_background/layers/air.png", 2158),
      new BackgroundObject("img/5_background/layers/air.png", 3237),
      new BackgroundObject("img/5_background/layers/air.png", 4316),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        -1080
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -1080
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        -1080
      ),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 1080),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        1080
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 1080),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        1080 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        1080 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        1080 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        1080 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        1080 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        1080 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        1080 * 4
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        1080 * 4
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        1080 * 4
      ),
    ])
  );
}
