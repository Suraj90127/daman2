import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { transactionHistory } from "../../store/reducer/authReducer";
import Calendar from "../../Calender";
import TopSlide from "../../components/TopSlide";

const Container = styled.div`
  position: fixed;
  width: 25rem;
  height: 300px;
  overflow: hidden;

  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Picker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(${(props) => props.translateY}px);
  transition: transform 0.3s ease-out;
  z-index: 2;
  position: relative;
`;

const Item = styled.div`
  height: 40.67px; /* one third of container height */
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => (props.active ? "#000" : "#606877")};
  transition: color 0.3s;
  cursor: pointer;
  font-weight: 700;
`;
const TransAction = () => {
  const { transactionHistoryData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const pickerRef = useRef(null);
  const [openAll, setOpenAll] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchLevel, setSearchLevel] = useState(null);
  const [allSelect, setAllSelect] = useState("All");

  const dispatch = useDispatch();
  const handleOpenAll = () => {
    setOpenAll(!openAll);
  };

  const items = [
    "All",
    "Bet",
    "Agent bet Commission",
    "Win",
    "Red envelope",
    "Deposit",
    "Agent Salary",
    "Withdraw",
    "Cancel withdrawal",
    "Attendance bonus",
    "Withdrawal rejected",
    "Deposit gift",
    "Manual deposit",
    "Sign up bonus",
    "Bonus",
    "First deposit bonus",
    "Invitation Bonus",
    "One click rebet",
    "Loss",
  ];

  const handleClick = (index) => {
    setActiveIndex(index);
    setAllSelect(items[index]);
    if (index == 0) {
      setSearchLevel(null);
    } else {
      setSearchLevel(items[index]);
    }
    if (pickerRef.current) {
      const itemHeight = pickerRef.current.children[0].clientHeight;
      const translateY =
        -(index * itemHeight) +
        pickerRef.current.clientHeight / 5.7 -
        itemHeight / 5.7;
      pickerRef.current.style.transform = `translateY(${translateY}px)`;
    }
  };

  useEffect(() => {
    handleClick(activeIndex);
    dispatch(transactionHistory());
  }, [activeIndex]);

  // const filteredData = searchLevel !== null
  // ? transactionHistoryData?.filter(item => item.detail === searchLevel)
  // : transactionHistoryData;

  const filteredData = transactionHistoryData?.filter((item) => {
    const itemDate = `${item.time.split(" ")[0]}`;
    const matchesDate =
      selectedDate !== null ? itemDate === selectedDate : true; // Show all if no searchDate is provided

    const matchesLevel =
      searchLevel !== null ? item.detail === searchLevel : true; // Show all if no searchDate is provided

    return matchesLevel && matchesDate;
  });

  const handle = () => {
    window.history.back();
  };

  // datetime.split(' ')[0]
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <div className="nav-bg p-1 py-3 sticky top-0 z-10">
        <div className="container-section flex  items-center">
          <button className="absolute">
            <Link onClick={handle}>
              {" "}
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <h1 className="heading-h1 gray-100 text-center flex justify-center items-center m-auto">
            Transaction history
          </h1>
        </div>
      </div>

      <div className="container-section">
        <div className="grid grid-cols-12 gap-2 mt-2">
          <div
            className="col-span-6 nav-bg flex cursor-pointer justify-between items-center p-2 rounded-md"
            onClick={handleOpenAll}
          >
            <span className="text-base gray-50" onClick={handleOpenAll}>
              {allSelect}
            </span>
            <span>
              <IoIosArrowDown className="text-base gray-100" />
            </span>
          </div>
          <div className="col-span-6 nav-bg">
            <Calendar
              onDateSelect={handleDateSelect}
              onValueChange={handleDateSelect}
            />
          </div>
        </div>
      </div>

      <div className="container-section mt-5">
        {Array.isArray(transactionHistoryData) &&
          filteredData.map((item, i) => (
            <div className="nav-bg rounded-md mt-3 pb-4 " key={i}>
              <div
                className={`w-full blue-linear p-2  font-medium rounded-t-md  ${
                  item.detail == "Win"
                    ? "color-green"
                    : item.detail == "Loss"
                    ? "color-red-200"
                    : "text-white"
                }`}
              >
                {item.detail}
              </div>

              <div className="bg-body mt-3 flex justify-between items-center rounded-sm mx-2 px-3 py-1  gray-100 text-sm">
                <span className="fs-sm font-medium">Detail</span>
                <span
                  className={`fs-sm font-medium ${
                    item.detail == "Win" ? "color-green" : ""
                  }`}
                >
                  {item.detail}
                </span>
              </div>
              <div className="bg-body mt-1 flex justify-between items-center rounded-sm mx-2 px-3 py-1  gray-100 text-sm">
                <span className="fs-sm font-medium">Time</span>
                <span className="fs-sm font-medium">{item.time}</span>
              </div>
              <div className="bg-body mt-1 flex justify-between items-center rounded-sm mx-2 px-3 py-1  gray-100 text-sm">
                <span className="fs-sm font-medium">Balance</span>
                <span className="text-sm font-medium color-green">
                  ₹{item.balance}
                </span>
              </div>
              {/* <div className="rounded-md w-[95%] h-16 border border-color-slat m-2 mt-3 ps-2  font-medium color-yellow-200">
                {item.type == "0" ? "" : item.type}
              </div> */}
            </div>
          ))}
      </div>

      {/* all filter bottom */}
      <div className={openAll ? "overlay-section block" : "hidden"}></div>
      <div className={openAll ? "block" : "hidden"}>
        <Container className="nav-bg rounded-t-xl filter-section z-10">
          <div className="bg-color-l rounded-t-xl flex justify-between p-2 px-3 relative z-10">
            <button className="gray-100" onClick={handleOpenAll}>
              Cancel
            </button>
            <button className="color-blue" onClick={handleOpenAll}>
              Confirm
            </button>
          </div>
          <Picker ref={pickerRef} translateY={-(activeIndex * 66.67)}>
            {items.map((item, index) => (
              <Item
                className="text-sm"
                key={index}
                active={index === activeIndex}
                onClick={() => handleClick(index)}
              >
                {item}
              </Item>
            ))}
          </Picker>
          <div className="picker-botom-hilight"></div>
        </Container>
      </div>
    </>
  );
};

export default TransAction;
