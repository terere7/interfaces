class Fichas {
    constructor(num_fichas, fichas_size, color, player1, player2) {
        this.num_fichas = num_fichas;
        this.fichas_size = fichas_size;
        this.player1 = player1;
        this.player2 = player2;
        this.color = color;
        this.fichas = [];
        this.createFichas();
        
    }

    createFichas() {
        let espacio = CANVAS_HEIGHT / this.num_fichas;
        // Inicializar figuras de forma aleatoria

        for (let index = 0; index < this.num_fichas; index++) {
            if (index == 0) {
                this.addCircle('#00e6e6', CANVAS_WIDTH * 0.1, CANVAS_HEIGHT / 2, player1);
                this.addCircle('#600080', CANVAS_WIDTH * 0.9, CANVAS_HEIGHT / 2, player2);
            } else {
                this.addCircle('#00e6e6', CANVAS_WIDTH * 0.05, espacio * index, player1);
                this.addCircle('#600080', CANVAS_WIDTH * 0.95, espacio * index, player2);
            }
        }
        //eventos addEventListener
     }

    addCircle(color, posX, posY, player) {
        let circle = new Circle(posX, posY, FICHAS_SIZE, color, CONTEXT, player);
        this.fichas.push(circle);
    }

    getFichas(){
        return this.fichas;
    }
}