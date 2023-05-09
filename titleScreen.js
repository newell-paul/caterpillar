function titleScreen() {
    const appleImage = new Image()
    appleImage.src = './img/apple.png'

    const leafImage = new Image()
    leafImage.src = './img/leaf.png'

    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.font = '65px ArcadeClassic, sans-serif'
    c.fillStyle = 'green'
    c.textAlign = 'center'
    c.fillText('Caterpillar', canvas.width / 2, 160)

    c.fillStyle = 'white'
    c.font = '24px ArcadeClassic, sans-serif'
    c.fillText('Press any key to start', canvas.width / 2, 220)

    c.fillStyle = 'white'
    c.font = '18px ArcadeClassic, sans-serif'
    c.fillText('use arrow keys to move left and right', canvas.width / 2, 270)

    c.font = '24px ArcadeClassic'
    c.fillStyle = 'cyan'
    c.fillText(`HIGH  ${padScore(hiScore, 5)}`, 80, 30)

    c.fillStyle = 'yellow'
    c.font = '16px ArcadeClassic, sans-serif'
    c.fillText(
        'Game created by Paul Newell 2023',
        canvas.width / 2,
        canvas.height - 30
    )

    c.font = '24px ArcadeClassic'
    c.fillStyle = 'cyan'
    c.fillText(`1 point`, 250, 340)
    c.fillText(`5 points  ++`, 275, 387)

    c.drawImage(leafImage, 150, 315, 30, 30)
    c.drawImage(appleImage, 150, 360, 30, 30)
}
