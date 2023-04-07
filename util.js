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
