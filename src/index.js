"use strict";
import "./styles.css";
import { knightMoves, grid } from "./algortihm";
import { createGrid } from "./dom";
import LeaderLine from "leader-line-new";
import audioFile from "./asset/sound/move-self.mp3";

createGrid();
const knight = document.querySelector(".knight");
const tiles = document.querySelectorAll(".tile");
const userTrail = document.querySelector(".user .route");
const compTrail = document.querySelector(".comp .route");
compTrail.textContent = "";
const resultBox = document.querySelector(".result");
const moveSound = new Audio(audioFile);

const tryAgain = document.createElement("button");
const reveal = document.createElement("button");
reveal.classList.add("resBtn");
tryAgain.classList.add("resBtn");
tryAgain.textContent = "try again?";
reveal.textContent = "reveal the path";
const lowerLine = document.createElement("div");

lowerLine.append(
  createSpan("Wouldst thou "),
  tryAgain,
  createSpan(" Or shall I "),
  reveal,
  createSpan(" thou could not see?")
);

let nextMoves;
let currentPath = [];
let shortestPath = [];
let end = [];
let start = [];
newRoundStart();

function newRoundStart() {
  start = [getRand(), getRand()];
  end = [getRand(), getRand()];
  shortestPath = knightMoves(start, end);
  if (JSON.stringify(start) === JSON.stringify(end)) {
    end = [getRand(), getRand()];
  }
  document
    .querySelector(`.tile[pos-x='${start[0]}'][pos-y='${start[1]}']`)
    .classList.add("start");

  setKnightPos(start[0], start[1]);
  knight.setAttribute("draggable", "true");
  const desTile = document.querySelector(
    `.tile[pos-x='${end[0]}'][pos-y='${end[1]}']`
  );
  desTile.classList.add("destination");
}

function getRand() {
  return Math.floor(Math.random() * 8) + 1;
}

knight.addEventListener("dragstart", (e) => {
  getNextPos();
  nextMoves.forEach((move) => {
    document
      .querySelector(`.tile[pos-x='${move[0]}'][pos-y='${move[1]}']`)
      .classList.add("glowing");
  });
});
knight.addEventListener("dragend", (e) => {
  // moveSound.play();
  tiles.forEach((tile) => {
    tile.classList.remove("glowing");
    tile.classList.remove("over");
  });
});
knight.addEventListener("drop", (e) => {
  tiles.forEach((tile) => {
    tile.classList.remove("glowing");
    tile.classList.remove("over");
  });
});

tiles.forEach((tile) => {
  tile.addEventListener("dragover", (e) => {
    e.preventDefault();
    let tilePos = [+tile.getAttribute("pos-x"), +tile.getAttribute("pos-y")];
    nextMoves.forEach((move) => {
      if (JSON.stringify(move) === JSON.stringify(tilePos)) {
        tile.classList.add("over");
      }
    });
  });
});
tiles.forEach((tile) => {
  tile.addEventListener("dragleave", (e) => {
    tile.classList.remove("over");
  });
});
tiles.forEach((tile) => {
  tile.addEventListener("drop", (e) => {
    e.preventDefault();
    getNextPos();
    let tilePos = [+tile.getAttribute("pos-x"), +tile.getAttribute("pos-y")];
    nextMoves.forEach((move) => {
      if (JSON.stringify(move) === JSON.stringify(tilePos)) {
        moveSound.play();
        setKnightPos(tilePos[0], tilePos[1]);
      }
    });
  });
});

function setKnightPos(x, y) {
  knight.setAttribute("pos-x", x);
  knight.setAttribute("pos-y", y);
  document.querySelector(`.tile[pos-x='${x}'][pos-y='${y}']`).append(knight);
  currentPath.push([x, y]);
  let child = document.createElement("div");
  child.textContent = `${x},${y}`;
  userTrail.append(child);
  if (JSON.stringify([x, y]) === JSON.stringify(end)) {
    showResult();
    knight.setAttribute("draggable", "false");
  }
}
function getKnightPos() {
  let currentPos = [
    +knight.getAttribute("pos-x"),
    +knight.getAttribute("pos-y"),
  ];
  return currentPos;
}
function getNextPos(x, y) {
  nextMoves = grid.get(JSON.stringify(getKnightPos()));
}

function showResult() {
  if (currentPath.length <= shortestPath.length) {
    resultBox.classList.add("win");
    resultBox.textContent = `In ${currentPath.length - 1} steps, thou hast found the one true path. None walk a swifter road.`;
    activateBoard();
    printPath();
    drawLine(currentPath, "user");
    drawLine(shortestPath);
  } else {
    resultBox.classList.add("lose");
    resultBox.append(
      (document.createElement("div").textContent =
        `Thou hast walked the path in ${currentPath.length - 1} steps... yet the true, most hallowed way lies still hidden.`),
      lowerLine
    );
    resultBox.append(lowerLine);
    drawLine(currentPath, "user");
  }
}

function drawLine(arr, whose) {
  let color;
  if (whose === "user") {
    color = "green";
  } else {
    color = "blue";
  }
  for (let i = 0; i < arr.length; i++) {
    if (i + 1 < arr.length) {
      new LeaderLine(
        document.querySelector(
          `.tile[pos-x='${arr[i][0]}'][pos-y='${arr[i][1]}']`
        ),
        document.querySelector(
          `.tile[pos-x='${arr[i + 1][0]}'][pos-y='${arr[i + 1][1]}']`
        ),
        { color: color }
      );
    }
  }
}
function clearLines() {
  let lines = document.querySelectorAll(".leader-line");
  for (let line of lines) {
    line.remove();
  }
}

function printPath() {
  compTrail.textContent = "";
  shortestPath.forEach((arr) => {
    let div = document.createElement("div");
    div.textContent = `${arr[0]},${arr[1]}`;
    compTrail.append(div);
  });
}

function activateBoard() {
  document.querySelector(".user").classList.add("active");
  document.querySelector(".comp").classList.add("active");
}
function deactivateBoard() {
  document.querySelector(".user").classList.remove("active");
  document.querySelector(".comp").classList.remove("active");
}

function createSpan(text) {
  const span = document.createElement("span");
  span.textContent = text;
  return span;
}

tryAgain.addEventListener("click", () => {
  reset();
});

reveal.addEventListener("click", () => {
  drawLine(shortestPath);
  if (compTrail.textContent === "") {
    printPath();
  }
  activateBoard();
});

document.querySelector("#reset").addEventListener("click", (e) => {
  reset();
});

function reset() {
  resultBox.classList.remove("win");
  resultBox.classList.remove("lose");
  resultBox.textContent = "";

  currentPath = [];
  clearLines();
  deactivateBoard();
  userTrail.textContent = "";
  compTrail.textContent = "";
  setKnightPos(start[0], start[1]);
  knight.setAttribute("draggable", "true");
}

document.querySelector("#new").addEventListener("click", (e) => {
  currentPath = [];

  resultBox.classList.remove("win");
  resultBox.classList.remove("lose");
  resultBox.textContent = "";

  for (let tile of tiles) {
    tile.classList.remove("start");
    tile.classList.remove("destination");
  }
  deactivateBoard();
  clearLines();
  userTrail.textContent = "";
  newRoundStart();
});
