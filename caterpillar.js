const canvas = document.getElementById('gameCanvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


class Mushroom {
  constructor() {
    this.shroom = {
      position: {
        x: 200,
        y: 0
      },
      width: 80,
      height: 80,
      image: new Image()
    }
    this.shroom.image.src = './img/mushroom red.png'
  }

  draw() {
    c.drawImage(this.shroom.image, this.shroom.position.x, this.shroom.position.y, this.shroom.width, this.shroom.height)
  }
}

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


const caterpillar = new Caterpillar()
const mushroom = new Mushroom()

let lastTimestamp = 0

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTimestamp
  lastTimestamp = timestamp

  if (keys['ArrowLeft']) {
    caterpillar.velocity.x = -4
  } else if (keys['ArrowRight']) {
    caterpillar.velocity.x = 4
  } else {
    caterpillar.velocity.x = 0
  }

  c.clearRect(0, 0, canvas.width, canvas.height)
  caterpillar.draw()
  caterpillar.update(deltaTime)

  mushroom.draw()

  requestAnimationFrame(gameLoop)
}

const keys = {}

document.addEventListener('keydown', (event) => {
  keys[event.key] = true
})

document.addEventListener('keyup', (event) => {
  keys[event.key] = false
})

gameLoop()
