let grid = new Map();
makeGrid(grid);

function knightMoves(start, end) {
  const paths = getPaths(start, end);
  const shortest = getShortestPath(paths);
  return shortest;
}

function getPaths(start, end) {
  const visited = new Set();
  const queue = [[start]];
  const pathList = [];

  while (queue.length > 0) {
    const currentPath = queue.shift();
    const currentTile = currentPath[currentPath.length - 1];
    const nextTiles = grid.get(JSON.stringify(currentTile));
    for (const tile of nextTiles) {
      if (JSON.stringify(tile) === JSON.stringify(end)) {
        const temp = [...currentPath];
        temp.push(tile);
        pathList.push(temp);
      }
      if (
        !visited.has(JSON.stringify(tile)) &&
        JSON.stringify(currentTile) !== JSON.stringify(end)
      ) {
        visited.add(JSON.stringify(currentTile));
        const newPath = [...currentPath];
        newPath.push(tile);
        queue.push(newPath);
      }
    }
  }
  return pathList;
}

function makeGrid(map) {
  addVertex(map);
  addNeighbors(map);
}

function addVertex(map) {
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      map.set(JSON.stringify([i, j]), []);
    }
  }
}

function addNeighbors(map) {
  for (let [key] of map) {
    let list = nextTiles(JSON.parse(key));
    list.forEach((tile) => {
      map.get(key).push(tile);
    });
  }
}

function nextTiles(currentPos) {
  if (
    currentPos[0] > 8 ||
    currentPos[1] > 8 ||
    currentPos[0] < 1 ||
    currentPos[1] < 1
  )
    return null;
  let x = currentPos[0];
  let y = currentPos[1];
  const temp = [
    [x + 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y + 2],
    [x - 1, y - 2],
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
  ];
  let validMoves = [];
  for (let i = 0; i < 8; i++) {
    if (
      temp[i][0] <= 8 &&
      temp[i][0] >= 1 &&
      temp[i][1] <= 8 &&
      temp[i][1] >= 1
    ) {
      validMoves.push(temp[i]);
    }
  }
  return validMoves;
}

function getShortestPath(arr) {
  const least = arr.reduce((acc, val, ind) => {
    if (ind === 0 || val.length < acc.length) {
      return val;
    }
    return acc;
  });
  return least;
}

export { knightMoves, grid };
