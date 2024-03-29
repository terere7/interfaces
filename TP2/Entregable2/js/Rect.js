class Rect extends Figure {

    constructor(posX, posY, width, height, fill, context, row, col) {
        super(posX, posY, fill, context);// misma propiedad que el padre
        //propios atributos del rectangulo
        this.width = width;
        this.height = height;
        this.row = row;
        this.col = col;
        this.ficha = null;
        //Casilleros con imagenes
        this.urlimage = fill;
        this.image = new Image();
    }

    //polimorfismo, llama al metodo de la clase mas baja
    draw() {
        super.draw();
        //  this.context.lineWidth = 3;
        // this.context.strokeRect(this.posX, this.posY, this.width, this.height);//dibuja un rectangulo
        //Dibuja casillero con la imagen
        if (this.image.src === "") {
            this.image.src = this.urlimage;
            let loadImg = function () {
                this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
            }
            this.image.onload = loadImg.bind(this);

        } else {
            this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        }
    }
    //POSICION MEDIA DEL CUADRADO
    getPosXMed() {
        return this.posX + (this.width / 2);
    }
    getPosYMed() {
        return this.posY + (this.height / 2);
    }

    //GETTERS AND SETTERS
    getCoordenadas() {// fila y col que esta ubicado el casillero
        return {
            row: this.row,
            col: this.col
        };
    }
    setRow(x) {
        this.row=x;
    }
    getRow() {
        return this.row;
    }

    getCol() {
        return this.col;
    }
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

    //FICHAS
    setFicha(ficha) {
        this.ficha = ficha;
    }
    getFicha() {
        return this.ficha;
    }
    isEmpty() {
        return this.ficha == null;
    }

    //HAY CUADRADO EN LAS POS X E Y?
    isPointInside(x, y) {
        //si no estoy afuera del rectangulo
        return !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
    }

    circleInsideLocker(x, y, figure) {
        // si no esta fuera de la casilla
        let isInside = !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
        if (isInside == true) {//esta adentro
            if (figure != null) {
                figure.setPosition(this.getPosXMed, this.getPosYMed);//ubico al medio
            }
        }
        return isInside;
    }


}