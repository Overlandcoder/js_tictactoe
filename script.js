const Gameboard = (function() {
  let boardArray = [];
  const full = () => boardArray.length === 9 && allCellsFilled();
  const clearBoard = () => boardArray.splice(0, boardArray.length);

  function allCellsFilled() {
    for (i = 0; i <= 8; i++) {
      if (boardArray[i] == undefined) return false;
    }
    return true;
  }

  return { boardArray, full, clearBoard };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

const Display = (function() {
  const infoDiv = document.querySelector(".info");
  const notifyTurn = name => infoDiv.textContent = `${name}, it's your turn.`;
  const announceTie = () => infoDiv.textContent = "Tie game.";
  const resetInfoDiv = () => infoDiv.classList.remove("win-text");
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.addEventListener("click", () => Game.playRound(cell)));
  const clearButtons = () => cells.forEach(cell => cell.textContent = "");
  const enableCells = () => cells.forEach(cell => cell.disabled = false);
  const disableAllCells = () => cells.forEach(cell => disableCell(cell));
  
  const announceWinner = name => {
    infoDiv.textContent = `${name} has won!`;
    infoDiv.classList.add("win-text");
  }

  function notifySymbols(p1Symbol, p2Symbol) {
    const symbolsDiv = document.querySelector(".symbols");
    symbolsDiv.textContent = `Player 1 is ${p1Symbol},
                              Player 2 is ${p2Symbol}.`;
  }

  function disableCell(cell) {
    cell.disabled = true;
    cell.style.cursor = "auto";
  }

  return { notifyTurn, notifySymbols, announceWinner, announceTie, resetInfoDiv,
           clearButtons, enableCells, disableAllCells, disableCell };
})();

const Game = (function() {
  const player1 = Player("Player 1");
  const player2 = Player("Player 2");
  player1.symbol = ["X", "O"].random();
  player2.symbol = player1.symbol === "X" ? "O" : "X";
  let currentPlayer;
  const cells = document.querySelectorAll(".cell");
  const playButton = document.querySelector(".play");
  const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                         [0, 3, 6], [1, 4, 7], [2, 5, 8],
                         [0, 4, 8], [2, 4, 6]];
  let playing = false;

  function play() {
    playing = true;
    currentPlayer = [player1, player2].random();
    resetState();
    Display.notifySymbols(player1.symbol, player2.symbol);
    Display.notifyTurn(currentPlayer.name);
    cells.forEach(cell => cell.style.cursor = "pointer");
  }

  function resetState() {
    Gameboard.clearBoard();
    Display.resetInfoDiv();
    Display.clearButtons();
    Display.enableCells();
  }

  function playRound(cell) {
    if (!playing) return;
    cell.textContent = currentPlayer.symbol;
    Gameboard.boardArray[cell.id] = cell.textContent;
    Display.disableCell(cell);
    if (gameOver()) {
      Display.disableAllCells();
      return;
    }
    currentPlayer = switchTurn();
    Display.notifyTurn(currentPlayer.name);
  }

  const switchTurn = () => currentPlayer == player1 ? player2 : player1;
  const gameWon = () => winningCombos.some(combo => allSameSymbol(combo));
  
  function allSameSymbol(combo) {
    return combo.every(i => Gameboard.boardArray[i] == currentPlayer.symbol);
  }

  function gameOver() {
    if (gameWon()) {
      Display.announceWinner(currentPlayer.name);
      return true;
    }

    if (Gameboard.full()) {
      Display.announceTie();
      return true;
    }
  }

  playButton.addEventListener("click", play);
  return { playRound };
})();
