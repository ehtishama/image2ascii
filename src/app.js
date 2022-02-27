const sharp = require('sharp');
const mathjs = require('mathjs');

const {
  calculateBrightnessMatrix,
  calculateAsciiMatrix,
  printAsciiMatrix,
  saveToFile,
} = require('./util');

async function app(options) {
  // reading image using sharpjs
  const { data, info } = await sharp(options.src)
    .raw()
    .resize({ width: 50, height: 50, fit: 'contain' })
    .toBuffer({ resolveWithObject: true });

  // get pixel values of the image
  const pixelArray = new Uint8ClampedArray(data.buffer);

  // reshape image array to a matrix using mathjs
  const pixelMatrix = mathjs.reshape(
    [...pixelArray],
    [info.height, info.width, info.channels],
  );

  // brightness matrix converts pixels to their brightness values
  const brightnessMatrix = calculateBrightnessMatrix(pixelMatrix, info);

  // replace each brightness values with an ascii charater
  const asciiMatrix = calculateAsciiMatrix(
    brightnessMatrix,
    { ...info, asciiPixels: options.ascii },
  );

  printAsciiMatrix(asciiMatrix);

  if (options.out) {
    // save the file to given path
    saveToFile(asciiMatrix, options.out);
  }
}

module.exports = {
  app,
};
