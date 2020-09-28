class Board extends Figure {

    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);
        this.width = width;
        this.height = height;
    }
    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

   circleInsideBoard(x, y, figure) {
       // si no esta fuera de la casilla
        let isInside = !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
        if (isInside == true) {//esta adentro
            figure.setPosition(this.posX, this.posY);//ubico al medio
        }
        return isInside;
    }
}