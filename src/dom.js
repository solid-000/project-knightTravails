const board = document.querySelector(".board");

function createGrid() {
  let count = 1;
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute("data_x", i);
      tile.setAttribute("data_y", j);
      board.appendChild(tile);
    }
  }
  colorTiles();
}

function colorTiles() {
  let tiles = board.querySelectorAll(".tile");
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

export { createGrid };
