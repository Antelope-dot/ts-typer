const canvas = document.querySelector('canvas')!;
const c = canvas.getContext('2d')!;

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

//Movement speed of words. Get progessivly faster
let wordSpeed: number = 0.2;

//Score counter for words destoyed and missed
let score: number = 0;
let missed: number = 0;

let gameStart: boolean = false;

class Words {
  words: Word[];

  constructor() {
    this.words = [];
  }

  addWord(): void {
    this.words.push(new Word({ x: 0, y: Math.floor(Math.random() * canvas.height) }, "test"))
  }

  update(): void {
    for (var i = 0; i <= words.words.length - 1; i++) {
      if (gameStart) {
        words.words[i].update()
        if (words.words[i].position.x > canvas.width) {
          missed += 1;
          document.getElementById("missedValue")!.innerHTML = missed.toString();
          words.words.splice(i, 1);
        }
      }
    }
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
    if (this.position.x > canvas.width * (2 / 3)) {
      color = "red"
    } else if (this.position.x > canvas.width * (1 / 3)) {
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

//Timer to spawn words
let wordTimer = 1
function decreaseTimer(): void {
  if (wordTimer > 0) {
    wordTimer--;
    setTimeout(decreaseTimer, 1000)
  } else if (gameStart) {
    wordTimer = 1;
    wordSpeed += 0.01;
    decreaseTimer();
    words.addWord();
  } else {
    setTimeout(decreaseTimer, 1000)
  }
}

//Initialize  timer
decreaseTimer();

//Stars for background
const COLOR_STARS = "white";
const STAR_NUM = 100;
const STAR_SIZE = 0.005;
const STAR_SPEED = 0.05;

var stars: any = [];
var starSpeed = STAR_SPEED * canvas.width;
var xv = starSpeed * Math.random();

for (let i = 0; i < STAR_NUM; i++) {
  let speedMult = Math.random() * 1.5 + 0.5;
  stars[i] = {
    r: Math.random() * STAR_SIZE * canvas.width / 2,
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    xv: xv * speedMult
  }
}

//Game loop
function animate(): void {
  window.requestAnimationFrame(animate)
  // Clear the canvas so drawings dont smear
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)

  // Draw stars so background looks cool
  c.fillStyle = COLOR_STARS;
  for (let i = 0; i < STAR_NUM; i++) {
    c.beginPath();
    //Arc draws a circle.
    c.arc(stars[i].x, stars[i].y, stars[i].r, 0, Math.PI * 2);
    c.fill();

    //Make the stars move and if they reach end of screen then loop back around
    stars[i].x += stars[i].xv * 0.009;

    if (stars[i].x < 0 - stars[i].r) {
      stars[i].x = canvas.width + stars[i].r;
    } else if (stars[i].x > canvas.width + stars[i].r) {
      stars[i].x = 0 - stars[i].r;
    }
  }
  if (gameStart) {
    //Spawn and move words across the screen
    words.update();
  } else {
    c.font = "50px serif";
    c.fillText(" Type start to play", canvas.width / 2 - 150, canvas.height / 2);
  }


}

animate();

// Text input that checks if text matches with existing words on screen
let typer = document.querySelector('input')!;
typer.addEventListener('input', () => {
  //For loop through words on screen
  if (!gameStart && typer.value == "start") {
    typer.value = "";
    words.addWord()
    gameStart = true;
  } else {
    for (var i = 0; i <= words.words.length - 1; i++) {
      // Check if word matches input 
      let wordsMatch: boolean = words.words[i].word === typer.value
      if (wordsMatch) {
        // Remove word and clear input
        words.words.splice(i, 1);
        score += 1;
        document.getElementById("scoreValue")!.innerHTML = score.toString();
        typer.value = "";
      }
    }
  }
}); 