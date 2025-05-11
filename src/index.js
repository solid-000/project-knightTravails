"use strict";
import "./styles.css";
import { knightMoves, grid } from "./algortihm";
import { createGrid } from "./dom";

createGrid();
const knight = document.querySelector(".knight");
const tiles = document.querySelectorAll(".tile");
let nextMoves;
let currentPath = [];
let end = [];
let start = [];
newRoundStart();

function newRoundStart() {
  start = [getRand(), getRand()];
  end = [getRand(), getRand()];
  if (JSON.stringify(start) === JSON.stringify(end)) {
    end = [getRand(), getRand()];
  }
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
  console.log(currentPath);
  if (JSON.stringify([x, y]) === JSON.stringify(end)) {
    alert("success");
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

function reset() {
  currentPath = [];
  setKnightPos(start[0], start[1]);
  knight.setAttribute("draggable", "true");
}

document.querySelector("#reset").addEventListener("click", (e) => {
  reset();
});
