var scheduleSave = [];
var today = moment().format("dddd") + ", " + moment().format("MMMM") + " " + moment().format("Do");

document.getElementById("currentDay").textContent = today;

for (var i = 9; i < 18; i++) {
  // create elements that make up time slots
  var timeLi = $("<li>").addClass("schedule-list row");
  var timeDivLeft = $("<div>").addClass("time-static hour");
  var timePLeft = $("<p>")
    .addClass("time-static-p static-time-" + i)
    .text(i + ":00");
  if (i === 9) {
    var timePLeft = $("<p>")
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

var saveSchedule = function () {
  for (i = 0; i < 9; i++) {
    scheduleSave[i] = document.getElementById("row" + i).textContent;
  }
  localStorage.setItem("scheduleSave", JSON.stringify(scheduleSave));
}

var loadSchedule = function () {
  scheduleSave = JSON.parse(localStorage.getItem("scheduleSave"));
  if (!scheduleSave) {
    scheduleSave = [];
  }

  for (i = 0; i < 9; i++) {
    $("#row" + i).text(scheduleSave[i]);
  }
}


function timeCheck() {
  $(".schedule-list").each(function () {
    if ($(".time-static-p") < moment().format("HH") + ":" + moment().format("mm")) {
      $(".schedule-list").addClass("past");
    } else
      if ($(".time-static-p") === moment().format("HH")) {
        $(".schedule-list").addClass("present");
      } else {
        $(".schedule-list").addClass("future");
      }

  });
};

timeCheck();

setInterval(function () {
  timeCheck();
}, 1800000);

var idStorage;
// task text was clicked
$(".scheduled-activity").on("click", "p", function () {
  // get current text of p element
  var text = $(this)
    .text()
    .trim();

  idStorage = $(this).attr("id");

  // replace p element with a new textarea
  var textInput = $("<textarea>").addClass("form-control").val(text);
  $(this).replaceWith(textInput);

  // auto focus new element
  textInput.trigger("focus");
});

// editable field was un-focused
$(".scheduled-activity").on("blur", "textarea", function () {
  // get current value of textarea
  var textVal = $(this).val();
  console.log(textVal);
  var idTemp = (idStorage.replace("row", ""));
  // update task in array and re-save to localstorage
  scheduleSave[idTemp] = textVal;

  // recreate p element
  var scheduleP = $("<p>")
    .addClass("scheduled-todo")
    .attr("id", idStorage)
    .text(textVal);

  // replace textarea with new content
  $(this).replaceWith(scheduleP);

  saveSchedule();
});

loadSchedule();