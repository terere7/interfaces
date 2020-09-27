class Rect extends Figure {

    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);// misma propiedad que el padre
        //propios atributos del rectangulo
        this.width = width;
        this.height = height;
        this.fill=fill;
    }

    //polimorfismo, llama al metodo de la clase mas baja
    draw() {
        super.draw();
        this.context.lineWidth = 3;
        this.context.strokeRect(this.posX, this.posY, this.width, this.height);//dibuja un rectangulo
    }

    //GETTERS AND SETTERS
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

    //saber si esta clickeando
    isPointInside(x, y) {
        //si no estoy afuera del rectangulo
        return !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
    }


}