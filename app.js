const Gameboard = (function () {
  let gameboardArray = ['', '', '', '', '', '', '', '', ''];

  const place = function (player, cell) {
    if (gameboardArray[cell] === '') {
      gameboardArray.splice(cell, 1, player);
      console.log(gameboardArray);
      DisplayController.renderGameboard();
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
  const newGame = function () {
    Gameboard.clearArray();
    player1.resetTurn();
    player2.resetTurn();
    player1.toggleTurn();
    DisplayController.enableDivs();
    DisplayController.clearDivsContent();
  };

  const place = function (cell) {
    Gameboard.place(player1.whoseTurn() ? 'x' : 'o', cell);
    player1.toggleTurn();
    player2.toggleTurn();
  };

  const winState = function () {
    let tempGameboardArray = Gameboard.getArray();
    let results = document.querySelector('.results')
    // Check rows
    if(tempGameboardArray.includes('') === false){
      results.textContent=`Its a draw`
    }
    for (let i = 0; i < 3; i++) {
      if (
        tempGameboardArray[i * 3] === tempGameboardArray[i * 3 + 1] &&
        tempGameboardArray[i * 3 + 1] === tempGameboardArray[i * 3 + 2] &&
        tempGameboardArray[i * 3] !== ''
      ) {
        DisplayController.disableDivs();
        results.textContent =  ` Player ${tempGameboardArray[i * 3].toUpperCase()} has won`;
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        tempGameboardArray[i] === tempGameboardArray[i + 3] &&
        tempGameboardArray[i + 3] === tempGameboardArray[i + 6] &&
        tempGameboardArray[i] !== ''
      ) {
        DisplayController.disableDivs();

        results.textContent= `Player ${tempGameboardArray[i].toUpperCase()} has won`;
        return;
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
      DisplayController.disableDivs();

      results.textContent = `Player ${tempGameboardArray[4].toUpperCase()} has won`;
      return;
    }

    return 'no';
  };

  return { newGame, place, winState };
})();

const createPlayer = function (name) {
  let isTurn = false;

  const toggleTurn = function () {
    isTurn ? (isTurn = false) : (isTurn = true);
    return isTurn;
  };

  const resetTurn = function () {
    isTurn = false;
  };

  const whoseTurn = function () {
    return isTurn;
  };

  return { toggleTurn, whoseTurn, resetTurn };
};

const DisplayController = (function () {
  const newGameBtn = document.querySelector('.new-game')
newGameBtn.addEventListener('click',function(){
  GameFlow.newGame();
})
  const enableDivs = function () {
    const boardSquares = document.querySelectorAll(".board-square");
    boardSquares.forEach(el => {
      el.addEventListener('click', handleClick);
    });
  }

  const disableDivs = function () {
    const boardSquares = document.querySelectorAll(".board-square");
    boardSquares.forEach(el => {
      el.removeEventListener('click', handleClick);
    });
  }

  const renderGameboard = function () {
    const boardSquares = document.querySelectorAll(".board-square");
    let tempGameboard = Gameboard.getArray();
    boardSquares.forEach((square, index) => {
      square.textContent = tempGameboard[index];
    });
  }
  const clearDivsContent = function(){
    const boardSquares = document.querySelectorAll(".board-square");
    boardSquares.forEach(el => {
      el.textContent = '';
    })
  }
  const handleClick = function (event) {
    const cell = event.target.dataset.cell;
    GameFlow.place(cell);
  }
  return { renderGameboard, disableDivs, enableDivs,clearDivsContent}
})();

const player1 = createPlayer('player1');
const player2 = createPlayer('player2');
GameFlow.newGame();
