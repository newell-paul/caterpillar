class Apple {
    constructor(x, y, size) {
      this.position = {
          x: x,
          y: y
        },
      this.width = size,
      this.height = size,
      this.image = new Image()
      this.image.src = './img/apple.png'
      this.velocity = {
          x: 0,
          y: 6
      }
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
        let waveFrequency = 0.001
        let waveOffset = this.position.y * waveFrequency 
        let rotationAngle = Math.sin(waveOffset) * (Math.PI / .3)

        c.save()
        c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
        c.rotate(rotationAngle)
        c.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height)
        c.restore()  
      }
  }
