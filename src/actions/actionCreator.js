const visualize = () => ({
  type: "visualize",
});

const generateNewArray = (newArray) => ({
  type: "generateNewArray",
  payload: newArray,
});

const sorted = () => ({
  type: "sorted",
});

const setAlgorithm = (algorithmName) => ({
  type: "setAlgorithm",
  payload: algorithmName,
});

const setSpeed = (speed) => ({
  type: "setSpeed",
  payload: speed,
});

const toggleDropDown = (target) => ({
  type: "toggleDropDown",
  payload: target,
});

export {
  toggleDropDown,
  setSpeed,
  setAlgorithm,
  visualize,
  generateNewArray,
  sorted,
};
