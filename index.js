const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = 500
canvas.height = 450

const leafMap = [
    { x: 0.1, y: -1000, size: 20 },
    { x: 0.2, y: -1500, size: 35 },
    { x: 0.3, y: -1400, size: 35 },
    { x: 0.4, y: -2500, size: 20 },
    { x: 0.6, y: -1800, size: 20 },
    { x: 0.8, y: -1500, size: 35 },
    { x: 0.9, y: -1200, size: 35 },
]

const mushroomMap = [
    { x: 0.1, y: -1400, size: 30 },
    { x: 0.2, y: -2400, size: 55 },
    { x: 0.3, y: -1500, size: 30 },
    { x: 0.4, y: -2000, size: 55 },
    { x: 0.5, y: -1700, size: 30 },
    { x: 0.6, y: -2200, size: 30 },
    { x: 0.8, y: -1400, size: 55 },
    { x: 0.7, y: -2200, size: 55 },
    { x: 0.9, y: -1450, size: 30 },
]

let caterpillar = new Caterpillar(canvas)
let leafs = leafMap.map(
    (obj) => new Leaf(obj.x * canvas.width, obj.y, obj.size)
)
let shrooms = mushroomMap.map(
    (obj) => new Mushroom(obj.x * canvas.width, obj.y, obj.size)
)
let apple = new Apple(150, -3000, 40)

let lastTimestamp = 0
let lastEventTimestamp
let score = 0
let appleScore = 5
let mushroomSpeed = 5
let gameState = 'titleScreen'

function gameLoop(timestamp) {
    if (gameState === 'titleScreen') {
        titleScreen()
        requestAnimationFrame(gameLoop)
        return
    }
    const deltaTime = timestamp - lastTimestamp
    lastTimestamp = timestamp

    if (mushroomCollide()) {
        gameState = 'gameOver'
    }

    if (!lastEventTimestamp || timestamp - lastEventTimestamp >= 15000) {
        shrooms.push(
            new Mushroom(caterpillar.head.position.x, -1700, 35, mushroomSpeed)
        )
        lastEventTimestamp = timestamp
    }
    mushroomSpeed += 0.0005 // Slowly ramp up the difficulty

    if (gameState === 'gameplay') {
        handleInput(keys)
        updateObjects(deltaTime)
        checkCollisions()
        drawObjects()
    } else if (gameState === 'gameOver') {
        drawGameOver()
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

let titleScreenActive = true

document.addEventListener('keydown', (event) => {
    if (gameState === 'titleScreen') {
        gameState = 'gameplay'
        resetGame()
        if (score > hiScore) {
            hiScore = score
            localStorage.setItem('hiScore', hiScore)
        }
          
        // score = 0
        updateScoreDisplay(score)
        addSegments()
    } else if (gameState === 'gameOver') {
        setTimeout(() => { gameState = 'titleScreen'} , 500)
    }
    keys[event.key] = true
})

gameLoop()
