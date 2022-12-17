alert("Hello, world!");
document.getElementById("demo").onmouseover = function() {
  this.style.backgroundColor = "red";
}
document.getElementById("demo").onmouseout = function() {
  this.style.backgroundColor = "";
}

