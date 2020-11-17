openTime = [], closeTime = [], dayName = [];

document.addEventListener('DOMContentLoaded', function () {


  var today = new Date();
  var date = today.getFullYear() + '-' + (("0" + (today.getMonth() + 1)).slice(-2)) + '-' + ("0" + today.getDate()).slice(-2);



  // abc = document.getElementById("data").value; 
  len = document.getElementById('len').value;

  for (i = 0; i < len; i++) {
    openTime.push(document.getElementById(i + "open").value);
    closeTime.push(document.getElementById(i + "close").value);
    dayName.push(document.getElementById(i + "day").value);
  }



  // find todays time
  let dateObj=new Date(),next1=new Date(),next2=new Date(),next3=new Date(),next4=new Date(),next5=new Date(),next6 = new Date()
  next1.setDate(dateObj.getDate() + 1);
  next2.setDate(dateObj.getDate() + 2);
  next3.setDate(dateObj.getDate() + 3);
  next4.setDate(dateObj.getDate() + 4);
  next5.setDate(dateObj.getDate() + 5);
  next6.setDate(dateObj.getDate() + 6);
  
 
  let weekday = dateObj.toLocaleString("default", { weekday: "short" }).toLowerCase();
  let weekday1 = next1.toLocaleString("default", { weekday: "short" }).toLowerCase();
  let weekday2 = next2.toLocaleString("default", { weekday: "short" }).toLowerCase();
  let weekday3 = next3.toLocaleString("default", { weekday: "short" }).toLowerCase();
  let weekday4 = next4.toLocaleString("default", { weekday: "short" }).toLowerCase();
  let weekday5 = next5.toLocaleString("default", { weekday: "short" }).toLowerCase();
  let weekday6 = next6.toLocaleString("default", { weekday: "short" }).toLowerCase();


  //console.log(weekday,weekday1)

  todayOpen = []
  todayClose = []
  for (i = 0; i < len; i++) {
    
    if (dayName[i] == weekday) {
      //console.log(dayName[i],weekday,openTime[i]);
      todayOpen.push(openTime[i]);
      todayClose.push(closeTime[i]);
    }
  }

  dothat(date,todayOpen,todayClose)

});

function dothat(date,todayOpen,todayClose){
  
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    initialView: 'resourceTimeGridTwoDay',
    initialDate: date,
    editable: true,
    selectable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    dayMinWidth: 200,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'resourceTimeGridDay,resourceTimeGridTwoDay,resourceTimeGridWeek,dayGridMonth'
    },
    views: {
      resourceTimeGridTwoDay: {
        type: 'resourceTimeGrid',
        duration: { days: 2 },
        buttonText: '2 days',
      }
    },

    resources: [
      { id: 'a', title: 'Room A' },

    ],

    events:
    todayOpen.map((i, index) => {
        return {
          id: index + 1,
          resourceId: 'a',
          start: date + "T" + todayOpen[index],
          end: date + "T" + todayClose[index],
          title: 'event 2'    
        }
      },
      )
  });


  calendar.render();
}
