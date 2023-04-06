// Get the current date and time using Day.js library
var currentDate = dayjs().format('dddd, MMMM D');
var currentTime = dayjs().format('H');

// Display the current date at the top of the calendar
$("#currentDay").text(currentDate);

// Create an array of timeblocks for standard business hours
var timeBlocks = [
  { hour: "9", time: "9AM", },
  { hour: "10", time: "10AM", },
  { hour: "11", time: "11AM", },
  { hour: "12", time: "12PM", },
  { hour: "13", time: "1PM", },
  { hour: "14", time: "2PM", },
  { hour: "15", time: "3PM", },
  { hour: "16", time: "4PM", },
  { hour: "17", time: "5PM", },
];

// Loop through the timeBlocks array and dynamically create timeblock elements
for (var i = 0; i < timeBlocks.length; i++) {
  var timeBlockEl = $("<div>").attr("id", "hour-" + timeBlocks[i].hour).addClass("row time-block");

  var hourEl = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(timeBlocks[i].time);
  var descriptionEl = $("<textarea>").addClass("col-8 col-md-10 description");

  // Set the timeblock's color based on past, present, or future
  if (parseInt(timeBlocks[i].hour) < parseInt(currentTime)) {
    descriptionEl.addClass("past");
  } else if (parseInt(timeBlocks[i].hour) === parseInt(currentTime)) {
    descriptionEl.addClass("present");
  } else {
    descriptionEl.addClass("future");
  }

  var saveBtnEl = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
  var saveIconEl = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");

  // Append elements to the timeBlockEl
  saveBtnEl.append(saveIconEl);
  timeBlockEl.append(hourEl, descriptionEl, saveBtnEl);

  // Append the timeblock element to the container
  $(".container-lg").append(timeBlockEl);
}

// Load saved events from local storage
function loadSavedEvents() {
  for (var i = 0; i < timeBlocks.length; i++) {
    var eventText = localStorage.getItem("event-" + timeBlocks[i].hour);
    if (eventText) {
      $("#hour-" + timeBlocks[i].hour + " .description").val(eventText);
    }
  }
}

// Save the event when the save button is clicked
$(".saveBtn").on("click", function(event) {
  event.preventDefault();
  var hour = $(this).parent().attr("id").replace("hour-", "");
  var eventText = $(this).siblings(".description").val();
  localStorage.setItem("event-" + hour, eventText);
});

// Call the loadSavedEvents function to load any saved events from local storage
loadSavedEvents();
