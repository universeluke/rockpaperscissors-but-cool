import { useState, useEffect } from "react";
import styles from "./ScoreNotification.module.scss";

export default function ScoreNotification({ prevScore, score }) {
  const [visible, setVisible] = useState(false);

  let winner = {};
  if (prevScore === 0) winner = { type: "tie", score: "0" };
  if (prevScore === 1) winner = { type: "player", score: "+1" };
  if (prevScore === -1) winner = { type: "computer", score: "-1" };

  useEffect(() => {
    if (prevScore === null || prevScore === undefined) return;

    setVisible(true);
    // match css
    const timer = setTimeout(() => setVisible(false), 600);
    return () => clearTimeout(timer);
  }, [prevScore, score]);

  if (!visible) return null;
  return (
    <div className={styles.notificationContainer}>
      <div className={`${styles[winner.type]} ${styles.notification}`}>
        {winner.score}
      </div>
    </div>
  );
}
