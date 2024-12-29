
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn");
let msg = document.querySelector(".msg");
let win = document.querySelector("#win");

let turn0 = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("box was clicked");
        if (turn0) {
            box.innerText = "O";
            box.style.color = "blue"; 
            turn0 = false;
        } else {
            box.innerText = "X";
            box.style.color = "red"; 
            turn0 = true
        }
        box.disabled = true;
        checkWinner();

    });
});

const checkWinner = () =>{
    for (let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText; 
        let posval3 = boxes[pattern[2]].innerText;

        if (posval1 != "" && posval2 != "" && posval3 != "") {
            if (posval1 === posval2 && posval2 === posval3) {
                console.log("winner", posval1);
                highlightWinner(pattern); // Highlight winning combination
                showWinner(posval1);
            }
        }
    }
};

const showWinner = (winner) => {
    win.innerText = `Congratulations! Winner is ${winner}`;
    msg.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = ""; // Clear the box content
        box.disabled = false; // Re-enable the box
        box.classList.remove("winning"); // Remove the 'winning' class
    });
    turn0 = true; // Reset turn to player 0
});

newGame.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = ""; // Clear the box content
        box.disabled = false; // Re-enable the box
        box.classList.remove("winning"); // Remove the 'winning' class
    });
    turn0 = true; // Reset turn to player 0
    msg.classList.add("hide"); // Hide the winner message
    win.innerText = ""; // Clear the winner message text
});


const highlightWinner = (pattern) => {
    // Highlight each box in the winning pattern
    pattern.forEach((index) => {
        if (boxes[index].innerText === "X") {
            boxes[index].style.setProperty("background-color", "black", "important");
            boxes[index].style.color = "#fff";
            boxes[index].style.border = "4px solid blue"
        }
        else if (boxes[index].innerText === "O") {
            // boxes[index].classList.add("winning-O"); // Add the 'winning-O' class to the box
            boxes[index].style.backgroundColor = "none";
            boxes[index].style.color = "#fff";
            boxes[index].style.border = "4px solid navy"
        }

    });
};