
var days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "satuday",
  "sunday"
];

/*function to print nunbers properly*/
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

/* Creates the "days" row */
for (var pos in days) {
  //console.log(days[pos]);
  $( "#row-day" ).append('<th id="day-'+ days[pos] +'">' + days[pos].charAt(0).toUpperCase() + days[pos].slice(1) + '</th>');
}

/* Creates the table with every our/day cell  */
for (var i = 0; i <= 23; i++) {
  $("#calendar tbody").append('<tr class="hour" id="h'+i+'"></tr>');
  var row = $("#h"+i);

  row.append('<th class="hour">'+pad(i,2)+':00</th>');

  for (var pos in days) {
    row.append('<td day="'+pos+'" hour="'+i+'" id="d'+ pos +'_h'+ i +'"></td>');
  }

  $("#calendar tbody").append('<tr class="hour-half" id="h'+i+'-half"></tr>');
  var row = $("#h"+i+"-half");
  row.append('<th class="hour-half">'+pad(i,2)+':30</th>');

  for (var pos in days) {
    row.append('<td day="'+pos+'" hour="'+i+'.5" id="d'+ pos +'_h'+ i +'-half" class="selectable"></td>');
  }

  //console.log(row);
}

$("#calendar").bind("mousedown", function (e) {
            e.metaKey = false;
 }).selectable({
    filter: 'td',
    cancel: 'a',
    selecting: function(event, ui) {
      //console.log($(ui.selecting).prevAll().length);
    },
    stop: function( event, ui ) {
      $("#calendar .ui-selected").first().text("testing");
      var selection = $("#calendar .ui-selected");
      $("#input_select").attr("name", "planning['"+days[selection.first().attr("day")]+"'][]").attr("value", selection.first().attr("hour")+"-"+selection.last().attr("hour"));
    }
});

console.log($("#d0_h5").attr("day"));
