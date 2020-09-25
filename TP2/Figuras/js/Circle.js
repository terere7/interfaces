class Circle extends Figure{
    constructor(posX, posY, radius, fill, context) {
        super(posX, posY, fill, context);
        this.radius = radius;
    }

    draw() {
        super.draw();
        this.context.beginPath();
        //x,y,radio, angulo de comienzo, angulo de finalidad (radianes) 
        // PI=180, 2PI=360
        this.context.arc(this.posX, this.posY, this.radius,0, 2*Math.PI);
        this.context.fill();
        this.context.closePath();
    }

//GETTERS AND SETTERS
    setRadius(radius) {
        this.radius = radius;
    }
    getRadius() {
        return this.radius;
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
}