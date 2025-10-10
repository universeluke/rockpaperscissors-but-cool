import { useState, useEffect } from "react";
import styles from "./ScoreNotification.module.scss";

interface ScoreNotificationProps {
  prevScore: number | null;
  score: number;
}

interface Winner {
  type: string;
  score: string;
}

export default function ScoreNotification({
  prevScore,
  score,
}: ScoreNotificationProps) {
  const [visible, setVisible] = useState(false);

  let winner: Winner = { type: "", score: "" };
  if (prevScore === 0) winner = { type: "tie", score: "0" };
  if (prevScore === 1) winner = { type: "player", score: "+1" };
  if (prevScore === -1) winner = { type: "computer", score: "-1" };

  useEffect(() => {
    if (prevScore === null || prevScore === undefined) return;

    setVisible(false);
    // match css
    //such a janky horrible fix, just to reset the state each time
    const timer = setTimeout(() => setVisible(true), 10);
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
