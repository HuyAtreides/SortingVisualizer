import React from "react";

const VisualizeBtn = (props) => {
  let status = `Visualize ${props.algorithm}!`;

  if (props.isVisualizing) status = "Sorting";
  else if (props.sorted && props.sorted !== "change algorithm")
    status = "Sorted!";

  return (
    <li>
      <button
        className="btn"
        onClick={props.visualize}
        style={{
          backgroundColor: props.isVisualizing ? "rgb(185, 15, 15)" : "",
        }}
      >
        {status}
      </button>
    </li>
  );
};

export default VisualizeBtn;
