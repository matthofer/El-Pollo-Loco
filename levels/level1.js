let level1;

/**
 * Initializes level1 with all enemies, clouds, background, coins, and bottles.
 */
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
      new Chick(),
      new Chicken(),
      new Chicken(),
      new Chick(),
      new Chick(),
      new Chicken(),
      new Chicken(),
      new Chick(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chick(),
      new Chicken(),
      new Endboss(),
    ]),
    (clouds = [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
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
      new BackgroundObject("img/5_background/layers/air.png", 5395),
      new BackgroundObject("img/5_background/layers/air.png", 6474),
      new BackgroundObject("img/5_background/layers/air.png", 7553),
      new BackgroundObject("img/5_background/layers/air.png", 8632),
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
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        1080 * 5
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        1080 * 5
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        1080 * 5
      ),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        1080 * 6
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        1080 * 6
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        1080 * 6
      ),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        1080 * 7
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        1080 * 7
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        1080 * 7
      ),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        1080 * 8
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        1080 * 8
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        1080 * 8
      ),
    ]),
    (coins = [
      new Coin(200, 150),
      new Coin(250, 100),
      new Coin(300, 150),
      new Coin(1000, 100),
      new Coin(1050, 150),
      new Coin(1100, 150),
      new Coin(1150, 100),
      new Coin(1450, 190),
      new Coin(1800, 150),
      new Coin(1850, 80),
      new Coin(2400, 150),
      new Coin(2450, 100),
      new Coin(2500, 150),
      new Coin(2750, 50),
      new Coin(3100, 150),
      new Coin(3150, 80),
      new Coin(3450, 150),
      new Coin(3550, 100),
      new Coin(3600, 150),
      new Coin(4000, 50),
      new Coin(4200, 150),
      new Coin(4250, 100),
      new Coin(4300, 150),
      new Coin(4600, 80),
      new Coin(4650, 150),
      new Coin(4700, 150),
      new Coin(4750, 100),
      new Coin(5100, 190),
      new Coin(5350, 150),
      new Coin(5400, 80),
      new Coin(5600, 100),
      new Coin(5650, 150),
      new Coin(5700, 150),
      new Coin(6000, 50),
      new Coin(6300, 150),
      new Coin(6350, 80),
      new Coin(6600, 150),
      new Coin(6650, 100),
      new Coin(6700, 150),
    ]),
    (bottles = [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
    ])
  );
}
