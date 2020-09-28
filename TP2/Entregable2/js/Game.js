class Game {
    constructor(matrix, row, col) {
        this.matrix = matrix;
        this.row = row;
        this.col = col;
    }
   

    isValidLocker(fila, col) {
        if (!empty(fila, col)) return false;// si el casillero q quiero poner ya tiene una ficha 
        //busco la fila en q puede poner
        if (validColumn(col) && valiRow(fila, col)) return true;
        return false;
    }
    empty(fila, col) {
        return matrix[fila][col] === null;
    }
    validColumn(col) {
        return col < this.col && col >= 0;
    }
    validRow(fila, col) {
        let filaValida = false;
        if (fila < this.row && row >= 0) {// controlar q no me vaya de rango
            if (fila == row - 1) {// fila de mas abajo
                filaValida = true;
            } else {
                if (matrix[fila + 1][col] !== null) {// controlar q la anterior esta 
                    filaValida = true;
                }
            }
        }
        return filaValida;
    }
 //Agregar ficha en las coordenadas
 addFicha(ficha, fila, col) {
    // si es posible ubicar en la casilla
    console.log(fila,col);
    if (isValidLocker(fila, col)){
        matrix[fila][col] = ficha;//agrego la ficha
    } else {
        //vuelvo a poner la ficha en la pos original
    }
}
}