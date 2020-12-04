const arrayGenerator = () => {
  const width = 1320;
  const height = 452;
  const firstBarsX = (width - 17 * 45 - 17 * 5) / 2;
  const bars = [];
  for (let index = 0; index < 17; index++) {
    const randomValue = Math.floor(Math.random() * 50) + 1;
    const barHeight = randomValue * 4.6;
    const translateX = index ? bars[index - 1].translate[0] + 50 : firstBarsX;
    bars.push({
      translate: [translateX, height / 2 - barHeight + 15],
      height: barHeight,
      value: randomValue,
    });
  }
  return bars;
};

export default arrayGenerator;
