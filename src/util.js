const fs = require('fs');
const { ASCII_PIXELS } = require('./constants');
const { scaleLinear } = require('./scaleLinear');

function calculateBrightnessMatrix(
  pixelMatrix,
  options = {
    height: pixelMatrix.length,
    width: pixelMatrix[0].length,
    channels: 3,
  },
) {
  const { height, width, channels } = options;

  const brightnessMatrix = new Array(height);

  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(
        Math.round(pixelMatrix[i][j].reduce((a, b) => a + b, 0) / channels),
      );
    }
    brightnessMatrix[i] = row;
  }
  return brightnessMatrix;
}

function calculateAsciiMatrix(
  brightnessMatrix,
  {
    height = brightnessMatrix.length,
    width = brightnessMatrix[0].width,
    asciiPixels = ASCII_PIXELS,
  } = {},
) {
  const scale = scaleLinear({ domain: [0, 255], range: [0, asciiPixels.length] });

  const asciiMatrix = new Array(height);

  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      const asciiIdx = Math.floor(scale(brightnessMatrix[i][j]));
      row.push(asciiPixels[asciiIdx]);
    }
    asciiMatrix[i] = row;
  }

  return asciiMatrix;
}

function printAsciiMatrix(asciiMatrix) {
  // write to a text file
  for (let i = 0; i < asciiMatrix.length; i++) {
    setTimeout(() => {
      console.log(
        asciiMatrix[i].map((asciiPixel) => {
          try {
            return asciiPixel.repeat(2);
          } catch (error) {
            console.log('Error: ', asciiPixel);
            return 'x';
          }
        }).join(''),
      );
    }, 1);
  }

  // console.log(output);
}

function saveToFile(asciiMatrix, file, multiplyFactor = 2) {
  const output = asciiMatrix.map(
    (row) => row.map(
      (pixel) => pixel.repeat(multiplyFactor),
    )
      .join('')
      .concat('\n'),
  )
    .join('');
  fs.writeFileSync(file, output, (err) => {
    throw (err);
  });
}

module.exports = {
  calculateAsciiMatrix,
  calculateBrightnessMatrix,
  printAsciiMatrix,
  saveToFile,
};
