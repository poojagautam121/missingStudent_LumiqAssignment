var studentID = 0;
var studentIDInQueue = 0;
var missingStuID = 0;

function AddStudentRow() {
  if (studentID == 0) {
    createStudentNameRow();
  } else {
    $("#studentRow").empty();
    studentID = 0;
    createStudentNameRow();
  }
}

function createStudentNameRow() {
  $(".disableButton").attr("disabled", true);
  $("#noOfStudents").removeClass("inputAlertStatus");
  $("#spanHideShow").hide();

  let count = $("#noOfStudents").val();

  if (count != "" && !isNaN(count) && count != 0) {
    for (var i = 0; i < count; i++) {
      studentID++;
      var objTo = document.getElementById("studentRow");
      var divtest = document.createElement("div");
      divtest.innerHTML = ` <div class="col-md-4 margin10px" 
                :</div> <label for="validationCustom02" class="form-label">Student ${studentID} Name</label> 
                <input type="text" class="form-control" id=student_${studentID} value="" required>
                <div class="valid-feedback"></div></div>
                `;

      objTo.appendChild(divtest);
    }
  } else if (count != "" && isNaN(count)) {
    $("#noOfStudents").addClass("inputAlertStatus");
    $("#spanHideShow").text("Please enter digits only");
    $("#spanHideShow").show();
  } else {
    $("#noOfStudents").addClass("inputAlertStatus");
    $("#spanHideShow").text("Field is required");
    $("#spanHideShow").show();
  }
}

function AddStudentInQueue() {
  studentIDInQueue++;
  if (studentIDInQueue <= studentID) {
    $(".disbledQueueButton").attr("disbaled", false);
    $("#span_queue").hide();
    var objTo = document.getElementById("studentInQueue");
    var divtest = document.createElement("div");
    divtest.innerHTML = ` <div class="col-md-4 margin10px" 
              :</div> <label for="validationCustom02" class="form-label">Name of Student ${studentIDInQueue} in Queue</label> 
              <input type="text" class="form-control" id=studentInQueue_${studentIDInQueue} value="" required>
              <div class="valid-feedback"></div></div>
              `;

    objTo.appendChild(divtest);
  } else {
    $(".disbledQueueButton").attr("disbaled", true);
    $("#span_queue").text("Cant add more student in queue");
    $("#span_queue").show();
  }
}

$(document).ready(function () {
  $("#noOfStudents").removeClass("inputAlertStatus");
  $("#spanHideShow").hide();
  $("#span_queue").hide();
  $("#span_missing").hide();

  $("#noOfStudents").keypress(function (e) {
    console.log("==keypress==");
    $("#noOfStudents").removeClass("inputAlertStatus");
    $("#spanHideShow").hide();
    $(".disableButton").attr("disabled", false);
    $("#studentRow").empty();
    studentID = 0;
  });
});

function missingStudent() {
  if (missingStuID == 0) {
    missingStudentExist();
  } else {
    $("#missingStudents").empty();
    missingStuID = 0;
    missingStudentExist();
  }
}

function missingStudentExist() {
  let names = [];
  let queues = {};
  let count = $("#noOfStudents").val();
  for (var i = 1; i <= count; i++) {
    console.log($(`#student_${i}`).val());
    if ($(`#student_${i}`).val() != "") {
      names.push($(`#student_${i}`).val());
    }
  }
  for (let j = 1; j <= studentIDInQueue; j++) {
    if ($(`#studentInQueue_${j}`).val() != "") {
      queues[$(`#studentInQueue_${j}`).val()] = 1;
    }
  }

  if (names.length == 0 && Object.keys(queues).length === 0) {
    $("#span_missing").text("Please enter student's name (also in queue)");
    $("#span_missing").show();
  } else if (names.length == 0) {
    $("#span_missing").text("Please enter all student's name");
    $("#span_missing").show();
  } else if (Object.keys(queues).length === 0) {
    $("#span_missing").text("Please add student's name in queue list ");
    $("#span_missing").show();
  } else {
    missingStudentAJXCall(count, names, queues);
  }
}

function showMissingStudentRow(response) {
  if (response.data.length > 0) {
    for (var i = 0; i < response.data.length; i++) {
      missingStuID++;
      var objTo = document.getElementById("missingStudents");
      var divtest = document.createElement("div");
      divtest.innerHTML = ` <div class="col-md-6 margin10px" 
                :</div> <label for="validationCustom02" class="form-label">Missing Student ${missingStuID} Name</label> 
                <input type="text" class="form-control" id=student_${missingStuID} value="${response.data[i]}" required>
                <div class="valid-feedback"></div></div>
                `;

      objTo.appendChild(divtest);
    }
  } else {
    var objTo = document.getElementById("missingStudents");
    var divtest = document.createElement("div");
    divtest.innerHTML = ` <h3>No Student is missing </h3>
      `;

    objTo.appendChild(divtest);
  }
}

function missingStudentAJXCall(count, names, queues) {
  $.ajax({
    url: "/missingStudent",
    type: "GET",
    data: { totalCount: count, queues: queues, names: names },
    success: function (response) {
      console.log("response======", response);
      showMissingStudentRow(response);
    },
    fail: function (error) {
      console.log("error", error);
    },
  });
}
