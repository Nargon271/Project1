class Slicebar {
    constructor(ctx, SSPosX, SSPosY, SSWidth, SSHeight, SSImage) {
        this.ctx = ctx
        this.SSPos = {
            x: SSPosX,
            y: SSPosY
        }
        this.SSSize = {
            w: SSWidth,
            h: SSHeight
        }
        this.imageName = SSImage
        this.SSInstance = undefined
        this.init()
    }

    init() {
        this.SSInstance = new Image()
        this.SSInstance.src = `images/${this.imageName}`
    }

    draw() {
        this.ctx.drawImage(this.SSInstance, this.SSPos.x, this.SSPos.y, this.SSSize.w, this.SSSize.h)
    }
}