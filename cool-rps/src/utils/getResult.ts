// you LOSE to moves 1, 3, 5... ahead, WIN against 2, 4, 6... ahead

export function getResult(
  playerMove: string,
  computerMove: string,
  moveList: string[]
) {
  if (playerMove === computerMove) return 0;
  const n = moveList.length;
  const playerIndex = moveList.indexOf(playerMove);
  const computerIndex = moveList.indexOf(computerMove);
  // circular distance around the array between 2 moves
  const distance = (computerIndex - playerIndex + n) % n;
  // if odd
  if (distance % 2 === 1) {
    return -1; // lose
    // if even
  } else {
    return 1; // win
  }
}
