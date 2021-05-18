//Steps
// Add value and address for every cell
//1. Formula box -> add event listener
//2. Get the formula
//3. Evaluate the formula -> get value
//4. Get cell address from address bar
//5. Set value in UI and in database


//Remove formula
//1. if on blur value enterd ins not equal to the value in cell
//2. get parents from formula
//3. remove names of children from parent array
//4. clear your formula from database
//When we update formula
//1. if formula enterd is not equal to the entered formula
//same work as above
// set new formula
for (let i = 0; i < allcells.length; i++) {
    allcells[i].addEventListener("blur", function () {
        let data = allcells[i].innerText;
        let address = addressInput.value;
        let rid = allcells[i].getAttribute("rid");
        let cid = allcells[i].getAttribute("cid");
        // let { rid, cid } = getRIDCIDfromAddress(address);
        let cellObject = dbSheet[rid][cid];

        if (cellObject.value == data) {
            return;
        }

        if (cellObject.formula) {
            removeFormula(cellObject, address);
            formulaBar.value = "";
        }

        cellObject.value = data;
        updateChildren(cellObject);
    });
}

formulaBar.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formulaBar.value) {
        let cFormula = formulaBar.value;
        let address = addressInput.value;
        let { rid, cid } = getidFromAddress(address);
        let cellObject = dbSheet[rid][cid];

        if (cFormula != cellObject.formula) {
            removeFormula(cellObject, address);
        }

        let value = evaluateFormula(cFormula);
        setCell(value, cFormula);
        setParentArray(cFormula, address);
    }
});

function evaluateFormula(formula) {
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid } = getidFromAddress(formulaTokens[i]);
            let value = dbSheet[rid][cid].value;
            formulaTokens[i] = value;
        }
    }
    let evalFormula = formulaTokens.join(" ");
    return eval(evalFormula);
}

function setCell(value, formula) {
    let uicellElem = setUiElem();
    uicellElem.innerText = value;
    let { rid, cid } = getidFromAddress(addressInput.value);
    dbSheet[rid][cid].value = value;
    dbSheet[rid][cid].formula = formula;
}

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

function setParentArray(formula, chAddress) {
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid } = getidFromAddress(formulaTokens[i]);
            let parentObj = dbSheet[rid][cid];
            console.log(parentObj);
            parentObj.children.push(chAddress);
        }
    }
}

function updateChildren(cellObject) {
    console.log(cellObject);
    let children = cellObject.children;
    for (let i = 0; i < children.length; i++) {
        // children name
        let chAddress = children[i];
        let { rid, cid } = getidFromAddress(chAddress);
        // 2d array
        let childObj = dbSheet[rid][cid];
        // get formula of children
        let chFormula = childObj.formula;
        let newValue = evaluateFormula(chFormula);
        SetChildrenCell(newValue, chFormula, rid, cid);
        updateChildren(childObj);
    }
}
function SetChildrenCell(value, formula, rid, cid) {
    // let uicellElem = findUICellElement();
    // db update
    let uiCellElement = document.querySelector(
        `.cell[rid="${rid}"][cid="${cid}"]`
    );
    uiCellElement.innerText = value;
    dbSheet[rid][cid].value = value;
    dbSheet[rid][cid].formula = formula;
}

function removeFormula(cellObject, myVal) {
    let formula = cellObject.formula;
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid } = getidFromAddress(formulaTokens[i]);
            let parentObj = dbSheet[rid][cid];
            let idx = parentObj.children.indexOf(myVal);
            parentObj.children.splice(idx, 1);
        }
    }
    cellObject.formula = "";
}
