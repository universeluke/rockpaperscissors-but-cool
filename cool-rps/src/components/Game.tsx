export default function Game({
  moveList,
  playerMove,
  setPlayerMove,
  computerMove,
  setComputerMove,
  setScore,
}) {
  function generateComputerMove() {
    return moveList[Math.floor(Math.random() * moveList.length)];
  }

  // you LOSE to moves 1, 3, 5... ahead, WIN against 2, 4, 6... ahead
  function getResult(playerMove: string, computerMove: string) {
    if (playerMove === computerMove) return 0;
    const n = moveList.length;
    const playerIndex = moveList.indexOf(playerMove);
    const computerIndex = moveList.indexOf(computerMove);
    // circular distance around the array between 2 moves
    const distance = (computerIndex - playerIndex + n) % n;
    // if odd
    if (distance % 2 === 1) {
      setScore((prev: number) => prev - 1);
      return -1; // lose
      // if even
    } else {
      setScore((prev: number) => prev + 1);
      return 1; // win
    }
  }
  function playRound(move: string) {
    const compMove = generateComputerMove();
    setPlayerMove(move);
    setComputerMove(compMove);
    getResult(move, compMove);
  }
  return (
    <div>
      <div>
        {moveList.map((move) => (
          <button key={move} onClick={() => playRound(move)}>
            {move}
          </button>
        ))}
      </div>
      {playerMove && computerMove && (
        <p>
          u picked {playerMove}, i picked {""}
          {computerMove}
        </p>
      )}
    </div>
  );
}
