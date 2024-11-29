import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

// Define the range of years, months, and days
const years = Array.from({ length: 6 }, (_, i) => (2020 + i).toString());
const months = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const days = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);

function ScrollPicker({ items, selectedItem, onChange, label }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const itemHeight = 40;

  useEffect(() => {
    // Scroll to the selected item when the component is first rendered or when selectedItem changes
    const selectedIndex = items.indexOf(selectedItem);
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex].scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [selectedItem, items]);

  const handleScroll = (e) => {
    const scrollPos = e.target.scrollTop;
    const selectedIndex = Math.round(scrollPos / itemHeight);
    if (selectedIndex >= 0 && selectedIndex < items.length) {
      onChange(items[selectedIndex]);
    }
  };

  const handleItemClick = (index) => {
    onChange(items[index]);
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-white mb-2">{label}</span>
      <div
        ref={containerRef}
        className="w-24 h-[200px] overflow-y-scroll scrollbar-hide nav-bg"
        onScroll={handleScroll}
        style={{ scrollSnapType: "y mandatory" }}
      >
        <div style={{ height: itemHeight * 2 }} />
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            onClick={() => handleItemClick(index)}
            className={`h-10 flex items-center justify-center cursor-pointer ${
              selectedItem === item ? "gray-50 font-bold" : "text-gray-500"
            }`}
            style={{
              scrollSnapAlign: "center",
              height: itemHeight,
              lineHeight: `${itemHeight}px`,
            }}
          >
            {item}
          </div>
        ))}
        <div style={{ height: itemHeight * 2 }} />
      </div>
    </div>
  );
}

function Calendar({ onDateSelect, onValueChange }) {
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(
    now.getUTCFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    (now.getUTCMonth() + 1).toString().padStart(2, "0")
  );
  const [selectedDay, setSelectedDay] = useState(
    now.getUTCDate().toString().padStart(2, "0")
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    const selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    console.log("Selected Date:", selectedDate);

    if (onDateSelect) {
      onDateSelect(selectedDate);
      onValueChange(selectedDate);
    }
    setIsOpen(false);
  };

  return (
    <div className="">
      <div className="nav-bg cursor-pointer flex justify-between items-center p-2 rounded-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="border rounded  gray-50 border-none w-full text-left"
        >
          {`${selectedYear}-${selectedMonth}-${selectedDay}`}
        </button>
        <span>
          <IoIosArrowDown className="text-base gray-100" />
        </span>
      </div>

      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 m-auto w-[23rem] rounded-t-xl nav-bg  shadow-lg">
          <div className="flex justify-between px-4 py-2 bg-color-l items-center rounded-t-xl">
            <h2
              onClick={() => setIsOpen(false)}
              className="gray-100 cursor-pointer"
            >
              Cancel
            </h2>
            <h2 className="gray-50 font-bold text-md">Choose a Date</h2>
            <h2 onClick={handleConfirm} className="color-blue cursor-pointer">
              Confirm
            </h2>
          </div>
          <div className="flex justify-around">
            <ScrollPicker
              items={years}
              selectedItem={selectedYear}
              onChange={setSelectedYear}
              label="Year"
            />
            <ScrollPicker
              items={months}
              selectedItem={selectedMonth}
              onChange={setSelectedMonth}
              label="Month"
            />
            <ScrollPicker
              items={days}
              selectedItem={selectedDay}
              onChange={setSelectedDay}
              label="Day"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
