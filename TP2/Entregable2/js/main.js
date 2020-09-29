//CANVAS
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;//800
let canvasHeight = canvas.height;//600

//FICHAS
const FICHAS_SIZE = 20;
const NUM_FICHAS = 21;
const CUADRADO_SIZE = 50;//20*2
let figuras = []; // arreglo de figuras
let lastClickedFicha = null;// ultima figura clickeada, por defecto no tengo ninguna
let isMouseDown = false;//esta clickeado

//TABLERO
let board;
const row = 6;
const col = 7;
// Calcular donde empieza el trablero
let beginPosX = ((canvasWidth / 2) - ((col * CUADRADO_SIZE) / 2) - CUADRADO_SIZE) - 20;
let beginPosY = ((canvasHeight / 2) - ((row * CUADRADO_SIZE) / 2) - CUADRADO_SIZE) + 40;

//JUEGO
//let matrix=[];
let game;

//JUGADORES
let player1;
let player2;
//AGREGAR FIGURAS
//Circulo
function addCircle(color, posX, posY, player) {
    //let color ='#600080';
    let circle = new Circle(posX, posY, FICHAS_SIZE, color, context, player);
    figuras.push(circle);
}

function drawFigures() {
    clearCanvas('#F8F8FF', canvas);
    //Fichas
    for (let i = 0; i < figuras.length; i++) {
        figuras[i].draw();
    }
    let boardAux= board.getBoard();
    console.log(boardAux);
    for (let i = 0; i < boardAux.length; i++) {
        boardAux[i].draw();
    }
}



//LIMPIAR CANVAS
function clearCanvas(color, canvas) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}
// OBTENER FIGURA CLICKEADA
function findClickedFigure(x, y) {
    for (let index = 0; index < figuras.length; index++) {
        const element = figuras[index];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}


//FUNCIONES MOUSE
function onMouseDown(event) {
    console.log(event);
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
    //en esa pos hay un cuadrado, ver si se puede posicionar, sino vuelvo a estado anterior
    let locker= board.getLocker(event.layerX,event.layerY );
    //ubico la ficha al casillero
if(locker!==null&&lastClickedFicha!==null){
   let agregada= game.addFicha(lastClickedFicha,locker);
   if(agregada){
     
// si se agrego, eliminar del arreglo de figuras
   }
} 

}




function crearFichas() {
    let espacio = canvas.height / NUM_FICHAS;
    // Inicializar figuras de forma aleatoria
    player1 = new Player("Jugador 1", 1);
    player2 = new Player("Jugador 2", 2);
    for (let index = 0; index < NUM_FICHAS; index++) {
        if (index == 0) {
            addCircle('#00e6e6', canvas.width * 0.1, canvas.height / 2, player1);
            addCircle('#600080', canvas.width * 0.9, canvas.height / 2, player2);
        } else {
            addCircle('#00e6e6', canvas.width * 0.05, espacio * index, player1);
            addCircle('#600080', canvas.width * 0.95, espacio * index, player2);
        }
    }

    //drawFigures();
    // Inicializar listeners de eventos de mouse en el canvas
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMoved, false);

  
}


function restartGame() {
    clearCanvas('#F8F8FF', canvas);
    // reinicializo valores
    figuras = [];
    board = []; 
    startGame();
    //resetear ganador y todo
}
document.querySelector("#restart").addEventListener('click', restartGame);


// Crear juego
function startGame() {
    crearFichas();
    board= new Board(beginPosX, beginPosY,context);
    drawFigures();
    game= new Game( row,col, player1, player2);
}
startGame();
//console.log(matrix);

