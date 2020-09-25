let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
const NUM_FIGURES = 10;
const FIGURE_SIZE = 20;
let figures = []; // arreglo de figuras
let lastClickedFigure = null;// ultima figura clickeada, por defecto no tengo ninguna
let isMouseDown = false;//esta clickeado


//AGREGAR FIGURAS

//Evento temporal para agregar figuras
function addFigures() {
    addFigure();
    if (figures.length < 30) {
        setTimeout(addFigures, 333);
    }
}
// setTimeout(() => {
//     addFigures();
// }, 333);
//Rectangulo
function addRectangle() { // Agregar rectangulos al azar dentro del canvas
    //posicion random
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();// color random
    let rect = new Rect(posX, posY, 20, 20, color, context);
    figures.push(rect);//agrega recangulos al arreglo
}
//Circulo
function addCircle() {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();
    let circle = new Circle(posX, posY, 10, color, context);
    figures.push(circle);
}

function drawFigures() {
    clearCanvas('#F8F8FF', canvas);
    //recorre el arreglo para dibujas las figuras
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}


//COLOR RANDOM
function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
//LIMPIAR CANVAS
function clearCanvas(color, canvas) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}
// OBTENER FIGURA CLICKEADA
function findClickedFigure(x, y) {
    for (let index = 0; index < figures.length; index++) {
        const element = figures[index];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}


//FUNCIONES MOUSE
function onMouseDown(event) {
    isMouseDown = true;

    // Se limpia la propiedad highlighted de la ultima figura clickeada
    if (lastClickedFigure != null) {
        lastClickedFigure.setHighlighted(false);
        lastClickedFigure = null;
    }

    // Buscar si hay una nueva figura clickeada
    let clickedFigure = findClickedFigure(event.layerX, event.layerY);
    if (clickedFigure != null) {
        clickedFigure.setHighlighted(true);
        lastClickedFigure = clickedFigure;
    }

    drawFigures();
}

function onMouseMoved(event) {
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(event.layerX, event.layerY);
        drawFigures();
    }
}

function onMouseUp(event) {
    isMouseDown = false;
}

function crearFichas() {
    // Inicializar figuras de forma aleatoria
    for (let index = 0; index < NUM_FIGURES; index++) {
        
            addCircle()
        
    }
    drawFigures();

    // Inicializar listeners de eventos de mouse en el canvas
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMoved, false);

}
//#endr
crearFichas();


