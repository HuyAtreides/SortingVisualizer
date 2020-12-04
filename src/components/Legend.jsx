import React from "react";
import "./Legend.scss";

const Legend = () => {
  return (
    <div className="legend">
      <div>
        <div className="color" style={{ backgroundColor: "red" }}></div>
        <span>Compare</span>
      </div>
      <div>
        <div className="color" style={{ backgroundColor: "#218838" }}></div>
        <span>Sorted</span>
      </div>
      <div>
        <div
          className="color"
          style={{ backgroundColor: "rgb(255, 254, 106)" }}
        ></div>
        <span>Pivot (Quick Sort)</span>
      </div>
      <div>
        <div
          className="color"
          style={{ backgroundColor: "rgba(178, 67, 255, 0.75)" }}
        ></div>
        <span>Heapified (Heap Sort)</span>
      </div>
    </div>
  );
};
export default Legend;
