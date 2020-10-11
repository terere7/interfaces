const WIN = 4;
class Game {
    constructor(player1, player2, board, fichas) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = board;
        this.fichas = fichas;
        this.countFichasUsed = 0;
        this.lastClickedFicha = null;// ultima figura clickeada, por defecto no tengo ninguna
        this.lastInsertPos = { col: 0, fil: 0 };
        this.clickedFicha = null;
        this.lastPlayer = player1;// por defecto comienza el
        this.isMouseDown = false;
        this.winner = false;
        this.listWinPieces = [];
        this.drawFigures();
        this.firstPlayer();
        this.interval = null;
        this.display = null;
        //   this.restartTimer();

    }

    //EVENTOS MOUSE
    onMouseDown(event) {
        this.isMouseDown = true;
        if (this.lastClickedFicha != null) {
            this.lastClickedFicha.setHighlighted(false);
            this.lastClickedFicha = null;
        }
        // Buscar si hay una nueva figura clickeada
        let clickedFigure = this.findClickedFigure(event.layerX, event.layerY);
        if (clickedFigure != null) {
            clickedFigure.setHighlighted(true);
            this.lastClickedFicha = clickedFigure;
        }
        this.drawFigures();
    }

    onMouseMoved(event) {
        if (this.isMouseDown && this.lastClickedFicha != null) {
            this.lastClickedFicha.setPosition(event.layerX, event.layerY);
            this.drawFigures();
        }
    }
    onMouseUp(event) {
        this.isMouseDown = false;
        //buscar casillero;
        let drop = this.board.getDropZone(event.layerX, event.layerY);
        console.log(drop);
        let ficha = this.clickedFicha;
        //La ficha esta en algun drop zone
        if (drop != null && ficha != null) {
            if (drop.getRow() >= 0) {//me devuelve la fila disponible
                let locker = this.board.getLocker(drop.getCol(), drop.getRow());
                this.addFicha(ficha, locker);
                this.clickedFicha = null;//deselecciono la ficha una vez ubicada
                let fila = drop.getRow();
                drop.setRow(fila - 1);
            } else {// no hay mas lugar
                this.setBeginPosition(ficha);
                this.clickedFicha = null;
            }
        } else {
            //volver a poner la ficha en el principio
            if (this.clickedFicha != null && this.clickedFicha.isClickeable()) {
                this.setBeginPosition(ficha);
                this.clickedFicha = null;
            }
        }
        this.drawFigures();

    }
    ///////////////////////////////////////


    //DIBUJAR FIGURAS EN CANVAS
    drawFigures() {
        this.clearCanvas('#F8F8FF');
        //drop zone
        let dropAux = this.board.getDrop();
        for (let i = 0; i < dropAux.length; i++) {
            dropAux[i].draw();
        }
        //Tablero
        let boardAux = this.board.getBoard();
        for (let i = 0; i < boardAux.length; i++) {
            boardAux[i].draw();
        }
        //Fichas
        let fichasAux = this.fichas.getFichas();
        for (let i = 0; i < fichasAux.length; i++) {
            fichasAux[i].draw();
        }
    }

    // OBTENER FIGURA CLICKEADA
    findClickedFigure(x, y) {
        let fichasAux = fichas.getFichas();
        for (let index = 0; index < fichasAux.length; index++) {
            let element = fichasAux[index];
            if (element.isPointInside(x, y)) {
                this.clickedFicha = element;// seteo la ultima apretada
                return element;
            }
        }
        return null;
    }

    //LIMPIAR CANVAS
    clearCanvas(color) {
        CONTEXT.fillStyle = color;
        CONTEXT.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    ///////////////////////////////////////////

    //AGREGAR LA FICHA AL CASILLERO
    addFicha(ficha, locker) {
        // Fila y col ubicada (casillero)
        let f = parseInt(locker.getRow());
        let c = parseInt(locker.getCol());

        locker.setFicha(ficha);//Almaceno ficha en el casillero
        this.lastInsertPos = { col: c, fil: f };//Update last position
        ficha.setClickeable(false);
        let medX = locker.getPosXMed();
        let medY = locker.getPosYMed();
        ficha.setPosition(medX, medY);
        this.countFichasUsed++;

        this.drawFigures();// para q me dibuje en el momento
        if (this.isWinner()) {
            this.drawFigures();
            alert("Gano el " + this.lastPlayer.getName());
        } else {
            this.changePlayer();
        }
    }

    // Poner la ficha en la posicion original
    setBeginPosition(ficha) {
        ficha.setBeginPosition();
        this.drawFigures();
    }

    //OBTENER CASILLERO (fila y col) 
    getLocker(x, y) {
        let b = this.board.getBoard();
        for (let index = 0; index < b.length; index++) {
            let locker = b[index];
            if (locker.getCol() == x && locker.getRow() == y) {
                return locker;
            }
        }
        return null;
    }

    // FUNCIONES PARA CHECKEAR 4 EN LINEA
    checkColum(col, fil) {
        //checkea la columna para abajo
        let find = false;
        for (let index = fil; index < this.board.getRow(); index++) {
            if (!find) {
                //si encuentra una ficha de otro jugador, no cuenta mas
                let playerX = this.getLocker(col, index).getFicha().getPlayer().getNum();
                if (playerX !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    this.listWinPieces.push(this.getLocker(col, index).getFicha());
                }
            }
        }
        if(this.listWinPieces.length!==WIN){
            this.listWinPieces=[];
            return false;
        }
        return true;
    }

    checkRow(col, fil) {
        let find = false;
        let auxCol = col;
        //busco a la derecha
        while (auxCol < this.board.getCol() && !find) {
            if (this.getLocker(auxCol, fil).getFicha() == null) {
                find = true;
            } else {
                let playerX = this.getLocker(auxCol, fil).getFicha().getPlayer().getNum();
                if (playerX !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    this.listWinPieces.push(this.getLocker(auxCol, fil).getFicha());
                    auxCol++;
                }
            }
        }
        //Vuelvo a pos original
        auxCol = col - 1;// no cuento el casillero actual
        find = false;
        //busco a la izq
        while (auxCol >= 0 && !find) {
            if (this.getLocker(auxCol, fil).getFicha() == null) {
                find = true;
            } else {
                if (this.getLocker(auxCol, fil).getFicha().getPlayer().getNum() !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    this.listWinPieces.push(this.getLocker(auxCol, fil).getFicha());
                    auxCol--;
                }
            }
        }

        if(this.listWinPieces.length!==WIN){
            this.listWinPieces=[];
            return false;
        }
       return true;
    }

    checkDiagonalAsc(col, fil) {
        let auxCol = col;
        let auxFil = fil;
        //busca para arriba
        let find = false;
        while (auxCol < this.board.getCol() && auxFil >= 0 && !find) {
            if (this.getLocker(auxCol, auxFil).getFicha() == null) {
                find = true;
            } else {
                let playerX = this.getLocker(auxCol, auxFil).getFicha().getPlayer().getNum();
                if (playerX !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    this.listWinPieces.push(this.getLocker(auxCol, auxFil).getFicha());
                    auxCol++;
                    auxFil--;
                }
            }
        }
        //reinicializo valores
        find = false;
        auxCol = col - 1;
        auxFil = fil + 1;
        while (auxCol >= 0 && auxFil < this.board.getRow() && !find) {
            if (this.getLocker(auxCol, auxFil).getFicha() == null) {
                find = true;
            } else {
                let playerX = this.getLocker(auxCol, auxFil).getFicha().getPlayer().getNum();
                if (playerX !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    this.listWinPieces.push(this.getLocker(auxCol, auxFil).getFicha());
                    auxCol--;
                    auxFil++;
                }
            }
        }
        if(this.listWinPieces.length!==WIN){
            this.listWinPieces=[];
            return false;
        }
        return true;
    }

    checkDiagonalDesc(col, fil) {
        let auxCol = col;
        let auxFil = fil;
        //busca para arriba
        let find = false;
        while (auxCol >= 0 && auxFil >= 0 && !find) {
            if (this.getLocker(auxCol, auxFil).getFicha() == null) {
                find = true;
            } else {
                let playerX = this.getLocker(auxCol, auxFil).getFicha().getPlayer().getNum();
                if (playerX !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    this.listWinPieces.push(this.getLocker(auxCol, auxFil).getFicha());
                    auxCol--;
                    auxFil--;
                }
            }
        }
        //reinicializo valores
        find = false;
        auxCol = col + 1;
        auxFil = fil + 1;
        while (auxCol < this.board.getCol() && auxFil < this.board.getRow() && !find) {
            if (this.getLocker(auxCol, auxFil).getFicha() == null) {
                find = true;
            } else {
                let playerX = this.getLocker(auxCol, auxFil).getFicha().getPlayer().getNum();
                if (playerX !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    this.listWinPieces.push(this.getLocker(auxCol, auxFil).getFicha());
                    auxCol++;
                    auxFil++;
                }
            }
        }
        if(this.listWinPieces.length!==WIN){
            this.listWinPieces=[];
            return false;
        }
        return true;
    }
    // CHECKEAR SI GANO
    isWinner() {
        let col = this.lastInsertPos.col;
        let fil = this.lastInsertPos.fil;
        let winner = false;
        winner = this.checkColum(col, fil);
    
        if (!winner) {
            winner = this.checkRow(col, fil);
        }
        if (!winner) {
            winner = this.checkDiagonalAsc(col, fil);
        }
        if (!winner) {
            winner = this.checkDiagonalDesc(col, fil);
        }
        //setear las fichas 
        this.listWinPieces.forEach(element => {
            element.setHighlightedStyle('39FF14')
            element.setHighlighted(true);
        });
        console.log(this.listWinPieces);
        return winner;
    }

    gameOver() {
        if (this.countFichasUsed === numFichas) {
            alert("GAME OVER");
        }
    }

    firstPlayer() {
        let f = this.fichas.getFichas();
        for (let i = 0; i < f.length; i++) {
            if (f[i].getPlayer() != this.player1) {
                f[i].setTurn(false);// Activa fichas del jugador
            } else {
                f[i].setTurn(true);//Desactiva fichas del jugador
            }
        }
    }

    //CAMBIAR DE JUGADOR
    changePlayer() {
        let player = this.lastPlayer;
        let f = this.fichas.getFichas();
        for (let i = 0; i < f.length; i++) {
            if (f[i].getPlayer() == player) {
                f[i].setTurn(false);// Activa fichas del jugador
            } else {
                f[i].setTurn(true);//Desactiva fichas del jugador
            }
        }
        if (this.lastPlayer.getNum() == 1) {
            this.lastPlayer = this.player2;
        } else {
            this.lastPlayer = this.player1;
        }
        //Turno 
        let mensaje = "Tu turno";
        let msjEspera = "Espera un momento";
        let span1 = document.querySelector("#player1");
        let span2 = document.querySelector("#player2");
        span1.innerHTML = "";
        span2.innerHTML = "";
        if (this.lastPlayer.getNum() == 1) {
            span1.innerHTML = mensaje;
            span2.innerHTML = msjEspera;
        } else {
            span1.innerHTML = msjEspera;
            span2.innerHTML = mensaje;
        }
        //  this.restartTimer();
    }
    // COUNTDOWN
    //     startTimer(duration) {
    //         let timer = duration;
    //         let minutes;
    //         let seconds;
    //         console.log(timer)
    //         this.interval = setInterval(function () {
    //             minutes = parseInt(timer / 60, 10);
    //             seconds = parseInt(timer % 60, 10);
    // //console.log(seconds)
    //             minutes = minutes < 10 ? "0" + minutes : minutes;
    //             seconds = seconds < 10 ? "0" + seconds : seconds;
    //             this.display = document.querySelector('#time');
    //             this.display.innerHTML = minutes + ":" + seconds;
    // if (--timer < 0) {
    //                 timer = duration;
    //                 game.changePlayer();
    //             }
    //         }, 1000);
    //     }
    //     restartTimer() {
    //         clearInterval(this.interval);
    //         this.startTimer(10, this.display);
    //     }
    // timer() {
    //     var oneMinute = 60 * 1;
    //     this.display = document.querySelector('#time');
    //     this.startTimer(oneMinute, this.display);
    // };

    // var c = 0;
    // var t;
    // var timer_is_on = 0;

    // function timedCount() {
    //   document.getElementById("txt").value = c;
    //   c--;
    //   t = setTimeout(timedCount, 1000);
    // }

    // function startCount() {
    //   if (!timer_is_on) {
    //     timer_is_on = 1;
    //     timedCount();
    //   }
    // }

    // function stopCount() {
    //   clearTimeout(t);
    //   timer_is_on = 0;
    // }


}