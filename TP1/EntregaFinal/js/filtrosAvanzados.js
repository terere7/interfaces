window.addEventListener('load', () => {
    let canvas = document.querySelector("#canvas");
    let context = document.querySelector("#canvas").getContext("2d");
    document.querySelector("#blur").addEventListener("click", filtroBlur);
    //   document.querySelector("#bordes").addEventListener("click", filtroBordes);


    function filtroBlur() {
        console.log("blur");
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        let arrData = imageData.data;
        for (let i = 0; i < arrData.length; i++) {
            if (i % 4 === 3) { continue; }// skip
            let pixel = arrData[i];
            arrData[i] = (pixel + (arrData[i - 4] || pixel) + (arrData[i + 4] || pixel) +
                (arrData[i - 4 * imageData.width] || pixel) + (arrData[i + 4 * imageData.width] || pixel) +
                (arrData[i - 4 * imageData.width - 4] || pixel) + (arrData[i + 4 * imageData.width + 4] || pixel) +
                (arrData[i - 4 * imageData.width + 4] || pixel) + (arrData[i + 4 * imageData.width - 4] || pixel)) / 9;
        }
        context.putImageData(imageData, 0, 0);
    }

})