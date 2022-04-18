const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const showResults = document.querySelector("[data-winning-message]");
const winningMessage = document.querySelector("[data-winning-message-text]"); 
const restartButton = document.querySelector('[data-restart-button]');

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

const startGame = () => {

    for (const cell of cellElements) {
        isCircleTurn = false;

        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);

        cell.addEventListener("click", handleClick, {once:true});
    };
        setBoardHoverClass()

        board.classList.add("x");

        showResults.classList.remove("show-winning-message");
};


const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate!!!"
    } else { 
        winningMessageTextElement.innerText = isCircleTurn 
        ? "O Venceu"
        : "X Venceu";
    }

    showResults.classList.add("show-winning-message");
};


// Verificar por vitória
const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        }); 
    });
};

// Verificar por empate
const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle")      
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}

// Mudar simbolo
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass()
};

const handleClick = (e) => {
    // Colocar a marca (X ou O)
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    // Verificar por vitória
    const isWin = checkForWin(classToAdd);

    // Verificar por empate
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true)
    } else {
        // Mudar simbolo
        swapTurns(); 
    }
};

startGame();

restartButton.addEventListener('click', startGame);

