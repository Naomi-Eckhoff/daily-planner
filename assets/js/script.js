var scheduleSave = [];
var today = moment().format("dddd") + ", " + moment().format("MMMM") + " " + moment().format("Do");

document.getElementById("currentDay").textContent = today;

for (var i = 9; i < 18; i++) {
  //creates elements that make up time slots
  var timeLi = $("<li>").addClass("schedule-list row");
  var timeDivLeft = $("<div>").addClass("time-static hour");
  var timePLeft = $("<p>")
    .addClass("time-static-p static-time-" + i)
    .text(i + ":00");
  //This just keeps formatting the same. I felt it was important
  if (i === 9) {
    var timePLeft = $("<p>")
      .addClass("time-static-p static-time-" + i)
      .text("0" + i + ":00");
  };
  var timeDivRight = $("<div>").addClass("scheduled-activity time-block");
  var timePRight = $("<p>")
    .addClass("scheduled-todo textarea")
    .attr("id", "row" + (i - 9))
    .text("Placeholder text");
  timeDivLeft.append(timePLeft);
  timeDivRight.append(timePRight);
  // append span and p element to parent li
  timeLi.append(timeDivLeft, timeDivRight);

  // append to ul list on the page
  $(".time-list").append(timeLi);
}

//saves the schedule to local storage
var saveSchedule = function () {
  for (i = 0; i < 9; i++) {
    scheduleSave[i] = document.getElementById("row" + i).textContent;
  }
  localStorage.setItem("scheduleSave", JSON.stringify(scheduleSave));
}

//loads the schedule from local storage
var loadSchedule = function () {
  scheduleSave = JSON.parse(localStorage.getItem("scheduleSave"));
  if (!scheduleSave) {
    scheduleSave = [];
  }

  for (i = 0; i < 9; i++) {
    $("#row" + i).text(scheduleSave[i]);
  }
}

//checks to see if things are upcoming or already passed. The present doesn't exist for long.
function timeCheck() {
  $(".schedule-list").each(function () {
    if ((this.outerText) < moment().format("HH") + ":" + moment().format("mm")) {
      $(this).addClass("past");
    }
    if ((this.outerText) == moment().format("HH") + ":00") {
      $(this).addClass("present");
    }
    if ((this.outerText) > moment().format("HH") + ":" + moment().format("mm")) {
      $(this).addClass("future");
    }
  });
};

timeCheck();
//rechecks the time every 10 minutes
setInterval(function () {
  timeCheck();
}, 600000);

var idStorage;
//Allows clicking on the schedule boxes
$(".scheduled-activity").on("click", "p", function () {
  var text = $(this)
    .text()
    .trim();

  idStorage = $(this).attr("id");

  var textInput = $("<textarea>").addClass("form-control").val(text);
  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

//Moves the edit in the schedule onto the schedule
$(".scheduled-activity").on("blur", "textarea", function () {
  var textVal = $(this).val();
  console.log(textVal);
  var idTemp = (idStorage.replace("row", ""));
  scheduleSave[idTemp] = textVal;

  var scheduleP = $("<p>")
    .addClass("scheduled-todo")
    .attr("id", idStorage)
    .text(textVal);
  $(this).replaceWith(scheduleP);
  //saves the schedule after alteration
  saveSchedule();
});

//initial load of the schedule
loadSchedule();