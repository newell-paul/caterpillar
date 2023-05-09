function titleScreen() {
    const appleImage = new Image()
    appleImage.src = './img/apple.png'

    const leafImage = new Image()
    leafImage.src = './img/leaf.png'

    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    wavyText('Caterpillar', 50, 130, 100, 20, 0.005)

    const opacity = (Math.sin(Date.now() * 0.002) + 1) / 2
    c.fillStyle = `rgba(255, 255, 255, ${opacity})`
    c.font = '24px ArcadeClassic, sans-serif'
    c.fillText('Press any key to start', canvas.width / 2, 220)

    c.fillStyle = 'white'
    c.font = '18px ArcadeClassic, sans-serif'
    c.fillText('use arrow keys to move left and right', canvas.width / 2, 280)

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
    c.fillText(`5 points  ++`, 275, 389)

    c.drawImage(leafImage, 150, 312, 40, 40)
    c.drawImage(appleImage, 150, 360, 40, 40)
}

function wavyText(text, x, y, fontSize, amplitude, frequency) {
    c.font = '75px ArcadeClassic, sans-serif'
    c.fillStyle = 'green'
    c.textAlign = 'center'

    for (let i = 0; i < text.length; i++) {
        let char = text[i]
        let charWidth = c.measureText(char).width
        let waveOffset = x * frequency + Date.now() * frequency
        let yOffset = Math.sin(waveOffset + i * frequency * 2) * amplitude
        c.fillText(char, x, y + yOffset)
        x += charWidth
    }
}
