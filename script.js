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
  function notifyTurn(name) {
    const infoDiv = document.querySelector(".info");
    console.log(name);
    infoDiv.textContent = `${name}, it's your turn.`;
  }

  return { notifyTurn };
})();

const Game = (function() {
  const player1 = Player("Player1");
  const player2 = Player("Player2");
  player1.symbol = ["X", "O"].random();
  player2.symbol = player1.symbol === "X" ? "O" : "X";
  let currentPlayer = player1;
  const cells = document.querySelectorAll(".cell");

  function play() {
    let roundsPlayed = Gameboard.boardArray.length

    // for (i = roundsPlayed; roundsPlayed <= 9; i++) {
      currentPlayer = switchTurn();
      Display.notifyTurn(currentPlayer.name);
    // }
  }

  function switchTurn() {
    return currentPlayer == player1 ? player2 : player1;
  }

  cells.forEach(cell => cell.addEventListener("click", () => {
    cell.textContent = currentPlayer.symbol;
  }))

  return { play };
})();

Game.play();
