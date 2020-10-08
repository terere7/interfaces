class Fichas {
    constructor(num_fichas, fichas_size, player1, player2) {
        this.num_fichas = num_fichas;
        this.fichas_size = fichas_size;
        this.player1 = player1;
        this.player2 = player2;
        this.fichas = [];
        this.createFichas();
    }
    // CREAR FICHAS
    createFichas() {
        let espacio = CANVAS_HEIGHT / this.num_fichas;
        // Inicializar figuras de forma aleatoria
        let ficha1 = "./img/circle1.png";//'#00e6e6'
        let ficha2 = "./img/circle2.png";//'#600080'
        for (let index = 0; index < this.num_fichas; index++) {
            if (index == 0) {
                this.addCircle(ficha1, CANVAS_WIDTH * 0.1, CANVAS_HEIGHT / 2, player1, index);
                this.addCircle(ficha2, CANVAS_WIDTH * 0.9, CANVAS_HEIGHT / 2, player2, index);
            } else {
                this.addCircle(ficha1, CANVAS_WIDTH * 0.05, espacio * index, player1, index);
                this.addCircle(ficha2, CANVAS_WIDTH * 0.95, espacio * index, player2, index);
            }
        }
    
    }

    addCircle(color, posX, posY, player, id) {
        let circle = new Circle(posX, posY, FICHAS_SIZE, color, CONTEXT, player, id);
        this.fichas.push(circle);
    }
    //OBTENER ARREGLO DE FICHAS
    getFichas() {
        return this.fichas;
    }

    setNumFichas(num) {
       this.num_fichas=num;
    }
}