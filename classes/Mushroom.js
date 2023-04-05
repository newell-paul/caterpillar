class Mushroom extends GameObject {
    constructor(x, y, size) {
        super(x, y, size, './img/mushroom.png', 4);
    }

    update(deltaTime) {
        let newPositionY = this.position.y + this.velocity.y
      
        if (newPositionY >= 0 && newPositionY + this.height <= canvas.height) {
          this.position.y = newPositionY
        } else {
          this.position.y = 0
        }
      }
  
      draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
      }
  }
