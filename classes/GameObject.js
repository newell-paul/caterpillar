class GameObject {
    constructor(x, y, size, imageSrc, velocityY) {
      this.position = {
        x: x,
        y: y
      };
      this.width = size
      this.height = size
      this.image = new Image()
      this.image.src = imageSrc
      this.velocity = {
        x: 0,
        y: velocityY
      };
    }
  
    update(deltaTime) {
      let newPositionY = this.position.y + this.velocity.y
  
      if (newPositionY >= 0 && newPositionY + this.height <= canvas.height) {
        this.position.y = newPositionY
      } else {
        this.position.y = 0
        this.position.x = Math.random() * canvas.width
      }
    }
  
    draw() {
      c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}
  