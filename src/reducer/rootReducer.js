import arrayGenerator from "../arrayGenerator.js";

const rootReducer = (
  state = {
    array: arrayGenerator(),
    algorithm: "Merge Sort",
    speed: 250,
    isVisualizing: false,
    sorted: false,
    dropDownAlgorithms: false,
    dropDownSpeed: false,
  },
  action
) => {
  const newState = { ...state };
  switch (action.type) {
    case "visualize":
      if (state.isVisualizing) return state;
      newState.isVisualizing = true;
      newState.dropDownAlgorithms = false;
      newState.dropDownSpeed = false;
      return newState;
    case "setSpeed":
      newState.speed = action.payload * 7 + 200;
      return newState;
    case "setAlgorithm":
      newState.algorithm = action.payload;
      newState.sorted = "change algorithm";
      return newState;
    case "generateNewArray":
      newState.array = action.payload;
      newState.sorted = false;
      return newState;
    case "toggleDropDown":
      const className = action.payload.getAttribute("class");
      const id = action.payload.getAttribute("id");
      if (className === "speed" || id === "speed")
        newState.dropDownSpeed = !state.dropDownSpeed;
      else if (className === "algorithms" || id === "algorithms")
        newState.dropDownAlgorithms = !state.dropDownAlgorithms;
      else if (id === "algorithm-name")
        newState.dropDownAlgorithms = !state.dropDownAlgorithms;
      return newState;
    case "sorted":
      newState.isVisualizing = false;
      newState.sorted = true;
      return newState;
    default:
      return newState;
  }
};

export default rootReducer;
