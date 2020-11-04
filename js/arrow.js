class Arrow {
    constructor(ctx, arrowPosX, arrowPosY, arrowWidth, arrowHeight,arrowStatus, arrowImage) {
        this.ctx = ctx
        this.arrowPos = {
            x: arrowPosX,
            y: arrowPosY
        }
        this.arrowSize = {
            w: arrowWidth,
            h: arrowHeight
        }
        this.arrowStatus = arrowStatus
        this.imageName = arrowImage
        this.arrowInstance = undefined
        this.init()
    }

    init() {
        this.arrowInstance = new Image()
        this.arrowInstance.src = `images/${this.imageName}`
    }

    draw() {
        this.ctx.drawImage(this.arrowInstance, this.arrowPos.x, this.arrowPos.y, this.arrowSize.w, this.arrowSize.h)
    }
}