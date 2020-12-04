import React from "react";
import "./Bars.scss";

const Bars = (props) => {
  const groups = props.bars.map((bar, index) => {
    return (
      <g
        transform={`translate(${bar.translate[0]}, ${bar.translate[1]})`}
        key={`bar-${index}`}
        id={`r${index}`}
      >
        <rect width="45" height={bar.height} style={{}}></rect>
        <text x={`${45 / 2}`} y={bar.value < 7 ? -7 : bar.height - 7}>
          {bar.value}
        </text>
      </g>
    );
  });

  return (
    <svg width="1320" height="652">
      {groups}
    </svg>
  );
};

export default Bars;
