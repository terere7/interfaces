//obtiene el elemento del html, y le pone un context que es en 2 dimension
let ctx = document.getElementById("myCanvas").getContext("2d");

//tamanio de la img
let width = 150;
let height = 150;

/*CREAR IMG DE CERO*/
function crearImagenDeCero(){
    let imageData = ctx.createImageData(width, height);

    //recorre pixel por pixel dentro del cuadro
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            setPixel(imageData, x, y, 255, 128, 0, 255);
        
        }
    }    
    ctx.putImageData(imageData, 0, 0);
    
}

//setea por pixel en las coordenadas que le indicamos 
function setPixel(imageData, x, y, r, g, b, a) {

    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}