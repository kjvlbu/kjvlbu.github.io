var selectedNum = null;
var selectedTile = null;

var errors = 0;

var board = [
    "45-------",
    "--2-7-63-",
    "-------28",
    "---95----",
    "-86---2--",
    "-2-6--75-",
    "------476",
    "-7--45---",
    "--8--9---"
]

var solution = [
    "453826197",
    "892571634",
    "167493528",
    "714952863",
    "586137249",
    "329684751",
    "935218476",
    "671345982",
    "248769315"
]

window.onload = function () {
    var display = document.getElementById("timer");
    startTimer(600, display);
    startGame();
}

function startGame() {
    for(let i=1; i<=9; i++) {
        let number = document.createElement("div"); 
        number.id = i;
        number.innerText = i;
        number.classList.add("number");
        number.addEventListener("click", selectNumber);
        document.getElementById("digits").appendChild(number);
    }

    for (let b=0; b<9; b++){
        for (let c=0; c<9; c++){
            let tile = document.createElement("div");
            tile.id = b.toString() + "-" + c.toString();
            if (board[b][c] != "-" ) {
                tile.innerText = board[b][c];
                tile.classList.add("tile-start");
            }
            if (b == 2 || b == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.classList.add("tile");
            tile.addEventListener("click", selectTile);
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (selectedNum != null){
        selectedNum.classList.remove("numberSelected");
    }
    selectedNum = this;
    selectedNum.classList.add("numberSelected");
}

/* function selectTile() {
    if(selectedNum) {
        if (this.innerText != ""){
            return;
        }
        this.innerText = selectedNum.id;
        let coords = this.id.split("-");
        let b = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[b][c] == selectedNum.id) {
            this.innerText = selectedNumber.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
} */

function selectTile() {
    if (selectedNum) {
        if (!this.classList.contains("tile-start")) { // Check if the tile is not a tile-start
            let coords = this.id.split("-");
            let b = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            if (this.innerText === selectedNum.id) {
                this.innerText = "";
                if (solution[b][c] !== selectedNum.id) {
                    errors = Math.max(0, errors - 1);
                    document.getElementById("errors").innerText = errors;
                }
            } else {
                this.innerText = selectedNum.id; 
                if (solution[b][c] !== selectedNum.id) {
                    errors += 1;
                    document.getElementById("errors").innerText = errors;
                }
            }
        }
    }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (timer <= 0) {
            clearInterval(countdown);
            window.location.reload();
        }
        timer--;
    }, 1000);
}
