function collision(rectangle1, rectangle2) {
  return !(
    rectangle1.head.position.x + rectangle1.head.width < rectangle2.shroom.position.x ||
    rectangle1.head.position.x > rectangle2.shroom.position.x + rectangle2.shroom.width ||
    rectangle1.head.position.y + rectangle1.head.height < rectangle2.shroom.position.y ||
    rectangle1.head.position.y > rectangle2.shroom.position.y + rectangle2.shroom.height
  )
}

function endGame() {
  explode.play()
}
