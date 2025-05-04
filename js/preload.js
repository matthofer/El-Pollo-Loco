function loadGame() {
  const imagePaths = collectImagePaths();
  const soundPaths = collectSoundPaths();

  const totalAssets = imagePaths.length + soundPaths.length;
  const progress = {
    loaded: 0,
    total: totalAssets,
    done: false,
  };

  return new Promise((resolve) => {
    progress.resolve = resolve;
    preloadImages(imagePaths, progress);
    preloadSounds(soundPaths, progress);
  });
}

function collectImagePaths() {
  return [
    "../img/5_background/layers/1_first_layer/1.png",
    "../img/5_background/layers/1_first_layer/2.png",
    "../img/5_background/layers/2_second_layer/1.png",
    "../img/5_background/layers/2_second_layer/2.png",
    "../img/5_background/layers/3_third_layer/1.png",
    "../img/5_background/layers/3_third_layer/2.png",
    "../img/5_background/layers/air.png",
    "../img/5_background/layers/4_clouds/1.png",
    "../img/5_background/layers/4_clouds/2.png",
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-26.png",
    "../img/2_character_pepe/3_jump/J-35.png",
    "../img/2_character_pepe/3_jump/J-36.png",
    "../img/2_character_pepe/3_jump/J-37.png",
    "../img/2_character_pepe/4_hurt/H-41.png",
    "../img/2_character_pepe/4_hurt/H-42.png",
    "../img/2_character_pepe/4_hurt/H-43.png",
    "../img/2_character_pepe/5_dead/D-51.png",
    "../img/2_character_pepe/5_dead/D-52.png",
    "../img/2_character_pepe/5_dead/D-53.png",
    "../img/2_character_pepe/5_dead/D-54.png",
    "../img/2_character_pepe/5_dead/D-55.png",
    "../img/2_character_pepe/5_dead/D-56.png",
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
    "../img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    "../img/3_enemies_chicken/chicken_small/2_dead/dead.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    "../img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    "../img/7_statusbars/2_statusbar_endboss/0.png",
    "../img/7_statusbars/2_statusbar_endboss/20.png",
    "../img/7_statusbars/2_statusbar_endboss/40.png",
    "../img/7_statusbars/2_statusbar_endboss/60.png",
    "../img/7_statusbars/2_statusbar_endboss/80.png",
    "../img/7_statusbars/2_statusbar_endboss/100.png",
    "../img/4_enemie_boss_chicken/1_walk/G1.png",
    "../img/4_enemie_boss_chicken/1_walk/G2.png",
    "../img/4_enemie_boss_chicken/1_walk/G3.png",
    "../img/4_enemie_boss_chicken/1_walk/G4.png",
    "../img/4_enemie_boss_chicken/2_alert/G5.png",
    "../img/4_enemie_boss_chicken/2_alert/G6.png",
    "../img/4_enemie_boss_chicken/2_alert/G7.png",
    "../img/4_enemie_boss_chicken/2_alert/G8.png",
    "../img/4_enemie_boss_chicken/2_alert/G9.png",
    "../img/4_enemie_boss_chicken/2_alert/G10.png",
    "../img/4_enemie_boss_chicken/2_alert/G11.png",
    "../img/4_enemie_boss_chicken/2_alert/G12.png",
    "../img/4_enemie_boss_chicken/3_attack/G16.png",
    "../img/4_enemie_boss_chicken/3_attack/G17.png",
    "../img/4_enemie_boss_chicken/3_attack/G18.png",
    "../img/4_enemie_boss_chicken/3_attack/G19.png",
    "../img/4_enemie_boss_chicken/3_attack/G20.png",
    "../img/4_enemie_boss_chicken/4_hurt/G21.png",
    "../img/4_enemie_boss_chicken/4_hurt/G22.png",
    "../img/4_enemie_boss_chicken/4_hurt/G23.png",
    "../img/4_enemie_boss_chicken/5_dead/G24.png",
    "../img/4_enemie_boss_chicken/5_dead/G25.png",
    "../img/4_enemie_boss_chicken/5_dead/G26.png",
    "../img/8_coin/coin_1.png",
    "../img/8_coin/coin_2.png",
    "../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    "../img/9_intro_outro_screens/game_over/game over!.png",
    "../img/9_intro_outro_screens/game_over/oh no you lost!.png",
    "../img/9_intro_outro_screens/start/startscreen_2.png",
    "../img/10_icons/exit.svg",
    "../img/10_icons/left.svg",
    "../img/10_icons/muted.svg",
    "../img/10_icons/unmuted.svg",
    "../img/10_icons/right.svg",
    "../img/10_icons/up.svg",
    "../img/10_icons/bottle-icon.png",
  ];
}

function collectSoundPaths() {
  return [
    "../audio/jump.mp3",
    "../audio/hurt.mp3",
    "../audio/walk.mp3",
    "../audio/throw.mp3",
    "../audio/splash.mp3",
    "../audio/chicken-hurt.mp3",
    "../audio/chick-hurt.mp3",
    "../audio/boss-hurt.mp3",
    "../audio/boss-dead.mp3",
    "../audio/boss-intro.mp3",
    "../audio/boss-attack.mp3",
    "../audio/game-lost.mp3",
    "../audio/game-won.mp3",
    "../audio/game.mp3",
    "../audio/coin.mp3",
    "../audio/bottle-collect.mp3",
  ];
}

function preloadImages(paths, progress) {
  paths.forEach((path) => loadSingleImage(path, progress));
}

function loadSingleImage(path, progress) {
  const img = new Image();
  img.src = path;
  img.onload = () => handleLoad(progress);
  img.onerror = () => handleLoad(progress);
}

function preloadSounds(paths, progress) {
  paths.forEach((path) => loadSingleSound(path, progress));
}

function loadSingleSound(path, progress) {
  const audio = new Audio();
  audio.src = path;
  audio.oncanplaythrough = () => handleLoad(progress);
  audio.onerror = () => handleLoad(progress);
}

function handleLoad(progress) {
  progress.loaded++;
  updateProgress(progress.loaded, progress.total);

  if (progress.loaded === progress.total && !progress.done) {
    progress.done = true;
    progress.resolve();
  }
}
