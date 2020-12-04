import ReactDOM from "react-dom";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducer/rootReducer.js";
import VisualizerContainer from "./container/VisualizerContainer.js";
import "./index.scss";

const store = createStore(rootReducer);
ReactDOM.render(
  <Provider store={store}>
    <VisualizerContainer />
  </Provider>,
  document.querySelector("#root")
);
