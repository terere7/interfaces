window.addEventListener('load', () => {
    let imageAspectRatio;
    let imageScaledWidth;
    let imageScaledHeight;
    let imageData;
    let imageData2;

    let canvas = document.querySelector("#canvas");
    let context = canvas.getContext('2d');

    let btnVaciar = document.querySelector("#btnVaciar");
    let input = document.querySelector(".input1");// input foto

    //LIMPIAR CANVAS
    function vaciarCanvas() {
        console.log("vaciar camvas")
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
    }
    btnVaciar.addEventListener("click", vaciarCanvas);

    // CARGAR IMAGEN
    input.onchange = (e) => {
        console.log("Agregar img");
        agregarImagen(e);
    }
    function agregarImagen(e) {
        // entiende los datos que tiene el archivo
        let file = e.target.files[0];
        //lee los datos, encargado de analizar q es seguro
        let reader = new FileReader();
        reader.readAsDataURL(file);// interpreta, si no puede tira exception, escribe los el url en el protocolo data
        reader.onload = (readerEvent) => {
            let content = readerEvent.target.result;// tiene la img en formato data
            let image = new Image();//img vacia
            //   image.crossOrigin = "Anonymous";
            image.src = content; // se lo asigna al src

            image.onload = function () {
                if (image.width > canvas.width && ((image.height < canvas.height || image.height < canvas.height))) {
                    imageAspectRatio = (1.0 * this.height) / this.width;
                    imageScaledWidth = canvas.width;
                    imageScaledHeight = image.height;
                } else if (image.width < canvas.width && image.height > canvas.height) {
                    imageAspectRatio = (1.0 * this.height) / this.width;
                    imageScaledWidth = image.width;
                    imageScaledHeight = canvas.height;
                } else {
                    imageScaledWidth = image.width;
                    imageScaledHeight = image.height;
                }
                vaciarCanvas();
                //dibuja la img en el canvas
                context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);// this xq estoy en el evento onload, sup izq coordenadas 0,0
            }
        }
    }


    //GETTER Y SETTERS
    function getPixel(imageData, x, y, pos) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + pos];
    }

    function setPixel(imageData, x, y, r, g, b) {
        let index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
    }
    // FILTROS

    //SEPIA
    function filtroSepia() {
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let r =
                    0.393 * getPixel(imageData, x, y, 0) +
                    0.769 * getPixel(imageData, x, y, 1) +
                    0.189 * getPixel(imageData, x, y, 2);
                if (r > 255) r = 255;// controlar q no se exceda del valor

                let g =
                    0.349 * getPixel(imageData, x, y, 0) +
                    0.686 * getPixel(imageData, x, y, 1) +
                    0.168 * getPixel(imageData, x, y, 2);
                if (g > 255) g = 255;

                let b =
                    0.272 * getPixel(imageData, x, y, 0) +
                    0.534 * getPixel(imageData, x, y, 1) +
                    0.131 * getPixel(imageData, x, y, 2);
                if (b > 255) b = 255;

                setPixel(imageData, x, y, r, g, b);
            }
        }
        context.putImageData(imageData, 0, 0);
    }
    document.querySelector("#sepia").addEventListener("click", filtroSepia);

    //GRIS
    function filtroGris() {
        //obtiene la img del canvas
        let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
        //modifica la img
        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let grey = getPixel(imageData, x, y, 0) +
                    getPixel(imageData, x, y, 1) +
                    getPixel(imageData, x, y, 2);
                grey = grey / 3;
                setPixel(imageData, x, y, grey, grey, grey);
            }
        }
        //dibuja la img modificada
        context.putImageData(imageData, 0, 0);
    }
    document.querySelector("#gris").addEventListener("click", filtroGris);

    //NEGATIVO
    function filtroNegativo() {
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                setPixel(imageData, x, y,
                    255 - getPixel(imageData, x, y, 0),
                    255 - getPixel(imageData, x, y, 1),
                    255 - getPixel(imageData, x, y, 2)
                );
            }
        }
        context.putImageData(imageData, 0, 0);
    }
    document.querySelector("#negativo").addEventListener("click", filtroNegativo);

    //BINARIO
    function filtroBinario() {
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                let pixel =
                    getPixel(imageData, x, y, 0) +
                    getPixel(imageData, x, y, 1) +
                    getPixel(imageData, x, y, 2);
                if (pixel > 382) { //255*3/2
                    setPixel(imageData, x, y, 255, 255, 255);
                } else {
                    setPixel(imageData, x, y, 0, 0, 0);
                }
            }
        }
        context.putImageData(imageData, 0, 0);
    }
    document.querySelector("#binario").addEventListener("click", filtroBinario);

});



