let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game with loading screen and asset preloading.
 */
function init() {
  toggleScreenRotation();
  showLoadingScreen();
  Promise.all([
    loadGame(),
    new Promise((resolve) => setTimeout(resolve, 700)),
  ]).then(() => {
    hideLoadingScreen();
    startGame();
  });
}

/**
 * Starts the game by initializing canvas, level, and world.
 */
function startGame() {
  canvas = document.getElementById("canvas");
  initLevel();
  world = new World(canvas, keyboard);
  document.getElementById("topBtnControl").style.display = "flex";
  updateBottomBtnControlVisibility();
  GAME_AUDIO.currentTime = 0;
  playGameMusic();
}

/**
 * Displays the loading screen.
 */
function showLoadingScreen() {
  document.getElementById("loading-screen").style.display = "flex";
  document.getElementById("startScreen").style.display = "none";
}

/**
 * Hides the loading screen.
 */
function hideLoadingScreen() {
  document.getElementById("loading-screen").style.display = "none";
}

/**
 * Updates the loading bar and text during asset preload.
 * @param {number} current - Number of assets loaded.
 * @param {number} total - Total number of assets to load.
 */
function updateProgress(current, total) {
  const percent = Math.round((current / total) * 100);
  document.getElementById("loading-bar").style.width = `${percent}%`;
  document.getElementById("loading-text").innerText = `${percent}%`;
}

/**
 * Updates the progress bar.
 * @param {number} percent
 */
function updateProgressBar(percent) {
  document.getElementById("loading-bar").style.width = `${percent}%`;
}

/**
 * Updates the loading text.
 * @param {number} percent
 */
function updateProgressText(percent) {
  document.getElementById("loading-text").innerText = `${percent}%`;
}

/**
 * Displays the end screen with win/loss result.
 * @param {boolean} won - True if the player won.
 */
function showEndScreen(won) {
  const endScreen = document.getElementById("endScreen");
  endScreen.classList.remove("win", "lose");
  endScreen.classList.add(won ? "win" : "lose");
  endScreen.style.display = "flex";
  pauseGameMusic();
}

/**
 * Restarts the game after game over/win.
 */
function restartGame() {
  document.getElementById("endScreen").style.display = "none";
  showLoadingScreen();
  resetGame();
  setTimeout(() => {
    startGame();
    hideLoadingScreen();
  }, 100);
}

/**
 * Resets the world and canvas.
 */
function resetGame() {
  if (world) {
    intervalManager.clearAll();
    world = null;
  }

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Resets the game and returns to the start screen.
 */
function resetToStartScreen() {
  resetGame();
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("topBtnControl").style.display = "none";
  document.getElementById("bottomBtnControl").style.display = "none";

  document.getElementById("startScreen").style.display = "flex";

  pauseSound(GAME_AUDIO);
  if (SLEEP_AUDIO) {
    pauseSound(SLEEP_AUDIO);
    SLEEP_AUDIO.currentTime = 0;
  }
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode === 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode === 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode === 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode === 38) {
    keyboard.UP = false;
  }
  if (e.keyCode === 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode === 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode === 68) {
    keyboard.D = false;
  }
});

const leftButton = document.getElementById("leftBtn");
const rightButton = document.getElementById("rightBtn");
const jumpButton = document.getElementById("jumpBtn");
const bottleButton = document.getElementById("throwBtn");

leftButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  keyboard.LEFT = true;
});

leftButton.addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.LEFT = false;
});

rightButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  keyboard.RIGHT = true;
});

rightButton.addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.RIGHT = false;
});

jumpButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  keyboard.SPACE = true;
});

jumpButton.addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.SPACE = false;
});

bottleButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  keyboard.D = true;
});

bottleButton.addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.D = false;
});

window.addEventListener("resize", () => {
  if (world) {
    updateBottomBtnControlVisibility();
  }
});

/**
 * Adjusts button visibility on mobile devices.
 */
function updateBottomBtnControlVisibility() {
  const isMobile =
    (window.innerWidth <= 1368 && "ontouchstart" in window) ||
    navigator.maxTouchPoints > 0;

  const btn = document.getElementById("bottomBtnControl");
  btn.style.display = isMobile ? "flex" : "none";
}

window.addEventListener("resize", toggleScreenRotation);
window.addEventListener("orientationchange", toggleScreenRotation);

/**
 * Toggles the screen rotation hint depending on orientation.
 */
function toggleScreenRotation() {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  const canvas = document.getElementById("canvas");
  const rotationContainer = document.getElementById("rotationContainer");
  const rotationImage = document.getElementById("rotationImage");

  if (isPortrait) {
    showRotationPrompt(rotationContainer, canvas, rotationImage);
  } else {
    hideRotationPrompt(rotationContainer, canvas, rotationImage);
  }
}

/**
 * Shows the rotation prompt overlay.
 */
function showRotationPrompt(container, canvas, image) {
  container.classList.remove("hidden");
  adjustCanvasSize(canvas, "100vw !important", "100vh !important");
  image.classList.remove("d-none");
}

/**
 * Hides the rotation prompt overlay.
 */
function hideRotationPrompt(container, canvas, image) {
  container.classList.add("hidden");
  adjustCanvasSize(canvas, "1080px !important", "600px !important");
  image.classList.add("d-none");
}

/**
 * Sets canvas dimensions.
 */
function adjustCanvasSize(canvas, width, height) {
  canvas.style.width = width;
  canvas.style.height = height;
}

const intervalManager = {
  intervals: [],

  register(intervalId) {
    this.intervals.push(intervalId);
  },

  clearAll() {
    this.intervals.forEach(clearInterval);
    this.intervals = [];
  },
};

/**
 * Shows the help screen.
 */
function showHelp() {
  document.getElementById("helpScreen").style.display = "block";
}

/**
 * Hides the help screen.
 */
function closeHelp() {
  document.getElementById("helpScreen").style.display = "none";
}

/**
 * Shows the imprint screen.
 */
function showImprint() {
  document.getElementById("imprintScreen").style.display = "block";
}

/**
 * Hides the imprint screen.
 */
function closeImprint() {
  document.getElementById("imprintScreen").style.display = "none";
}
