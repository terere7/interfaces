let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
const NUM_FIGURES = 10;
const FIGURE_SIZE = 20;
let figures = []; // arreglo de figuras
let lastClickedFigure=null;// ultima figura clickeada, por defecto no tengo ninguna


function initExample() {
    // Inicializar figuras de forma aleatoria
    for (let index = 0; index < NUM_FIGURES; index++) {
       addFigure();
    }
    //dibujar figuras
    drawFigures();

    // Inicializar listeners
    canvas.addEventListener('click', event => {
        // Se limpia la propiedad highlighted de la ultima figura clickedad para buscar la nueva
        if (lastClickedFigure != null) {//figura antes clickeada
            lastClickedFigure.setHighlighted(false);// sacar resaltado
            lastClickedFigure = null;// setear en null
        }

        let clickedFigure = findClickedFigure(event.layerX, event.layerY);//busca la figura clickeada
        if (clickedFigure != null) {         
            clickedFigure.setHighlighted(true);// setea el resaltado, indicado que es la seleccionada
            lastClickedFigure = clickedFigure;     //guarda la figura clickeada       
        }
        drawFigures(); //dibujar ya que cambio la figura
    });

}

function addFigure() {
    if (Math.random() > 0.5) {
        addRectangle();
    } else {
        addCircle()
    }
    drawFigures();// dibujar en pantalla
}

function drawFigures() {
    clearCanvas();
    //recorre el arreglo para dibujas las figuras
    for (let i = 0; i < figures.length; i++) {
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
    addFigure();
    if (figures.length < 30) {
        setTimeout(addFigures, 333);
    }
}
// setTimeout(() => {
//     addFigures();
// }, 333);

function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function clearCanvas(color, canvas) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}
// retorna la figura clickeada
function findClickedFigure(x, y) {
    for (let index = 0; index < figures.length; index++) {
        const element = figures[index];
        if (element.isPointInside(x, y)) {
            return element;
        }        
    }
}

initExample();


