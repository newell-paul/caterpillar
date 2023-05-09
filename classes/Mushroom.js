class Mushroom extends GameObject {
    constructor(x, y, size, speed = 5) {
        super(x, y, size, './img/mushroom.png', 5)
        this.velocity.y = speed
    }

    update(deltaTime) {
        let newPositionY =
            this.position.y + (this.velocity.y * deltaTime) / SPEED

        if (newPositionY + this.height <= canvas.height) {
            this.position.y = newPositionY
        } else {
            this.position.y = -10
        }
    }

    draw() {
        if (this.isVisible()) {
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
        }
    }
}
