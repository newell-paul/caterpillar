const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const leafMap = [
    { x: 10, y: -1000, size: 20 },
    { x: 80, y: -1500, size: 35 },
    { x: 130, y: -1400, size: 35 },
    { x: 200, y: -2500, size: 20 },
    { x: 300, y: -1800, size: 20 },
    { x: 340, y: -1500, size: 35 },
    { x: 380, y: -1200, size: 35 },
]

const mushroomMap = [
    { x: 20, y: -1400, size: 30 },
    { x: 80, y: -2400, size: 55 },
    { x: 130, y: -1500, size: 30 },
    { x: 180, y: -2000, size: 55 },
    { x: 220, y: -1700, size: 30 },
    { x: 280, y: -2200, size: 30 },
    { x: 320, y: -1400, size: 55 },
    { x: 370, y: -2200, size: 55 },
    { x: 410, y: -1450, size: 30 },
]

const caterpillar = new Caterpillar()
const leafs = leafMap.map((obj) => new Leaf(obj.x, obj.y, obj.size))
const shrooms = mushroomMap.map((obj) => new Mushroom(obj.x, obj.y, obj.size))
const apple = new Apple(150, -3000, 40)

let lastTimestamp = 0
let lastEventTimestamp
let score = 0
let gameOver = false
let mushroomSpeed = 5

function gameLoop(timestamp) {
    if (titleScreenActive) {
        titleScreen()
        return
    }
    const deltaTime = timestamp - lastTimestamp
    lastTimestamp = timestamp

    if (mushroomCollide()) {
        gameOver = true
    }

    if (!lastEventTimestamp || timestamp - lastEventTimestamp >= 15000) {
        shrooms.push(
            new Mushroom(caterpillar.head.position.x, -1700, 35, mushroomSpeed)
        )
        lastEventTimestamp = timestamp
    }
    mushroomSpeed += 0.001 // Slowly ramp up the difficulty

    if (!gameOver) {
        handleInput(keys)
        updateObjects(deltaTime)
        checkCollisions()
        drawObjects()
        requestAnimationFrame(gameLoop)
    } else {
        spinHead(timestamp)
    }
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
    if (titleScreenActive && event.key === ' ') {
        titleScreenActive = false
        addSegments()
        requestAnimationFrame(gameLoop)
        return
    }

    keys[event.key] = true
})

gameLoop()
