const squares = document.querySelectorAll(".square");
const gameStatus = document.querySelector("#gameStatus");
const resetButton = document.querySelector("#reset");
const winCond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let ifRunning = false;

startGame();

function startGame(){
    squares.forEach(square => square.addEventListener("click", squareClicked));
    resetButton.addEventListener("click", resetGame);
    gameStatus.textContent = `${currentPlayer}'s turn`;
    ifRunning = true;
}
function squareClicked(){
    const squareIndex = this.getAttribute("squareIndex");

    if(options[squareIndex] !== "" || !ifRunning){
        return;
    }

    updateSquare(this, squareIndex);
    checkWinner();
}
function updateSquare(square, index){
    options[index] = currentPlayer;
    square.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    gameStatus.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winCond.length; i++){
        const cond = winCond[i];
        const squareA = options[cond[0]];
        const squareB = options[cond[1]];
        const squareC = options[cond[2]];

        if(squareA === "" || squareB === "" || squareC === ""){
            continue;
        }
        if(squareA === squareB && squareB === squareC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        gameStatus.textContent = `${currentPlayer} wins`;
        ifRunning = false;
    } else if(!options.includes("")){
        gameStatus.textContent = `Draw`;
    } else {
        changePlayer();
    }
}
function resetGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `${currentPlayer}'s turn`;
    squares.forEach(square => square.textContent = "");
    ifRunning = true;
}