class PlayerBar {
    constructor(ctx, barPosX, barPosY, barWidth, barHeight, barImage) {
        this.ctx = ctx
        this.barPos = {
            x: barPosX,
            y: barPosY
        }
        this.barSize = {
            w: barWidth,
            h: barHeight
        }
        this.imageName = barImage
        this.barInstance = undefined
        this.init()
    }

    init() {
        this.barInstance = new Image()
        this.barInstance.src = `images/${this.imageName}`
    }

    draw() {
        this.ctx.drawImage(this.barInstance, this.barPos.x, this.barPos.y, this.barSize.w, this.barSize.h)
    }

    move(dir) {
        if (dir === 'left' && this.barPos.x >= 0) {
            this.barPos.x -=20
        } else null
       
        if (dir === 'right' && this.barPos.x < window.innerWidth - this.barSize.w) {
            this.barPos.x += 20
        } else null
    }
}