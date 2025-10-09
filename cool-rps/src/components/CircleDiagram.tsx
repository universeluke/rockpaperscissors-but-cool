import { useState } from "react";
import { getResult } from "../utils/getResult";
import styles from "./CircleDiagram.module.scss";

export default function CircleDiagram({ moveList, playRound }) {
  const [hovered, setHovered] = useState<number | null>();
  const radius = 200;
  const circle = 2 * Math.PI;

  const positions = moveList.map((move: string, i: number) => {
    const circleFraction = i / moveList.length;
    // angle of full circle in rads
    const angle = circleFraction * circle;
    // console.log(Math.cos(angle) * radius);
    //horizontal distance at angle
    // CAH adjacent = cos * hypotenuse
    const x = Math.cos(angle) * radius + radius;
    // SOH opposite = sin * hypotenuse
    const y = Math.sin(angle) * radius + radius;
    return { x, y };
  });

  // console.log(positions);

  // ONLY get winning moves, just draw winning arrows
  // winningMoves is an array of objects, each object describes a winning move
  //use existing getResult logic
  const winningMoves = [];
  for (let i = 0; i < moveList.length; i++) {
    for (let step = 0; step < moveList.length; step++) {
      if (i === step) continue;
      if (getResult(moveList[i], moveList[step], moveList) === 1) {
        winningMoves.push({ from: i, to: step });
      }
    }
  }
  // console.log(winningMoves);
  return (
    <div
      className={styles.bigCircle}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <svg className={styles.lines} width={radius * 2} height={radius * 2}>
        {winningMoves.map(({ from, to }, i) => {
          const posFrom = positions[from];
          const posTo = positions[to];
          let lineClass = styles.hiddenLine;
          if (from === hovered) {
            lineClass = styles.animatedLine;
          } else if (to === hovered) {
            lineClass = `${styles.animatedLine} ${styles.bad}`;
          }

          return (
            <line
              key={i}
              x1={posFrom.x}
              y1={posFrom.y}
              x2={posTo.x}
              y2={posTo.y}
              strokeWidth="2"
              className={lineClass}
            />
          );
        })}
      </svg>
      {positions.map((coords, i: number) => (
        <div
          key={i}
          className={`${styles.littleCircle} ${
            hovered === i ? styles.activeNode : ""
          }`}
          style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => playRound(moveList[i])}
        >
          {moveList[i]}
        </div>
      ))}
    </div>
  );
}
