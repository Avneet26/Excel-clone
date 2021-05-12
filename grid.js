//Add 1 to 100 rows
let leftCol = document.querySelector(".left-row");
let addressInput = document.querySelector(".address-input");
let bold = document.querySelector(".bold");
let underline = document.querySelector(".underline");
let italic = document.querySelector(".italic");
let alignBtns = document.querySelectorAll(".align-container *");

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

let dbSheet = [];
for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
        let cell = {
            bold: "normal",
            italics: "normal",
            underline: "none",
            hAlign: "center",
            fontFamily: "sans-serif",
            fontSize: "16",
            color: "black",
            bgColor: "white",
        };
        row.push(cell);
    }
    dbSheet.push(row);
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

    //Cell ki properties check krke menu vale button ko handle kro
    let cellObj = dbSheet[rid][cid];
    if (cellObj.bold == "normal") {
        bold.classList.remove("active-btn");
    } else {
        bold.classList.add("active-btn");
    }
    if (cellObj.underline == "none") {
        underline.classList.remove("active-btn");
    } else {
        underline.classList.add("active-btn");
    }
    if (cellObj.italics == "normal") {
        italic.classList.remove("active-btn");
    } else {
        italic.classList.add("active-btn");
    }
    if (cellObj.hAlign == "center") {
        document.querySelector(".center").classList.add("active-btn");
    }
}

//excel me first cell clicked hota hai already
allcells[0].click();

// ***********Formatting code***********

bold.addEventListener("click", function () {
    let uielem = setUiElem();
    let rid = uielem.getAttribute("rid");
    let cid = uielem.getAttribute("cid");
    let cellObj = dbSheet[rid][cid];
    console.log(cellObj);
    if (cellObj.bold == "normal") {
        setUiElem().style.fontWeight = "bold";
        cellObj.bold = "bold";
        bold.classList.add("active-btn");
    } else {
        bold.classList.remove("active-btn");
        setUiElem().style.fontWeight = "normal";
        cellObj.bold = "normal";
    }
});

underline.addEventListener("click", function () {
    let uielem = setUiElem();
    let rid = uielem.getAttribute("rid");
    let cid = uielem.getAttribute("cid");
    let cellObj = dbSheet[rid][cid];
    console.log(cellObj);
    if (cellObj.underline == "none") {
        setUiElem().style.textDecoration = "underline";
        cellObj.underline = "underline";
        underline.classList.add("active-btn");
    } else {
        setUiElem().style.textDecoration = "none";
        cellObj.underline = "none";
        underline.classList.remove("active-btn");
    }
});

italic.addEventListener("click", function () {
    let uielem = setUiElem();
    let rid = uielem.getAttribute("rid");
    let cid = uielem.getAttribute("cid");
    let cellObj = dbSheet[rid][cid];
    console.log(cellObj);
    if (cellObj.italics == "normal") {
        setUiElem().style.fontStyle = "italic";
        cellObj.italics = "italic";
        italic.classList.add("active-btn");
    } else {
        setUiElem().style.fontStyle = "normal";
        cellObj.italics = "normal";
        italic.classList.remove("active-btn");
    }
});

function setUiElem() {
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

for (let i = 0; i < alignBtns.length; i++) {
    alignBtns[i].addEventListener("click", function () {
        let allignment = alignBtns[i].getAttribute("class");
        let uiElem = setUiElem();
        uiElem.style.textAlign = allignment;
    });
}
