class Caterpillar {
    constructor(canvas) {
        this.head = {
            position: {
                x: canvas.width / 2 - 20,
                y: canvas.height - 150,
            },
            width: 45,
            height: 45,
            rotation: 0,
            image: new Image(),
        }

        this.head.headLeft = './img/left head.png'
        this.head.headRight = './img/right head.png'
        this.head.headLeftOpen = './img/left head open.png'
        this.head.headRightOpen = './img/right head open.png'
        this.head.image.src = this.head.headRight

        this.mouthOpen = false
        this.mouthOpenDuration = 150
        this.mouthOpenTimestamp = null
        this.lastDirection = 1

        this.velocity = {
            x: 0,
            y: 0,
        }

        this.bodyImage = './img/body.png'
        this.body = []
    }

    draw() {
        const direction = this.velocity.x

        if (direction !== 0) {
            this.lastDirection = direction
        }

        if (direction < 0) {
            this.head.image.src = this.head.headLeft
        } else if (direction > 0) {
            this.head.image.src = this.head.headRight
        }

        if (this.mouthOpen) {
            if (this.lastDirection < 0) {
                this.head.rotation = 0.1
                this.head.image.src = this.head.headLeftOpen
            } else {
                this.head.rotation = -0.1
                this.head.image.src = this.head.headRightOpen
            }
        } else {
            if (this.lastDirection < 0) {
                this.head.image.src = this.head.headLeft
            } else {
                this.head.image.src = this.head.headRight
            }
        }

        c.save()
        c.translate(
            this.head.position.x + this.head.width / 2,
            this.head.position.y + this.head.height / 2
        )
        c.rotate(this.head.rotation)
        c.drawImage(
            this.head.image,
            -this.head.width / 2,
            -this.head.height / 2,
            this.head.width,
            this.head.height
        )
        c.restore()

        if (!this.body.length) {
            return
        }

        this.body.forEach((segment) => {
            c.drawImage(
                segment.image,
                segment.position.x,
                segment.position.y,
                segment.width,
                segment.height
            )
        })
    }

    update(deltaTime) {
        const newPositionX = this.head.position.x + this.velocity.x * deltaTime / SPEED

        if (
            newPositionX >= 0 &&
            newPositionX + this.head.width <= canvas.width
        ) {
            this.head.position.x = newPositionX
        }

        if (!this.body.length) {
            return
        }

        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].position.x +=
                (this.body[i - 1].position.x - this.body[i].position.x) * 0.1
            this.body[i].position.y =
                this.body[i - 1].position.y + (this.body[i - 1].height - 14)
        }

        this.body[0].position.x +=
            (this.head.position.x - this.body[0].position.x) * 0.1
        this.body[0].position.y = this.head.position.y + (this.head.height - 14)
    }

    addSegment() {
        const segment = {
            position: {
                x: 0,
                y: 0,
            },
            width: 40,
            height: 40,
            image: new Image(),
        }
        segment.image.src = this.bodyImage
        audio.pop.play()
        this.body.push(segment)
    }

    addSegments() {
        if (this.body.length < 4) {
            this.addSegment()

            setTimeout(() => {
                this.addSegments()
            }, 500)
        }
    }
}
