import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import MovePicker from "./components/MovePicker";
import CircleDiagram from "./components/CircleDiagram";
import { getResult } from "./utils/getResult";

function App() {
  const [moveList, setMoveList] = useState<string[]>([
    // loses to move + odd, beats move + even
    "rock",
    "paper",
    "scissors",
    "spock",
    "lizard",
    "gun",
    "laser",
  ]);
  const [score, setScore] = useState<number>(0);
  const [playerMove, setPlayerMove] = useState<string>("");
  const [computerMove, setComputerMove] = useState<string>("");

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
    <div className="App">
      <h1>Rock Paper Scissors Spock Lizard</h1>
      <p>Score: {score}</p>
      <Game
        moveList={moveList}
        playerMove={playerMove}
        setPlayerMove={setPlayerMove}
        computerMove={computerMove}
        setComputerMove={setComputerMove}
        setScore={setScore}
      />
      <MovePicker setMoveList={setMoveList} />
      <CircleDiagram moveList={moveList} playRound={playRound} />
      {/* <img src="./diagram.webp" /> */}
    </div>
  );
}
export default App;
