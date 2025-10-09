import { useState } from "react";
import styles from "./MovePicker.module.scss";

export default function MovePicker({ moveList, setMoveList, setShowModal }) {
  const [step, setStep] = useState(1);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [beats, setBeats] = useState("");

  const addFirst = () => {
    if (!first) return;
    setStep(2);
  };

  const addSecond = () => {
    if (!second || !beats) return;
    const index = moveList.indexOf(beats);
    const isOdd = index % 2 === 1;
    let newList;
    if (isOdd) {
      newList = [...moveList, first, second];
    } else newList = [...moveList, second, first];
    setMoveList(newList);
    setShowModal(false);
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <button
          className={styles.closeButton}
          onClick={() => setShowModal(false)}
        >
          X
        </button>

        {step === 1 && (
          <div className={styles.field}>
            <label>first addition:</label>
            <input value={first} onChange={(e) => setFirst(e.target.value)} />
            <button className={styles.modalButton} onClick={addFirst}>
              ok
            </button>
          </div>
        )}
        {step === 2 && (
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>second addition:</label>
              <input
                value={second}
                onChange={(e) => setSecond(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>beats:</label>
              <select value={beats} onChange={(e) => setBeats(e.target.value)}>
                <option value="">choose wisely</option>
                {moveList.map((move, i) => (
                  <option key={i} value={move}>
                    {move}
                  </option>
                ))}
              </select>
            </div>
            <button className={styles.modalButton} onClick={addSecond}>
              ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
