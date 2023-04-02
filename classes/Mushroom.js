class Mushroom {
    constructor(x, y, size) {
      this.position = {
          x: x,
          y: y
        },
      this.width = size,
      this.height = size,
      this.image = new Image()
      this.image.src = './img/mushroom red.png'
      this.velocity = {
          x: 0,
          y: 0
      }
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
