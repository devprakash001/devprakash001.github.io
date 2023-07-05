const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let isGameover = false;
let winsX = 0;
let winsO = 0;
let ties = 0;

// Array of winning patterns
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to check for a winner
function checkWinner() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].dataset.cell &&
      cells[a].dataset.cell === cells[b].dataset.cell &&
      cells[a].dataset.cell === cells[c].dataset.cell
    ) {
      return cells[a].dataset.cell;
    }
  }

  if ([...cells].every((cell) => cell.dataset.cell !== "")) {
    return "tie";
  }

  return null;
}

// Function to handle cell click event
function handleCellClick() {
  if (isGameover || this.dataset.cell !== "") return;

  this.dataset.cell = currentPlayer;
  this.innerText = currentPlayer;
  this.classList.add(currentPlayer === "X" ? "red" : "blue");

  const winner = checkWinner();
  if (winner) {
    isGameover = true;
    if (winner === "tie") {
      setTimeout(() => {
        alert("It's a tie!");
        ties++;
        updateScore();
        resetBoard();
      }, 100);
    } else {
      setTimeout(() => {
        alert(`Player ${winner} wins!`);
        if (winner === "X") {
          winsX++;
        } else {
          winsO++;
        }
        updateScore();
        resetBoard();
      }, 100);
    }
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to update the score
function updateScore() {
  document.getElementById("winsX").innerText = winsX;
  document.getElementById("winsO").innerText = winsO;
  document.getElementById("ties").innerText = ties;
}

// Function to reset the board
function resetBoard() {
  cells.forEach((cell) => {
    cell.dataset.cell = "";
    cell.innerText = "";
    cell.classList.remove("red", "blue", "winner");
  });

  isGameover = false;
}

// Function to handle replay button click
function handleReplayClick() {
  resetBoard();
}

// Function to handle restart button click
function handleRestartClick() {
  resetBoard();
  winsX = 0;
  winsO = 0;
  ties = 0;
  updateScore();
}

// Add event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
document.getElementById("replay").addEventListener("click", handleReplayClick);
document.getElementById("restart").addEventListener("click", handleRestartClick);

// Initialize the score
updateScore();
