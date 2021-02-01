"use strict";

const Nodelist = document.querySelectorAll(".difficulty");
let level = 0;
let levelDelay = 0;
let score = 0;
let combo = 0;
let HearthMeter = 0;
let lifes = 0;
Nodelist.forEach(event => {
  addEventListener("click", event => {
    if (event.target.classList.contains("Easy")) {
      easyMode();
    } else if (event.target.classList.contains("Normal")) {
      normalMode();
    } else if (event.target.classList.contains("Hamster")) {
      hardMode();
    }
  });
});

function easyMode() {
  HearthMeter = 3;
  lifes = 9;
  level = 2000;
  levelDelay = 12000;
  hearth();
  change();
}

function normalMode() {
  HearthMeter = 2;
  lifes = 6;
  level = 1500;
  levelDelay = 8000;
  change();
  hearth();
}

function hardMode() {
  HearthMeter = 1;
  lifes = 3;
  level = 1000;
  levelDelay = 5000;
  change();
  hearth();
}

function hearth() {
  for (let i = 0; i < HearthMeter; i++) {
    const Hearth = document.createElement("img");
    Hearth.classList.add("meter");
    Hearth.src = "./images/hearth.png";
    document.querySelector(".hamster-meter").appendChild(Hearth);
  }
} //Event after hamster hit


document.querySelector('.holes-container').addEventListener('click', event => {
  if (lifes === 1) {
    lose();
  } else {
    smashed(event);
  }
});
const hamsters = [{
  status: "normal",
  next: normal(level),
  source: document.querySelector("#hole-0")
}, {
  status: "normal",
  next: normal(level),
  source: document.querySelector("#hole-1")
}, {
  status: "normal",
  next: normal(level),
  source: document.querySelector("#hole-2")
}, {
  status: "normal",
  next: normal(level),
  source: document.querySelector("#hole-3")
}, {
  status: "normal",
  next: normal(level),
  source: document.querySelector("#hole-4")
}, {
  status: "normal",
  next: normal(level),
  source: document.querySelector("#hole-5")
}];

function change() {
  document.querySelector(".background").classList.add("hide");
  document.querySelector(".wrapper-background").classList.remove("hide");
} //Time events


function normal(level) {
  return Date.now() + level;
}

function gone(level, levelDelay) {
  return Date.now() + Math.floor(Math.random() * levelDelay) + level;
}

function smashed(event) {
  if (event.target.tagName !== "IMG") {
    document.querySelector(".hamster-meter").removeChild(document.querySelector(".meter"));
    lifes--;
    combo = 0;
    return "";
  } //  Take data


  const hamster = hamsters[parseInt(event.target.dataset.index)];
  hamster.source.style.cursor = "url(./images/hammer.png),default";
  hamster.status = "smashed";
  hamster.next = normal(level);
  hamster.source.children[0].src = './images/hamster-smashed2.png'; // Score counting and combo meter

  combo++;
  score = score + 1000;
  console.log(score);
  console.log(combo);

  if (combo % 3 === 0) {
    console.log("combo!");
    score = score + 2000;
  } // document.querySelector('.worm-container').style.width = `${10 * score}%`

}

function lose() {
  // TODO
  console.log("koniec");
}

function win() {// TODO
} //  change hamster


function nextFrame() {
  hamsters.map(event => {
    if (event.next <= Date.now()) {
      nextStatus(event);
    }
  });
  requestAnimationFrame(nextFrame);
}

nextFrame();

function nextStatus(hamsters) {
  if (hamsters.status === "normal") {
    hamsters.source.children[0].src = './images/hamster2.png';
    hamsters.source.classList.add("hide");
    hamsters.status = "gone";
    hamsters.next = gone(level, levelDelay);
  } else if (hamsters.status === "gone") {
    hamsters.source.classList.remove("hide");
    hamsters.source.style.cursor = "url(./images/hammer-smash.png),pointer";
    hamsters.status = "normal";
    hamsters.next = normal(level);
  } else if (hamsters.status === "smashed") {
    hamsters.status = "normal";
  }
}