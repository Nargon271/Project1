class Brick {
    constructor(ctx, brickPosX, brickPosY, brickHeight, brickWidth, brickStatus, canvasSize) {
        this.ctx = ctx
        this.brickPos = {
            brickx: brickPosX,
            bricky: brickPosY
        }
        this.brickSize = {
            brickH: brickHeight,
            brickW: brickWidth
        }
        this.brickStatus = brickStatus
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        }
    }

    draw() {        
        this.ctx.fillStyle = 'blue'
        this.ctx.strokeStyle = 'green'
        //(x, y, width, height)
        this.ctx.strokeRect(this.brickPos.brickx,this.brickPos.bricky,this.brickSize.brickW,this.brickSize.brickH)
        
    }
}