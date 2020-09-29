const WIN = 4;
class Game {
    constructor(player1, player2, board, fichas) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = board;
        this.fichas = fichas;

        this.lastClickedFicha = null;// ultima figura clickeada, por defecto no tengo ninguna
        this.lastInsertPos = { col: 0, fil: 0 };

        this.lastPlayer = player1;// por defecto comienza el
        this.isMouseDown = false;
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
        let clickedFigure = this.findClickedFigure(event.layerX, event.layerY);
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
        if (locker !== null && this.lastClickedFicha !== null) {
            this.addFicha(this.lastClickedFicha, locker);
        }

    }
    //DIBUJAR FIGURAS EN CANVAS
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

    //FUNCION DE VERIFICACION
    isValidLocker(locker) {
        if (!locker.isEmpty()) return false;// si el casillero q quiero poner ya tiene una ficha 
        //busco la fila en q puede poner
        if (!this.isValidPos(locker)) return false;
        return true;
    }

    // Verificar si es una posicion valida
    isValidPos(locker) {
        let validPos = false;
        let f = parseInt(locker.getRow());
        let c = parseInt(locker.getCol());
        if (f == ROW - 1) {// fila de mas abajo
            validPos = true;
        } else {
            if (!this.getLocker(c, f + 1).isEmpty()) {// el de abajo tiene una ficha
                validPos = true;
            }
        }
        return validPos;
    }
    //Obtiene un casillero pasando su coordenadas fila y col
    getLocker(x, y) {
        for (let index = 0; index < this.board.length; index++) {
            let locker = board[i];
            if (locker.getCol() == x && locker.getRow() == y) {
                return locker;
            }
        }
    }
    //BUG, A VECES SE VUELVE AUNQUE SEA VALIDA !!!!!!!!!!!
    //Agregar ficha al casillero
    addFicha(ficha, locker) {
        // si es posible ubicar en la casilla
        let f = parseInt(locker.getRow());
        let c = parseInt(locker.getCol());
        if (this.isValidLocker(locker)) {
            locker.setFicha(ficha);//agrego la ficha al casillero
            this.lastInsertPos = { col: c, fil: f };// actualizar ultima insertada
            ficha.setPosition(locker.getPosXMed(), locker.getPosYMed());
            ficha.setClickeable(false);// no es mas clickeable
            if (this.isWinner()) {
                this.win();
            }
            //hacer alert
            this.changePlayer();
        } else {
            //volver a poner la ficha en el principio
            ficha.setBeginPosition();
        }

    }

    // FUNCIONES PARA CHECKEAR 4 EN LINEA
    checkColum(col, fil) {
        //checkea la columna para abajo
        let find = false;
        let count = 0;
        for (let index = fil; index < ROW; index++) {
            if (!find) {
                //si encuentra una ficha de otro jugador, no cuenta mas
            let playerX=this.getLocker(index,col).getFicha().getPlayer();
                if (playerX!== this.lastPlayer) {
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
        while (auxCol < COL && !find) {
            let playerX=this.getLocker(auxCol, fil).getFicha().getPlayer();
            if (playerX !== this.lastPlayer) {
                find = true;
            } else {
                countRight++;
                auxCol++;
            }
        }
        //Vuelvo a pos original
        auxCol = col - 1;// no cuento el casillero actual
        find = false;
        //busco a la izq
        while (auxCol >=0 && !find) {
            let playerX=this.getLocker(auxCol, fil).getFicha().getPlayer();
            if (playerX !== this.lastPlayer) {
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
        alert("Gano el " + nombre);
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