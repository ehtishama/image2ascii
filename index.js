const fs = require("fs");
const mathjs = require("mathjs");
const sharp = require("sharp");
const commandLineArgs = require("command-line-args");

const optionDefinitions = [
    { name: "src", type: String, alias: "s" },
    { name: "out", type: String, alias: "o" },
];

const options = commandLineArgs(optionDefinitions);

if (!options.src || !options.out) process.exit();

async function main() {
    // reading image using sharpjs
    const { data, info } = await sharp(options.src)
        .raw()
        .resize({ width: 50, height: 50, fit: "contain" })
        .toBuffer({ resolveWithObject: true });

    const pixelArray = new Uint8ClampedArray(data.buffer);

    // reshape image array to a matrix using mathjs
    let pixelMatrix = mathjs.reshape(
        [...pixelArray],
        [info.height, info.width, info.channels]
    );

    const brightnessMatrix = calculateBrightnessMatrix(pixelMatrix, info);

    const asciiMatrix = calculateAsciiMatrix(brightnessMatrix, info);

    printAsciiMatrix(asciiMatrix);


    // fs.writeFile(options.out, output, err => {
    //     if (err) console.log("Error while writing output to the file.");
    // });

    // fs.writeFile(options.o, outputInvert, err => {
    //     if (err) console.log("Error while writing output to the file.");
    // });
}


main();

function scale(x) {
    return Math.round(x / 4);
}

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

    const { height, width } = options;

    let asciiMatrix = new Array(height);

    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            let ascii_idx = scale(brightnessMatrix[i][j]);
            row.push(asciiPixels[ascii_idx]);
        }
        asciiMatrix[i] = row;
    }

    return asciiMatrix;
}

function printAsciiMatrix(asciiMatrix) {
    let output;

    output = "";

    // write to a text file
    for (let i = 0; i < asciiMatrix.length; i++) {
        output = output.concat(
            asciiMatrix[i]
                .map((asciiPixel) => asciiPixel.repeat(2))
                .join("")
                .concat("\n")
        );
    }

    console.log(output);
}