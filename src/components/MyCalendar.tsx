import React, { useState, SyntheticEvent } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type MyCalendarComponentProps = {
  sessions: Date[];
};

const MyCalendarComponent: React.FC<MyCalendarComponentProps> = ({ sessions }) => {
  const [value, setValue] = useState(new Date());

  const handleDateChange = (selectedValue: Date | Date[], event: SyntheticEvent) => {
    if (Array.isArray(selectedValue)) {
      setValue(selectedValue[0]);
    } else if (selectedValue !== null) {
      setValue(selectedValue);
    }
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={value}
        // Implement a function to provide custom tile content based on the sessions prop
      />
    </div>
  );
}

export default MyCalendarComponent;
