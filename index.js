
const sharp = require("sharp");


async function main() {

    const { data, info } = await sharp("images/ascii-pineapple.jpg")    
    .raw()
    .toBuffer({ resolveWithObject:  true});


    const pixelArray = new Uint8ClampedArray(data.buffer)

    console.log("Sucessfully loaded image")
    
    console.log(pixelArray);

}

main()