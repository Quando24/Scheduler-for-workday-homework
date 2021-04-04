// Display current time in the header; use moment.js 
var Today = moment().format('MMMM Do YYYY, h:mm:ss a');
//use a query selector for html's string that im going to set for the header; id = currentday in html 
$("#currentDay").text(Today);
// Look through the html to see what times need to be grey, green, and red; use a for loop 
function hourCheck() {
  var currentHour = moment().hour()
  for (i = 9; i < 18; i++) {
    var totalHours = $('#clock-' + i);
    console.log(totalHours);
    // Inside the for loop, use if statements in order to match up time with colors 
    if (currentHour > i) {
      $(totalHours).addClass("past");
    } else if (currentHour === i) {
      $(totalHours).addClass("present");
    } else {
      $(totalHours).addClass("future");
    }
  }
}

timeperiods = [];

// Then create buttons to save the input; remember event listeners or query selectors 
$(".timeblocks").on("click", "p", function () {
  var text = $(this).text().trim();
  var textInput = $("<textarea>").addClass('form-control').val(text);
  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});
$(".timeblocks").on("blur", "textarea", function () {
  var text = $(this)
  .val()
  .trim();
  var timeP = $("<p>")
    .addClass("timeItem")
    .text(text);
  $(this).replaceWith(timeP);
});

// Then use local storage; need another query selector for each field for the user to type in 
// after the buttons are clicked, it will save to local storage 
$(".saveBtn").on("click", function () {
  var index = $(".saveBtn").index(this);
  timeperiods[index] = $(this).parent().find(".timeItem").text();
  localStorage.setItem("timeperiods", JSON.stringify(timeperiods));
});
var loadTimePeriods = function () {
  timeperiods = JSON.parse(localStorage.getItem('timeperiods'))
  if (!timeperiods) {
    timeperiods = {};
  };
  printTimePeriods(timeperiods)
}
var printTimePeriods = function () {
  $.each(timeperiods, function (list, arr) {
    var timeP = $('<p>').addClass('description time-item' + list).text(arr)
    $('#time-item-' + list).replaceWith(timeP);
  })
};
setInterval(function () {
  hourCheck();
}, 1000 * 60 * 60);

loadTimePeriods();
hourCheck();