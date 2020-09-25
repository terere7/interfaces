class Figure {
    constructor(posX, posY, fill, context) {
        this.posX = posX;// crea una propiedad a la clase figura con el this
        this.posY = posY;
        this.fill = fill;
        this.context = context
    }

    // GETTERS AND SETTERS

    //Color, patron/gradiente de colores, patron de fotos
    setFill(fill) {
        this.fill = fill;
    }
    getFill() {
        return this.fill;
    }

    //Position
    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    draw(){
        this.context.fillStyle=this.fill;
    }
    isPointInside(x, y) { //metodo abstracto que tiene que implementar las clases hijas
    }
}