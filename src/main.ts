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
    var color: string;
    if (this.position.x > canvas.width*(2/3)){
      color = "red"
    } else if (this.position.x > canvas.width*(1/3)) {
      color = "yellow"
    } else {
      color = "white"
    }
    c.fillStyle = color;
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

const COLOR_STARS = "white";
const STAR_NUM = 200;
const STAR_SIZE = 0.005;
const STAR_SPEED = 0.05;

var stars: any = [];
var starSpeed = STAR_SPEED * canvas.width;
var xv = starSpeed * Math.random();

for (let i = 0; i < STAR_NUM; i++) {
  let speedMult = Math.random() * 1.5 + 0.5;
  stars[i] = {
    r: Math.random() * STAR_SIZE * canvas.width /2,
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    xv: xv * speedMult
  }
}

//Game loop
function animate(): void {
  window.requestAnimationFrame(animate)
  // Clear the canvas so drawings dont smear
  c.fillStyle='black'
  c.fillRect(0,0, canvas.width, canvas.height)

  // Draw stars so background looks cool
  c.fillStyle = COLOR_STARS;
  for (let i = 0; i < STAR_NUM; i++) {
    c.beginPath();
    //Arc draws a circle.
    c.arc(stars[i].x, stars[i].y, stars[i].r,0,Math.PI*2);
    c.fill();

    //Make the stars move and if they reach end of screen then loop back around
    stars[i].x += stars[i].xv * 0.009;

    if (stars[i].x < 0 - stars[i].r) {
      stars[i].x = canvas.width + stars[i].r;
    } else if (stars[i].x > canvas.width + stars[i].r) {
      stars[i].x = 0 - stars[i].r;
    }
  }

  //Spawn and move words across the screen
  words.update();
}

animate();

// Text input that checks if text matches with existing words on screen
let typer = document.querySelector('input')!;
typer.addEventListener('input', () => {
  //For loop through words on screen
  for ( var i = 0; i <= words.words.length; i++) {
    // Check if word matches input 
    if (words.words[i].word.toLowerCase() === typer.value.toLowerCase()) {
      // Remove word and clear input
      words.words.splice(i, 1);
      typer.value = "";
    }
  }
}); 