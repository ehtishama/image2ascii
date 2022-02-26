const { scaleLinear } = require("./scaleLinear");

function calculateBrightnessMatrix(
  pixelMatrix,
  options = {
    height: pixelMatrix.length,
    width: pixelMatrix[0].length,
    channels: 3,
  }
) {
  const { height, width, channels } = options;

  let brightnessMatrix = new Array(height);

  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push(
        Math.round(pixelMatrix[i][j].reduce((a, b) => a + b, 0) / channels)
      );
    }
    brightnessMatrix[i] = row;
  }
  return brightnessMatrix;
}

function calculateAsciiMatrix(
  brightnessMatrix,
  options = {
    height: brightnessMatrix.length,
    width: brightnessMatrix[0].width,
  }
) {
  let asciiPixels =
    '`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

  asciiPixels = " -";

  let scale = scaleLinear({ domain: [0, 255], range: [0, asciiPixels.length] });

  const { height, width } = options;

  let asciiMatrix = new Array(height);

  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      let ascii_idx = Math.floor(scale(brightnessMatrix[i][j]));
      row.push(asciiPixels[ascii_idx]);
    }
    asciiMatrix[i] = row;
  }

  return asciiMatrix;
}

function printAsciiMatrix(asciiMatrix) {
  let output = "";

  // write to a text file
  for (let i = 0; i < asciiMatrix.length; i++) {
    output = output.concat(
      asciiMatrix[i]
        .map((asciiPixel) => asciiPixel.repeat(2))
        .join("")
        .concat("\n")
    );

    setTimeout(() => {
      console.log(
        asciiMatrix[i].map((asciiPixel) => asciiPixel.repeat(2)).join("")
      );
    }, i * 200);
  }

  // console.log(output);
}

module.exports = {
  calculateAsciiMatrix,
  calculateBrightnessMatrix,
  printAsciiMatrix,
};
