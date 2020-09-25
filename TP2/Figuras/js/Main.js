let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

const NUM_FIGURES = 4;
const FIGURE_SIZE = 40;

let figures = [];

function drawFigures() {
    clearCanvas('#F8F8FF', canvas);
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}

//#region 'Figures creation methods'
function addRectangle() {
    let posX = Math.round(Math.random() * canvas.width);
    let posY = Math.round(Math.random() * canvas.height);
    let color = randomRGBA();
    let rect = new Rect(posX, posY, FIGURE_SIZE, FIGURE_SIZE, color, context);
    figures.push(rect);
}

function addCircle() {
    let posX = Math.round(Math.random() * canvas.width);
    let posY = Math.round(Math.random() * canvas.height);
    let color = randomRGBA();
    let circle = new Circle(posX, posY, FIGURE_SIZE / 2, color, context);
    figures.push(circle);
}
//#endregion

//#region 'Mouse events'
function findClickedFigure(x, y) {
    for (let index = 0; index < figures.length; index++) {
        const element = figures[index];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

let lastClickedFigure = null;
let isMouseDown = false;

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
//#endregion

function initExample() {
    // Inicializar figuras de forma aleatoria
    for (let index = 0; index < NUM_FIGURES; index++) {
        if (Math.random() > 0.5) {
            addRectangle();
        } else {
            addCircle();
        }
    }

    drawFigures();

    // Inicializar listeners de eventos de mouse en el canvas
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMoved, false);
}

initExample();