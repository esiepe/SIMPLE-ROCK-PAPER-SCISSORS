const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");
const resultEl = document.getElementById("result-el");
const scoresEl = document.getElementById("scores-el");
const resetBtn = document.getElementById("reset-btn");

// Initialize scores and retrieve from localStorage
let scores = JSON.parse(localStorage.getItem("scores")) || {
    win: 0,
    tie: 0,
    loss: 0
};

// Function to update the scores element
function updateScoresElement() {
    scoresEl.innerHTML = `Wins: ${scores.win} Ties: ${scores.tie} Losses: ${scores.loss}`;
}

// Function to generate the computer's move
function computerMove() {
    const randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 0) {
        return "rock";
    } else if (randomNumber === 1) {
        return "paper";
    } else if (randomNumber === 2) {
        return "scissors";
    }
}

// Function to play a round
function playRound(playerChoice) {
    const computerChoice = computerMove();
    
    if (playerChoice === computerChoice) {
        resultEl.textContent = `You chose ${playerChoice}. The computer chose ${computerChoice}. Tie!`;
        scores.tie += 1; // Update ties
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        resultEl.textContent = `You chose ${playerChoice}. The computer chose ${computerChoice}. You win!`;
        scores.win += 1; // Update wins
    } else {
        resultEl.textContent = `You chose ${playerChoice}. The computer chose ${computerChoice}. You lose!`;
        scores.loss += 1; // Update losses
    }
    
    // Store updated scores in localStorage
    localStorage.setItem("scores", JSON.stringify(scores));
    updateScoresElement();
}

// Event listeners for player's choices
rockBtn.addEventListener("click", () => playRound("rock"));
paperBtn.addEventListener("click", () => playRound("paper"));
scissorsBtn.addEventListener("click", () => playRound("scissors"));

// Event listener for resetting scores
resetBtn.addEventListener("click", function() {
    scores.win = 0;
    scores.tie = 0;
    scores.loss = 0;
    localStorage.removeItem("scores"); // Remove scores from localStorage
    updateScoresElement();
});
