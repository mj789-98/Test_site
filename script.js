alert("Hello, world!");
document.getElementById("demo").onmouseover = function() {
  this.style.backgroundColor = "blue";
}
document.getElementById("demo").onmouseout = function() {
  this.style.backgroundColor = "white";
}

const text = document.getElementById('new');
text.addEventListener('mouseenter', () => {
  text.style.color = 'red';
});
text.addEventListener('mouseleave', () => {
  text.style.color = 'blue';
});

function updateClock() {
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();
 
  // Pad the minutes and seconds with leading zeros, if required
  const currentMinutesLeadingZero = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  const currentSecondsLeadingZero = (currentSeconds < 10 ? "0" : "") + currentSeconds;
 
  // Choose either "AM" or "PM" as appropriate
  const timeOfDay = (currentHours < 12) ? "AM" : "PM";
 
  // Convert the hours component to 12-hour format if needed
  currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
 
  // Convert an hours component of "0" to "12"
  currentHours = (currentHours == 0) ? 12 : currentHours;
 
  // Compose the string for display
  const currentTimeString = currentHours + ":" + currentMinutesLeadingZero + ":" + currentSecondsLeadingZero + " " + timeOfDay;
 
  // Update the time display
  document.getElementById("clock").innerHTML = currentTimeString;
}
 
// When the page loads, set up the clock and start it running
window.onload = function() {
  updateClock();
  setInterval(updateClock, 1000);
}



