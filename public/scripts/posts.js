window.onload=function(){
var newPostBtn = document.getElementById("add-Post_Btn"); 
var overlay= document.querySelector(".overlay");0
var closeBtn = document.querySelector(".fa-times-circle"); 



newPostBtn.addEventListener("click", function(){
    overlay.style.display = "block";
});

closeBtn.addEventListener("click", function(){
    overlay.style.display = "none";
});






  }