const Gameboard = (function() {
  let boardArray = [];
  const  full = () => boardArray.length === 9 && allCellsFilled();

  function allCellsFilled() {
    for (i = 0; i <= 8; i++) {
      if (boardArray[i] == undefined) return false;
    }
    return true;
  }

  return { boardArray, full };
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
  const nameForm = document.querySelector("#name-form");
  let playerName = "";

  const notifyTurn = name => infoDiv.textContent = `${name}, it's your turn.`;
  const announceWinner = name => infoDiv.textContent = `${name} has won!`;
  const announceTie = () => infoDiv.textContent = "Tie game.";

  function getName(playerNum) {
    addLabelText(playerNum);
    const chooseButton = document.querySelector(".name-button");
    chooseButton.addEventListener("click", customSubmit);
    return playerName;
  }

  const showForm = () => nameForm.classList.remove("hidden");
  const hideForm = () => nameForm.classList.add("hidden");

  function addLabelText(playerNum) {
    const nameLabel = document.getElementById("name-label");
    nameLabel.textContent = `Player ${playerNum} name:`;
  }

  function customSubmit(event) {
    event.preventDefault();
    playerName = document.getElementById("player-name").value;
  }

  return { notifyTurn, announceWinner, announceTie, getName, showForm, hideForm };
})();

const Game = (function() {
  const player1 = Player();
  const player2 = Player();
  player1.symbol = ["X", "O"].random();
  player2.symbol = player1.symbol === "X" ? "O" : "X";
  let currentPlayer = player1;
  const cells = document.querySelectorAll(".cell");
  const playButton = document.querySelector(".play");
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

    cells.forEach(cell => cell.style.cursor = "pointer");
    getNames();
  }

  function getNames() {
    Display.showForm();
    player1.name = Display.getName(1);
    console.log(player1.name);
    player2.name = Display.getName(2);
  }

  function disableCell(cell) {
    cell.disabled = true;
    cell.style.cursor = "auto";
  }

  const disableAllCells = () => cells.forEach(cell => disableCell(cell));
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

  playButton.addEventListener("click", play)
})();
