const canvas = document.getElementById('gameCanvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const caterpillar = new Caterpillar()
const mushrooms = []

for (let i = 0; i < 10; i++) {
  const x = getRandom(0, canvas.width - 50)
  const y = getRandom(0, canvas.height / 2)
  // const size = getRandom(10, 30)

  mushrooms.push(new Mushroom(x, y))
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

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

  for (const mushroom of mushrooms) {
    mushroom.velocity.y = 4
    mushroom.update(deltaTime)
    mushroom.draw()
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
