import { useEffect, useState } from "react";
import styles from "./Game.module.scss";

export default function Game({ playerMove, computerMove, prevScore }) {
  const [comment, setComment] = useState({ comment: "", style: "" });

  useEffect(() => {
    if (prevScore === 1) {
      setComment({ comment: "whatever i don't even care", style: "win" });
    }
    if (prevScore === -1) {
      setComment({ comment: "GET CRUSHED!!!!!!", style: "loss" });
    }
    if (prevScore === 0) {
      setComment({ comment: "don't waste my time, fool", style: "draw" });
    }
  }, [prevScore, playerMove]);

  return (
    <div className={styles.container}>
      {playerMove && computerMove ? (
        <div className={styles.sentence}>
          <p className={styles.first}>you picked {playerMove}...</p>
          <p className={styles.second}>i picked {computerMove}...</p>
          <p className={`${styles[comment.style]} ${styles.comment}`}>
            {comment.comment}
          </p>
        </div>
      ) : (
        <p>make your move...</p>
      )}
    </div>
  );
}
