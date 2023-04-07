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
  const scoreContainer = document.getElementById('score-container');
  scoreContainer.innerHTML = `${padScore(score, 5)}`;
}

function padScore(score, length) {
  const scoreStr = score.toString()
  return scoreStr.padStart(length, '0')
}

function handleInput(keys) {
  if (keys['ArrowLeft']) {
    caterpillar.velocity.x = -4;
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
    if (collision(caterpillar, leaf)) {
      audio.leafBite.play();
      leaf.position.y = 10;
      score++;
      updateScoreDisplay(score);
      continue;
    }
  }

  if (collision(caterpillar, apple)) {
    audio.leafBite.play()
    apple.position.y = 10
    apple.position.x = Math.random() * canvas.width
    score += 5
    updateScoreDisplay(score)
  }
}

function mushroomCollide() {
  for (let shroom of shrooms) {
    if (collision(caterpillar, shroom, 10, [10, 2])) {
      audio.leafBite.play()
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
