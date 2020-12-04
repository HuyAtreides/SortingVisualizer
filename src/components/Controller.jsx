import React from "react";
import "./Controller.scss";
import VisualizeBtn from "./ControlsBtn/VisualizeBtn.jsx";
import SpeedSelector from "./ControlsBtn/SpeedSelector.jsx";
import GenerateNewArr from "./ControlsBtn/GenerateNewArr.jsx";
import AlgoSelector from "./ControlsBtn/AlgoSelector.jsx";

const Controller = (props) => {
  return (
    <div className="header">
      <h2>Sorting Visualizer</h2>
      <ul className="controls">
        <AlgoSelector
          dropDownAlgorithms={props.dropDownAlgorithms}
          toggleDropDown={props.toggleDropDown}
          setAlgorithm={props.setAlgorithm}
          isVisualizing={props.isVisualizing}
        />
        <VisualizeBtn
          isVisualizing={props.isVisualizing}
          sorted={props.sorted}
          visualize={props.visualize}
          algorithm={props.algorithm}
        />
        <GenerateNewArr
          generateNewArray={props.generateNewArray}
          isVisualizing={props.isVisualizing}
          array={props.array}
        />
        <SpeedSelector
          isVisualizing={props.isVisualizing}
          dropDownSpeed={props.dropDownSpeed}
          toggleDropDown={props.toggleDropDown}
          setSpeed={props.setSpeed}
          speed={props.speed}
        />
      </ul>
    </div>
  );
};
export default Controller;
