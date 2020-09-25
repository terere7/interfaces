class Figure {
    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.highlighted = false;
        this.highlightedStyle = 'red';

        this.context = context;
    }

    setFill(fill) {
        this.fill = fill;
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

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getFill() {
        return this.fill;
    }

    setHighlighted(value) {
        this.highlighted = value;
    }

    setHighlightedStyle(style) {
        this.highlightedStyle = style;
    }

    // abstract methods
    draw() {
        this.context.fillStyle = this.fill;
    }

    isPointInside(x, y) { }
}
