import styles from "./BossFight.module.scss";

export default function BossFight() {
  const audio = new Audio("/BossMusic.mp3");
  audio.volume = 0.1;
  setTimeout(() => {
    audio.play();
  }, 1000);

  return (
    <div className={styles.container}>
      <div className={styles.movesContainer}>
        <img
          className={`${styles.icon} ${styles.rock}`}
          src="pixel-rock.png"
        ></img>
        <img
          className={`${styles.icon} ${styles.paper}`}
          src="pixel-paper.png"
        ></img>
        <img
          className={`${styles.icon} ${styles.scissors}`}
          src="pixel-scissors.png"
        ></img>
      </div>
      <img className={styles.boss} src="boss-pixel.png"></img>
    </div>
  );
}
