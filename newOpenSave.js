let save = document.querySelector(".download");
let open = document.querySelector(".open");

save.addEventListener("click",function(){
    
    const data = JSON.stringify(dbSheet);
    const blob = new Blob([data],{type: 'application/json'});
    const url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = "file.json";
    a.href = url;
    a.click(); 
})

open.addEventListener("change",function(){
    let filesArray = open.files;
    let filesObj = filesArray[0];
    let fr = new FileReader(filesObj);
    fr.readAsText(filesObj);
    fr.onload = function(){
        console.log(fr.result);
    }
})