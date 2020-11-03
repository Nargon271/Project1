const game = {
    name: 'Arkanoid Game',
    description: "Arkanoid game",
    version: '1.0.0',
    license: undefined,
    author: 'Gonzalo Arguelles Navarro y Carlos Martin-Salas Larena',

    // Canvas
    ctx: undefined,
    canvasTag: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },

    // Background
    background: undefined,

    // Juego
    fps: 60,
    frames: 0,

    // Score
    score: 0,
    pointsInGame: undefined,
    pointsWin: undefined,
    pointsGameOver: undefined,

    // Bar
    bar: undefined,
    barWidth: 200,
    keys: {
        left: 37,
        right: 39
    },

    // Bricks
    bricks: [],
    brickHeight: 40,
    brickWidth: 100,
    brickStatus: 1,
    brickIniPosX: 35,
    brickIniPosY: 70,
    brickRow: 5,//5
    brickCol: 13,//13

    // Balls
    balls: [],
    
    // Power-ups
    doubleSize: [],
    extraBalls: [],
    sliceSize: [],


    // GAME INITIALIZATION

    init(id) {
        this.canvasTag = document.getElementById(id)
        this.ctx = this.canvasTag.getContext('2d')
        this.setDimensions()
        this.start()
        // Hasta aqui el init
        this.drawBricks()
        this.drawBar()
        this.drawBall()
        this.drawBackground()
        //2. this.drawAll()
        this.setEventListeners()
    },

    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },

    start() {
        document.getElementById('backgroundSound').play()
        this.interval = setInterval(() => {
        this.clearScreen() 
        this.drawAll()    
        this.createDoubleSize()
        this.moveDoubleSize()
        this.createExtraBalls()
        this.moveExtraBalls()
        this.createSliceSize()
        this.moveSliceSize()    
        //clear arrays    
        this.clearOutOfScreen()
        //end game
        this.balls.length == 0 ? this.gameOver() : null 
        this.bricks.length == 0 ? this.youWin() : null
        },(1000 / this.fps))
    },

    reset() {
        this.drawBackground()
        this.drawBar()
        this.score = 0
        this.balls = []
        this.doubleSize = []
        this.sliceSize = []
        this.extraBalls = []
        this.bricks = []
        this.points()
        this.drawBricks()
        this.drawBall()
        this.bricksColision()
        this.start()
    },

    drawAll() {
            //framesreset
            this.frames > 2000 ? this.frames = 0 : this.frames++
            ////game elements 
            this.background.draw()
            this.bar.draw()
            this.bricks.forEach(elm=> elm.draw())
            this.balls.forEach(elm => elm.draw())
            //power-ups
            this.sliceSize.forEach(e => e.draw())
            this.doubleSize.forEach(e => e.draw())
            this.extraBalls.forEach(e => e.draw())
            //colisiones
            this.bricksColision()
            this.barColision()
            this.DSColision()
            this.EBColision()
            this.SSColision()
    },


    //BACKGROUND

    drawBackground(){
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, 'images/background.png');
    },

    //Bar Elements

    drawBar() {
        //this.bar = new PlayerBar(this.ctx, this.canvasSize.w - 290, this.canvasSize.h - 200, 100, 200, '../images/background1.png')
        this.bar = new PlayerBar(this.ctx, this.canvasSize.w/2 - 100, this.canvasSize.h - 50, this.barWidth, 25, '../images/player-bar.png') 
    },

    barColision() {
        this.balls.forEach(elm => {
            if (elm.ballPos.ballx >= this.bar.barPos.x &&
                elm.ballPos.ballx <= (this.bar.barPos.x + this.bar.barSize.w / 2) -1 &&
                elm.ballPos.bally + 10 >= this.bar.barPos.y)
            {
                console.log("izquierda",  elm.ballPos.ballx)
                if (elm.ballVel.x < 0) {
                    document.getElementById('barColisionSound').play()
                    elm.ballVel.y *= -1
                    elm.ballVel.x *= 1
                }
                else {
                    document.getElementById('barColisionSound').play()
                    elm.ballVel.y *= - 1
                    elm.ballVel.x *= - 1
                }
            }
            if (elm.ballPos.ballx >= this.bar.barPos.x + this.bar.barSize.w / 2 &&
                elm.ballPos.ballx <= this.bar.barPos.x + this.bar.barSize.w  &&
                elm.ballPos.bally + 10 >= this.bar.barPos.y)
            {
                console.log("derecha",  elm.ballPos.ballx)
                if (elm.ballVel.x > 0) {
                    document.getElementById('barColisionSound').play()
                    elm.ballVel.y *= -1
                    elm.ballVel.x *= 1
                }
                else {
                    document.getElementById('barColisionSound').play()
                    elm.ballVel.y *= - 1
                    elm.ballVel.x *= - 1
                }
            }
        })
    },

    //Brick Elements

    drawBricks() {
        //(ctx, brickPosX, brickPosY, brickHeight, brickWidth,brickStatus, canvasSize)
        // this.bricks.push(new Brick(this.ctx, 100, 100, this.brickHeight, this.brickWidth,this.brickStatus, this.canvasSize))
        // this.brick = new Brick(this.ctx, this.canvasSize.w/2 - 100, this.canvasSize.h - 50, this.barWidth, 25, '../images/player-bar.png')
         for (let i = 0; i < this.brickRow; i++){
            for (let j = 0; j < this.brickCol; j++){
                this.bricks.push(new Brick (this.ctx,this.brickIniPosX + this.brickWidth * j,this.brickIniPosY + this.brickHeight * i, this.brickHeight, this.brickWidth, this.brickStatus, this.canvasSize, '../images/brick.png'))
            }
        }
        console.log(this.bricks)
    },

    bricksColision() {
        this.balls.forEach(eachball => {
            this.bricks.forEach(eachBrick => {
                if (eachball.ballPos.ballx >= eachBrick.brickPos.brickx &&
                    eachball.ballPos.ballx <= eachBrick.brickPos.brickx + eachBrick.brickSize.brickW &&
                    eachball.ballPos.bally + 10 >= eachBrick.brickPos.bricky &&
                    eachball.ballPos.bally <= eachBrick.brickPos.bricky + eachBrick.brickSize.brickH + 10)
                {
                    //document.getElementById('bricksColision').play()
                    document.getElementById('brickColisionSound').play()
                    eachball.ballVel.y *= -1
                    this.score += 100
                    this.points()
                    eachBrick.brickStatus = 0
                    this.bricks = this.bricks.filter (eachBrick => eachBrick.brickStatus !== 0)// no elimina nada
                }

                if (eachball.ballPos.bally >= eachBrick.brickPos.bricky &&
                    eachball.ballPos.bally <= eachBrick.brickPos.bricky + eachBrick.brickSize.brickH && 
                    eachball.ballPos.ballx + 10 >= eachBrick.brickPos.brickx &&
                    eachball.ballPos.ballx <= eachBrick.brickPos.brickx + eachBrick.brickSize.brickW + 10
                ) {
                    //document.getElementById('bricksColision').play()
                    document.getElementById('brickColisionSound').play()
                    eachball.ballVel.x *= -1
                    this.score += 100
                    this.points()
                    eachBrick.brickStatus = 0
                    this.bricks = this.bricks.filter (eachBrick => eachBrick.brickStatus !== 0)
                }

            })
        })
    },

    //Ball Elements

    drawBall() {
        //(ctx, ballPosX, ballPosY, ballRadius, ballDiameter, ballVelX, ballVely,canvasSize)
        this.balls.push(new Ball (this.ctx, this.canvasSize.w/2, this.canvasSize.h - 60, 10, 20, 4, 4, this.canvasSize))
    },
    
    //EXTRA BALLS power up

    createExtraBalls() {
        if (this.frames % 200 === 0) {
          // constructor (ctx, DSPosX, DSPosY, DSWidth, DSHeight, DSImage)
          let y = 0
          let minGap = 0
          let maxGap = this.canvasSize.w - 30
          let Gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)
          this.extraBalls.push(new ExtraBalls (this.ctx, Gap, y, 45, 45, '../images/moreballs.png'))
        }
    },

    moveExtraBalls() {
        this.extraBalls.forEach(e => {
            e.EBPos.y += 4
        })
    },

    EBColision() {
        this.extraBalls.forEach(e => {
            if (e.EBPos.x < this.bar.barPos.x + this.bar.barSize.w &&
                e.EBPos.x + e.EBSize.w > this.bar.barPos.x &&
                e.EBPos.y < this.bar.barPos.y + this.bar.barSize.h &&
                e.EBSize.h + e.EBPos.y > this.bar.barPos.y)
            {
            // se añaden dos bolas mas al juego
                //console.log("nuevas bolas")
                document.getElementById('EBColisionSound').play()
                this.balls.push(new Ball (this.ctx, this.bar.barPos.x + this.bar.barSize.w / 2, this.canvasSize.h - 60, 10, 20, 2, 4, this.canvasSize))
                this.balls.push(new Ball (this.ctx, this.bar.barPos.x + this.bar.barSize.w / 2, this.canvasSize.h - 60, 10, 20, -2, 4, this.canvasSize))
                // Desparace el powerup al tocar la barra
                this.extraBalls = this.extraBalls.filter(e => e.EBPos.y >= this.bar.barPos.y)
                //console.log(this.extraBalls)    
            }
        })
    },
    
    //DOUBLE SIZE power up

    createDoubleSize() {
        if (this.frames % 500 === 0) {
          // constructor (ctx, DSPosX, DSPosY, DSWidth, DSHeight, DSImage)
          let y = 0
          let minGap = 0
          let maxGap = this.canvasSize.w - 30
          let Gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)
          this.doubleSize.push(new DoubleSize (this.ctx, Gap, y, 45, 45, '../images/x2.png'))
        }
    },

    moveDoubleSize() {
        this.doubleSize.forEach(e => {
            e.DSPos.y += 4
        })
    },
    
    DSColision() {
        this.doubleSize.forEach(e => {
            if (e.DSPos.x < this.bar.barPos.x + this.bar.barSize.w &&
                e.DSPos.x + e.DSSize.w > this.bar.barPos.x &&
                e.DSPos.y < this.bar.barPos.y + this.bar.barSize.h &&
                e.DSSize.h + e.DSPos.y > this.bar.barPos.y)
            {
            // aumenta el tamaño de la barra
            this.growSize()
            // Desparace el powerup al tocar la barra
            this.doubleSize = this.doubleSize.filter(e => e.DSPos.y >= this.bar.barPos.y)
            }
        })
    },

    growSize() {
        document.getElementById('doublebarSound').play()
        this.bar.barSize.w = this.barWidth * 2
        setTimeout(() => {
            this.bar.barSize.w = this.barWidth
        }, 5000)
    },

    createSliceSize() {
        if (this.frames % 400 === 0) {
          // constructor (ctx, DSPosX, DSPosY, DSWidth, DSHeight, DSImage)
          let Sy = 0
          let SminGap = 0
          let SmaxGap = this.canvasSize.w - 30
          let SGap = Math.floor(Math.random() * (SmaxGap - SminGap + 1) + SminGap)
          this.sliceSize.push(new Slicebar(this.ctx, SGap, Sy, 45, 45, '../images/x3.png'))
        }
    },

    moveSliceSize() {
        this.sliceSize.forEach(e => {
            e.SSPos.y += 4
        })
    },

    SSColision() {
        this.sliceSize.forEach(e => {
            if (e.SSPos.x < this.bar.barPos.x + this.bar.barSize.w &&
                e.SSPos.x + e.SSSize.w > this.bar.barPos.x &&
                e.SSPos.y < this.bar.barPos.y + this.bar.barSize.h &&
                e.SSSize.h + e.SSPos.y > this.bar.barPos.y)
            {
            // aumenta el tamaño de la barra
            this.sliceSizeBar()
            // Desparace el powerup al tocar la barra
            this.sliceSize = this.sliceSize.filter(e => e.SSPos.y >= this.bar.barPos.y)
            }
        })
    },

    sliceSizeBar() {
        //document.getElementById('doublebarSound').play()               CAMBIAR SONIDO
        this.bar.barSize.w = this.barWidth / 2
        setTimeout(() => {
            this.bar.barSize.w = this.barWidth
        }, 5000)
    },

    //KEYBOARD COMMANDS

    setEventListeners() {
        document.onkeydown = e => {
            e.keyCode === this.keys.left ? this.bar.move('left') : null
            e.keyCode === this.keys.right ? this.bar.move('right') : null
        }
    },
    
    //SCORE

    points() {
        this.pointsInGame = document.querySelector('.totalScore')
        this.pointsInGame.innerHTML = this.score

        this.pointsGameOver = document.querySelector('.totalScoreGO')
        this.pointsGameOver.innerHTML = this.score

        this.pointsWin = document.querySelector('.totalScoreW')
        this.pointsWin.innerHTML = this.score
    },

    //Clear SCREEN and ARRAYS

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    clearOutOfScreen() {
        this.doubleSize = this.doubleSize.filter(e => e.DSPos.y <= this.canvasSize.h)
        //console.log(this.doubleSize)
        this.extraBalls = this.extraBalls.filter(e => e.EBPos.y <= this.canvasSize.h)
        //console.log(this.extraBalls)
        this.balls = this.balls.filter(e => e.ballPos.bally <= this.canvasSize.h)
        //console.log(this.balls)
    },

    //GAME END

    youWin() {
        document.getElementById('backgroundSound').pause()
        document.getElementById('winSound').play()
        clearInterval(this.interval)
        const YWdivDisplay = document.querySelector('#windiv') 
        YWdivDisplay.style.display = 'block'
    },

    gameOver() {
        document.getElementById('backgroundSound').pause()
        document.getElementById('gameoverSound').play()
        clearInterval(this.interval)
        const GOdisplay = document.querySelector('#GOdiv')
        GOdisplay.style.display = 'block'
    }
}
