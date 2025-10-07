import { getResult } from "../utils/getResult";
import styles from "./Game.module.css";

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

  function playRound(move: string) {
    const compMove = generateComputerMove();
    setPlayerMove(move);
    setComputerMove(compMove);
    const result = getResult(move, compMove, moveList);
    if (result === 1) setScore((prev) => prev + 1);
    if (result === -1) setScore((prev) => prev - 1);
  }
  return (
    <div className={styles.container}>
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
