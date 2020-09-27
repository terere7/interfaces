//CANVAS
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
//FICHAS
const FICHAS_SIZE = 20;
const NUM_FICHAS = 21;
let fichas = []; // arreglo de figuras
let lastClickedFicha = null;// ultima figura clickeada, por defecto no tengo ninguna
let isMouseDown = false;//esta clickeado



//AGREGAR FIGURAS

//Rectangulo
function addRectangle(posX,posY) { // Agregar rectangulos al azar dentro del canvas
    //posicion random
    let color = '#0000ff';// color delineado
    let rect = new Rect(posX, posY, 45, 45, color, context);
    fichas.push(rect);//agrega recangulos al arreglo
}
//Circulo
function addCircle(color,posX,posY,player) {
    //let color ='#600080';
    let circle = new Circle(posX, posY, FICHAS_SIZE, color, context, player);
    fichas.push(circle);
}

function drawFigures() {
    clearCanvas('#F8F8FF', canvas);
    //recorre el arreglo para dibujas las figuras
    for (let i = 0; i < fichas.length; i++) {
        fichas[i].draw();
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
    let espacio= canvas.height/NUM_FICHAS;
    // Inicializar figuras de forma aleatoria
    let player1 = new Player("Tere");
    let player2 = new Player("Nina");
    for (let index = 0; index < NUM_FICHAS; index++) {
        if(index==0){
            addCircle('#00e6e6', canvas.width*0.1, canvas.height/2,player1 );
            addCircle('#600080', canvas.width*0.9, canvas.height/2, player2);
        }else{
            addCircle('#00e6e6', canvas.width*0.05, espacio*index);
            addCircle('#600080', canvas.width*0.95, espacio*index);
        }   
    }
    drawFigures();
    // Inicializar listeners de eventos de mouse en el canvas
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMoved, false);
}

function crearTablero(){
    // for (let index = 0; index < NUM_FICHAS*2; index++) {
    // }
    addRectangle(300,300);
    // let img= "./img/tablero.png";
    // let board= new Board(img);
    // board.loadMat();
    // console.log(board.getMat());

}

crearFichas();
crearTablero();


