import styles from "./ScoreNotification.module.scss";

export default function ScoreNotification({ prevScore }) {
  let winner = {};
  if (prevScore === 0) winner = { type: "tie", score: "0" };
  if (prevScore === 1) winner = { type: "player", score: "+1" };
  if (prevScore === -1) winner = { type: "computer", score: "-1" };

  return (
    <div className={styles.notificationContainer}>
      <div className={`${styles[winner.type]} ${styles.notification}`}>
        {winner.score}
      </div>
    </div>
  );
}
