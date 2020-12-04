import { connect } from "react-redux";
import * as actions from "../actions/actionCreator.js";
import Controller from "../components/Controller.jsx";

const mapStateToProps = (state) => ({
  dropDownAlgorithms: state.dropDownAlgorithms,
  dropDownSpeed: state.dropDownSpeed,
  isVisualizing: state.isVisualizing,
  algorithm: state.algorithm,
  sorted: state.sorted,
  array: state.array,
  speed: state.speed,
});

const mapDispatchToProps = (dispatch) => ({
  setAlgorithm: (algorithmName) => {
    dispatch(actions.setAlgorithm(algorithmName));
  },
  toggleDropDown: (target) => {
    dispatch(actions.toggleDropDown(target));
  },
  visualize: () => {
    dispatch(actions.visualize());
  },
  generateNewArray: (newArray) => {
    dispatch(actions.generateNewArray(newArray));
  },
  setSpeed: (speed) => {
    dispatch(actions.setSpeed(speed));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
