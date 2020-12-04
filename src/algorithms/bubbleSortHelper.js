import { transition, colorBar, getPosition } from "./animate.js";

async function hightlight(arr, j, keyframe, speed) {
  colorBar([arr[j].bar, keyframe], [arr[j + 1].bar, keyframe]);
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, speed);
  });
}

async function swap(arr, j, speed) {
  const [xA, yA] = getPosition(arr, j);
  const [xB, yB] = getPosition(arr, j + 1);
  transition([+xA, +yA], [+xA + 50, +yA], arr[j].bar, "swap", speed);
  await transition(
    [+xB, +yB],
    [+xB - 50, +yB],
    arr[j + 1].bar,
    "sorted",
    speed
  );
  const tmp = arr[j];
  arr[j] = arr[j + 1];
  arr[j + 1] = tmp;
}

async function colorCompletedSort(arr, speed) {
  arr.forEach((element) => {
    colorBar([element.bar, "finished"]);
  });
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, speed);
  });
}

async function colorSortedBar(arr, index, speed) {
  colorBar([arr[index].bar, "mark-as-sorted"]);
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, speed);
  });
}

async function bubbleSortHelper(arr, speed) {
  for (let i = 0; i < arr.length; i++) {
    let doesSwap = false;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      await hightlight(arr, j, "compare", speed);
      if (arr[j].value > arr[j + 1].value) {
        await swap(arr, j, speed);
        doesSwap = true;
      } else await hightlight(arr, j, "sorted", speed);
      await hightlight(arr, j, "finished", speed);
    }
    await colorSortedBar(arr, arr.length - 1 - i, speed);
    if (!doesSwap) {
      await colorCompletedSort(arr, speed);
      break;
    }
  }
}

export default bubbleSortHelper;
