class Circle extends Figure {
    constructor(posX, posY, radius, fill, context, player, id) {
        super(posX, posY, fill, context);
        this.radius = radius;
        this.player = player;
        this.beginPosX = posX;
        this.beginPosY = posY;
        this.clickeable = true;
        this.id=id;
        this.turn = true;// poner en false;
    }

    draw() {
        super.draw();
        this.context.beginPath();//queda en el contexto hasta que se cierra el path
        //x,y,radio, angulo de comienzo, angulo de finalidad (radianes) 
        // PI=180, 2PI=360
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        //resaltar el que este seleccionado
        if (this.highlighted === true) {// si la figura esta resaltada
            this.context.strokeStyle = this.highlightedStyle;
            this.context.lineWidth = 5;
            this.context.stroke();
        }

        this.context.closePath();
    }
    setBeginPosition() {
        this.posX = this.beginPosX;
        this.posY = this.beginPosY;
        //   this.draw();
    }
    //GETTERS AND SETTERS
    setRadius(radius) {
        this.radius = radius;
    }
    getRadius() {
        return this.radius;
    }
    getPlayer() {
        return this.player;
    }

    isPointInside(x, y) {
        // si se puede clickea y 0
        if ((this.clickeable) && (this.turn)) {
            let _x = this.posX - x;
            let _y = this.posY - y;
            return Math.sqrt(_x * _x + _y * _y) < this.radius;
        }
        return false;
    }
 getId(){
     return this.id;
 }
    getBeginPosition() {
        return {
            beginPosX: this.beginPosX,
            beginPosY: this.beginPosY
        };
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y
    }
    isClickeable() {
        return this.clickeable;
    }
    setClickeable(click) {
        this.clickeable = click;
    }

    setTurn(turn) {
        this.turn = turn;
    }

}