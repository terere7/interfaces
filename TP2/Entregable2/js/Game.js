const WIN = 4;
class Game {
    constructor(player1, player2, board, fichas) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = board;
        this.fichas = fichas;

        this.matrix = [];
        this.lastClickedFicha = null;// ultima figura clickeada, por defecto no tengo ninguna
        this.lastInsertPos = { col: 0, fil: 0 };

        this.lastPlayer = player1;// por defecto comienza el
        this.isMouseDown = false;
this.initGame();
    
    }

initGame(){
    this.drawFigures();
}
    //EVENTOS
    onMouseDown(event) {
        this.isMouseDown = true;
        if (this.lastClickedFicha != null) {
            this.lastClickedFicha.setHighlighted(false);
            this.lastClickedFicha = null;
        }
        // Buscar si hay una nueva figura clickeada
        let clickedFigure = findClickedFigure(event.layerX, event.layerY);
        if (clickedFigure != null) {
            clickedFigure.setHighlighted(true);
            this.lastClickedFicha = clickedFigure;
        }
        this.drawFigures();
    }

    onMouseMoved(event) {
        if (this.isMouseDown && this.lastClickedFicha != null) {
            this.lastClickedFicha.setPosition(event.layerX, event.layerY);
            this.drawFigures();
        }
    }
    onMouseUp(event) {
        this.isMouseDown = false;
        //buscar casillero;
        let locker = this.board.getLocker(event.layerX, event.layerY);
        //ubico la ficha al casillero
        if (locker !== null && lastClickedFicha !== null) {
            game.addFicha(lastClickedFicha, locker);

        }

    }
    drawFigures() {
        this.clearCanvas('#F8F8FF');
        //Fichas
        let fichasAux = this.fichas.getFichas();
        for (let i = 0; i < fichasAux.length; i++) {
            fichasAux[i].draw();
        }
        //Tablero
        let boardAux = this.board.getBoard();
        for (let i = 0; i < boardAux.length; i++) {
            boardAux[i].draw();
        }
    }
    // OBTENER FIGURA CLICKEADA
    findClickedFigure(x, y) {
        for (let index = 0; index < this.fichas.length; index++) {
            const element = this.fichas[index];
            if (element.isPointInside(x, y)) {
                return element;
            }
        }
    }

    //LIMPIAR CANVAS
    clearCanvas(color) {
        CONTEXT.fillStyle = color;
        CONTEXT.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    isValidLocker(fila, columna) {
        if (!this.empty(fila, columna)) return false;// si el casillero q quiero poner ya tiene una ficha 
        //busco la fila en q puede poner
        if (!this.validColumn(columna) || !this.validRow(fila, columna)) return false;
        return true;
    }
    //FUNCION DE VERIFICACION
    empty(fila, columna) {
        return matrix[fila][columna] == null;
    }
    validColumn(columna) {
        return columna < this.col && columna >= 0;
    }
    validRow(fila, columna) {
        let filaValida = false;
        if (fila < this.ROW && fila >= 0) {// controlar q no me vaya de rango
            if (fila == ROW - 1) {// fila de mas abajo
                filaValida = true;
            } else {
                if (matrix[fila + 1][columna] !== null) {// controlar q la anterior esta 
                    filaValida = true;
                }
            }
        }
        return filaValida;
    }

    //BUG, A VECES SE VUELVE AUNQUE SEA VALIDA !!!!!!!!!!!
    //Agregar ficha al casillero
    addFicha(ficha, locker) {
        // si es posible ubicar en la casilla
        let f = parseInt(locker.getRow());
        let c = parseInt(locker.getCol());
        if (this.isValidLocker(f, c)) {
            locker.setFicha(ficha);//agrego la ficha al casillero
            this.lastInsertPos = { col: c, fil: f };// actualizar ultima insertada
            ficha.setPosition(locker.getPosXMed(), locker.getPosYMed());
            ficha.setClickeable(false);// no es mas clickeable
            this.changePlayer();
        } else {
            //volver a poner la ficha en el principio
            ficha.setBeginPosition();
        }
        console.log("valor" + matrix[f][c].getRadius());

    }

    // FUNCIONES PARA CHECKEAR 4 EN LINEA
    checkColum(col, fil) {
        //checkea la columna para abajo
        let find = false;
        let count = 0;
        for (let index = fil; index < this.ROW.length; index++) {
            if (!find) {
                //si encuentra una ficha de otro jugador, no cuenta mas
                if (this.matrix[index][col].getPlayer() !== this.lastPlayer) {
                    find = true;
                } else {
                    count++;
                }
            }
        }
        return count === WIN;
    }
    checkRow(col, fil) {
        let count = 0;
        let countRight = 0;
        let countLeft = 0;
        let find = false;
        let auxCol = col;
        //busco a la derecha
        while (auxCol < this.col && !find) {
            if (this.matrix[fil][auxCol].getPlayer() !== this.lastPlayer) {
                find = true;
            } else {
                countRight++;
                auxCol++;
            }
        }
        //Vuelvo a pos original
        auxCol = col - 1;
        find = false;
        //busco a la izq
        while (auxCol > 0 && !find) {
            if (this.matrix[fil][auxCol].getPlayer() !== this.lastPlayer) {
                find = true;
            } else {
                countLeft++;
                auxCol--;
            }
        }
        count = countRight + countLeft;
        return count === WIN;
    }
    checkDiagonal(col, fil) {

    }

    // CHECKEAR SI GANO
    isWinner() {
        let col = this.lastInsertPos.col;
        let fil = this.lastInsertPos.fil;
        let winner = false;
        winner = this.checkColum(col, fil);
        if (!winner) {
            winner = this.checkRow(col, fil);
        }
        if (!winner) {
            winner = this.checkDiagonal(col, fil);
        }
        return winner;
    }
    win(nombre) {
        return "Gano el " + nombre;
    }
    //CAMBIAR DE JUGADOR
    changePlayer() {
        if (this.lastPlayer.getNum() == 1) {
            this.lastPlayer = this.player2;
        } else {
            this.lastPlayer = this.player2;
        }
    }


}