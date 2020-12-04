import { colorBar, transition, getPosition } from "./animate.js";

async function swap(arr, j, speed) {
  const [xA, yA] = getPosition(arr, j);
  const [xB, yB] = getPosition(arr, j - 1);
  transition([xA, yA], [xA - 50, yA], arr[j].bar, "swap", speed);
  await transition([xB, yB], [xB + 50, yB], arr[j - 1].bar, "sorted", speed);
  const tmp = arr[j];
  arr[j] = arr[j - 1];
  arr[j - 1] = tmp;
}

async function moveBardown(arr, j, speed, unit) {
  const [x, y] = getPosition(arr, j);
  await transition([x, y], [x, y + unit], arr[j].bar, "", speed);
}

async function hightLightBar(arr, j, speed, keyframe) {
  colorBar([arr[j].bar, keyframe], [arr[j - 1].bar, keyframe]);
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, speed);
  });
}

async function insertionSortHelper(arr, speed) {
  for (let i = 2; i <= arr.length; i++) {
    let j = i - 1;
    await moveBardown(arr, j, speed, 250);
    while (j - 1 >= 0 && arr[j].value < arr[j - 1].value) {
      await hightLightBar(arr, j, speed, "compare");
      await swap(arr, j, speed);
      await hightLightBar(arr, j, speed, "finished");
      j--;
    }
    if (j - 1 >= 0) {
      await hightLightBar(arr, j, speed, "compare");
      await hightLightBar(arr, j, speed, "sorted");
      await hightLightBar(arr, j, speed, "finished");
    }
    await moveBardown(arr, j, speed, -250);
  }
  return arr;
}

export default insertionSortHelper;
