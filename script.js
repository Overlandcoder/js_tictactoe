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
    let symbol = Gameboard.boardArray[i];
    cell.textContent = symbol;
  }
})();

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

const Display = (function() {
  const infoDiv = document.querySelector(".info");
  infoDiv.textContent = "test";
})();

const Game = (function() {
  const player1 = Player("Player1");
  const player2 = Player("Player2");
  player1.symbol = ["X", "O"].random();
  player2.symbol = player1.symbol === "X" ? "O" : "X";
  let currentPlayer = player1;

  function play() {
    let roundsPlayed = Gameboard.boardArray.length

    for (i = roundsPlayed; roundsPlayed <= 9; i++) {
      currentPlayer = switchTurn();
    }
  }

  function switchTurn() {
    return currentPlayer == player1 ? player2 : player1;
  }

  return { play };
})();

Game.play();
