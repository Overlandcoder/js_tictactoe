const Gameboard = (function() {
  let boardArray = ["x", "o", "x", "x", "x", "o", "x", "x", "o"];
  return { boardArray };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

const displaySymbols = (() => {
  for (i = 0; i <= 8; i++) {
    let cell = document.getElementById(i);
    console.log(i);
    let symbol = Gameboard.boardArray[i];
    cell.textContent = symbol;
  }
})();
