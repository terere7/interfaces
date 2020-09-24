class Rect extends Figure {

    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);// misma propiedad que el padre
        //propios atributos del rectangulo
        this.width = width;
        this.height = height;
    }

    //polimorfismo, llama al metodo de la clase mas baja
    draw() {
        super.draw();
        // x,y,alto,ancho
        this.context.fillRect(this.posX, this.posY, this.width, this.height);//dibuja un rectangulo
    }

    //GETTERS
    //Ancho
    getWidht() {
        return this.width;
    }
    setWidht(width) {
        this.width = width;
    }
    //Alto
    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }

}