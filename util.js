function collision(rectangle1, rectangle2, padding1 = 0, padding2 = [0, 0]) {
    const [padding2X, padding2Y] = Array.isArray(padding2)
        ? padding2
        : [padding2, padding2]

    return !(
        rectangle1.head.position.x + rectangle1.head.width - padding1 <
            rectangle2.position.x + padding2X ||
        rectangle1.head.position.x + padding1 >
            rectangle2.position.x + rectangle2.width - padding2X ||
        rectangle1.head.position.y + rectangle1.head.height - padding1 <
            rectangle2.position.y + padding2Y ||
        rectangle1.head.position.y + padding1 >
            rectangle2.position.y + rectangle2.height - padding2Y
    )
}

function endGame() {
    explode.play()
}

function updateScoreDisplay(score) {
    const scoreContainer = document.getElementById('score-container')
    scoreContainer.innerHTML = `${padScore(score, 5)}`
}

function padScore(score, length) {
    const scoreStr = score.toString()
    return scoreStr.padStart(length, '0')
}

function handleInput(keys) {
    if (keys['ArrowLeft']) {
        caterpillar.velocity.x = -4
    } else if (keys['ArrowRight']) {
        caterpillar.velocity.x = 4
    } else {
        caterpillar.velocity.x = 0
    }
}

function updateObjects(deltaTime) {
    caterpillar.update(deltaTime)

    if (
        caterpillar.mouthOpen &&
        lastTimestamp - caterpillar.mouthOpenTimestamp >=
            caterpillar.mouthOpenDuration
    ) {
        caterpillar.mouthOpen = false
        caterpillar.head.rotation = 0
    }

    leafs.forEach((leaf) => leaf.update(deltaTime))

    apple.update(deltaTime)

    for (let shroom of shrooms) {
        shroom.update(deltaTime)
        shroom.velocity.y = mushroomSpeed
    }
}

function checkCollisions() {
    for (const leaf of leafs) {
        if (collision(caterpillar, leaf, 10, [10, 2])) {
            audio.leafBite.play()
            leaf.position.y = 10
            score++
            updateScoreDisplay(score)
            caterpillar.mouthOpen = true
            caterpillar.mouthOpenTimestamp = lastTimestamp
            continue
        }
    }

    if (collision(caterpillar, apple)) {
        audio.appleBite.play()
        apple.position.y = -100
        apple.position.x =
            canvas.width * 0.15 + Math.random() * (canvas.width * 0.7)

        score += appleScore
        appleScore += 5
        updateScoreDisplay(score)
        caterpillar.mouthOpen = true
        caterpillar.mouthOpenTimestamp = lastTimestamp
    }
}

function mushroomCollide() {
    for (const shroom of shrooms) {
        if (collision(caterpillar, shroom, 10, [10, 2])) {
            crash()
            shroom.position.y = -20

            if (!caterpillar.body.length) {
                audio.crash.play()
                return true
            }
            audio.pop.play()
            caterpillar.body.pop()
        }
    }
    return false
}

function drawObjects() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    caterpillar.draw()

    for (let shroom of shrooms) {
        shroom.draw()
    }

    for (let leaf of leafs) {
        leaf.draw()
    }

    apple.draw()
}

let crashProgress = 0
let crashStartHeight = 40
let crashMinHeight = 30
let crashDuration = 1500

function crash() {
    crashProgress += 16
    if (crashProgress > crashDuration) {
        crashProgress = crashDuration
    }

    const t = crashProgress / crashDuration
    const easedT = easeOutElastic(t)

    c.clearRect(0, 0, canvas.width, canvas.height)

    for (let segment of caterpillar.body) {
        segment.height =
            crashMinHeight + (crashStartHeight - crashMinHeight) * easedT
    }

    drawObjects()

    if (crashProgress < crashDuration) {
        requestAnimationFrame(crash)
    } else {
        crashProgress = 0
    }
}

function drawGameOver() {
    c.font = "40px 'ArcadeClassic', sans-serif"
    c.fillStyle = 'red'
    c.textAlign = 'center'
    c.fillText('Game Over', canvas.width / 2, canvas.height / 2)
}

function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3

    return x === 0
        ? 0
        : x === 1
        ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1
}



function titleScreen() {
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.font = '60px ArcadeClassic, sans-serif'
    c.fillStyle = 'green'
    c.textAlign = 'center'
    c.fillText('Caterpillar 2', canvas.width / 2, canvas.height / 2)

    c.fillStyle = 'white'
    c.font = '24px ArcadeClassic, sans-serif'
    c.fillText(
        'Press any key to start',
        canvas.width / 2,
        canvas.height / 2 + 50
    )

    c.font = '24px ArcadeClassic'
    c.fillStyle = 'cyan'
    c.fillText(`HIGH  ${padScore(hiScore, 5)}`, 80, 30)

    c.fillStyle = 'yellow'
    c.font = '16px ArcadeClassic, sans-serif'
    c.fillText(
        'Game created by Paul Newell 2023',
        canvas.width / 2,
        canvas.height - 40
    )
}

let hiScore = localStorage.getItem('hiScore') || 0

function resetGame() {
    mushroomSpeed = 5
    appleScore = 5
    score = 0
    hiScore = localStorage.getItem('hiScore') || 0

    leafs = leafMap.map(
        (obj) => new Leaf(obj.x * canvas.width, obj.y, obj.size)
    )
    shrooms = mushroomMap.map(
        (obj) => new Mushroom(obj.x * canvas.width, obj.y, obj.size)
    )
    apple = new Apple(150, -3000, 40)
    caterpillar = new Caterpillar(canvas)
}
