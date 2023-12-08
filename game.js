// Gets the data about players from the previous page
const urlData = new URLSearchParams(window.location.search)

// If there is no player information, send the user to input it
if((!urlData.has("player1") || !urlData.has("player2")) || (!urlData.get("player1") || !urlData.get("player2"))){
    window.location.replace("/")
}

const playerData = [null, urlData.get("player1"), urlData.get("player2")]

const container = document.getElementById("container");
const playerTurnDisplay = document.getElementById("turnDisplay");

var playerTurn = 1;
playerTurnDisplay.innerHTML = `It's your turn, ${playerData[playerTurn]}`

var holdingList = [[], [], []];

// Creates the three rows
for (let i = 0; i < 3; i++) {
    var row = document.createElement("div")
    row.className = "flex my-4"
    row.id = `r${i}`
    // Creates the boxes in each row
    for (let j = 0; j < 3; j++) {
        var box = document.createElement("div")
        box.className = "bg-slate-200 h-48 w-48 mx-2 text-6xl flex items-center justify-center cursor-pointer select-none"
        box.id = `r${i}b${j}`
        // box.innerHTML = box.id
        // When the box is clicked, it calls this function and passes the box's id
        // box.onclick = boxClicked(box.id)
        box.onclick = function (){boxClicked(`r${i}b${j}`)}
        row.appendChild(box)   
    }
    container.appendChild(row)
}

// Gets the box element given the row and the box in the row
function getBox(rowNum, boxNum){
    return document.getElementById(`r${rowNum}b${boxNum}`)
}

// Parses the details from the id of each box
function getDetailsFromString(string){
    let data = {};
    data.row = parseInt(string.split("r")[1].split("b")[0])
    data.box = parseInt(string.split("b")[1])
    return data
}

function boxClicked(boxID){
    const box = document.getElementById(boxID)
    const boxData = getDetailsFromString(boxID)

    if(playerTurn === 1){
        // It is player 1's turn to play (Xs)
        box.innerHTML = "X"
        // Prevent users from being able to click that box again
        box.onclick = null
        box.classList.remove("cursor-pointer")
        // Update the list values 
        holdingList[boxData.row][boxData.box] = "X"
        // Switch to the next player
        playerTurn += 1
    }else{
        // It is player 2's turn to play (Os)
        box.innerHTML = "O"
        // Prevent users from being able to click that box again
        box.onclick = null
        box.classList.remove("cursor-pointer")
        // Update the list values
        holdingList[boxData.row][boxData.box] = "O"
        // Switch to the next player
        playerTurn -= 1
    }
    playerTurnDisplay.innerHTML = `It's your turn, ${playerData[playerTurn]}`
    checkWinner()
}

function checkWinner(){
    // Check for three in a row
    for (let i = 0; i < 3; i++) {

        // Gets a row from the holding list and checks if all values in it are the same
        if(holdingList[i][0] === holdingList[i][1] && holdingList[i][1] === holdingList[i][2]){
            // Ensure that it cannot be marked as correct if there is a row of empty boxes by checking to make sure one of them has text
            if(!holdingList[i][0]) continue
            return win("row", i)
        }

        // Gets the columns in the holding list and checks if the values are all the same
        if(holdingList[0][i] === holdingList[1][i] && holdingList[1][i] === holdingList[2][i]){
            // Ensure that it cannot be marked as correct if there is a row of empty boxes by checking to make sure one of them has text
            if(!holdingList[0][i]) continue
            return win("column", i)
        }
        
    }

    // Check diagonal top left to bottom right
    if(holdingList[0][0] === holdingList[1][1] && holdingList[1][1] === holdingList[2][2]){
        // Ensure that it cannot be marked as correct if there is a row of empty boxes by checking to make sure one of them has text
        if(!holdingList[0][0]) return
        return win("diagonal", 0)
    }

    // Check diagonal bottom left to top right
    if(holdingList[2][0] === holdingList[1][1] && holdingList[1][1] === holdingList[0][2]){
        // Ensure that it cannot be marked as correct if there is a row of empty boxes by checking to make sure one of them has text
        if(!holdingList[1][1]) return
        return win("diagonal", 1)
    }
}

function win(inWhat, where){
    var winner = 0
    if(inWhat === "row"){
        if(holdingList[where][0] === "X"){
            winner = 1
        }else{
            winner = 2
        }
        for (let i = 0; i < 3; i++) {
            document.getElementById(`r${where}b${i}`).classList.replace("bg-slate-200", "bg-yellow-200")
        }
    }

    if(inWhat === "column"){
        if(holdingList[0][where] === "X"){
            winner = 1
        }else{
            winner = 2
        }
        for (let i = 0; i < 3; i++) {
            document.getElementById(`r${i}b${where}`).classList.replace("bg-slate-200", "bg-yellow-200")
        }
    }

    if(inWhat === "diagonal"){
        if(holdingList[1][1] === "X"){
            winner = 1
        }else{
            winner = 2
        }
        if(where === 0){
            document.getElementById(`r0b0`).classList.replace("bg-slate-200", "bg-yellow-200")
            document.getElementById(`r1b1`).classList.replace("bg-slate-200", "bg-yellow-200")
            document.getElementById(`r2b2`).classList.replace("bg-slate-200", "bg-yellow-200")
        }
        if(where === 1){
            document.getElementById(`r2b0`).classList.replace("bg-slate-200", "bg-yellow-200")
            document.getElementById(`r1b1`).classList.replace("bg-slate-200", "bg-yellow-200")
            document.getElementById(`r0b2`).classList.replace("bg-slate-200", "bg-yellow-200")
        }
    }

    playerTurnDisplay.innerHTML = `${playerData[winner]} has won! Click here to play again.`
    playerTurnDisplay.classList.add("cursor-pointer")
    playerTurnDisplay.onclick = () => {window.location.reload()}

    // Disable all the boxes to stop the game continuing
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            var box = document.getElementById(`r${i}b${j}`)
            box.onclick = null
            box.classList.remove("cursor-pointer")
        }
    }

}
