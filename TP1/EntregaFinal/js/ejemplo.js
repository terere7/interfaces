window.addEventListener('load', () => {
    console.log("imagen ejemplo");
    let canvas = document.querySelector("#canvasEjemplo");

    let context = canvas.getContext('2d');
    context.fillStyle = "#FFFFFF"; // canvas background color, lo limpio con un color solido
    context.fillRect(0, 0, canvas.width, canvas.height);// pinta un cuadrado del color de arriba
let image = new Image();
   image.src = "img/bird.jpg"; // se lo asigna al src

    image.onload = function () {

        let imageAspectRatio = (1.0 * this.height) / this.width;
        let imageScaledWidth = canvas.width;
        let imageScaledHeight = canvas.width + imageAspectRatio;
        //dibuja la img en el canvas
        context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);// this xq estoy en el evento onload, sup izq coordenadas 0,0
        //obtiene la img del canvas
        let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
        //modifica la img
        console.log(imageData);
        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                // let index = (x + imageData.width * y) * 4;
                // let red = imageData.data[0];
                // let green = imageData.data[1];
                // let blue = imageData.data[2];
                // let grey = (red + green + blue) / 3;
                // imageData.data[index + 0] = grey;
                // imageData.data[index + 1] = grey;
                // imageData.data[index + 2] = grey;
            }
        }
        //dibuja la img modificada
        context.putImageData(imageData, 0, 0);
    }



});

