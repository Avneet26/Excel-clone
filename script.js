let btnContainer = document.querySelector(".add-sheet-btn");
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click", makeActive);

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
}
