alert("Hello, world!");
document.getElementById("demo").onmouseover = function() {
  this.style.backgroundColor = "green";
}
document.getElementById("demo").onmouseout = function() {
  this.style.backgroundColor = "";
}

