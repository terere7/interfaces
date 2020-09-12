window.addEventListener('load', () => {
    let imageAspectRatio;
    let imageScaledWidth;
    let imageScaledHeight;
    let imageData;
    let imageData2;
    console.log("imagen");
    //clear canvas, dibujo un rectangulo arriba de todo y lo tapa
    let context = canvas.getContext('2d');
    context.fillStyle = "#FFFFFF"; // canvas background color, lo limpio con un color solido
    context.fillRect(0, 0, canvas.width, canvas.height);// pinta un cuadrado del color de arriba

    let canvas = document.querySelector("#canvas");
    document.querySelector("#addImg").addEventListener("click", function () {
        let input = document.querySelector("#inputFile");
        input.onchange = (e) => {
            agregarImagen(e);
        }

    });// boton de agregar img
    //buttonAdd.addEventListener('click',)

    //cuando hace click en el dialogo del archivo

    function agregarImagen(e) {
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
                if (image.width > canvas.width && ((image.height < canvas.height||image.height < canvas.height))) {
                    imageAspectRatio = (1.0 * this.height) / this.width;
                    imageScaledWidth = canvas.width;
                    imageScaledHeight = image.height;
                }else if(image.width < canvas.width && image.height > canvas.height){
                    imageAspectRatio = (1.0 * this.height) / this.width;
                    imageScaledWidth = image.width;
                    imageScaledHeight = canvas.height;
                }else{
                    imageScaledWidth = image.width;
                    imageScaledHeight = image.height;
                }
                
                //dibuja la img en el canvas
                context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);// this xq estoy en el evento onload, sup izq coordenadas 0,0
                //obtiene la img del canvas
                 imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                 imageData2 = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                 //modifica la img
                context.putImageData(imageData, 0, 0);
            }
        }
    }

    function filtroGris() {
        let imageAspectRatio = (1.0 * this.height) / this.width;
        let imageScaledWidth = canvas.width;
        let imageScaledHeight = canvas.width + imageAspectRatio;
        //dibuja la img en el canvas
        //context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);// this xq estoy en el evento onload, sup izq coordenadas 0,0
        //obtiene la img del canvas
        let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
        //modifica la img
        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let index = (x + imageData.width * y) * 4;

                let red = imageData.data[0];
                let green = imageData.data[1];
                let blue = imageData.data[2];

                let grey = (red + green + blue) / 3;

                imageData.data[index + 0] = grey;
                imageData.data[index + 1] = grey;
                imageData.data[index + 2] = grey;

            }
        }
        //dibuja la img modificada
        context.putImageData(imageData, 0, 0);
    }

});



