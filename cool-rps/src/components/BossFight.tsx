import { useState, useEffect } from "react";
import styles from "./BossFight.module.scss";
import { getResult } from "../utils/getResult";

export default function BossFight() {
  const [healthbarWidth, setHealthbarWidth] = useState(200);
  const [playerHealth, setPlayerHealth] = useState(200);
  const [playerMove, setPlayerMove] = useState<string | null>(null);

  const moveList = ["rock", "paper", "scissors"];

  useEffect(() => {
    const audio = new Audio("/BossMusic.mp3");
    audio.volume = 0.1;
    setTimeout(() => {
      audio.play();
    }, 1000);
  }, []);

  const healthbarStyle = {
    width: healthbarWidth,
  };

  const playerHealthStyle = {
    width: playerHealth,
  };

  console.log(playerMove);

  function generateComputerMove() {
    return moveList[Math.floor(Math.random() * moveList.length)];
  }

  function playRound(move: string) {
    const compMove = generateComputerMove();
    console.log(compMove, "compMove");
    setPlayerMove(move);
    const result = getResult(move, compMove, moveList);
    console.log(result);
    if (result === 1) {
      setHealthbarWidth((prev) => prev - 50);
    } else if (result === -1) {
      setPlayerHealth((prev) => prev - 50);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.playerHealth} style={playerHealthStyle}>
        LIFE
      </div>
      <div className={styles.movesContainer}>
        <img
          onClick={() => playRound("rock")}
          className={`${styles.icon} ${styles.rock}`}
          src="pixel-rock.png"
        ></img>
        <img
          onClick={() => playRound("paper")}
          className={`${styles.icon} ${styles.paper}`}
          src="pixel-paper.png"
        ></img>
        <img
          onClick={() => playRound("scissors")}
          className={`${styles.icon} ${styles.scissors}`}
          src="pixel-scissors.png"
        ></img>
      </div>
      <div className={styles.bossContainer}>
        <div className={styles.healthbar} style={healthbarStyle}></div>
        <img className={styles.boss} src="boss-pixel.png"></img>
      </div>
    </div>
  );
}
