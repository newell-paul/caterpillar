class Mushroom {
    constructor() {
      this.shroom = {
        position: {
          x: 200,
          y: 100
        },
        width: 50,
        height: 50,
        image: new Image()
      }
      this.shroom.image.src = './img/mushroom red.png'
    }
  
    draw() {
      c.drawImage(this.shroom.image, this.shroom.position.x, this.shroom.position.y, this.shroom.width, this.shroom.height)
    }
  }
