class Shot {
    constructor(ctx, ShotPosX, ShotPosY, ShotWidth, ShotHeight, ShotImage) {
        this.ctx = ctx
        this.ShotPos = {
            x: ShotPosX,
            y: ShotPosY
        }
        this.ShotSize = {
            w: ShotWidth,
            h: ShotHeight
        }
        this.imageName = ShotImage
        this.ShotInstance = undefined
        this.init()
    }

    init() {
        this.ShotInstance = new Image()
        this.ShotInstance.src = `images/${this.imageName}`
    }

    draw() {
        this.ctx.drawImage(this.ShotInstance, this.ShotPos.x, this.ShotPos.y, this.ShotSize.w, this.ShotSize.h)
    }
}