const canvas = document.getElementById('gameCanvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

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
