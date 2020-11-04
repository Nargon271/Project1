class Background {
    constructor(ctx, bgWidth, bgHeight, imgSource) {
        this.ctx = ctx
        
        this.bgWidth = bgWidth
        this.bgHeight = bgHeight
        this.posX = 0;
        this.posY = 0;

        this.image = new Image();
        this.image.src = imgSource;
    }
    
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.bgWidth, this.bgHeight);
    }
    
}