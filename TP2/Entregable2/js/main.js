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

//TABLERO
let board;
const ROW = 6;
const COL = 7;
// Calcular donde empieza el trablero
let beginPosX = ((CANVAS_WIDTH / 2) - ((COL * CUADRADO_SIZE) / 2) - CUADRADO_SIZE) - 20;
let beginPosY = ((CANVAS_HEIGHT / 2) - ((ROW * CUADRADO_SIZE) / 2) - CUADRADO_SIZE) + 40;

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
    player1 = new Player("Jugador 1", 1);
    player2 = new Player("Jugador 2", 2);
    fichas = new Fichas(NUM_FICHAS, FICHAS_SIZE, player1, player2);
    board = new Board(beginPosX, beginPosY);
    game = new Game(player1, player2, board, fichas);
}

// Inicializar listeners de eventos de mouse en el canvas
CANVAS.addEventListener('mousedown', onMouseDown, false);
CANVAS.addEventListener('mouseup', onMouseUp, false);
CANVAS.addEventListener('mousemove', onMouseMoved, false);
startGame();

