
class Board {

    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;

        this.board = [];
        this.createBoard();
    }
    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
//VERRR
    circleInsideBoard(x, y, figure) {
        // si no esta fuera de la casilla
        let isInside = !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
        if (isInside == true) {//esta adentro
            figure.setPosition(this.posX, this.posY);//ubico al medio
        }
        return isInside;
    }

    //Rectangulo
    addRectangle(color, posX, posY, row, col) { // Agregar rectangulos al azar dentro del canvas
        let rect = new Rect(posX, posY, CUADRADO_SIZE, CUADRADO_SIZE, color, CONTEXT, row, col);
        this.board.push(rect);//agrega recangulos al arreglo
    }

    //obtener un el casillero
    getLocker(posX, posY) {
        for (let index = 0; index < this.board.length; index++) {
            if (this.board[index].isPointInside(posX, posY)){
                return this.board[index];
            }
        }
        return null;
    }

    createBoard() {
        let color = "blue";
        let posX = this.posX;
        let posY = this.posY;
        for (let y = 0; y < ROW; y++) {//filas
            for (let x = 0; x < COL; x++) {
                posX += CUADRADO_SIZE + 5;
                this.addRectangle(color, posX, posY, y, x);
            }
            posX -= (CUADRADO_SIZE + 5) * COL;
            posY += CUADRADO_SIZE + 5;
        }

    }

    getBoard() {
        return this.board;
    }

}