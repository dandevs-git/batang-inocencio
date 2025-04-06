import React from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import '../../css/react_calendar.css';

function CustomCalendar({onChange, value}) {
  return (
    <>
      <Calendar onChange={onChange} value={value} />
    </>
  );
}

export default CustomCalendar;
