function collision(rectangle1, rectangle2, padding1 = 0, padding2 = [0, 0]) {
  const [padding2X, padding2Y] = Array.isArray(padding2) ? padding2 : [padding2, padding2];

  return !(
    rectangle1.head.position.x + rectangle1.head.width - padding1 < rectangle2.position.x + padding2X ||
    rectangle1.head.position.x + padding1 > rectangle2.position.x + rectangle2.width - padding2X ||
    rectangle1.head.position.y + rectangle1.head.height - padding1 < rectangle2.position.y + padding2Y ||
    rectangle1.head.position.y + padding1 > rectangle2.position.y + rectangle2.height - padding2Y
  );
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

  for (let leaf of leafs) {
    leaf.update(deltaTime)
  }

  apple.update(deltaTime)

  for (let shroom of shrooms) {
    shroom.update(deltaTime)
  }
}

function checkCollisions() {
  for (let leaf of leafs) {
    if (collision(caterpillar, leaf, 10, [10, 2])) {
      audio.leafBite.play()
      leaf.position.y = 10
      score++;
      updateScoreDisplay(score);
      continue;
    }
  }

  if (collision(caterpillar, apple)) {
    audio.appleBite.play()
    apple.position.y = 10
    apple.position.x = Math.random() * canvas.width
    score += 5
    updateScoreDisplay(score)
  }
}

function mushroomCollide() {
  for (let shroom of shrooms) {
    if (collision(caterpillar, shroom, 10, [10, 2])) {
      audio.crash.play()
      crash()
      shroom.position.y = -20

      if (!caterpillar.body.length) { return true }
      caterpillar.body.pop()
    }
  }
  return false
}

function drawObjects() {
  c.clearRect(0, 0, canvas.width, canvas.height)
  caterpillar.draw();

  for (let shroom of shrooms) {
    shroom.draw();
  }

  for (let leaf of leafs) {
    leaf.draw();
  }

  apple.draw();
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

  const t = crashProgress / crashDuration;
  const easedT = easeOutElastic(t)

  c.clearRect(0, 0, canvas.width, canvas.height)

  for (let segment of caterpillar.body) {
    segment.height = crashMinHeight + (crashStartHeight - crashMinHeight) * easedT
  }

  drawObjects();

  if (crashProgress < crashDuration) {
    requestAnimationFrame(crash)
  } else {
    crashProgress = 0
  }
}

function spinHead(timestamp) {
  const deltaTime = timestamp - lastTimestamp
  lastTimestamp = timestamp

  c.clearRect(0, 0, canvas.width, canvas.height)
  drawObjects()
  drawGameOver()

  caterpillar.head.rotation += 0.1
  caterpillar.head.height += .5
  caterpillar.head.width += .5

  if (caterpillar.head.rotation < 4 * Math.PI) {
    requestAnimationFrame(spinHead)
  }
}

function drawGameOver() {
  c.font = "40px 'ArcadeClassic', sans-serif"
  c.fillStyle = "red"
  c.textAlign = "center"
  c.fillText("Game Over", canvas.width / 2, canvas.height / 2)
}

function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}
