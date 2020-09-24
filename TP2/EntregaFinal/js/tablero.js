class tablero{

    constructor(context) {
        this.i = 7;
        this.j = 6;
        this.context = context;
        this.tablero = [];
        this.insertsPoints = [];
    }


    crearTablero() {
        let cuadrado;
        for (let x = 0; x < this.i; x++) {
            this.tablero[x] = [];
            for (let y = 0; y < this.j; y++) {
                let posX = (x * 100) + 270;
                let posY = (y * 100) + 90;
                cuadrado = new Cuadrado(this.context, posX, posY);
                cuadrado.addImage(posX, posY);
                this.board[x][y] = cuadrado;
            }
            cuadrado = this.board[x][0];
            let pointToInsert = cuadrado.getPosition();
            pointToInsert.x = pointToInsert.x + 50;
            pointToInsert.y = pointToInsert.y - 30;
            this.insertsPoints[x] = pointToInsert;
        }
    }

}