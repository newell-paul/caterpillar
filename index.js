const canvas = document.getElementById('gameCanvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const caterpillar = new Caterpillar()

const object = [
  {x: 60, y: 50, size: 45},
  {x: 120, y: 100, size: 60},
  {x: 180, y: 200, size: 45},
  {x: 240, y: 50, size: 45},
  {x: 300, y: 80, size: 60},
  {x: 360, y: 280, size: 45},
  {x: 420, y: 50, size: 45},
  {x: 480, y: 120, size: 60},
  {x: 540, y: 240, size: 60}
]

const mushrooms = object.map(obj => new Mushroom(obj.x, obj.y, obj.size))

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
  
  caterpillar.update(deltaTime)
  caterpillar.draw()

  for (let i = 0; i < mushrooms.length; i++) {
    const mushroom = mushrooms[i];

    if (collision(caterpillar, mushroom)) {
      mushrooms.splice(i, 1)
      audio.explode.play()
      i--
      continue    
  }

  mushroom.velocity.y = 5;
  mushroom.update(deltaTime);
  mushroom.draw();
}

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
