class Caterpillar {
    constructor() {
      this.head = {
        position: {
          x: canvas.width / 2,
          y: 350
        },
        width: 45,
        height: 45,
        image: new Image()
      };
      this.head.image.src = './img/right head.png'
  
      this.velocity = {
        x: 0,
        y: 0
      };
  
      this.body = [];
      this.bodyLength = 4
      for (let i = 0; i < this.bodyLength; i++) {
        const bodySegment = {
          position: {
            x: canvas.width / 2 + 100,
            y: 200 + (i + 1) * 60
          },
          width: 40,
          height: 40,
          image: new Image()
        };
        bodySegment.image.src = './img/body.png'
        this.body.push(bodySegment)
      }
    }
  
    draw() {
      let direction = this.velocity.x
      if (direction < 0) {
        this.head.image.src = './img/left head.png'
      } else if (direction > 0) {
        this.head.image.src = './img/right head.png'
      }
      c.drawImage(this.head.image, this.head.position.x, this.head.position.y, this.head.width, this.head.height)
  
      this.body.forEach((segment) => {
        if (direction < 0) {
          segment.image.src = './img/body left.png'
        } else if (direction > 0) {
          segment.image.src = './img/body right.png'
        }
    
        c.drawImage(segment.image, segment.position.x, segment.position.y, segment.width, segment.height)
      })
    }
  
    update(deltaTime) {
      for (let i = this.body.length - 1; i > 0; i--) {
        this.body[i].position.x += (this.body[i - 1].position.x - this.body[i].position.x) * 0.1;
        this.body[i].position.y = this.body[i - 1].position.y + (this.body[i - 1].height - 14)
      }
    
      this.body[0].position.x += (this.head.position.x - this.body[0].position.x) * 0.1
      this.body[0].position.y = this.head.position.y + (this.head.height - 14 )
    
      let newPositionX = this.head.position.x + this.velocity.x
    
      if (newPositionX >= 0 && newPositionX + this.head.width <= canvas.width) {
        this.head.position.x = newPositionX
      }
    }  
  }
  