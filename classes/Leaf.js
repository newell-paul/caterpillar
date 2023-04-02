class Leaf {
    constructor(x, y, size) {
      this.position = {
          x: x,
          y: y
        },
      this.width = size,
      this.height = size,
      this.image = new Image()
      this.image.src = './img/leaf.png'
      this.velocity = {
          x: 1,
          y: 5
      }
    }

    update(deltaTime) {
        let newPositionY = this.position.y + this.velocity.y;
        let waveAmplitude = 2
        let waveFrequency = 0.002
        let waveOffset = this.position.y * waveFrequency + Date.now() * waveFrequency
        let waveMovement = Math.sin(waveOffset) * waveAmplitude
        let newPositionX = this.position.x + this.velocity.x + waveMovement
      
        if (newPositionY >= 0 && newPositionY + this.height <= canvas.height) {
          this.position.y = newPositionY
        } else {
          this.position.y = 0
        }
      
        if (newPositionX >= 0 && newPositionX + this.width <= canvas.width) {
          this.position.x = newPositionX
        } else {
          this.position.x = 0
        }
      }
  
      draw() {
        let waveFrequency = 0.0005
        let waveOffset = this.position.y * waveFrequency + Date.now() * waveFrequency
        let rotationAngle = Math.sin(waveOffset) * (Math.PI / 1)

        c.save()
        c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
        c.rotate(rotationAngle)
        c.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height)
        c.restore()
      }
  }
