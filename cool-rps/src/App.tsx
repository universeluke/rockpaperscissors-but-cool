import { useState } from "react";
import styles from "./App.module.scss";
import Game from "./components/Game";
import MovePicker from "./components/MovePicker";
import CircleDiagram from "./components/CircleDiagram";
import { getResult } from "./utils/getResult";
import ScoreNotification from "./components/ScoreNotification";

function App() {
  const [moveList, setMoveList] = useState<string[]>([
    // loses to move + odd, beats move + even
    "rock",
    "paper",
    "scissors",
    "spock",
    "lizard",
  ]);
  const [score, setScore] = useState<number>(0);
  const [playerMove, setPlayerMove] = useState<string>("");
  const [computerMove, setComputerMove] = useState<string>("");
  const [prevScore, setPrevScore] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  function generateComputerMove() {
    return moveList[Math.floor(Math.random() * moveList.length)];
  }

  function playRound(move: string) {
    const compMove = generateComputerMove();
    setPlayerMove(move);
    setComputerMove(compMove);
    const result = getResult(move, compMove, moveList);
    if (result === 1) {
      setScore((prev) => prev + 1);
      setPrevScore(1);
    }
    if (result === -1) {
      setScore((prev) => prev - 1);
      setPrevScore(-1);
    }
    if (result === 0) setPrevScore(0);
  }

  // console.log(moveList);

  return (
    <>
      <div className={styles.appContainer}>
        <div className={styles.score}>
          <p>Score: {score}</p>
          <ScoreNotification prevScore={prevScore} score={score} />
        </div>
        <Game
          playerMove={playerMove}
          computerMove={computerMove}
          prevScore={prevScore}
        />
        <svg
          className={styles.title}
          viewBox="0 0 500 500"
          width="600"
          height="600"
        >
          <path
            id="curve"
            d="M50,370a220,220 0 1,1 400,0"
            fill="none"
            stroke="none"
          />
          <text width="500">
            <textPath xlinkHref="#curve">
              Welcome to the coolest game of{" "}
              {moveList.map((move) => `${move} `)}
              you've ever seen
            </textPath>
          </text>
        </svg>
        <CircleDiagram moveList={moveList} playRound={playRound} />
        <button className={styles.addMoves} onClick={() => setShowModal(true)}>
          +
        </button>
      </div>
      {showModal && (
        <MovePicker
          setMoveList={setMoveList}
          moveList={moveList}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
export default App;
