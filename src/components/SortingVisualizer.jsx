import React, { useEffect } from "react";
import mergeSortHelper from "../algorithms/mergeSortHelper.js";
import bubbleSortHelper from "../algorithms/bubbleSortHelper.js";
import quickSortHelper from "../algorithms/quickSortHelper.js";
import insertionSortHelper from "../algorithms/insertionSortHelper.js";
import MaxHeap from "../algorithms/MaxHeap.js";
import ControllerContainer from "../container/ControllerContainer.js";
import Legend from "./Legend.jsx";
import Bars from "./Bars.jsx";

const SortingVisualizer = (props) => {
  const initialArr = () => {
    const arr = props.array.map((element, index) => {
      return {
        bar: document.querySelector(`#r${index}`),
        value: element.value,
      };
    });
    return arr;
  };

  const mergeSort = async (speed) => {
    window.scroll({ top: 50, left: 0, behavior: "smooth" });
    const sortedArr = initialArr();
    await mergeSortHelper(0, sortedArr.length - 1, sortedArr, speed);
    window.scroll({ top: -50, left: 0, behavior: "smooth" });
    props.sorted();
  };

  const quickSort = async (speed) => {
    window.scroll({ top: 50, left: 0, behavior: "smooth" });
    const sortedArr = initialArr();
    await quickSortHelper(0, sortedArr.length - 1, sortedArr, speed);
    window.scroll({ top: -50, left: 0, behavior: "smooth" });
    props.sorted();
  };

  const bubbleSort = async (speed) => {
    const sortedArr = initialArr();
    await bubbleSortHelper(sortedArr, speed);
    props.sorted();
  };

  const insertionSort = async (speed) => {
    window.scroll({ top: 50, left: 0, behavior: "smooth" });
    const sortedArr = initialArr();
    await insertionSortHelper(sortedArr, speed);
    window.scroll({ top: -50, left: 0, behavior: "smooth" });
    props.sorted();
  };

  const heapSort = async (speed) => {
    window.scroll({ top: 50, left: 0, behavior: "smooth" });
    const sortedArr = initialArr();
    const heap = new MaxHeap();
    await heap.sort(sortedArr, speed);
    window.scroll({ top: -50, left: 0, behavior: "smooth" });
    props.sorted();
  };

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

  useEffect(() => {
    if (props.isVisualizing) {
      if (props.isSorted) reset();
      setTimeout(() => {
        switch (props.algorithm) {
          case "Bubble Sort":
            bubbleSort(props.speed);
            break;
          case "Merge Sort":
            mergeSort(props.speed);
            break;
          case "Quick Sort":
            quickSort(props.speed);
            break;
          case "Insertion Sort":
            insertionSort(props.speed);
            break;
          default:
            heapSort(props.speed);
            break;
        }
      }, 1000);
    }
  });

  return (
    <div className="sorting-visualizer">
      <ControllerContainer />
      <Legend />
      <Bars bars={props.array} />
    </div>
  );
};

export default SortingVisualizer;
