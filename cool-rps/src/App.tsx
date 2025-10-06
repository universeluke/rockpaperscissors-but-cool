import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import MovePicker from "./components/MovePicker";

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
      <img src="./diagram.webp" />
    </div>
  );
}
export default App;
