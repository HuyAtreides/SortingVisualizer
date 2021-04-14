const moveY = ([xA, yA], [xB, yB], barA) => {
  let step = 0;
  let time;

  const move = (timestamp) => {
    if (time === undefined) time = timestamp;
    const timeElapsed = timestamp - time;
    step = ((yB - yA) / 250) * timeElapsed;
    if (Math.abs(step) < Math.abs(yB - yA)) {
      barA.setAttribute("transform", `translate(${xA}, ${yA + step})`);
      window.requestAnimationFrame(move);
    } else if (Math.abs(step) >= Math.abs(yB - yA)) {
      barA.setAttribute("transform", `translate(${xA}, ${yB})`);
    }
  };
  window.requestAnimationFrame(move);
};

const moveX = ([xA, yA], [xB, yB], barA) => {
  let step = 0;
  let time;

  const move = (timestamp) => {
    if (time === undefined) time = timestamp;
    const timeElapsed = timestamp - time;
    step = ((xB - xA) / 250) * timeElapsed;
    if (Math.abs(step) < Math.abs(xB - xA)) {
      let y = (step / (xB - xA)) * (yB - yA) + yA;
      barA.setAttribute("transform", `translate(${xA + step}, ${y})`);
      window.requestAnimationFrame(move);
    } else if (Math.abs(step) >= Math.abs(xB - xA)) {
      barA.setAttribute("transform", `translate(${xB}, ${yB})`);
    }
  };
  window.requestAnimationFrame(move);
};

async function colorBar(...bars) {
  for (let bar of bars) {
    const rect = bar[0].querySelector("rect");
    rect.style.animation = `${bar[1]} 0.1s linear 0s 1 normal forwards`;
  }
}

async function transition([xA, yA], [xB, yB], barA, keyframes, speed) {
  if (!Math.abs(xA - xB)) moveY([xA, yA], [xB, yB], barA);
  else moveX([xA, yA], [xB, yB], barA);
  if (keyframes === "swap" || keyframes === "heap-swap") keyframes = "sorted";
  colorBar([barA, keyframes]);
  if (keyframes !== "swap")
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, speed);
    });
}

const getPosition = (arr, index) => {
  const [x, y] = arr[index].bar.getAttribute("transform").match(/-*[0-9]+/g);
  return [+x, +y];
};

export { transition, colorBar, getPosition };
