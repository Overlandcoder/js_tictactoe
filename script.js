const Gameboard = (function() {
  let boardArray = [];
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

  function notifyTurn(name) {
    infoDiv.textContent = `${name}, it's your turn.`;
  }

  function announceWinner(name) {
    infoDiv.textContent = `${name} has won!`;
  }

  return { notifyTurn, announceWinner };
})();

const Game = (function() {
  const player1 = Player("Player1");
  const player2 = Player("Player2");
  player1.symbol = ["X", "O"].random();
  player2.symbol = player1.symbol === "X" ? "O" : "X";
  let currentPlayer = player1;
  const cells = document.querySelectorAll(".cell");
  const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                            [0, 3, 6], [1, 4, 7], [2, 5, 8],
                            [0, 4, 8], [2, 4, 6]];

  function play() {
     cells.forEach(cell => cell.addEventListener("click", () => {
      cell.textContent = currentPlayer.symbol;
      Gameboard.boardArray[cell.id] = cell.textContent;
      disableCell(cell);
      if (gameOver()) {
        disableAllCells();
        return;
      }
      currentPlayer = switchTurn();
      Display.notifyTurn(currentPlayer.name);
    }))
  }

  function disableCell(cell) {
    cell.disabled = true;
    cell.style.cursor = "auto";
  }

  function disableAllCells() {
    cells.forEach(cell => disableCell(cell));
  }

  function switchTurn() {
    return currentPlayer == player1 ? player2 : player1;
  }

  function checkWinner() {
    return winningCombos.some(combo => allSameSymbol(combo));
  }

  function allSameSymbol(combo) {
    return combo.every(i => Gameboard.boardArray[i] == currentPlayer.symbol);
  }

  function gameOver() {
    if (checkWinner()) {
      Display.announceWinner(currentPlayer.name);
      return true;
    }
  }

  return { play };
})();

Game.play();
