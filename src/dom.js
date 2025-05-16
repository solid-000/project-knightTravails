import { grid } from "./algortihm";
const board = document.querySelector(".board");

function createGrid() {
  let count = 1;
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute("pos-x", i);
      tile.setAttribute("pos-y", j);
      board.appendChild(tile);
    }
  }
  colorTiles();
  numbers();
}

function colorTiles() {
  const tiles = board.querySelectorAll(".tile");
  let count = 1;
  let color = "#dbdbdb";
  tiles.forEach((tile) => {
    tile.style.backgroundColor = color;
    if (count === 8) {
      count = 0;
    } else {
      color = color === "#dbdbdb" ? "#292727" : "#dbdbdb";
    }
    count++;
  });
}

function numbers() {
  for (let i = 1; i <= 8; i++) {
    let tileHor = document.querySelector(`.tile[pos-x='1'][pos-y='${i}']`);
    let tileVer = document.querySelector(`.tile[pos-x='${i}'][pos-y='1']`);
    tileHor.setAttribute("data-label", i);
    tileVer.setAttribute("data-label", i);
  }
}

export { createGrid };
