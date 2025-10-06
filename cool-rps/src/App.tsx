import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
function App() {
  const [moveList, setMoveList] = useState<string[]>([
    "rock",
    "paper",
    "scissors",
    "spock",
    "lizard",
  ]);
  const [score, setScore] = useState<number>(0);
  const [playerMove, setPlayerMove] = useState<string>("");
  const [computerMove, setComputerMove] = useState<string>("");
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
      setScore((prev) => prev - 1);
      return -1; // lose
      // if even
    } else {
      setScore((prev) => prev + 1);
      return 1; // win
    }
  }
  function playRound() {
    const playerMove = prompt(`Type your move: ${moveList.join(", ")}`);

    const computerMove = generateComputerMove();
    const result = getResult(playerMove, computerMove);
    alert(
      `I chose ${computerMove}! Score change: ${result}. Current score: ${
        score + result
      }.`
    );
  }
  return (
    <div className="App">
      <h1>Rock Paper Scissors Spock Lizard</h1>
      <p>Score: {score}</p>
      <button onClick={playRound}>Play Round</button>
      <Game
        moveList={moveList}
        playerMove={playerMove}
        setPlayerMove={setPlayerMove}
        computerMove={computerMove}
        setComputerMove={setComputerMove}
        score={score}
        setScore={setScore}
      />
    </div>
  );
}
export default App;
