
//Players factory function
const Players = (name, mark) => {
    return { name, mark };
}

//gameBoard module
const boardModule = (() => {
    let boardArray = ["", "", "", "", "", "", "", "", ""];
    return { boardArray };
})();

//game module
const gameModule = (() => {
    // variables
    const player1 = Players("Player 1", "X");
    const player2 = Players("Player 2", "O");

    let currentPlayer = player1;

    let gameOver = false;
    let winner = null;

    let boardArray = boardModule.boardArray;
    const squares = Array.from(document.querySelectorAll(".square"));
    const gameStatus = document.querySelector(".gameStatus");
    const gameBoard = document.querySelector(".board");

    // functions
    const render = () => {
        for (let i = 0; i < boardArray.length; i++) {
            if (boardArray[i] !== "") {
                squares[i].textContent = boardArray[i];
                squares[i].classList.add("squareTaken", `${boardArray[i]}`);
            }
        }
    };

    const switchCurrentPlayer = () => {
        if (!gameOver) {
            if (currentPlayer == player1) {
                currentPlayer = player2;
                gameStatus.textContent = "O's turn";
            } else {
                currentPlayer = player1;
                gameStatus.textContent = "X's turn";
            };
        };
    };

    const playRound = (e) => {
        const squareIndex = parseInt(e.target.getAttribute("data-index"));
        if (!gameOver && boardArray[squareIndex] === "") {
            boardArray[squareIndex] = currentPlayer.mark;
            render();
            checkWinner();
            switchCurrentPlayer();
        };
    };

    const checkWinner = () => {
        const winningArrays = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        winningArrays.forEach(combo => {
            if (boardArray[combo[0]]
                && boardArray[combo[0]] === boardArray[combo[1]]
                && boardArray[combo[0]] === boardArray[combo[2]]) {
                winner = currentPlayer;
            }
        });

        if (winner !== null) {
            gameOver = true;
            gameStatus.textContent = `${currentPlayer.mark} wins!`;
            gameBoard.classList.add("gameOver");
        };

        if (!boardArray.includes('')) {
            gameOver = true;
            gameStatus.textContent = "Tie!";
            gameBoard.classList.add("gameOver");
        };
    };

    const resetGame = () => {
        boardArray = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = player1;
        winner = null;
        gameOver = false;
        gameBoard.classList.remove("gameOver");
        gameStatus.textContent = "X's turn";
        squares.forEach(square => square.textContent = "");
        squares.forEach(square => square.classList.remove("squareTaken", "X", "O"));
        init();
    }

    const init = () => {
        squares.forEach(square => {
            square.addEventListener("click", playRound);
        });
        document.querySelector("button").addEventListener("click", resetGame);
    };

    return { init }
})();

gameModule.init();



