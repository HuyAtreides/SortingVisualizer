import React from "react";

const AlgoSelector = (props) => {
  const handleToggle = (event) => {
    if (props.isVisualizing) return;
    props.toggleDropDown(event.target);
  };

  const handleSetAlgorithm = (event) => {
    const algorithmName = event.currentTarget.getAttribute("value");
    props.setAlgorithm(algorithmName);
  };

  const style = props.isVisualizing ? { color: "rgb(185, 15, 15)" } : {};
  return (
    <li
      id={props.dropDownAlgorithms ? "clicked-selector" : "selector"}
      className="algorithms"
      onClick={handleToggle}
      style={style}
    >
      <div className="selector" id="algorithms">
        Algorithms{" "}
        <span
          style={{
            borderTopColor: props.isVisualizing ? "rgb(185, 15, 15)" : "",
          }}
        ></span>
      </div>
      <div
        className="drop-down-algorithms"
        style={{ display: props.dropDownAlgorithms ? "block" : "none" }}
      >
        <p id="algorithm-name" value="Bubble Sort" onClick={handleSetAlgorithm}>
          Bubble Sort
        </p>
        <p
          id="algorithm-name"
          value="Insertion Sort"
          onClick={handleSetAlgorithm}
        >
          Insertion Sort
        </p>
        <p id="algorithm-name" value="Merge Sort" onClick={handleSetAlgorithm}>
          Merge Sort
        </p>
        <p id="algorithm-name" value="Quick Sort" onClick={handleSetAlgorithm}>
          Quick Sort
        </p>
        <p id="algorithm-name" value="Heap Sort" onClick={handleSetAlgorithm}>
          Heap Sort
        </p>
      </div>
    </li>
  );
};

export default AlgoSelector;
