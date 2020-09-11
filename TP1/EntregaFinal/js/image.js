window.addEventListener('load', () => {
    console.log("imagen");
    let canvas = document.querySelector("#canvas");
    let input = document.querySelector("#input1");
    let buttonAdd = document.querySelector("#addImg");// boton de agregar img
    buttonAdd.addEventListener('click',)
    //clear canvas, dibujo un rectangulo arriba de todo y lo tapa
    let context = canvas.getContext('2d');
    context.fillStyle = "#FFFFFF"; // canvas background color, lo limpio con un color solido
    context.fillRect(0, 0, canvas.width, canvas.height);// pinta un cuadrado del color de arriba

    //cuando hace click en el dialogo del archivo

    input.onchange = e => {
        // entiende los datos que tiene el archivo
        let file = e.target.files[0];
        //lee los datos, encargado de analizar q es seguro
        let reader = new FileReader();
        reader.readAsDataURL(file);// interpreta, si no puede tira exception, escribe los el url en el protocolo data
        reader.onload = readerEvent => {
            let content = readerEvent.target.result;// tiene la img en formato data
            let image = new Image();//img vacia
            image.src = content; // se lo asigna al src

            image.onload = function () {

                let imageAspectRatio = (1.0 * this.height) / this.width;
                let imageScaledWidth = canvas.width;
                let imageScaledHeight = canvas.width + imageAspectRatio;
                //dibuja la img en el canvas
                context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);// this xq estoy en el evento onload, sup izq coordenadas 0,0
                //obtiene la img del canvas
                let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                //modifica la img
                for (let y = 0; y < imageData.height; y++) {
                    for (let x = 0; x < imageData.width; x++) {
                        if (x % 2 == 0) {
                            let index = (x + imageData.width * y) * 4;
                            imageData.data[index + 0] = 0;
                            imageData.data[index + 1] = 0;
                            imageData.data[index + 2] = 0;
                        }
                    }
                }
                //dibuja la img modificada
                context.putImageData(imageData, 0, 0);
            }
        }
    }

    function filtroGris() {
        let imageAspectRatio = (1.0 * this.height) / this.width;
        let imageScaledWidth = canvas.width;
        let imageScaledHeight = canvas.width + imageAspectRatio;
        //dibuja la img en el canvas
        context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);// this xq estoy en el evento onload, sup izq coordenadas 0,0
        //obtiene la img del canvas
        let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
        //modifica la img
        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let index = (x + imageData.width * y) * 4;

                let red = imgData.data[0];
                let green = imgData.data[1];
                let blue = imgData.data[2];
                
                let grey= (red+green+blue)/3;
                
                imageData.data[index + 0] = grey;
                imageData.data[index + 1] = grey;
                imageData.data[index + 2] = grey;

            }
        }
        //dibuja la img modificada
        context.putImageData(imageData, 0, 0);
    }

});



