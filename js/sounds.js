const BOSS_DEAD_AUDIO = new Audio("../audio/boss-dead.mp3");
const BOSS_ATTACK_AUDIO = new Audio("../audio/boss-attack.mp3");
const BOSS_INTRO_AUDIO = new Audio("../audio/boss-intro.mp3");
const BOTTLE_COLLECT_AUDIO = new Audio("../audio/bottle-collect.mp3");
const BOTTLE_SPLASH_AUDIO = new Audio("../audio/splash.mp3");
const BOTTLE_THROW_AUDIO = new Audio("../audio/throw.mp3");
const CHICKEN_HURT_AUDIO = new Audio("../audio/chicken-hurt.mp3");
const CHICK_HURT_AUDIO = new Audio("../audio/chick-hurt.mp3");
const COIN_AUDIO = new Audio("../audio/coin.mp3");
const GAME_LOST_AUDIO = new Audio("../audio/game-lost.mp3");
const GAME_WON_AUDIO = new Audio("../audio/game-won.mp3");
const GAME_AUDIO = new Audio("../audio/game.mp3");
const HURT_AUDIO = new Audio("../audio/hurt.mp3");
const JUMP_AUDIO = new Audio("../audio/jump.mp3");
const WALK_AUDIO = new Audio("../audio/walk.mp3");
let soundMuted = false;

function playSound(
  audio,
  { timeout = false, time = 0, loop = false, volume = 1.0 } = {}
) {
  if (!audio || soundMuted) return;

  audio.volume = volume;

  if (loop) {
    audio.loop = true;
    audio.play();
  } else if (timeout) {
    audio.play();
    setTimeout(() => audio.pause(), time);
  } else {
    audio.currentTime = 0;
    audio.play();
  }
}

function pauseSound(audio) {
  audio.pause();
}

function playGameMusic() {
  playSound(GAME_AUDIO, { timeout: false, time: 0, loop: true, volume: 0.2 });
}

function pauseGameMusic() {
  pauseSound(GAME_AUDIO);
}
