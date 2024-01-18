let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newgamebtn = document.querySelector("#newbtn");
let msgcontainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");

let turno = true;
let count = 0;

const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    //console.log("box was clicked");
    if (turno) {
      box.innerText = "O";
      turno = false;
    } else {
      box.innerText = "X";
      turno = true;
    }
    box.disabled = true;
    count++;
    checkwinner();
    let iswinner = checkwinner();
    if (count == 9 && !iswinner) {
      gamedraw();
    }
  });
});

const gamedraw = () => {
  msg.innerText = "you both suck";
  msgcontainer.classList.remove("hide");
  enableboxes();
};

const resetgame = () => {
  turno = true;
  enableboxes();
  msgcontainer.classList.add("hide");
};

const disableboxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

const enableboxes = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showwinner = (winner) => {
  msg.innerText = `congrats winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disableboxes();
};

const checkwinner = () => {
  for (let pattern of winpatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        //console.log("winner",pos1val);
        showwinner(pos1val);
        return true;
      }
    }
  }
};

newgamebtn.addEventListener("click", () => {
  resetgame();
});
resetbtn.addEventListener("click", resetgame);
