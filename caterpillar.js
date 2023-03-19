const canvas = document.getElementById('gameCanvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Caterpillar {
  constructor() {
    this.position = {
      x: canvas.width / 2,
      y: canvas.height - 200
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.width = 60
    this.height = 60

    const image = new Image()
    image.src = './img/head.png'
    this.image = image
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {

    if (keys['ArrowLeft']) {
      this.velocity.x = -5;
    } else if (keys['ArrowRight']) {
      this.velocity.x = 5;
    } else {
      this.velocity.x = 0;
    }

    let newPositionX = this.position.x + this.velocity.x

    if (newPositionX >= 0 && newPositionX + this.width <= canvas.width) {
      this.position.x = newPositionX
    }  
  }
}

const caterpillar = new Caterpillar()

let lastTimestamp = 0;

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  c.clearRect(0, 0, canvas.width, canvas.height);
  caterpillar.draw();
  caterpillar.update(deltaTime);

  requestAnimationFrame(gameLoop);
}

const keys = {};

document.addEventListener('keydown', (event) => {
  keys[event.key] = true
})

document.addEventListener('keyup', (event) => {
  keys[event.key] = false
})


gameLoop();


