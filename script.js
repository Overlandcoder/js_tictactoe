const Gameboard = (function() {
  let boardArray = ["x", "o", "x", "x"];
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

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

const player1 = Player("Player1");
const player2 = Player("Player2");
player1.symbol = ["X", "O"].random();
player2.symbol = player1.symbol === "X" ? "O" : "X";
