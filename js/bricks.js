class Brick {
    constructor(ctx, brickPosX, brickPosY, brickHeight, brickWidth, brickStatus, canvasSize, brickImage) {
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
        this.imageName = brickImage
        this.brickInstance = undefined
        this.init()
    }

    init() {
        this.brickInstance = new Image()
        this.brickInstance.src = `images/${this.imageName}`
    }

    draw() {
        this.ctx.drawImage(this.brickInstance, this.brickPos.brickx, this.brickPos.bricky, this.brickSize.brickW, this.brickSize.brickH)
    }
}