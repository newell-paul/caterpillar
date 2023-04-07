const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const caterpillar = new Caterpillar()

const leafMap = [
  {x: 10, y: 50, size: 20},
  {x: 80, y: 150, size: 35},
  {x: 130, y: 70, size: 35},
  {x: 200, y: 250, size: 20},
  {x: 300, y: 250, size: 20},
  {x: 340, y: 150, size: 35},
  {x: 380, y: 70, size: 35}
]

const mushroomMap = [
  {x: 20, y: -50, size: 30},
  {x: 120, y: -100, size: 55},
  {x: 130, y: -300, size: 30},
  {x: 180, y: -250, size: 55},
  {x: 190, y: -70, size: 55},
  {x: 240, y: -300, size: 30},
  {x: 300, y: -80, size: 30},
  {x: 360, y: -280, size: 55},
  {x: 480, y: -120, size: 30},
  {x: 500, y: -80, size: 55},
  {x: 540, y: -240, size: 30}
]

const leafs = leafMap.map(obj => new Leaf(obj.x, obj.y, obj.size))
const shrooms = mushroomMap.map(obj => new Mushroom(obj.x , obj.y, obj.size))
const apple = new Apple(150, 10, 40)

let lastTimestamp = 0
let score = 0
let gameOver = false

function gameLoop(timestamp) {

  if (gameOver) return

  const deltaTime = timestamp - lastTimestamp
  lastTimestamp = timestamp;

  handleInput(keys)
  updateObjects(deltaTime)
  checkCollisions()
  drawObjects()

  requestAnimationFrame(gameLoop);

  if (mushroomCollide()) {
    gameOver = true
  }
}

const keys = {}
document.addEventListener('keydown', (event) => {
  keys[event.key] = true
})
document.addEventListener('keyup', (event) => {
  keys[event.key] = false
})

gameLoop()
