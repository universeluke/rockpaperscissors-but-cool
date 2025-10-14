import { useState, useEffect, useRef } from "react";
import styles from "./BossFight.module.scss";
import { getResult } from "../utils/getResult";

interface BossFightProps {
  healthbarWidth: number;
  setHealthbarWidth: React.Dispatch<React.SetStateAction<number>>;
  playerHealth: number;
  setPlayerHealth: React.Dispatch<React.SetStateAction<number>>;
}

export default function BossFight({
  healthbarWidth,
  setHealthbarWidth,
  playerHealth,
  setPlayerHealth,
}: BossFightProps) {
  const [playerMove, setPlayerMove] = useState<string | null>(null);
  const [loser, setLoser] = useState<string>("");
  const [notifKey, setNotifKey] = useState(0);

  //needs to be useRef in order to stop the current music playing
  const bossMusicRef = useRef<HTMLAudioElement | null>(null);

  const moveList = ["rock", "paper", "scissors"];

  useEffect(() => {
    setHealthbarWidth(200);
    setPlayerHealth(200);
  }, []);

  useEffect(() => {
    bossMusicRef.current = new Audio("/BossMusic.mp3");
    bossMusicRef.current.volume = 0.1;
    setTimeout(() => {
      if (bossMusicRef.current) {
        bossMusicRef.current.play();
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (playerHealth === 0 || healthbarWidth === 0) {
      bossMusicRef.current?.pause();
    }
  }, [playerHealth, healthbarWidth]);

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
    setPlayerMove(move);
    setNotifKey((prev) => prev + 1);
    const result = getResult(move, compMove, moveList);
    if (result === 1) {
      setHealthbarWidth((prev) => prev - 50);
      setLoser("computer");
    } else if (result === -1) {
      setPlayerHealth((prev) => prev - 50);
      setLoser("player");
    } else {
      setLoser("tie");
    }
    setTimeout(() => setLoser(""), 800);
  }

  if (loser === "computer") {
    const audio = new Audio("./hit.mp3");
    audio.volume = 0.5;
    audio.play();
  } else if (loser === "player") {
    const audio = new Audio("./damage.mp3");
    audio.volume = 0.5;
    audio.play();
  }

  return (
    <div className={styles.wholeContainer}>
      {loser === "tie" && (
        <div key={`tie-${notifKey}`} className={styles.tieNotif}>
          Draw!
        </div>
      )}
      <div className={styles.playerHealth} style={playerHealthStyle}>
        {playerHealth}
        {loser === "player" && (
          <div key={`player-${notifKey}`} className={styles.playerHealthNotif}>
            -50
          </div>
        )}
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
        <div className={styles.healthbar} style={healthbarStyle}>
          {healthbarWidth}
          {loser === "computer" && (
            <div
              key={`computer-${notifKey}`}
              className={styles.computerHealthNotif}
            >
              -50
            </div>
          )}
        </div>
        <img className={styles.boss} src="boss-pixel.png"></img>
      </div>
    </div>
  );
}
