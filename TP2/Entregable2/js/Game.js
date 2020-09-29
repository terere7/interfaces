const WIN = 4;
class Game {
    constructor(row, col, player1, player2) {
        this.matrix = [];
        this.row = row;
        this.col = col;
        // console.log(matrix);
        this.lastInsertPos = { col: 0, fil: 0 };
        this.lastPlayer = player1;
        this.player1 = player1;
        this.player2 = player2;
        this.createBoard();
    }

    createBoard() {
        for (let y = 0; y < row; y++) {//filas
            this.matrix[y] = [];
            for (let x = 0; x < col; x++) {
                this.matrix[y][x] = null;
            }
        }
    }

    isValidLocker(fila, columna) {
        if (!this.empty(fila, columna)) return false;// si el casillero q quiero poner ya tiene una ficha 
        //busco la fila en q puede poner
        if (!this.validColumn(columna) || !this.validRow(fila, columna)) return false;
        return true;
    }
    empty(fila, columna) {
        return matrix[fila][columna] == null;
    }
    validColumn(columna) {
        return columna < this.col && columna >= 0;
    }
    validRow(fila, columna) {
        let filaValida = false;
        if (fila < this.row && fila >= 0) {// controlar q no me vaya de rango
            if (fila == row - 1) {// fila de mas abajo
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
    //Agregar ficha en las coordenadas
    addFicha(ficha, locker) {
        // si es posible ubicar en la casilla
        let agregada=false;
        let f = parseInt(locker.getRow());
        let c = parseInt(locker.getCol());
        console.log(matrix[f][c]);

        if (this.isValidLocker(f, c)) {
            matrix[f][c] = ficha;//agrego la ficha a la matriz
            this.lastInsertPos = { col: c, fil: f };// actualizar ultima insertada
            ficha.setPosition(locker.getPosXMed(), locker.getPosYMed());
            this.lastPlayer = ficha.getPlayer();
            agregada=true;
        } else {
            ficha.setBeginPosition();

        }
        console.log("valor" + matrix[f][c].getRadius());
        return agregada;
    }

    checkColum(col, fil) {
        //checkea la columna para abajo
        let find = false;
        let count = 0;
        for (let index = fil; index < this.row.length; index++) {
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


}