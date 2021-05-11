//Add 1 to 100 rows
let leftCol = document.querySelector(".left-row");
let addressInput = document.querySelector(".address-input");
let bold = document.querySelector(".bold");
let underline = document.querySelector(".underline");
let italic = document.querySelector(".italic")

let rows = 100;
for (let i = 1; i <= 100; i++) {
    let rowsNo = document.createElement("div");
    rowsNo.innerText = i;
    rowsNo.classList.add("box");
    leftCol.appendChild(rowsNo);
}
//Add A to Z columns
let topRow = document.querySelector(".top-row");
let cols = 26;
for (let i = 65; i <= 90; i++) {
    let colNo = document.createElement("div");
    //get ascci code of A to Z
    colNo.innerText = String.fromCharCode(i);
    colNo.classList.add("cell");
    topRow.appendChild(colNo);
}
//Add 100*26 grid
let grid = document.querySelector(".grid");
for (let i = 0; i < 100; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j <= 26; j++) {
        let cells = document.createElement("div");
        cells.setAttribute("class", "cell");
        // cells.innerText = `${String.fromCharCode(j)}${i+1}`;
        cells.setAttribute("rid", i);
        cells.setAttribute("cid", j);
        cells.setAttribute("contenteditable", "true");
        row.appendChild(cells);
        //sath ke sath add event listener to every cell
        cells.addEventListener("click", handleCellClick);
    }
    grid.appendChild(row);
}

let allcells = document.querySelectorAll(".grid .cell");

function handleCellClick(e) {
    //currentTarget btaega ke konsa cell click hua hai
    let cell = e.currentTarget;
    //cell ka row and col utha lao
    let rid = cell.getAttribute("rid");
    rid = Number(rid);
    let cid = cell.getAttribute("cid");
    cid = Number(cid);
    let address = `${String.fromCharCode(65 + cid)}${rid + 1}`;
    //address input me row and col ki value daal do
    document.querySelector(".address-input").value = address;
    for (let i = 0; i < allcells.length; i++) {
        allcells[i].classList.remove("active-cell");
    }
    cell.classList.add("active-cell");
}

//excel me first cell clicked hota hai already
allcells[0].click();

bold.addEventListener("click", function () {
    setUiElem().style.fontWeight = "bold";
});
underline.addEventListener("click", function () {
    setUiElem().style.textDecoration = "underline";
});
italic.addEventListener("click", function () { 
    setUiElem().style.fontStyle = "italic";
});

function setUiElem(){
    let address = addressInput.value;
    let riciObj = getidFromAddress(address);
    let rid = riciObj.rid;
    let cid = riciObj.cid;
    let uiCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    return uiCell;
}

function getidFromAddress(address) {
    let cid = Number(address.charCodeAt(0)) - 65;
    let rid = Number(address.slice(1)) - 1;
    return { rid, cid };
}
