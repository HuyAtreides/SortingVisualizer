import { colorBar, transition, getPosition } from "./animate.js";

async function hightLightSubArr(arr, finished, speed, pivotIndex) {
  for (let i = 0; i < arr.length; i++) {
    const bar = arr[i].bar;
    const x = +bar.getAttribute("transform").match(/-*[0-9]+/g)[0];
    const y = +bar.getAttribute("transform").match(/-*[0-9]+/g)[1];
    if (finished)
      await transition([x, y], [x, y - 250], bar, "finished", speed);
    else await transition([x, y], [x, y + 250], bar, "sub-array", speed);
  }
}

async function swap(arr, i, j, speed, isPivot) {
  const [xA, yA] = getPosition(arr, i);
  const [xB, yB] = getPosition(arr, j);
  let keyframe = "swap";
  if (isPivot) keyframe = "color-pivot";
  transition([xA, yA], [xA + (j - i) * 50, yA], arr[i].bar, keyframe);
  await transition(
    [xB, yB],
    [xB + (i - j) * 50, yB],
    arr[j].bar,
    "sorted",
    speed + 70
  );
  const tmp = arr[j];
  arr[j] = arr[i];
  arr[i] = tmp;
}

async function hightlightBar(bar, keyframe, speed) {
  colorBar([bar, keyframe]);
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, speed);
  });
}

async function partition(start, end, arr, speed) {
  const pivot = arr[start].value;
  await hightlightBar(arr[start].bar, "pivot", speed);
  let i = start;
  let j = end + 1;
  while (i < j) {
    while (i + 1 <= end && arr[++i].value <= pivot)
      await hightlightBar(arr[i].bar, "smaller-pivot", speed);
    if (i < j && j < end + 1) await hightlightBar(arr[i].bar, "compare", speed);
    while (arr[--j].value > pivot)
      await hightlightBar(arr[j].bar, "bigger-pivot", speed);
    await hightlightBar(arr[j].bar, i >= j ? "green-to-red" : "compare", speed);
    if (i < j) await swap(arr, i, j, speed, false);
  }
  await swap(arr, start, j, speed, true);
  return j;
}

async function quickSortHelper(start, end, arr, speed) {
  if (start < end) {
    await hightLightSubArr(arr.slice(start, end + 1), false, speed);
    const pivotIndex = await partition(start, end, arr, speed);
    await hightLightSubArr(arr.slice(start, end + 1), true, speed);
    await quickSortHelper(start, pivotIndex - 1, arr, speed);
    await quickSortHelper(pivotIndex + 1, end, arr, speed);
  }
}

export default quickSortHelper;
