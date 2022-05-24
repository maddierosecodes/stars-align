const fs = require('fs');

const input = fs.readFileSync('./data.txt', 'utf-8');

const split = input.split('\n').map((str) => str.replace(/\s/g, ''));

// Creating an array of point objects with properties representing current point coordinates and velocity
const inputArr = split.map((string) => {
  let xPos = 0;
  let yPos = 0;
  let velocityX = 0;
  let velocityY = 0;

  string.split('>').forEach((str) => {
    if (str.startsWith('position')) {
      if (str.match(/-\d+,/)) {
        xPos = Number(str.match(/-\d+/)[0]);
      } else {
        xPos = Number(str.match(/\d+/)[0]);
      }
      if (str.match(/,-\d+/)) {
        yPos = Number(str.match(/,-\d+/)[0].replace(/,/g, ''));
      } else {
        yPos = Number(str.match(/,\d+/)[0].replace(/,/g, ''));
      }
    } else if (str.startsWith('velocity')) {
      if (str.match(/-\d+,/)) {
        velocityX = Number(str.match(/-\d+/)[0]);
      } else {
        velocityX = Number(str.match(/\d+/)[0]);
      }
      if (str.match(/,-\d+/)) {
        velocityY = Number(str.match(/,-\d+/)[0].replace(/,/g, ''));
      } else {
        velocityY = Number(str.match(/,\d+/)[0].replace(/,/g, ''));
      }
    }
  });

  return {
    xPos,
    yPos,
    velocityX,
    velocityY
  };
});

module.exports = inputArr;
