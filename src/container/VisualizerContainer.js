import { connect } from "react-redux";
import * as actions from "../actions/actionCreator.js";
import SortingVisualizer from "../components/SortingVisualizer.jsx";

const mapStateToProps = (state) => ({
  array: state.array,
  speed: state.speed,
  isVisualizing: state.isVisualizing,
  isSorted: state.sorted,
  algorithm: state.algorithm,
});

const mapDispatchToProps = (dispatch) => ({
  sorted: () => {
    dispatch(actions.sorted());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SortingVisualizer);
