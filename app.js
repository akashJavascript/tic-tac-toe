const Gameboard = (function () {
  let gameboardArray = ['', '', '', '', '', '', '', '', ''];

  const place = function (player, cell) {
    if (gameboardArray[cell] === '') {
      gameboardArray.splice(cell, 1, player); //Replaces the cell with the player X or O
      console.log(gameboardArray);
      console.log(GameFlow.winState());
    }
  };
  const clearArray = function () {
    gameboardArray = ['', '', '', '', '', '', '', '', ''];
    console.log(gameboardArray);
  };
  const getArray = function () {
    return gameboardArray;
  };
  return { place, clearArray, getArray };
})();

const GameFlow = (function () {
  const startGame = function () {
    player1.toggleTurn();
  };
  const place = function (cell) {
    Gameboard.place(player1.whoseTurn() ? 'x' : 'o', cell);
    player1.toggleTurn();
    player2.toggleTurn();
  };
  const winState = function () {
    let tempGameboardArray = Gameboard.getArray();

    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        tempGameboardArray[i * 3] === tempGameboardArray[i * 3 + 1] &&
        tempGameboardArray[i * 3 + 1] === tempGameboardArray[i * 3 + 2] &&
        tempGameboardArray[i * 3] !== ''
      ) {
        return `${tempGameboardArray[i * 3]} has won`;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        tempGameboardArray[i] === tempGameboardArray[i + 3] &&
        tempGameboardArray[i + 3] === tempGameboardArray[i + 6] &&
        tempGameboardArray[i] !== ''
      ) {
        return `${tempGameboardArray[i]} has won`;
      }
    }

    // Check diagonals
    if (
      (tempGameboardArray[0] === tempGameboardArray[4] &&
        tempGameboardArray[4] === tempGameboardArray[8] &&
        tempGameboardArray[0] !== '') ||
      (tempGameboardArray[2] === tempGameboardArray[4] &&
        tempGameboardArray[4] === tempGameboardArray[6] &&
        tempGameboardArray[2] !== '')
    ) {
      return `${tempGameboardArray[4]} has won`;
    }

    return 'no';
  };

  return { startGame, place, winState };
})();

const createPlayer = function (name) {
  let isTurn = false;

  const toggleTurn = function () {
    isTurn ? (isTurn = false) : (isTurn = true);
    return isTurn;
  };
  const whoseTurn = function () {
    return isTurn;
  };
  return { toggleTurn, whoseTurn };
};

const player1 = createPlayer('player1');
const player2 = createPlayer('player2');
GameFlow.startGame();
    