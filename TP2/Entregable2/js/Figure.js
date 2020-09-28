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

    // POSICION
    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }
    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    //RESALTADO
    //setear el grosor de resaltado
    setHighlighted(value) {
        this.highlighted = value;
    }
    // setear el color de resaltado
    setHighlightedStyle(style) {
        this.highlightedStyle = style;
    }

    

    //METODOS ABSTRACTOS
    draw() {
        this.context.fillStyle = this.fill;
    }
    isPointInside(x, y) { //metodo abstracto que tiene que implementar las clases hijas
    }
}