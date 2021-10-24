var today = moment().format("dddd") + ", " + moment().format("MMMM") + " " + moment().format("d");

switch (moment().format("d")) {
  case "1":
    today += "st";
    break;
  case "2":
    today += "nd";
    break;
  case "3":
    today += "rd";
    break;
  default:
    today += "th";
    break;
}

document.getElementById("currentDay").textContent = today;