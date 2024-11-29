import React, { useState, useEffect, useRef } from 'react';


const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  
  const years = [2022, 2023, 2024];
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  useEffect(() => {
    if (showPicker) {
      scrollToSelected(yearRef.current, date.getFullYear());
      scrollToSelected(monthRef.current, date.getMonth() + 1);
      scrollToSelected(dayRef.current, date.getDate());
    }
  }, [showPicker, date]);

  const scrollToSelected = (container, value) => {
    const selectedElement = container.querySelector(`[data-value="${value}"]`);
    if (selectedElement) {
      container.scrollTop = selectedElement.offsetTop - container.offsetHeight / 2 + selectedElement.offsetHeight / 2;
    }
  };

  const handleDateChange = (type, value) => {
    const newDate = new Date(date);
    switch(type) {
      case 'year':
        newDate.setFullYear(value);
        break;
      case 'month':
        newDate.setMonth(value - 1);
        break;
      case 'day':
        newDate.setDate(value);
        break;
    }
    setDate(newDate);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="date-picker">
      <div className="date-display" onClick={() => setShowPicker(!showPicker)}>
        {formatDate(date)}
      </div>
      {showPicker && (
        <div className="picker-container">
          <div className="picker-header">
            <button onClick={() => setShowPicker(false)}>Cancel</button>
            <span>Choose a date</span>
            <button onClick={() => setShowPicker(false)}>Confirm</button>
          </div>
          <div className="date-columns">
            <div className="date-column" ref={yearRef}>
              {years.map(year => (
                <div 
                  key={year} 
                  className={`date-item ${year === date.getFullYear() ? 'selected' : ''}`}
                  onClick={() => handleDateChange('year', year)}
                  data-value={year}
                >
                  {year}
                </div>
              ))}
            </div>
            <div className="date-column" ref={monthRef}>
              {months.map((month, index) => (
                <div 
                  key={month} 
                  className={`date-item ${index + 1 === date.getMonth() + 1 ? 'selected' : ''}`}
                  onClick={() => handleDateChange('month', index + 1)}
                  data-value={index + 1}
                >
                  {month}
                </div>
              ))}
            </div>
            <div className="date-column" ref={dayRef}>
              {days.map(day => (
                <div 
                  key={day} 
                  className={`date-item ${parseInt(day) === date.getDate() ? 'selected' : ''}`}
                  onClick={() => handleDateChange('day', parseInt(day))}
                  data-value={parseInt(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;