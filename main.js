const inputArr = require('./format.js');

// Find optimal starting time (t) by looking for the value of (t) when the range of y and x values is smallest
const findOptimalStartTime = (
  pointsArray,
  step = 1,
  time = 0,
  rangeY = Math.max(...pointsArray.map((point) => point.yPos)) -
    Math.min(...pointsArray.map((point) => point.yPos)),
  rangeX = Math.max(...pointsArray.map((point) => point.XPos)) -
    Math.min(...pointsArray.map((point) => point.XPos))
) => {
  // Add velocity * step to the x & y coordinates for the next value of time (t)
  const updatedPointsArray = pointsArray.map((point) => {
    updatedPoint = { ...point };
    updatedPoint.yPos += point.velocityY * step;
    updatedPoint.xPos += point.velocityX * step;
    return updatedPoint;
  });
  // Calculate the new ranges of x and y coordinates
  const newRangeY =
    Math.max(...updatedPointsArray.map((point) => point.yPos)) -
    Math.min(...updatedPointsArray.map((point) => point.yPos));
  const newRangeX =
    Math.max(...updatedPointsArray.map((point) => point.xPos)) -
    Math.min(...updatedPointsArray.map((point) => point.xPos));
  // stop condition; if the new range exceeds the previous range, the previous range is the least scattered range of points at time (t), so return the time
  if (newRangeY > rangeY && newRangeX > rangeX) return time;
  // Otherwise, increase time (t) by the step value and call the function again
  time += step;
  return findOptimalStartTime(
    updatedPointsArray,
    step,
    time,
    newRangeY,
    newRangeX
  );
};

const revealMessage = (pointsArray, time) => {
 // Adjust the x & y coordinates to their values at optimal time (t)
  const adjustedPointsArray = pointsArray.map((point) => {
    point.xPos += point.velocityX * time;
    point.yPos += point.velocityY * time;
    return point;
  });
 // Find the minimum, maximum & range values of the x and y coordinates
  const minX = Math.min(...adjustedPointsArray.map((point) => point.xPos));
  const minY = Math.min(...adjustedPointsArray.map((point) => point.yPos));
  const maxX = Math.max(...adjustedPointsArray.map((point) => point.xPos));
  const maxY = Math.max(...adjustedPointsArray.map((point) => point.yPos));
  const xRange = maxX - minX;
  const yRange = maxY - minY;
  // make a grid with rows of size Y range and columns of size X range
  const grid = [];
  for (let i = 0; i <= yRange; i++) {
    const row = [];
    for (let j = 0; j <= xRange; j++) {
      row.push('.');
    }
    grid.push(row);
  }
// Plot the coordinate points on the grid
  adjustedPointsArray.forEach((point) => {
    grid[point.yPos - minY][point.xPos - minX] = '#';
  });
// Stringify the grid for readability and return this string
  return grid.map((row) => row.join('') + '\n').join('');
};

// Find approximate value of optimal time (t) by checking the result of different steps
console.log(findOptimalStartTime(inputArr, 10)); //10940;
console.log(findOptimalStartTime(inputArr, 4)); //10944;
// Run the function with values in this range until text is found
console.log(revealMessage(inputArr, 10940)); // lower = incorrect
console.log(revealMessage(inputArr, 10944)); // upper = incorrect
console.log(revealMessage(inputArr, 10942)); // median = reveals message
// Once optimal time (t) is discovered, use the lowest common factor which remains computable (a step of 2 exceeds callstack, so 5471) and use this value to see results computationally
console.log(findOptimalStartTime(inputArr, 5471)); // 10942
console.log(revealMessage(inputArr, findOptimalStartTime(inputArr, 5471)));
