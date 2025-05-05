const BOSS_DEAD_AUDIO = new Audio("audio/boss-dead.mp3");
const BOSS_HURT_AUDIO = new Audio("audio/boss-hurt.mp3");
const BOSS_ATTACK_AUDIO = new Audio("audio/boss-attack.mp3");
const BOSS_INTRO_AUDIO = new Audio("audio/boss-intro.mp3");
const BOTTLE_COLLECT_AUDIO = new Audio("audio/bottle-collect.mp3");
const BOTTLE_SPLASH_AUDIO = new Audio("audio/splash.mp3");
const BOTTLE_THROW_AUDIO = new Audio("audio/throw.mp3");
const CHICKEN_HURT_AUDIO = new Audio("audio/chicken-hurt.mp3");
const CHICK_HURT_AUDIO = new Audio("audio/chick-hurt.mp3");
const COIN_AUDIO = new Audio("audio/coin.mp3");
const GAME_LOST_AUDIO = new Audio("audio/game-lost.mp3");
const GAME_WON_AUDIO = new Audio("audio/game-won.mp3");
const GAME_AUDIO = new Audio("audio/game.mp3");
const HURT_AUDIO = new Audio("audio/hurt.mp3");
const JUMP_AUDIO = new Audio("audio/jump.mp3");
const WALK_AUDIO = new Audio("audio/walk.mp3");
const SLEEP_AUDIO = new Audio("audio/sleeping.mp3");
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

/**
 * Plays a sound with optional loop, timeout, and volume settings.
 * @param {HTMLAudioElement} audio - The audio object to play.
 * @param {Object} [options={}] - Optional config.
 * @param {boolean} [options.timeout=false] - If true, stop after time.
 * @param {number} [options.time=0] - Time to play in ms.
 * @param {boolean} [options.loop=false] - Loop playback.
 * @param {number} [options.volume=1.0] - Volume level.
 */
function playSound(audio, { timeout = false, time = 0, loop = false, volume = 1.0 } = {}) {
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

/**
 * Pauses the given sound.
 * @param {HTMLAudioElement} audio
 */
function pauseSound(audio) {
  audio.pause();
}

/**
 * Plays the background game music in a loop.
 */
function playGameMusic() {
  playSound(GAME_AUDIO, { timeout: false, time: 0, loop: true, volume: 0.1 });
}

/**
 * Pauses the background game music.
 */
function pauseGameMusic() {
  pauseSound(GAME_AUDIO);
}

/**
 * Applies initial mute state from localStorage to all audio elements.
 */
function applyInitialMuteSetting() {
  const muteBtn = document.getElementById("muteBtn");
  if (soundMuted) {
    muteBtn.src = "img/10_icons/muted.svg";
  } else {
    muteBtn.src = "img/10_icons/unmuted.svg";
  }

  allAudio.forEach((audio) => {
    audio.muted = soundMuted;
    if (soundMuted) audio.pause();
  });
}

/**
 * Toggles mute on/off and updates localStorage and UI.
 */
function toggleMute() {
  soundMuted = !soundMuted;
  localStorage.setItem("soundMuted", soundMuted);
  updateMuteIcon();
  updateAudioMuteState();

  if (!soundMuted) {
    playGameMusic();
  }
}

/**
 * Updates the mute icon depending on state.
 */
function updateMuteIcon() {
  const muteBtn = document.getElementById("muteBtn");
  muteBtn.src = soundMuted
    ? "img/10_icons/muted.svg"
    : "img/10_icons/unmuted.svg";
}

/**
 * Updates the muted state for all audio elements.
 */
function updateAudioMuteState() {
  allAudio.forEach((audio) => {
    audio.muted = soundMuted;
    if (soundMuted) audio.pause();
  });
}
