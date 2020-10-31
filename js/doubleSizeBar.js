class DoubleSize {
    constructor(ctx, DSPosX, DSPosY, DSWidth, DSHeight, DSImage) {
        this.ctx = ctx
        this.DSPos = {
            x: DSPosX,
            y: DSPosY
        }
        this.DSSize = {
            w: DSWidth,
            h: DSHeight
        }
        this.imageName = DSImage
        this.DSInstance = undefined
        this.init()
    }

    init() {
        this.DSInstance = new Image()
        this.DSInstance.src = `images/${this.imageName}`
    }

    draw() {
        this.ctx.drawImage(this.DSInstance, this.DSPos.x, this.DSPos.y, this.DSSize.w, this.DSSize.h)
    }
}