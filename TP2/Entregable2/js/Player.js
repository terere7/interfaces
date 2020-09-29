class Player {
    constructor(name, number, favoriteColor) {
        this.name = name;
        this.turn = false;
        this.number = number;
        this.color = favoriteColor
    }

    //GETTER Y SETTERS
    getName() {
        return this.nombre;
    }
    setName(name) {
        this.name = name;
    }

    getNum() {
        return this.number;
    }
    setNum(num) {
        this.number = num;
    }

    //TURNO
    getTurn() {
        return this.turn;
    }
    
    // COLOR FAVORITO, PARA LA FICHA
    getColor() {
        return this.color;
    }
}