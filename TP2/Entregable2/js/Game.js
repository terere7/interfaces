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
        this.drawFigures();

    }

    //EVENTOS
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
        let locker = this.board.getLocker(event.layerX, event.layerY);
        //ubico la ficha al casillero
        let ficha = this.clickedFicha;
        if (locker != null && ficha != null) {
            if (locker.isEmpty() && ficha != null) {
                this.addFicha(ficha, locker);
            }
        } else {
            //volver a poner la ficha en el principio
            if (this.clickedFicha != null && this.clickedFicha.isClickeable()) {
                this.setBeginPosition(ficha);
            }
        }
        this.drawFigures();
    }

    setBeginPosition(ficha) {
        ficha.setBeginPosition();
        this.drawFigures();
    }
    //DIBUJAR FIGURAS EN CANVAS
    drawFigures() {
        this.clearCanvas('#F8F8FF');
        //Fichas
        let fichasAux = this.fichas.getFichas();
        for (let i = 0; i < fichasAux.length; i++) {
            fichasAux[i].draw();
        }
        //Tablero
        let boardAux = this.board.getBoard();
        for (let i = 0; i < boardAux.length; i++) {
            boardAux[i].draw();
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

    //FUNCION DE VERIFICACION
    isValidLocker(locker) {
        //busco la fila en q puede poner
        if (!this.isValidPos(locker)) return false;
        return true;
    }

    // Verificar si es una posicion valida
    isValidPos(locker) {
        let validPos = false;
        let f = parseInt(locker.getRow());
        let c = parseInt(locker.getCol());
        if (f == ROW - 1) {// fila de mas abajo
            validPos = true;
        } else {
            if (!this.getLocker(c, f + 1).isEmpty()) {// el de abajo tiene una ficha
                validPos = true;
            }
        }
        return validPos;
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

    //AGREGAR LA FICHA AL CASILLERO
    addFicha(ficha, locker) {
        // Fila y col ubicada (casillero)
        let f = parseInt(locker.getRow());
        let c = parseInt(locker.getCol());
        if (this.isValidLocker(locker)) {
            locker.setFicha(ficha);//Almaceno ficha en el casillero
            this.lastInsertPos = { col: c, fil: f };//Update last position
            ficha.setClickeable(false);
            let medX = locker.getPosXMed();
            let medY = locker.getPosYMed();
            ficha.setPosition(medX, medY);
            this.countFichasUsed++;
            if (this.isWinner()) {
                alert("Gano el " + this.clickedFicha.getPlayer().getName());
            } else {
                this.changePlayer();
            }
        }
        this.drawFigures();// para q me dibuje en el momento
    }

    // FUNCIONES PARA CHECKEAR 4 EN LINEA
    checkColum(col, fil) {
        //checkea la columna para abajo
        let find = false;
        let count = 0;
        for (let index = fil; index < ROW; index++) {
            if (!find) {
                //si encuentra una ficha de otro jugador, no cuenta mas
                let locker = this.getLocker(col, index);
                let playerX = this.getLocker(col, index).getFicha().getPlayer().getNum();
                if (playerX !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    count++;
                }
            }
        }
        return count === WIN;
    }

    checkRow(col, fil) {
        let count = 0;
        let countRight = 0;
        let countLeft = 0;
        let find = false;
        let auxCol = col;
        //busco a la derecha
        while (auxCol < COL && !find) {
            if (this.getLocker(auxCol, fil).getFicha() == null) {
                find = true;
            } else {
                let playerX = this.getLocker(auxCol, fil).getFicha().getPlayer().getNum();
                if (playerX !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    countRight++;
                    auxCol++;
                }
            }

        }
        //Vuelvo a pos original
        auxCol = col - 1;// no cuento el casillero actual
        find = false;
        //busco a la izq
        ///HACER LOS DEMAS COMO EESTE!!

        while (auxCol >= 0 && !find) {
            if (this.getLocker(auxCol, fil).getFicha() == null) {
                find = true;
            } else {
                if (this.getLocker(auxCol, fil).getFicha().getPlayer().getNum() !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    countLeft++;
                    auxCol--;
                }
            }

        }
        count = countRight + countLeft;
        return count === WIN;
    }

    checkDiagonalAsc(col, fil) {
        let auxCol = col;
        let auxFil = fil;
        //busca para arriba
        let countUp = 0;
        let countDown = 0;
        let find = false;
        while (auxCol < COL && auxFil >= 0 && !find) {
            if (this.getLocker(auxCol, auxFil).getFicha() == null) {
                find = true;
            } else {
                let playerX = this.getLocker(auxCol, auxFil).getFicha().getPlayer().getNum();
                if (playerX !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    countUp++;
                    auxCol++;
                    auxFil--;
                }
            }
        }
        //reinicializo valores
        find = false;
        auxCol = col - 1;
        auxFil = fil + 1;
        while (auxCol >= 0 && auxFil < ROW && !find) {
            if (this.getLocker(auxCol, auxFil).getFicha() == null) {
                find = true;
            } else {
                let playerX = this.getLocker(auxCol, auxFil).getFicha().getPlayer().getNum();
                if (playerX !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    countDown++;
                    auxCol--;
                    auxFil++;
                }
            }
        }
        return (countDown + countUp) == WIN;
    }

    checkDiagonalDesc(col, fil) {
        let auxCol = col;
        let auxFil = fil;
        //busca para arriba
        let countUp = 0;
        let countDown = 0;
        let find = false;
        while (auxCol >= 0 && auxFil >= 0 && !find) {
            if (this.getLocker(auxCol, auxFil).getFicha() == null) {
                find = true;
            } else {
                let playerX = this.getLocker(auxCol, auxFil).getFicha().getPlayer().getNum();
                if (playerX !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    countUp++;
                    auxCol--;
                    auxFil--;
                }
            }
        }
        //reinicializo valores
        find = false;
        auxCol = col + 1;
        auxFil = fil + 1;
        while (auxCol < COL && auxFil < ROW && !find) {
            if (this.getLocker(auxCol, auxFil).getFicha() == null) {
                find = true;
            } else {
                let playerX = this.getLocker(auxCol, auxFil).getFicha().getPlayer().getNum();
                if (playerX !== this.clickedFicha.getPlayer().getNum()) {
                    find = true;
                } else {
                    countDown++;
                    auxCol++;
                    auxFil++;
                }
            }
        }
        return (countDown + countUp) == WIN;
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
        return winner;
    }

    gameOver() {
        if (this.countFichasUsed === NUM_FICHAS) {
            alert("GAME OVER");
        }
    }

    //CAMBIAR DE JUGADOR
    changePlayer() {

        let player = this.clickedFicha.getPlayer();
        let f = this.fichas.getFichas();
        for (let i = 0; i < f.length; i++) {
            if (f[i].getPlayer() == player) {
                f[i].setTurn(false);// Activa fichas del jugador
            } else {
                f[i].setTurn(true);//Desactiva fichas del jugador
            }
        }
        if (this.clickedFicha.getPlayer().getNum() == 1) {
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
    }



}