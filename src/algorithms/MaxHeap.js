import { colorBar, transition } from "./animate.js";

const getPosition = (bar) => {
  const [x, y] = bar.getAttribute("transform").match(/-*[0-9]+/g);
  return [+x, +y];
};

async function hightLightBar(arr, i, j, speed, keyframe) {
  colorBar([arr[i].bar, keyframe], [arr[j].bar, keyframe]);
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, speed);
  });
}

async function swap(arr, index, swapIndex, speed, heapify) {
  const [xA, yA] = getPosition(arr[index].bar);
  const [xB, yB] = getPosition(arr[swapIndex].bar);
  let tmp = xA + (swapIndex - index) * 50;
  let keyframes = ["swap", "sorted"];
  if (heapify) keyframes = ["heap-swap", "heap-sorted"];
  transition([xA, yA], [tmp, yA], arr[index].bar, keyframes[0]);
  let tmp2 = xB + (index - swapIndex) * 50;
  await transition(
    [xB, yB],
    [tmp2, yB],
    arr[swapIndex].bar,
    keyframes[1],
    speed + 100
  );
  let tmp3 = arr[index];
  arr[index] = arr[swapIndex];
  arr[swapIndex] = tmp3;
}

async function moveBarDown(heap, speed, unit, keyframe) {
  for (let i = 0; i < heap.length; i++) {
    if (heap[i]) {
      const [x, y] = getPosition(heap[i].bar);
      await transition([x, y], [x, y + unit], heap[i].bar, keyframe, speed);
    }
  }
}

function MaxHeap() {
  this.heap = [null];

  this.insert = async function (element, speed) {
    await moveBarDown([element], speed, 250, "heapify");
    this.heap.push(element);
    let index = this.heap.length - 1;
    let parentIndex = Math.floor(index / 2);
    while (index > 1 && this.heap[parentIndex].value < element.value) {
      await hightLightBar(this.heap, index, parentIndex, speed, "heap-compare");
      await swap(this.heap, index, parentIndex, speed, true);
      await hightLightBar(
        this.heap,
        index,
        parentIndex,
        speed,
        "heap-finished"
      );
      index = parentIndex;
      parentIndex = Math.floor(index / 2);
    }
  };

  this.checkLeftAndRightChild = (heap, index, lastElement) => {
    const rightChild = index * 2 + 1;
    const leftChild = index * 2;
    const isrightChildValid = rightChild < heap.length;
    const isleftChildValid = leftChild < heap.length;
    if (isleftChildValid && heap[leftChild].value >= lastElement) return true;
    if (isrightChildValid && heap[rightChild].value >= lastElement) return true;
    return false;
  };

  this.remove = async function (speed) {
    const lastElement = this.heap[this.heap.length - 1];
    await hightLightBar(this.heap, 1, this.heap.length - 1, speed, "compare");
    await swap(this.heap, 1, this.heap.length - 1, speed, false);
    const popElement = this.heap.pop();
    await moveBarDown([popElement], speed, 250, "sorted");
    let index = 1;
    while (this.checkLeftAndRightChild(this.heap, index, lastElement.value)) {
      let tmp = 0;
      if (index * 2 + 1 < this.heap.length)
        tmp = this.heap[index * 2].value <= this.heap[index * 2 + 1].value;
      const childIndex = index * 2 + tmp;
      await hightLightBar(this.heap, index, childIndex, speed, "compare");
      await swap(this.heap, index, childIndex, speed, false);
      await hightLightBar(this.heap, index, childIndex, speed, "finished");
      index = childIndex;
    }
    return Promise.resolve(popElement);
  };

  this.sort = async function (arr, speed) {
    const sortedArr = [];
    for (let element of arr) await this.insert(element, speed);
    await moveBarDown(this.heap, speed, -250, "");
    for (let i = 0; i < arr.length; i++) {
      const removedElement = await this.remove(speed);
      sortedArr.push(removedElement);
    }
    await moveBarDown(sortedArr, speed, -250, "finished");
  };
}
export default MaxHeap;
