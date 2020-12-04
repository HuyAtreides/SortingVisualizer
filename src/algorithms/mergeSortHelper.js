import { transition, colorBar } from "./animate.js";

async function hightLightBar(arr, finished, speed) {
  for (let i = 0; i < arr.length; i++) {
    const bar = arr[i].bar;
    const x = +bar.getAttribute("transform").match(/-*[0-9]+/g)[0];
    const y = +bar.getAttribute("transform").match(/-*[0-9]+/g)[1];
    if (finished) colorBar([bar, "finished"]);
    else await transition([x, y], [x, y + 250], bar, "sub-array", speed);
  }
}

const getPosition = (bar, realIndex) => {
  const [xA, yA] = bar.getAttribute("transform").match(/-*[0-9]+/g);
  const xB = +xA + realIndex * 50;
  const yB = +yA - 250;
  return [+xA, +yA, xB, yB];
};

async function merge(start, middle, end, arr, speed) {
  const arrA = arr.slice(start, middle + 1);
  const arrB = arr.slice(middle + 1, end + 1);
  let iA = 0;
  let iB = 0;
  let i = start;
  await hightLightBar(arr.slice(start, end + 1), false, speed);
  while (iA < arrA.length && iB < arrB.length) {
    let smaller;
    let smallerElementIndex;
    colorBar([arrA[iA].bar, "compare"], [arrB[iB].bar, "compare"]);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, speed);
    });
    if (arrA[iA].value < arrB[iB].value) {
      smaller = arrA[iA];
      smallerElementIndex = iA++ + start;
    } else {
      smaller = arrB[iB];
      smallerElementIndex = iB++ + middle + 1;
    }
    const [xA, yA, xB, yB] = getPosition(smaller.bar, i - smallerElementIndex);
    await transition([xA, yA], [xB, yB], smaller.bar, "sorted", speed + 70);
    arr[i++] = smaller;
  }
  while (iA < arrA.length) {
    const [xA, yA, xB, yB] = getPosition(arrA[iA].bar, i - iA - start);
    await transition([xA, yA], [xB, yB], arrA[iA].bar, "sorted", speed + 70);
    arr[i++] = arrA[iA++];
  }
  while (iB < arrB.length) {
    const [xA, yA, xB, yB] = getPosition(arrB[iB].bar, i - iB - middle - 1);
    await transition([xA, yA], [xB, yB], arrB[iB].bar, "sorted", speed + 70);
    arr[i++] = arrB[iB++];
  }
  await hightLightBar(arr.slice(start, end + 1), true);
}

async function mergeSortHelper(start, end, arr, speed) {
  if (start < end) {
    const middle = Math.floor((start + end) / 2);
    await mergeSortHelper(start, middle, arr, speed);
    await mergeSortHelper(middle + 1, end, arr, speed);
    await merge(start, middle, end, arr, speed);
  }
}

export default mergeSortHelper;
