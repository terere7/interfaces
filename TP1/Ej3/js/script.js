var ctx = document.getElementById("myCanvas").getContext("2d");
//Tamanio del context
var width = 150;
var height = 150;


/*CREAR IMG DE CERO*/ 
function createImage(){
    var imageData = ctx.createImageData(width, height);
    //recorre pixel por pixel
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            setPixel(imageData, x, y, 255, 128, 0, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

//////////////////////////////////////////////////
function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

createImage();// ejecuta el crear imagen

/*CARGAR IMAGEN*/
//ubicacion del recurso
let image = new Image();
image.src= "img/image.jpg";
//evento de finalizacion de la carga del recurso
image.onload=function(){
    myDrawImageMethod(image);
}


//dibujo la img usando el context de html
function myDrawImageMethod(image){
    ctx.myDrawImage(image, 0,0);
}

