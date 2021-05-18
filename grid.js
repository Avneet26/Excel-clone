//Add 1 to 100 rows
let leftCol = document.querySelector(".left-row");
let addressInput = document.querySelector(".address-input");
let bold = document.querySelector(".bold");
let underline = document.querySelector(".underline");
let italic = document.querySelector(".italic");
let alignBtns = document.querySelectorAll(".align-container *");
let formulaBar = document.querySelector(".formula-input");
let fontColor = document.querySelector(".font-color");
let fontSelect = document.querySelector(".font-family");
let fontSizeSelect = document.querySelector(".font-size");
let bgColorSelect = document.querySelector(".cell-color");

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
        cells.setAttribute("spellcheck", "false");
        row.appendChild(cells);
        //sath ke sath add event listener to every cell
        cells.addEventListener("click", handleCellClick);
    }
    grid.appendChild(row);
}
let btnContainer = document.querySelector(".add-sheet-btn");
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet");
let sheetArray = [];
let dbSheet;
firstSheet.addEventListener("click", makeActive);
firstSheet.click();

btnContainer.addEventListener("click", function () {
    //get all sheets
    let AllSheets = document.querySelectorAll(".sheet");
    //get index of last sheet
    let lastSheet = AllSheets[AllSheets.length - 1];
    let Lastindx = lastSheet.getAttribute("idx");
    Lastindx = Number(Lastindx);
    //create new sheet
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    //add its index
    NewSheet.setAttribute("idx", `${Lastindx + 1}`);
    NewSheet.innerText = `Sheet ${Lastindx + 2}`;
    //add sheet to page
    sheetList.appendChild(NewSheet);
    //remove active class from all
    for (let i = 0; i < AllSheets.length; i++) {
        AllSheets[i].classList.remove("active");
    }
    //add active class to the new page
    NewSheet.classList.add("active");
    createSheet();
    dbSheet = sheetArray[Lastindx + 1];
    //add eventlistener to the new page side by side
    NewSheet.addEventListener("click", makeActive);
});

function makeActive(e) {
    //current target gets the sheet  which is clicked
    let sheet = e.currentTarget;
    //remove active class from all sheets
    let AllSheets = document.querySelectorAll(".sheet");
    for (let i = 0; i < AllSheets.length; i++) {
        AllSheets[i].classList.remove("active");
    }
    //add active class to clicked sheet
    sheet.classList.add("active");

    let idx = sheet.getAttribute("idx");
    if (!sheetArray[idx]) {
        createSheet();
    }
    dbSheet = sheetArray[idx];
    setUI();
}
function createSheet() {
    let NewDB = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let cell = {
                bold: "normal",
                italics: "normal",
                underline: "none",
                hAlign: "center",
                fontFamily: "Roboto",
                fontSize: "16px",
                color: "#000000",
                bColor: "#ffffff",
                value: "",
                formula: "",
                children: [],
            };
            let elem = document.querySelector(
                `.grid .cell[rid='${i}'][cid='${j}']`
            );
            elem.innerText = "";
            row.push(cell);
        }
        NewDB.push(row);
    }
    sheetArray.push(NewDB);
}

function setUI() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let elem = document.querySelector(
                `.grid .cell[rid='${i}'][cid='${j}']`
            );
            let value = dbSheet[i][j].value;
            elem.innerText = value;
        }
    }
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
    if (cellObj.formula) {
        formulaBar.value = cellObj.formula;
    } else {
        formulaBar.value = "";
    }
    fontSelect.value = cellObj.fontFamily;
    fontSizeSelect.value = cellObj.fontSize;
    fontColor.value = cellObj.color;
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

//alignment
for (let i = 0; i < alignBtns.length; i++) {
    alignBtns[i].addEventListener("click", function () {
        let allignment = alignBtns[i].getAttribute("class");
        let uiElem = setUiElem();
        let rid = uiElem.getAttribute("rid");
        let cid = uiElem.getAttribute("cid");
        let cellObj = dbSheet[rid][cid];
        uiElem.style.textAlign = allignment;
        cellObj.hAlign = allignment;
        
    });
}

//font-size

fontSizeSelect.addEventListener("change",function(){
    let fontSize = fontSizeSelect.value;
    let uiElem = setUiElem();
    let rid = uiElem.getAttribute("rid");
    let cid = uiElem.getAttribute("cid");
    let cellObj = dbSheet[rid][cid];

    uiElem.style.fontSize = fontSize;
    cellObj.fontSize = fontSize;
})

//font-famiy

fontSelect.addEventListener("change",function(){
    let font = fontSelect.value;
    let uiElem = setUiElem();
    let rid = uiElem.getAttribute("rid");
    let cid = uiElem.getAttribute("cid");
    let cellObj = dbSheet[rid][cid];

    uiElem.style.fontFamily = font;
    cellObj.fontFamily = font;
})

//text-color

fontColor.addEventListener("change",function(){
    let color = fontColor.value;
    let uiElem = setUiElem();
    let rid = uiElem.getAttribute("rid");
    let cid = uiElem.getAttribute("cid");
    let cellObj = dbSheet[rid][cid];

    uiElem.style.color = color;
    cellObj.color = color;
})

//cell color

bgColorSelect.addEventListener("change",function(){
    let color = bgColorSelect.value;
    let uiElem = setUiElem();
    let rid = uiElem.getAttribute("rid");
    let cid = uiElem.getAttribute("cid");
    let cellObj = dbSheet[rid][cid];

    uiElem.style.backgroundColor = color;
    cellObj.bColor = color;
    console.log(cellObj);
})