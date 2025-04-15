let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  showLoadingScreen();
  loadGame().then(hideLoadingScreen);
}

function startGame() {
  canvas = document.getElementById("canvas");
  initLevel();
  world = new World(canvas, keyboard);
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
