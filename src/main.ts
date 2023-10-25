const canvas = document.querySelector('canvas')!;
const c = canvas.getContext('2d')!;

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height);

const wordSpeed: number = 0.2;

class Words {
  words: Word[];

  constructor() {
    this.words = [];
  }

  addWord(): void {
    this.words.push(new Word({x: 0, y: Math.floor(Math.random() * canvas.height)}, "Test"))
  }

  update(): void {
    this.words.forEach((word) => {
      word.update()
    }); 
  }
}

class Word {
  position: any;
  word: string;

  constructor(position: any, word: string) {
    this.position = position;
    this.word = word;
  }

  draw(): void {
    c.fillStyle = 'white';
    c.font = "24px serif";
    c.fillText(this.word, this.position.x, this.position.y)
  }

  update(): void {
    this.draw();
    this.position.x += wordSpeed;
  }
}

let words = new Words()
words.addWord()

//Timer to spawn words
let wordTimer = 2
function decreaseTimer(): void {
  if (wordTimer > 0) {
    setTimeout(decreaseTimer, 2000)
    wordTimer--;
  } else {
    wordTimer = 2;
    decreaseTimer();
    words.addWord();
  }
}

//Initialize  timer
decreaseTimer();

//Game loop
function animate(): void {
  window.requestAnimationFrame(animate)
  // Clear the canvas so drawings dont smear
  c.fillStyle='black'
  c.fillRect(0,0, canvas.width, canvas.height)

  //Spawn and move words across the screen
  words.update();
}

animate();