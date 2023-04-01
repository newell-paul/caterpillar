class Mushroom {
    constructor(x, y, size) {
      this.shroom = {
        position: {
          x: x,
          y: y
        },
        width: size,
        height: size,
        image: new Image()
      }
      this.shroom.image.src = './img/leaf.png'
      this.velocity = {
          x: 0,
          y: 0
      }
    }

    update(deltaTime) {
        let newPositionY = this.shroom.position.y + this.velocity.y;
        let waveAmplitude = 5
        let waveFrequency = 0.005
        let waveOffset = this.shroom.position.y * waveFrequency + Date.now() * waveFrequency
        let waveMovement = Math.sin(waveOffset) * waveAmplitude
        let newPositionX = this.shroom.position.x + this.velocity.x + waveMovement
      
        if (newPositionY >= 0 && newPositionY + this.shroom.height <= canvas.height) {
          this.shroom.position.y = newPositionY
        } else {
          this.shroom.position.y = 0
        }
      
        if (newPositionX >= 0 && newPositionX + this.shroom.width <= canvas.width) {
          this.shroom.position.x = newPositionX
        } else {
          this.shroom.position.x = 0
        }
      }
      
  
      draw() {
        let waveFrequency = 0.005
        let waveOffset = this.shroom.position.y * waveFrequency + Date.now() * waveFrequency
        let rotationAngle = Math.sin(waveOffset) * (Math.PI / 6)

        c.save()
        c.translate(this.shroom.position.x + this.shroom.width / 2, this.shroom.position.y + this.shroom.height / 2)
        c.rotate(rotationAngle)
        c.drawImage(this.shroom.image, -this.shroom.width / 2, -this.shroom.height / 2, this.shroom.width, this.shroom.height)
        c.restore()
      }
      
  }
