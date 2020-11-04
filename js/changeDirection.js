class Change {
    constructor(ctx, CDPosX, CDPosY, CDWidth, CDHeight, CDImage) {
        this.ctx = ctx
        this.CDPos = {
            x: CDPosX,
            y: CDPosY
        }
        this.CDSize = {
            w: CDWidth,
            h: CDHeight
        }
        this.imageName = CDImage
        this.CDInstance = undefined
        this.init()
    }

    init() {
        this.CDInstance = new Image()
        this.CDInstance.src = `images/${this.imageName}`
    }

    draw() {
        this.ctx.drawImage(this.CDInstance, this.CDPos.x, this.CDPos.y, this.CDSize.w, this.CDSize.h)
    }
}