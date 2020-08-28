var ctx = document.getElementById("myCanvas").getContext("2d");

var width = 150;
var height = 150;
var imageData = ctx.createImageData(width, height);

for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
        setPixel(imageData, x, y, 255, 128, 0, 255);
    }
}

ctx.putImageData(imageData, 0, 0);

//////////////////////////////////////////////////

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}