import React from "react";

const SpeedSelector = (props) => {
  const style = props.isVisualizing ? { color: "rgb(185, 15, 15)" } : {};

  const handleToggle = (event) => {
    if (props.isVisualizing) return;
    props.toggleDropDown(event.target);
  };

  const handleSetSpeed = (event) => {
    const speed = +event.target.value;
    props.setSpeed(speed);
  };

  return (
    <li
      id={props.dropDownSpeed ? "clicked-selector" : "selector"}
      className="speed"
      onClick={handleToggle}
      style={style}
    >
      <div className="selector" id="speed">
        Speed{" "}
        <span
          style={{
            borderTopColor: props.isVisualizing ? "rgb(185, 15, 15)" : "",
          }}
        ></span>
      </div>
      <div
        className="drop-down-speed"
        style={{ display: props.dropDownSpeed ? "flex" : "none" }}
      >
        <p>fast</p>
        <input
          type="range"
          min="1"
          max="100"
          className="speed-input"
          onChange={handleSetSpeed}
          value={(props.speed - 200) / 7}
        />
        <p>slow</p>
      </div>
    </li>
  );
};

export default SpeedSelector;
