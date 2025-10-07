import { useState } from "react";
import { getResult } from "../utils/getResult";
import styles from "./CircleDiagram.module.scss";

export default function CircleDiagram({ moveList }) {
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

  console.log(positions);

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
  console.log(winningMoves);
  return (
    <div
      className={styles.bigCircle}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <svg className={styles.lines} width={radius * 2} height={radius * 2}>
        {/* <defs>
          <marker
            id="arrowhead"
            orient="auto"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            markerUnits="strokeWidth"
          >
            <polygon points="0 2.5, 5 5, 0, 7.5" fill="green" />
          </marker>
        </defs> */}
        {winningMoves.map(({ from, to }, i) => {
          //TODO find distance between 2 points
          //shorten line at both ends so that the head shows
          const posFrom = positions[from];
          const posTo = positions[to];
          return (
            <line
              key={i}
              x1={posFrom.x}
              y1={posFrom.y}
              x2={posTo.x}
              y2={posTo.y}
              strokeWidth="2"
              // markerEnd="url(#arrowhead)"
              className={
                hovered === from ? styles.animatedLine : styles.hiddenLine
              }
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
        >
          {moveList[i]}
        </div>
      ))}
    </div>
  );
}
