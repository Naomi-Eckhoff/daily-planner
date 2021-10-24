var today = moment().format("dddd") + ", " + moment().format("MMMM") + " " + moment().format("Do");

document.getElementById("currentDay").textContent = today;

for (var i = 9; i < 18; i++) {
  // create elements that make up time slots
  var timeLi = $("<li>").addClass("schedule-list");
  var timeDivLeft = $("<div>").addClass("time-static");
  var timePLeft = $("<p>")
    .addClass("time-static-p static-time-" + i)
    .text(i + ":00");
  if (i === 9) {
    var timePLeft = $("<p>")
      .text("0" + i + ":00");
  };
  var timeDivRight = $("<div>").addClass("scheduled-activity");
  var timePRight = $("<p>")
    .addClass("m-1")
    .text("aaaaa");
  timeDivLeft.append(timePLeft);
  timeDivRight.append(timePRight);
  // append span and p element to parent li
  timeLi.append(timeDivLeft, timeDivRight);

  // append to ul list on the page
  $(".time-list").append(timeLi);
}

function timeCheck() {
  $(".schedule-list").each(function () {
    if ($(".time-static-p") < moment().format("HH") + ":" + moment().format("mm")) {
      $(".schedule-list").addClass("overdue");
    }
    setInterval(function () {
      timeCheck();
    }, 1800000);
  });
};

timeCheck();

