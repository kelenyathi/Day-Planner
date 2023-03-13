function updateTime() {
  var currentTime = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
  $("#currentDay").text(currentTime);
}

$(document).ready(function() {
  // Update the current time every second
  setInterval(updateTime, 1000);

  // Rest of the code goes here
});

// create timeblocks for standard business hours
var startHour = 9;
var endHour = 17;

for (var i = startHour; i <= endHour; i++) {
// create row for each hour
var hourRow = $("<div>").addClass("row time-block");

// create hour column
var hourCol = $("<div>").addClass("col-1 hour");
var hourText;
if (i < 12) {
hourText = i + "AM";
} else if (i === 12) {
hourText = "12PM";
} else {
hourText = i - 12 + "PM";
}
hourCol.text(hourText);

// create event column
var eventCol = $("<textarea>").addClass("col description");
// set stored event if there is one
var storedEvent = localStorage.getItem("event-" + i);
if (storedEvent) {
eventCol.val(storedEvent);
}

// color-code timeblock based on past, present, or future
if (i < moment().hour()) {
eventCol.addClass("past");
} else if (i === moment().hour()) {
eventCol.addClass("present");
} else {
eventCol.addClass("future");
}

// create save button column
var saveCol = $("<button>").addClass("col-1 saveBtn").html("<i class='fas fa-save'></i>");
saveCol.on("click", function() {
var event = $(this).siblings(".description").val();
var hour = parseInt($(this).siblings(".hour").text());
localStorage.setItem("event-" + hour, event);
});

console.log(hourRow)

// append columns to the row
hourRow.append(hourCol, eventCol, saveCol);

// append row to the container
$(".container").append(hourRow);
}

// set background color of each timeblock based on past, present, or future
$(".description").each(function() {
if ($(this).hasClass("past")) {
$(this).css("background-color", "#d3d3d3");
} else if ($(this).hasClass("present")) {
$(this).css("background-color", "#ff6961");
} else {
$(this).css("background-color", "#77dd77");
}
});

function updateClasses() {
  $(".description").each(function() {
    var hour = parseInt($(this).siblings(".hour").text());
    if (hour < moment().hour()) {
      $(this).removeClass("present future").addClass("past");
    } else if (hour === moment().hour()) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
}

// Call updateClasses every minute
setInterval(updateClasses, 60000);