function collision(rectangle1, rectangle2) {
  return !(
    rectangle1.head.position.x + rectangle1.head.width < rectangle2.position.x ||
    rectangle1.head.position.x > rectangle2.position.x + rectangle2.width ||
    rectangle1.head.position.y + rectangle1.head.height < rectangle2.position.y ||
    rectangle1.head.position.y > rectangle2.position.y + rectangle2.height
  )
}

function endGame() {
  explode.play()
}

function updateScoreDisplay(score) {
  const scoreContainer = document.getElementById('score-container');
  scoreContainer.innerHTML = `${padScore(score, 5)}`;
}

function padScore(score, length) {
  const scoreStr = score.toString();
  return scoreStr.padStart(length, '0');
}

function handleInput(keys) {
  if (keys['ArrowLeft']) {
    caterpillar.velocity.x = -4;
  } else if (keys['ArrowRight']) {
    caterpillar.velocity.x = 4;
  } else {
    caterpillar.velocity.x = 0;
  }
}

function updateObjects(deltaTime) {
  caterpillar.update(deltaTime);

  for (let shroom of shrooms) {
    shroom.update(deltaTime);
  }

  for (let leaf of leafs) {
    leaf.update(deltaTime);
  }

  apple.update(deltaTime);
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
    audio.leafBite.play();
    apple.position.y = 10;
    apple.position.x = Math.random() * canvas.width;
    score += 5;
    updateScoreDisplay(score);
  }
}

function drawObjects() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  caterpillar.draw();

  for (let shroom of shrooms) {
    shroom.draw();
  }

  for (let leaf of leafs) {
    leaf.draw();
  }

  apple.draw();
}
