
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
    row.append('<td day="'+pos+'" hour="'+i+'" id="d'+ pos +'_h'+ i +'" class="selectable"></td>');
  }

  $("#calendar tbody").append('<tr class="hour-half" id="h'+i+'-half"></tr>');
  var row = $("#h"+i+"-half");
  row.append('<th class="hour-half">'+pad(i,2)+':30</th>');

  for (var pos in days) {
    row.append('<td day="'+pos+'" hour="'+i+'.5" id="d'+ pos +'_h'+ i +'-half" class="selectable"></td>');
  }

  //console.log(row);
}

var row_select = 0;

$("#calendar").bind("mousedown", function (e) {
            e.metaKey = false;
 }).selectable({
    filter: 'td.selectable',
    cancel: 'td.plannified',
    start: function(event, ui) {
      row_select = 0;
    },
    selecting: function(event, ui) {
      if(row_select == 0) row_select = $(ui.selecting).prevAll().length;
      else {
        $(".selectable.ui-selecting").each(function(index) {
          if(parseInt($(this).attr("day"))+1 != row_select) {
            $(this).removeClass("ui-selected ui-selecting");
          }
        });
      }
    },
    stop: function( event, ui ) {
      var selection = $("#calendar .ui-selected");
      $("#input_select").attr("name", "planning['"+days[selection.first().attr("day")]+"'][]").attr("value", selection.first().attr("hour")+"-"+selection.last().attr("hour"));
    }
});

test = function(day, begin, end, uniq_id) {

  var id_day = days.indexOf(day);

  var column = $("#calendar .selectable[day="+id_day+"]");

  column.each(function( index ) {
    if( $(this).attr("hour") >= begin && $(this).attr("hour") <= end ) {
      $(this).addClass("plannified plannified_"+uniq_id);
      $(this).removeClass("selectable ui-selectee");
    }
  });

}

test("friday", 0, 8.5, 1);


console.log($("#d0_h5").attr("day"));
