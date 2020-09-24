let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let figures = []; // arreglo de figuras

function addFigure() {
    if (Math.random() > 0.5) {
        addRectangle();
    } else {
        addCicle()
    }
    drawFigures();// dibujar en pantalla
}

function drawFigures() {
    clearCanvaS();
    for (let index = 0; index < figures.length; index++) {
        figures[i].draw();
    }
}

// Agregar rectangulos al azar dentro del canvas
function addRectangle() {
    //posicion random
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();// color random
    let rect = new Rect(posX, posY, 20, 20, color, context);
    figures.push(rect);//agrega recangulos al arreglo
}

function addCircle() {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();
    let circle = new Circle(posX, posY, 10, color, context);
    figures.push(circle);
}
//Evento temporal para agregasr figuras
function addFigures() {
    addFigures();
    if (figures.length < 30) {
        setTimeout(addFigures, 333);
    }
}
setTimeout(() => {
    addFigures();
}, 333);

function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;//alpha
    return 'rgba(${r}, ${g}, ${b}, ${a})';// nose si lo toma bn
}

function clearCanvaS() {
    context.fillStyle = '#F8F8FF';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}