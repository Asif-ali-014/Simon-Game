let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let btns = ["red", "yellow", "green", "purple"];

let h2 = document.querySelector("h2");
//Step 1
document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    console.log("game started");
  }
  levelUP();
});

//step 2 levelup and flash btn
function levelUP() {
  userSeq = []; //reset the user seq to again check the seq of clikcs
  level++;
  h2.innerText = `Level ${level}`;

  let ranIdx = Math.floor(Math.random() * 3);
  let randColor = btns[ranIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameflash(randBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);
}

//step 3
function gameflash(btn) {
  btn.classList.add("gameflash");
  setTimeout(function () {
    btn.classList.remove("gameflash");
  }, 250);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}
//now we make a function to press the button

function btnPress() {
  console.log("the button was pressed");
  let btn = this;
  userflash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1); //we call the fun here to check the ans
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
  btn.addEventListener("click", btnPress); //we call the function here
}

//now create a function to check the seq ans
function checkAns(idx) {
  // console.log("curr level ", level);
  // let idx = level - 1;
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUP, 500);
    }
  } else {
    h2.innerHTML = `Game over! your score was <b>${level}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
