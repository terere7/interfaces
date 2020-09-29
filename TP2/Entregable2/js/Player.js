class Player {
    constructor(name, number) {
        this.name = name;
        this.turn = false;
        this.number = number;
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
}