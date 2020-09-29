class Player{
    constructor(name){
        this.name=name;
        this.turn=false;
    }

    //GETTER Y SETTERS
    getName(){
        return this.nombre;
    }
    setName(name){
        this.name=name;
    }

    //TURNO
    getTurn(){
        return this.turn;
    }
}