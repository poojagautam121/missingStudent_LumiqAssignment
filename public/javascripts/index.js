function submitForm() {
  $("#displayValue").empty();
  let name = $("#name").val();
  let dropDwn = $("#dropdownvalue").val();
  let radioValue1 = $("#male").val();
  let radioValue2 = $("#female").val();
  console.log(name, dropDwn);
  let innerDiv = `Hi ,  ${name}, ${dropDwn} and ${radioValue1} , ${radioValue2}`;

  $("#displayValue").append(innerDiv);
}
