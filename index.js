const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const leafMap = [
    { x: .1, y: -1000, size: 20 },
    { x: .2, y: -1500, size: 35 },
    { x: .3, y: -1400, size: 35 },
    { x: .4, y: -2500, size: 20 },
    { x: .6, y: -1800, size: 20 },
    { x: .8, y: -1500, size: 35 },
    { x: .9, y: -1200, size: 35 },
]

const mushroomMap = [
    { x: .1, y: -1400, size: 30 },
    { x: .2, y: -2400, size: 55 },
    { x: .3, y: -1500, size: 30 },
    { x: .4, y: -2000, size: 55 },
    { x: .5, y: -1700, size: 30 },
    { x: .6, y: -2200, size: 30 },
    { x: .8, y: -1400, size: 55 },
    { x: .7, y: -2200, size: 55 },
    { x: .9, y: -1450, size: 30 },
]

const caterpillar = new Caterpillar()
const leafs = leafMap.map((obj) => new Leaf(obj.x * canvas.width, obj.y, obj.size))
const shrooms = mushroomMap.map((obj) => new Mushroom(obj.x * canvas.width, obj.y, obj.size))
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

function setCanvasSize() {
    const aspectRatio = 500 / 450;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    let newWidth, newHeight;

    if (windowWidth / windowHeight < aspectRatio) {
        newWidth = windowWidth;
        newHeight = newWidth / aspectRatio;
    } else {
        newHeight = windowHeight;
        newWidth = newHeight * aspectRatio;
    }

    canvas.width = newWidth;
    canvas.height = newHeight;
}

window.addEventListener('resize', setCanvasSize);
setCanvasSize();

gameLoop()
