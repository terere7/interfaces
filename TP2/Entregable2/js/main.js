//CANVAS
const CANVAS = document.querySelector('#canvas');
const CONTEXT = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width;//800
const CANVAS_HEIGHT = canvas.height;//600

//FICHAS
const FICHAS_SIZE = 20;
const NUM_FICHAS = 21;
const CUADRADO_SIZE = 50;//20*2
let fichas; 

let lastClickedFicha = null;// ultima figura clickeada, por defecto no tengo ninguna
let isMouseDown = false;//esta clickeado

//TABLERO
let board;
const row = 6;
const col = 7;
// Calcular donde empieza el trablero
let beginPosX = ((CANVAS_WIDTH / 2) - ((col * CUADRADO_SIZE) / 2) - CUADRADO_SIZE) - 20;
let beginPosY = ((CANVAS_HEIGHT / 2) - ((row * CUADRADO_SIZE) / 2) - CUADRADO_SIZE) + 40;

//JUEGO
//let matrix=[];
let game;

//JUGADORES
let player1;
let player2;
//AGREGAR FIGURAS
//Circulo


function drawFigures() {
    clearCanvas('#F8F8FF', canvas);
    //Fichas
    let fichasAux= fichas.getFichas();
    console.log(fichasAux);
    for (let i = 0; i < fichasAux.length; i++) {
        fichasAux[i].draw();
    }
    //Tablero
    let boardAux= board.getBoard();
    for (let i = 0; i < boardAux.length; i++) {
        boardAux[i].draw();
    }
}

//LIMPIAR CANVAS
function clearCanvas(color, canvas) {
    CONTEXT.fillStyle = color;
    CONTEXT.fillRect(0, 0, canvas.width, canvas.height);
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






// REHAER!!!

function restartGame() {
    clearCanvas('#F8F8FF', canvas);
   
}
document.querySelector("#restart").addEventListener('click', restartGame);


// Crear juego
function startGame() {
    player1 = new Player("Jugador 1", 1);
    player2 = new Player("Jugador 2", 2);
    fichas= new Fichas(NUM_FICHAS, FICHAS_SIZE, player1,player2);
    board= new Board(beginPosX, beginPosY);
    game= new Game( row,col, player1, player2);
    drawFigures();
}
startGame();

