const container = document.getElementById("container");

var holdingList = [
    ["X", "O", "O"],
    ["O", "X", "X"],
    ["X", "O", "X"],
];

// Creates the three rows
for (let i = 0; i < 3; i++) {
    var row = document.createElement("div")
    row.className = "flex my-4"
    // Creates the boxes in each row
    for (let j = 0; j < 3; j++) {
        var box = document.createElement("div")
        box.className = "bg-slate-200 h-48 w-48 mx-2 text-6xl flex items-center justify-center cursor-pointer"
        box.id = `r${i}b${j}`
        box.innerHTML = box.id
        // box.onclick = myFunkyFunction
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

function updateScreen(){
    holdingList.forEach((row, i) => {
        row.forEach((box, j) => {
            // console.log(box)
            getBox(i, j).innerHTML = box
        })
    })
    return true
}