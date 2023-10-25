const canvas = document.querySelector('canvas')!;
const c = canvas.getContext('2d')!;

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height);

class Word {
  position: any;

  constructor(position: any) {
    this.position = position;
  }

  draw() {
    c.fillStyle = 'white'
    c.font = "24px serif";
    c.fillText("UwU", 50, 30)
  }
}

const word = new Word({
  x: 0,
  y:0
})

word.draw();