class DropDrag{
    constructor(BeginPosX, BeginPosY, col) {
        this.BeginPosX = BeginPosX;
        this.BeginPosY = BeginPosY;
        this.col=col;
        this.dropCircles=[];
        
        this.createDropCircles();
        
    }
//Lugares donde se tira las fichas
    createDropCircles(){
        let img= "./img/TIRE.png";
        let posX=this.BeginPosX ;
        let posY=this.BeginPosY;
        for (let index = 0; index < COL; index++) {
            posX += CUADRADO_SIZE + 5;
                this.addCircle(img, posX, posY, null, index);               
        }
    
    }

    addCircle(color, posX, posY, player, id) {
        let circle = new Circle(posX, posY, FICHAS_SIZE, color, CONTEXT, player, id);
        this.dropCircles.push(circle);
    }

    getDrop(){
        return this.dropCircles;
    }
   
}