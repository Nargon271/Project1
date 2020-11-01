class Background {
    constructor(ctx, bgWidth, bgHeight, imgSource) {
        this.ctx = ctx
        // this.bgSize = {
        //     w: bgWidth,
        //     h: bgHeight
        // },
        this.bgWidth = bgWidth
        this.bgHeight = bgHeight
        this.posX = 0;
        this.posY = 0;

        
        this.image = new Image();
        this.image.src = imgSource;
    }
    
    draw() {
        //this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        // this.ctx.fillStyle = 'grey'
        // this.ctx.fillRect(0,0,this.canvasSize.w,this.canvasSize.h)
        this.ctx.drawImage(this.image, this.posX, this.posY, this.bgWidth, this.bgHeight);
    }
    
}