
class Board {
    constructor(posX, posY, row, col) {
        this.posX = posX;
        this.posY = posY;
        this.row = row;
        this.col = col;
        this.board = [];
        this.dropCircles = [];
        this.createBoard();
        this.createDrop();
    }

    circleInsideBoard(x, y, figure) {
        // si no esta fuera de la casilla
        let isInside = !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
        if (isInside == true) {//esta adentro
            figure.setPosition(this.posX, this.posY);//ubico al medio
        }
        return isInside;
    }
    //DROP

    createDrop() {
        let img = "./img/flecha.png";
        let posX = this.posX;
        let posY = this.posY - CUADRADO_SIZE;
        let fila = this.row - 1;// x defecto todos empiezan en la ultima fila
        for (let index = 0; index < this.col; index++) {
            posX += CUADRADO_SIZE + 5;
            this.addDrop(img, posX, posY, fila, index);
        }

    }

    getDrop() {
        return this.dropCircles;
    }
    addDrop(color, posX, posY, row, col) { // Agregar rectangulos al azar dentro del canvas
        let rect = new Rect(posX, posY, CUADRADO_SIZE, CUADRADO_SIZE, color, CONTEXT, row, col);
        this.dropCircles.push(rect);//agrega recangulos al arreglo
    }

    //Rectangulo
    addRectangle(color, posX, posY, row, col) { // Agregar rectangulos al azar dentro del canvas
        let rect = new Rect(posX, posY, CUADRADO_SIZE, CUADRADO_SIZE, color, CONTEXT, row, col);
        this.board.push(rect);//agrega recangulos al arreglo
    }

    //OBTENER LA DROP ZONE
    getDropZone(posX, posY) {
        for (let index = 0; index < this.dropCircles.length; index++) {
            if (this.dropCircles[index].isPointInside(posX, posY)) {
                return this.dropCircles[index];
            }
        }
        return null;
    }
    getLocker(col, fila) {
        for (let index = 0; index < this.board.length; index++) {
            if (this.board[index].getCol() == col && this.board[index].getRow() == fila) {
                return this.board[index];
            }
        }
        return null;
    }

    // CREAR TABLERO (CONJUNTO DE CASILLEROS)
    createBoard() {
        //  let color = "blue";
        let color = "./img/locker1.png";
        let posX = this.posX;
        let posY = this.posY;
        for (let y = 0; y < this.row; y++) {//filas
            for (let x = 0; x < this.col; x++) {
                posX += CUADRADO_SIZE + 5;
                this.addRectangle(color, posX, posY, y, x);
            }
            posX -= (CUADRADO_SIZE + 5) * this.col;
            posY += CUADRADO_SIZE + 5;
        }

    }
    //GETTERS Y SETTERS
    getBoard() {
        return this.board;
    }
    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
    setCol(col) {
        this.col = col;
    }
    setRow(row) {
        this.row = row;
    }
}