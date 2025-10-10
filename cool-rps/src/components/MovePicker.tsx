import { useState } from "react";
import styles from "./MovePicker.module.scss";
import FocusLock from "react-focus-lock";

interface MovePickerProps {
  moveList: string[];
  setMoveList: React.Dispatch<React.SetStateAction<string[]>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MovePicker({
  moveList,
  setMoveList,
  setShowModal,
}: MovePickerProps) {
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

  const handleEsc = (e) => {
    console.log(e, "e");
    if (e.key === "Escape") {
      return setShowModal(false);
    }
  };

  window.addEventListener("keydown", handleEsc);

  return (
    <FocusLock>
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
              <input
                autoFocus
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
              <button className={styles.modalButton} onClick={addFirst}>
                add
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
                <select
                  value={beats}
                  onChange={(e) => setBeats(e.target.value)}
                >
                  <option value="">choose wisely</option>
                  {moveList.map((move, i) => (
                    <option key={i} value={move}>
                      {move}
                    </option>
                  ))}
                </select>
              </div>
              <button className={styles.modalButton} onClick={addSecond}>
                confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </FocusLock>
  );
}
