//CANVAS
const CANVAS = document.querySelector('#canvas');
const CONTEXT = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width;//800
const CANVAS_HEIGHT = canvas.height;//600


//TABLERO
let board;
let row = 7;
let col = 8;

//FICHAS
const FICHAS_SIZE = 20;
const CUADRADO_SIZE = 50;//20*2
let numFichas = row * col / 2;
let fichas;
// Calcular donde empieza el trablero
let beginPosX = ((CANVAS_WIDTH / 2) - ((col * CUADRADO_SIZE) / 2) - CUADRADO_SIZE) - FICHAS_SIZE;
let beginPosY = ((CANVAS_HEIGHT / 2) - ((row * CUADRADO_SIZE) / 2) - CUADRADO_SIZE) + (FICHAS_SIZE * 2);


//DROP Y DRAG
let drop;

//JUEGO
let game;

//JUGADORES
let player1;
let player2;

//FUNCIONES MOUSE
function onMouseDown(event) {
    game.onMouseDown(event);
    // Se limpia la propiedad highlighted de la ultima figura clickeada

}
function onMouseMoved(event) {
    game.onMouseMoved(event);
}
function onMouseUp(event) {
    game.onMouseUp(event);
}

///BORRAR CANVAS
function clearCanvas(color) {
    CONTEXT.fillStyle = color;
    CONTEXT.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

document.querySelector("#restart").addEventListener('click', startGame);


//CREAR JUEGO
function startGame() {
    clearCanvas('#F8F8FF');
    player1 = new Player("Celeste", 1);
    player2 = new Player("Violeta", 2);
    fichas = new Fichas(numFichas, FICHAS_SIZE, player1, player2);
    board = new Board(beginPosX, beginPosY, row, col);
    game = new Game(player1, player2, board, fichas);
    // game.stopTimer();
   // game.restartTimer();
}
// function startGame(row, col) {
//     let beginPosX = ((CANVAS_WIDTH / 2) - ((col * CUADRADO_SIZE) / 2) - CUADRADO_SIZE) - FICHAS_SIZE;
//     let beginPosY = ((CANVAS_HEIGHT / 2) - ((row * CUADRADO_SIZE) / 2) - CUADRADO_SIZE) + (FICHAS_SIZE * 2);
//     clearCanvas('#F8F8FF');
//     player1 = new Player("Celeste", 1);
//     player2 = new Player("Violeta", 2);
//     fichas = new Fichas(row * col / 2, FICHAS_SIZE, player1, player2);
//     board = new Board(beginPosX, beginPosY, row, col);
//     game = new Game(player1, player2, board, fichas);
// }


// document.querySelector("#sieteOcho").addEventListener("click", () => {
//     startGame(7, 8);
// })
// document.querySelector("#ochoNueve").addEventListener("click", () => {
//     startGame(8, 9);
// })

// Inicializar listeners de eventos de mouse en el canvas
CANVAS.addEventListener('mousedown', onMouseDown, false);
CANVAS.addEventListener('mouseup', onMouseUp, false);
CANVAS.addEventListener('mousemove', onMouseMoved, false);
startGame();