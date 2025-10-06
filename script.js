let moveList = ["rock", "paper", "scissors", "spock", "lizard"];
let score = 0;
let playAgain = true;
function generateComputerMove() {
  return moveList[Math.floor(Math.random() * moveList.length)];
}
// you LOSE to moves 1, 3, 5... ahead, WIN against 2, 4, 6... ahead
function getResult(playerMove, computerMove) {
  if (playerMove === computerMove) return 0;
  const n = moveList.length;
  const playerIndex = moveList.indexOf(playerMove);
  const computerIndex = moveList.indexOf(computerMove);
  // circular distance going forward around the move list
  const distance = (computerIndex - playerIndex + n) % n;
  if (distance % 2 === 1) {
    score--;
    return -1; // lose
  } else {
    score++;
    return 1; // win
  }
}
while (playAgain) {
  let playerMove = prompt(
    `Type your move: ${moveList.join(", ")}`
  ).toLowerCase();
  while (!moveList.includes(playerMove)) {
    playerMove = prompt(
      `Invalid move. Please type one of: ${moveList.join(", ")}`
    ).toLowerCase();
  }
  const computerMove = generateComputerMove();
  const result = getResult(playerMove, computerMove);
  alert(
    `I chose ${computerMove}! Score change: ${result}. Current score: ${score}.`
  );
  playAgain = confirm("Play again?");
  if (!playAgain) alert(`Game over. Final score: ${score}.`);
}
