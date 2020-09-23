
window.addEventListener('load', () => {
    console.log("hola");
    //botones
    document.querySelector("#pencil").addEventListener('click', pintar);
    document.querySelector("#rubber").addEventListener('click', borrar);
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    // get the width and heigth of the windows
    canvas.height = window.innerHeight;
    canvas.widht = window.innerWidth;
    let dibujar = false;
    let borrando = false;

    function startPosition() {
        dibujar = true;
        draw();
    }

    function finishedPosition() {
        dibujar = false;
        ctx.beginPath();// cuando termina seteo un nuevo comienzo, reseteo
    }

    // pasa por parametro el evento, contiene las coordenadas
    function draw(e) {
        if (!dibujar) return;
        if (!borrando) ctx.strokeStyle = document.querySelector("#paleton").value;
        ctx.lineWidth = document.querySelector("#slider-size").value;
        ctx.lineTo(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
    }

    //event listeners
    function eventosMouse() {
        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', finishedPosition);
        canvas.addEventListener('mousemove', draw);
    }
    function borrar() {
        ctx.strokeStyle = "whitesmoke";//blanco
        ctx.lineCap = "round";
        //ctx.lineWidth = 10;
        borrando = true;
        eventosMouse();

    }
    function pintar() {
        ctx.lineCap = "round";
        // ctx.lineWidth = 2;
        borrando = false;
        eventosMouse();
    }

})

// resize the canvas of the window
//window.addEventListener('resize, ');