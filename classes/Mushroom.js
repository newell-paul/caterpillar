class Mushroom {
    constructor(x, y) {
      this.shroom = {
        position: {
          x: x,
          y: y
        },
        width: 50,
        height: 50,
        image: new Image()
      }
      this.shroom.image.src = './img/mushroom red.png'
      this.velocity = {
          y: 0
      }
    }

    update(deltaTime) {
        let newPositionY = this.shroom.position.y + this.velocity.y
    
        if (newPositionY >= 0 && newPositionY + this.shroom.height <= canvas.height) {
          this.shroom.position.y = newPositionY 
        } else {
            this.shroom.position.y = 0 
        }    
    }
  
    draw() {
      c.drawImage(this.shroom.image, this.shroom.position.x, this.shroom.position.y, this.shroom.width, this.shroom.height)
    }
  }
