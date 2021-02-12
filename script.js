const $ = selector => document.querySelector(selector);
const Nodelist = document.querySelectorAll(".difficulty");
const scoreValue = $(".score-value");
let combo = 0;
let score = 0
let lifes = 0

// Take Level data after click
class levelPicker {
  choose() {
    for(let elem of Nodelist) {
      elem.addEventListener("click", event => {
        if (event.target.classList.contains("Easy")) {
          const easy = new Level(7,2000,12000);
          lifes = 7
          easy.createHearth();
          easy.nextFrame();
        } else if (event.target.classList.contains("Normal")) {
          const normal = new Level(5,1500,8000);
          lifes = 5;
          normal.createHearth();
          normal.nextFrame();
        } else if (event.target.classList.contains("Hamster")) {
          const hard = new Level(3,1000,5000);
          lifes = 3;
          hard.createHearth();
          hard.nextFrame();
        }
      });
    }
  }
}

// Level settings 
class Level {
  constructor(hearthMeter,level,levelDelay) {
    this.hearthMeter = hearthMeter;
    this.level = level;
    this.levelDelay = levelDelay;
    this.hamsters  = [{
      status: "normal",
      next: this.normal(this.level),
      source: $("#hole-0")
    }, {
      status: "normal",
      next: this.normal(this.level),
      source: $("#hole-1")
    }, {
      status: "normal",
      next: this.normal(this.level),
      source:$("#hole-2")
    }, {
      status: "normal",
      next: this.normal(this.level),
      source: $("#hole-3")
    }, {
      status: "normal",
      next: this.normal(this.level),
      source: $("#hole-4")
    }, {
      status: "normal",
      next: this.normal(this.level),
      source: $("#hole-5")
    }];
  };
  createHearth() {
    for (let i = 0; i < this.hearthMeter; i++) {
      const Hearth = document.createElement("img");
      Hearth.classList.add("meter");
      Hearth.src = "./images/hearth.png";
     $(".hamster-meter").appendChild(Hearth);
    };
    $(".background").classList.add("hide");
    $(".wrapper-background").classList.remove("hide");
  }
  normal() {
    return  Date.now() + this.level;
  }
  gone() {
    return Date.now() + Math.floor(Math.random() * this.levelDelay) + this.level;
  }
  nextFrame() {
    this.hamsters.map(event => {
      if (event.next <= Date.now()) {
        this.nextStatus(event);
      }
    })
    requestAnimationFrame(this.nextFrame.bind(this));
  }
  nextStatus(hamster = this.hamsters) {
    if (hamster.status === "normal" || hamster.status === "smashed") {
      hamster.source.children[0].src = './images/hamster2.png';
      hamster.source.classList.add("hide");
      hamster.status = "gone";
      hamster.next = this.gone(this.level, this.levelDelay);
    } else if (hamster.status === "gone") {
      hamster.source.classList.remove("hide");
      hamster.source.style.cursor = "url(./images/hammer-smash.png),pointer";
      hamster.status = "normal";
      hamster.next = this.normal(this.level);
    }
  }
}

class Hit extends Level {
  smashed(event) {
    if (event.target.tagName !== "IMG") {
      $(".hamster-meter").removeChild($(".meter"));
      combo = 0;
      lifes--;
      return "";
    } 
    const hamster = this.hamsters[parseInt(event.target.dataset.index)];
    hamster.source.style.cursor = "url(./images/hammer.png),default";
    hamster.status = "smashed";
    hamster.next = super.normal(this.level);
    hamster.source.children[0].src = './images/hamster-smashed2.png'; 
    
    // Score counting and combo meter
    combo++;
    score = score + 1000
    
    if (combo % 3 === 0) {
      $(".combo").style.visibility = "visible";
      setTimeout(() => { 
        $(".combo").style.visibility = "hidden";
      }, 2000);
      score = score + 2000
    } 

    $(".score-value").innerText = score

    if(score >= 20000) {
      gameOver.win();
    }
  }
}

class GameOver {
  
  win() {
    $(".level-answer").innerText = "You win!";
    $(".background").classList.remove("hide");
    $(".win-wrapper").classList.remove("hide")
    $(".wrapper-background").classList.add("hide");
    $ (".centring").classList.add("hide");
    $(".score-value").innerText = 20000;
    $(".play-again").addEventListener("click", () => {
      location.reload(true);

    })
  }
  lose() {
    this.win();
    $(".level-answer").innerText = "You lose!";
  }
}

class Smash   {
  click() {
    $('.holes-container').addEventListener('click', event => {
      if (lifes === 1) {
        gameOver.lose();
      } else {
        const hit = new Hit();
        hit.smashed(event);
    }
  })}
}

const level = new levelPicker()
const gameOver = new GameOver();
const click = new Smash();
click.click();
level.choose()



