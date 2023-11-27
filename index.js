const container = document.getElementById("container");

// var holdingList = [
//     ["X", "O", "X"],
//     ["O", "X", "X"],
//     ["X", "O", "X"],
// ];

var playerTurn = 1;

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

// // This function updates all the boxes to show to values held in the list.
// function updateScreen(){
//     holdingList.forEach((row, i) => {
//         row.forEach((box, j) => {
//             getBox(i, j).innerHTML = box
//         })
//     })
//     return true
// }

function boxClicked(boxID){
    const box = document.getElementById(boxID)
    const boxData = getDetailsFromString(boxID)

    if(playerTurn === 1){
        // It is player 1's turn to play (Xs)
        box.innerHTML = "X"
        // Prevent users from being able to click that box again
        box.onclick = null
        // Update the list values 
        holdingList[boxData.row][boxData.box] = "X"
        // Switch to the next player
        playerTurn += 1
    }else{
        // It is player 2's turn to play (Os)
        box.innerHTML = "O"
        // Prevent users from being able to click that box again
        box.onclick = null
        // Update the list values
        holdingList[boxData.row][boxData.box] = "O"
        // Switch to the next player
        playerTurn -= 1
    }
    checkWinner()
}

function checkWinner(){
    // Check for three in a row
    for (let i = 0; i < 3; i++) {
        // Gets a row from the holding list and checks if all values in it are the same
        if(holdingList[i][0] === holdingList[i][1] && holdingList[i][1] === holdingList[i][2]){
            return console.log("WINNER IN ROW"+i)
        }

        // Gets the columns in the holding list and checks if the values are all the same
        if(holdingList[0][i] === holdingList[1][i] && holdingList[1][i] === holdingList[2][i]){
            return console.log("WINNER IN COL"+i)
        }
        
    }

    // Check diagonal top left to bottom right
    if(holdingList[0][0] === holdingList[1][1] && holdingList[1][1] === holdingList[2][2]){
        return console.log("WINNER DIAG TL BR")
    }

    // Check diagonal bottom left to top right
    if(holdingList[2][0] === holdingList[1][1] && holdingList[1][1] === holdingList[0][2]){
        return console.log("WINNER DIAG BL TR")
    }
}