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
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);
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
    <div className={styles.font}>
      <div className={styles.appContainer}>
        <div className={styles.score}>
          <ScoreNotification prevScore={prevScore} score={score} />
          <p>Score: {score}</p>
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
            d="M50,362a220,220 0 1,1 400,0"
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
        <button
          className={styles.addMoves}
          onMouseEnter={() => setIsButtonHovered(true)}
          onFocus={() => setIsButtonHovered(true)}
          onBlur={() => setIsButtonHovered(false)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={() => setShowModal(true)}
        >
          +
        </button>
        {isButtonHovered && (
          <svg
            className={styles.buttonTitle}
            viewBox="0 0 120 120"
            width="120"
            height="120"
          >
            <path
              id="smallCurve"
              d="M16,90a10,10 0 1,1 88,0"
              fill="none"
              stroke="none"
            />
            <text width="500">
              <textPath xlinkHref="#smallCurve">add more moves!</textPath>
            </text>
          </svg>
        )}
      </div>
      {showModal && (
        <MovePicker
          setMoveList={setMoveList}
          moveList={moveList}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
export default App;
