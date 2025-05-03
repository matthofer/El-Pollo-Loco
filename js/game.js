let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  toggleScreenRotation();
  showLoadingScreen();
  Promise.all([
    loadGame(),
    new Promise((resolve) => setTimeout(resolve, 700)),
  ]).then(hideLoadingScreen);
}

function startGame() {
  canvas = document.getElementById("canvas");
  initLevel();
  world = new World(canvas, keyboard);
  GAME_AUDIO.currentTime = 0;
  playGameMusic();
}

function showLoadingScreen() {
  document.getElementById("loading-screen").style.display = "flex";
  document.getElementById("startScreen").style.display = "none";
}

function hideLoadingScreen() {
  document.getElementById("loading-screen").style.display = "none";
  startGame();
}

function updateProgress(current, total) {
  const percent = Math.round((current / total) * 100);
  document.getElementById("loading-bar").style.width = `${percent}%`;
  document.getElementById("loading-text").innerText = `${percent}%`;
}

function updateProgressBar(percent) {
  document.getElementById("loading-bar").style.width = `${percent}%`;
}

function updateProgressText(percent) {
  document.getElementById("loading-text").innerText = `${percent}%`;
}

function showEndScreen(won) {
  const endScreen = document.getElementById("endScreen");
  endScreen.classList.remove("win", "lose");
  endScreen.classList.add(won ? "win" : "lose");
  endScreen.style.display = "flex";
  pauseGameMusic();
}

function restartGame() {
  const endScreen = document.getElementById("endScreen");
  endScreen.style.display = "none";
  showLoadingScreen();
  setTimeout(() => {
    world = null;
    canvas = null;
    canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initLevel();
    world = new World(canvas, keyboard);
    hideLoadingScreen();
  }, 100);
}

function returnToStart() {
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("startScreen").style.display = "flex";

  if (world) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    world = null;
    canvas = null;
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

window.addEventListener("resize", toggleScreenRotation);
window.addEventListener("orientationchange", toggleScreenRotation);

function toggleScreenRotation() {
  let rotateContainer = document.getElementById("rotationContainer");
  let canvas = document.getElementById("canvas");
  let rotationImage = document.getElementById("rotationImage");
  if (window.matchMedia("(orientation: portrait)").matches) {
    rotateContainer.classList.remove("hidden");
    adjustCanvasSize(canvas, "100vw !important", "100vh !important");
    rotationImage.classList.remove("d-none");
  } else {
    rotateContainer.classList.add("hidden");
    adjustCanvasSize(canvas, "1080px !important", "600px !important");
    rotationImage.classList.add("d-none");
  }
}

function adjustCanvasSize(canvas, width, height) {
  canvas.style.width = width;
  canvas.style.height = height;
}
