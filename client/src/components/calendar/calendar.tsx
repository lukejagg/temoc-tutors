// import React from 'react';
// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import './calendar.css';

interface Props {
    events: Array<any>; // array of events
}

function SmallCalendar({ events }: Props) {
    // React.useEffect(() => {
    //   let small = document.getElementById('small-calendar');
    //   if (small == null) return;
  
    //   const calendar = new Calendar(small, {
    //     plugins: [ dayGridPlugin ],
    //     height: 'auto',
    //     events: events,
    //   });
    //   calendar.render();
    // }, [events]);
  
    // return (
    //   <div id="small-calendar" />
    // );
}

function CalendarApp({ events }: Props) {
    return (
        <div className="calendar">
            {/* <h1>My Calendar</h1>
            <SmallCalendar events={events} /> */}
        </div>
    );
}

  export default CalendarApp;