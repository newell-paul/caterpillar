class Apple extends GameObject {
    constructor(x, y, size) {
        super(x, y, size, './img/apple.png', 6)
      }  

    update(deltaTime) {
        let newPositionY = this.position.y + this.velocity.y
      
        if (newPositionY + this.height <= canvas.height) {
          this.position.y = newPositionY
        } else {
          this.position.y = -2000
          this.position.x = (canvas.width * 0.15) + (Math.random() * (canvas.width * 0.7))

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
