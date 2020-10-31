class ExtraBalls {
    constructor(ctx, EBPosX, EBPosY, EBWidth, EBHeight, EBImage) {
        this.ctx = ctx
        this.EBPos = {
            x: EBPosX,
            y: EBPosY
        }
        this.EBSize = {
            w: EBWidth,
            h: EBHeight
        }
        this.imageName = EBImage
        this.EBInstance = undefined
        this.init()
    }

    init() {
        this.EBInstance = new Image()
        this.EBInstance.src = `images/${this.imageName}`
    }

    draw() {
        this.ctx.drawImage(this.EBInstance, this.EBPos.x, this.EBPos.y, this.EBSize.w, this.EBSize.h)
    }
}