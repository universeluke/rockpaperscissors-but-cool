import { useEffect, useState } from "react";
import styles from "./Game.module.scss";

export default function Game({ playerMove, computerMove, prevScore }) {
  const [comment, setComment] = useState({ comment: "", style: "" });
  const [animation, setAnimation] = useState(0);

  useEffect(() => {
    if (prevScore === 1) {
      setComment({ comment: "whatever i don't even care", style: "win" });
    }
    if (prevScore === -1) {
      setComment({ comment: "GET CRUSHED!!!!!!!!!", style: "loss" });
    }
    if (prevScore === 0) {
      setComment({ comment: "don't waste my time, fool", style: "draw" });
    }
    setAnimation((prev) => prev + 1);
  }, [prevScore, playerMove, computerMove]);

  return (
    <div>
      {playerMove && computerMove ? (
        <div className={styles.container}>
          <div key={animation} className={styles.sentence}>
            <p className={styles.first}>you picked {playerMove}...</p>
            <p className={styles.second}>i picked {computerMove}...</p>
            <p className={styles[comment.style]}>{comment.comment}</p>
          </div>
        </div>
      ) : (
        <p>make your move...</p>
      )}
    </div>
  );
}
