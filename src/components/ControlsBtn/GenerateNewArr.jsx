import React from "react";
import arrayGenerator from "../../arrayGenerator.js";

const GenerateNewArr = (props) => {
  const reset = () => {
    props.array.forEach((element, index) => {
      const bar = document.querySelector(`#r${index}`);
      const rect = bar.querySelector("rect");
      const prevX = element.translate[0];
      const prevY = element.translate[1];
      bar.setAttribute("transform", `translate(${prevX}, ${prevY})`);
      rect.style = "";
    });
  };

  const handleGenerate = () => {
    if (props.isVisualizing) return;
    props.generateNewArray(arrayGenerator());
    reset();
  };

  const style = props.isVisualizing ? { color: "rgb(185, 15, 15)" } : {};
  return (
    <li style={style}>
      <div className="generate" onClick={handleGenerate}>
        Generate New Array
      </div>
    </li>
  );
};

export default GenerateNewArr;
