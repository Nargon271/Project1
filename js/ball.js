class Ball {
    constructor(ctx, ballPosX, ballPosY, ballRadius, ballDiameter, ballVelX, ballVelY, canvasSize) {
        this.ctx = ctx
        this.ballPos = {
            ballx: ballPosX,
            bally: ballPosY
        }
        this.ballSize = {
            ballR: ballRadius,
            ballD: ballDiameter
        }
        this.ballVel = {
            x: ballVelX,
            y: ballVelY
        }
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        }    
    }
    
    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'red'
        this.ctx.arc(this.ballPos.ballx, this.ballPos.bally, 10, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath()
        this.move()
    }

    move() {
        if (this.ballPos.bally <= 10) {
            this.ballVel.y *= -1
        } else null
                
        if (this.ballPos.ballx >= this.canvasSize.w - 10 || this.ballPos.ballx <= 10) {
            this.ballVel.x *= -1
        } else null

        this.ballPos.ballx += this.ballVel.x
        this.ballPos.bally -= this.ballVel.y
    }
}

