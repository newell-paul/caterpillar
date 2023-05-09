class Leaf extends GameObject {
    constructor(x, y, size) {
        super(
            x,
            y,
            size,
            './img/leaf.png',
            Math.floor(Math.random() * (8 - 4 + 1)) + 4
        )
        this.waveAmplitude = Math.random() * (3 - 0.7) + 0.5; // Decreased range
        this.waveFrequency = Math.random() * (0.002 - 0.0005) + 0.0005; // Decreased range
    }

    update(deltaTime) {
        let newPositionY =
            this.position.y + (this.velocity.y * deltaTime) / SPEED
        let waveOffset =
            this.position.y * this.waveFrequency +
            Date.now() * this.waveFrequency
        let waveMovement = Math.sin(waveOffset) * this.waveAmplitude
        let newPositionX =
            this.position.x +
            this.velocity.x +
            (waveMovement * deltaTime) / SPEED

        if (newPositionY + this.height <= canvas.height) {
            this.position.y = newPositionY
        } else {
            this.position.y = 0
        }

        if (newPositionX >= 0 && newPositionX + this.width <= canvas.width) {
            this.position.x = newPositionX
        } else {
            this.position.x = 0
        }
    }

    draw() {
        if (this.isVisible()) {
            let waveFrequency = 0.0005
            let waveOffset =
                this.position.y * waveFrequency + Date.now() * waveFrequency
            let rotationAngle = Math.sin(waveOffset) * (Math.PI / 1)

            c.save()
            c.translate(
                this.position.x + this.width / 2,
                this.position.y + this.height / 2
            )
            c.rotate(rotationAngle)
            c.drawImage(
                this.image,
                -this.width / 2,
                -this.height / 2,
                this.width,
                this.height
            )
            c.restore()
        }
    }
}
