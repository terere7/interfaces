class Game {
    constructor(matrix, row, col) {
        this.matrix = matrix;
        this.row = row;
        this.col = col;
        console.log(matrix);

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
    addFicha(ficha,locker) {
        // si es posible ubicar en la casilla
        let f = parseInt(locker.getRow());
        let c = parseInt(locker.getCol());
        console.log(matrix[f][c]);

        if (this.isValidLocker(f, c)) {
            matrix[f][c] = ficha;//agrego la ficha
            ficha.setPosition(locker.getPosXMed(), locker.getPosYMed())
        } else {
           ficha.setBeginPosition();
        }
        console.log("valor" + matrix[f][c].getRadius());
    }

    checkWinner(){
        
    }
}