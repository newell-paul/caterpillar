const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const caterpillar = new Caterpillar()

const leafMap = [
  {x: 10, y: 50, size: 30},
  {x: 80, y: 150, size: 40},
  {x: 130, y: 70, size: 30},
  {x: 300, y: 250, size: 20},
  {x: 500, y: 200, size: 40}
]

const mushroomMap = [
  {x: 20, y: 50, size: 30},
  {x: 120, y: 100, size: 50},
  {x: 130, y: 300, size: 30},
  {x: 180, y: 250, size: 50},
  {x: 190, y: 70, size: 50},
  {x: 240, y: 300, size: 30},
  {x: 300, y: 80, size: 30},
  {x: 360, y: 280, size: 50},
  {x: 420, y: 50, size: 50},
  {x: 480, y: 120, size: 30},
  {x: 500, y: 80, size: 50},
  {x: 540, y: 240, size: 30}
]

const leafs = leafMap.map(obj => new Leaf(obj.x, obj.y, obj.size))
const shrooms = mushroomMap.map(obj => new Mushroom(obj.x , obj.y, obj.size))

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

  for (let i = 0; i < shrooms.length; i++) {
    const shroom = shrooms[i]

    shroom.velocity.y = 4
    shroom.update(deltaTime)
    shroom.draw()
  }  

  for (let i = 0; i < leafs.length; i++) {
    const leaf = leafs[i]
    if (collision(caterpillar, leaf)) {
      audio.leafBite.play()
      leaf.position.y = 10
      
      continue    
    }

    leaf.velocity.y = 5
    leaf.velocity.x = 1
  

    leaf.update(deltaTime)
    leaf.draw()
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
