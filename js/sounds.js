const BOSS_DEAD_AUDIO = new Audio("../audio/boss-dead.mp3");
const BOSS_HURT_AUDIO = new Audio("../audio/boss-hurt.mp3");
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
const SLEEP_AUDIO = new Audio("../audio/sleeping.mp3");
const allAudio = [
  GAME_AUDIO,
  WALK_AUDIO,
  JUMP_AUDIO,
  HURT_AUDIO,
  CHICKEN_HURT_AUDIO,
  CHICK_HURT_AUDIO,
  BOSS_DEAD_AUDIO,
  BOSS_HURT_AUDIO,
  BOSS_ATTACK_AUDIO,
  BOSS_INTRO_AUDIO,
  GAME_WON_AUDIO,
  GAME_LOST_AUDIO,
  COIN_AUDIO,
  BOTTLE_COLLECT_AUDIO,
  BOTTLE_SPLASH_AUDIO,
  BOTTLE_THROW_AUDIO,
  SLEEP_AUDIO,
];
let soundMuted = localStorage.getItem("soundMuted") === "true";

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
  playSound(GAME_AUDIO, { timeout: false, time: 0, loop: true, volume: 0.1 });
}

function pauseGameMusic() {
  pauseSound(GAME_AUDIO);
}

function applyInitialMuteSetting() {
  const muteBtn = document.getElementById("muteBtn");
  if (soundMuted) {
    muteBtn.src = "./img/10_icons/muted.svg";
  } else {
    muteBtn.src = "./img/10_icons/unmuted.svg";
  }

  allAudio.forEach((audio) => {
    audio.muted = soundMuted;
    if (soundMuted) audio.pause();
  });
}

function toggleMute() {
  soundMuted = !soundMuted;
  localStorage.setItem("soundMuted", soundMuted);
  updateMuteIcon();
  updateAudioMuteState();

  if (!soundMuted) {
    playGameMusic();
  }
}

function updateMuteIcon() {
  const muteBtn = document.getElementById("muteBtn");
  muteBtn.src = soundMuted
    ? "./img/10_icons/muted.svg"
    : "./img/10_icons/unmuted.svg";
}

function updateAudioMuteState() {
  allAudio.forEach((audio) => {
    audio.muted = soundMuted;
    if (soundMuted) audio.pause();
  });
}
