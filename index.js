const numjs = require("numjs");
const sharp = require("sharp");
const fs = require("fs");

async function main() {

    let asciiPixels = "`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

    const { data, info } = await sharp("images/profile.webp")
        .raw()
        .toBuffer({ resolveWithObject: true });

    const pixelArray = new Uint8ClampedArray(data.buffer)

    const ndarray = numjs.array([...pixelArray])

    let pixelMatrix = ndarray.reshape(info.height, info.width, info.channels).tolist();

    let brightnessMatrix = new Array(info.height);

    for (let i = 0; i < info.height; i++) {

        let row = [];
        for (let j = 0; j < info.width; j++) {
            row.push(Math.round(pixelMatrix[i][j].reduce((a, b) => a + b, 0) / 3))
        }
        brightnessMatrix[i] = row;

    }

    let asciiMatrix = new Array(info.height);

    for (let i = 0; i < info.height; i++) {
        let row = [];
        for (let j = 0; j < info.width; j++) {

            let ascii_idx = linearScale(brightnessMatrix[i][j])
            row.push(asciiPixels[ascii_idx]);
        }
        asciiMatrix[i] = row;
    }

    let asciiMatrixInverted = new Array(info.height)

    for (let i = 0; i < info.height; i++) {
        let row = [];
        for (let j = 0; j < info.width; j++) {

            let ascii_idx = linearScale(255 - brightnessMatrix[i][j])
            row.push(asciiPixels[ascii_idx]);
        }
        asciiMatrixInverted[i] = row;
    }

    let output, outputInvert

    output = outputInvert = `<p style="font-family: monospace; font-size: 6px;">`

    // write to a text file
    for (let i = 0; i < info.height; i++) {
        output = output.concat(asciiMatrix[i].map(asciiPixel => asciiPixel.repeat(2)).join('').concat("<br>"));

        outputInvert = outputInvert.concat(asciiMatrixInverted[i].map(asciiPixel => asciiPixel.repeat(2)).join('').concat("<br>"))
    }

    output = output.concat("</p>");
    outputInvert  = outputInvert.concat("</p>")

    fs.writeFile("output.html", output, err => {
        if (err) console.log("Error while writing output to the file.");
    });

    fs.writeFile("output-inverted.html", outputInvert, err => {
        if (err) console.log("Error while writing output to the file.");
    });


}

function linearScale(x) {

    return Math.round(x / 4);
}

main()