
var categorySelect = document.querySelector("#categorySelect"); 
var subCatSelect = document.querySelector("#subCatSelect"); 
var couchSizeContainer = document.querySelector("#couchSizeContainer"); 

var subCats = {
    "Tafels" : ["salontafel", "Eettafel", "bijzettafel", "Hoektafel"],
    "Banken en bankstellen" : ["hoekbank", "bankstel", "Hoektafel"],
}; 


categorySelect.addEventListener("change", function(){

    selectedVal = categorySelect.options[categorySelect.selectedIndex].value; 
    var values = Object.keys(subCats); 
    for(i=0; i<values.length; i++){
        if(values[i]==selectedVal){
            subCatSelect.innerHTML = '';
                subCats[values[i]].forEach(function(item){
                    subCatSelect.innerHTML += '<option name="' + item + '">' + item + '</option>';  
                });
        } 
    };
if(selectedVal != "Banken en bankstellen"){
    couchSizeContainer.style.display = "none"
}else{
    couchSizeContainer.style.display = "block"
}
    
}); 




