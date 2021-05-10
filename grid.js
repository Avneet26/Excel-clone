let leftCol = document.querySelector(".left-row");
let rows = 100;
for (let i = 1;i <= 100;i++) {
    let rowsNo = document.createElement("div");
    rowsNo.innerText = i;
    rowsNo.classList.add("box");
    leftCol.appendChild(rowsNo);
}
let topRow = document.querySelector(".top-row");
let cols = 26;
for(let i = 65;i<=90;i++){
    let colNo = document.createElement("div");
    //get ascci code of A to Z
    colNo.innerText = String.fromCharCode(i);
    colNo.classList.add("cell");
    topRow.appendChild(colNo);
}
let grid = document.querySelector('.grid');
for(let i=0;i<100;i++){
    let row = document.createElement('div');
    row.setAttribute("class","row");
    for(let j=65;j<=90;j++){
        let cells = document.createElement("div");
        cells.setAttribute("class","cell");
        cells.innerText = `${String.fromCharCode(j)}${i+1}`;
        row.appendChild(cells);
    }
    grid.appendChild(row);
}