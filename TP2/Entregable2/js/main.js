//CANVAS
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;//800
let canvasHeight = canvas.height;//600

//FICHAS
const FICHAS_SIZE = 20;
const NUM_FICHAS = 21;
const CUADRADO_SIZE = 50;//20*2
let fichas = []; // arreglo de figuras
let lastClickedFicha = null;// ultima figura clickeada, por defecto no tengo ninguna
let isMouseDown = false;//esta clickeado

//TABLERO
let tablero = [];
const row = 6;
const col = 7;
// Calcular donde empieza el trablero
let beginPosX = ((canvasWidth / 2) - ((col * CUADRADO_SIZE) / 2) - CUADRADO_SIZE) - 20;
let beginPosY = ((canvasHeight / 2) - ((row * CUADRADO_SIZE) / 2) - CUADRADO_SIZE) + 40;

//AGREGAR FIGURAS
//Rectangulo
function addRectangle(color, posX, posY) { // Agregar rectangulos al azar dentro del canvas
    let rect = new Rect(posX, posY, CUADRADO_SIZE, CUADRADO_SIZE, color, context);
    tablero.push(rect);//agrega recangulos al arreglo
}
//Circulo
function addCircle(color, posX, posY, player) {
    //let color ='#600080';
    let circle = new Circle(posX, posY, FICHAS_SIZE, color, context, player);
    fichas.push(circle);
}

function drawFigures() {
    clearCanvas('#F8F8FF', canvas);
    //Fichas
    for (let i = 0; i < fichas.length; i++) {
        fichas[i].draw();
    }
    //Tablero (cuadrados)
    for (let i = 0; i < tablero.length; i++) {
        tablero[i].draw();
    }
}



//LIMPIAR CANVAS
function clearCanvas(color, canvas) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}
// OBTENER FIGURA CLICKEADA
function findClickedFigure(x, y) {
    for (let index = 0; index < fichas.length; index++) {
        const element = fichas[index];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}


//FUNCIONES MOUSE
function onMouseDown(event) {
    isMouseDown = true;
    // Se limpia la propiedad highlighted de la ultima figura clickeada
    if (lastClickedFicha != null) {
        lastClickedFicha.setHighlighted(false);
        lastClickedFicha = null;
    }
    // Buscar si hay una nueva figura clickeada
    let clickedFigure = findClickedFigure(event.layerX, event.layerY);
    if (clickedFigure != null) {
        clickedFigure.setHighlighted(true);
        lastClickedFicha = clickedFigure;
    }
    drawFigures();
}

function onMouseMoved(event) {
    if (isMouseDown && lastClickedFicha != null) {
        lastClickedFicha.setPosition(event.layerX, event.layerY);
        drawFigures();
    }
}
function onMouseUp(event) {
    isMouseDown = false;
}

function crearFichas() {
    let espacio = canvas.height / NUM_FICHAS;
    // Inicializar figuras de forma aleatoria
    let player1 = new Player("Jugador 1");
    let player2 = new Player("Jugador 2");
    for (let index = 0; index < NUM_FICHAS; index++) {
        if (index == 0) {
            addCircle('#00e6e6', canvas.width * 0.1, canvas.height / 2, player1);
            addCircle('#600080', canvas.width * 0.9, canvas.height / 2, player2);
        } else {
            addCircle('#00e6e6', canvas.width * 0.05, espacio * index);
            addCircle('#600080', canvas.width * 0.95, espacio * index);
        }
    }
    drawFigures();
    // Inicializar listeners de eventos de mouse en el canvas
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMoved, false);
}

function crearTablero() {
    let color = "blue";
    for (let x = 0; x < row; x++) {
        for (let y = 0; y < col; y++) {
            beginPosX += CUADRADO_SIZE + 5;
            addRectangle(color, beginPosX, beginPosY);
        }
        beginPosX -= (CUADRADO_SIZE + 5) * col;
        beginPosY += CUADRADO_SIZE + 5;
    }
    //creo sin eventos para que queden quietos
}
crearFichas();
crearTablero();


