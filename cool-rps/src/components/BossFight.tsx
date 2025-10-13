import { useState, useEffect } from "react";
import styles from "./BossFight.module.scss";

export default function BossFight() {
  const [healthbarWidth, setHealthbarWidth] = useState(150);
  const [playerMove, setPlayerMove] = useState<string | null>(null);

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

  console.log(playerMove);

  return (
    <div className={styles.container}>
      <div className={styles.movesContainer}>
        <button onClick={() => setHealthbarWidth((prev) => prev - 50)}></button>
        <img
          onClick={() => setPlayerMove("rock")}
          className={`${styles.icon} ${styles.rock}`}
          src="pixel-rock.png"
        ></img>
        <img
          onClick={() => setPlayerMove("paper")}
          className={`${styles.icon} ${styles.paper}`}
          src="pixel-paper.png"
        ></img>
        <img
          onClick={() => setPlayerMove("scissors")}
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
