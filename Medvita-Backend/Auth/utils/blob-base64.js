const fs = require('fs');
const path = require('path');


const blobToBase64 = async (imageFile) => {

    if (!imageFile) {
        return null;
    }

    const imagePath = path.join(__dirname, '../', imageFile.path);
    const imageBuffer = fs.readFileSync(imagePath);

    if (!imageBuffer || imageBuffer == "") {
        return null
    }
    const imageBase64 = imageBuffer.toString('base64');

    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(err)
            return
        }
    });

    return imageBase64;
}

module.exports = blobToBase64;
