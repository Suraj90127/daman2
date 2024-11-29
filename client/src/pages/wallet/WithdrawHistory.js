import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { PiCopySimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";

import styled from "styled-components";
import CopyCopmponent from "../../components/CopyCopmponent";
import { useDispatch, useSelector } from "react-redux";
import { withdrawalHistory } from "../../store/reducer/authReducer";

import TopFilter from "../promotion/TopFilter";
import { MdDashboard } from "react-icons/md";
import Calendar from "../../Calender";
import usd from "../../assets/usdt.png";
import wallet from "../../assets/card.png";
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
const WithdrawHistory = () => {
  const { withdrawHistoryData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const pickerRef = useRef(null);
  const [openAll, setOpenAll] = useState(false);
  const [openCalender, setOpenCalender] = useState(false);
  const [searchLevel, setSearchLevel] = useState(null);
  const [copyPopup, setCopyPopup] = useState(false);
  const [dataAll, setDataAll] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);
  const copyToClipCode = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopyPopup(true);
        setTimeout(() => {
          setCopyPopup(false);
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy the text: ", err);
      });
  };

  const handleOpenAll = () => {
    setOpenAll(false);
  };

  const filteredData = (withdrawHistoryData || [])?.filter((item) => {
    const date = new Date(item.today);
    const pad = (num) => num.toString().padStart(2, "0");
    const day = pad(date.getUTCDate());
    const month = pad(date.getUTCMonth() + 1); // Months are zero-based
    const year = date.getUTCFullYear();
    const itemDate = `${year}-${month}-${day}`;

    const matchesDate =
      selectedDate !== null ? itemDate === selectedDate : true; // Show all if no searchDate is provided

    const matchesLevel =
      searchLevel !== null ? item.status === searchLevel : true; // Show all if no searchDate is provided

    return matchesLevel && matchesDate;
  });

  const items = ["All", "To Be Paid", "Complete", "Failed"];
  const handleClick = (index) => {
    setActiveIndex(index);
    setDataAll(items[index]);
    if (index == 0) {
      setSearchLevel(null);
    } else {
      setSearchLevel(index - 1);
    }
    if (pickerRef.current) {
      const itemHeight = pickerRef.current.children[0].clientHeight;
      const translateY =
        -(index * itemHeight) +
        pickerRef.current.clientHeight / 1.2 -
        itemHeight / 1.2;
      pickerRef.current.style.transform = `translateY(${translateY}px)`;
    }
  };

  useEffect(() => {
    dispatch(withdrawalHistory());
    handleClick(activeIndex);
  }, [activeIndex, dispatch]);

  const itemss = [
    { name: "All", icon: <MdDashboard /> },
    { name: "BANK CARD", icon: wallet },

    { name: "USDT", icon: usd },
  ];

  const handle = () => {
    window.history.back();
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <div className="nav-bg p-1 py-3">
        <div className="container-section flex  items-center">
          <button>
            <Link onClick={handle}>
              {" "}
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <h1 className="heading-h1 gray-100 text-center flex justify-center items-center m-auto">
            Withdraw history
          </h1>
        </div>
      </div>

      <TopFilter items={itemss} />
      <div className="container-section">
        <div className="grid grid-cols-12 gap-2 mt-2">
          <div
            className="col-span-6 nav-bg flex cursor-pointer justify-between items-center p-2 rounded-md"
            onClick={handleOpenAll}
          >
            <span className="text-base gray-50">{dataAll}</span>
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
        {Array.isArray(withdrawHistoryData) &&
          filteredData.map((item, i) => (
            <div className="nav-bg rounded-md mt-3 pb-7 px-3 pt-1" key={i}>
              <div className=" mt-3 flex justify-between items-center rounded-sm  text-sm pb-2 border-b border-[--grey-200]">
                <span className="fs-sm font-medium bgs-green p-1 px-4 rounded-md  text-white">
                  Withdraw
                </span>
                <span
                  className={`fs-sm font-medium  ${
                    item.status === 0
                      ? "color-yellow-200"
                      : item.status === 1
                      ? "color-green"
                      : "color-red-200"
                  }`}
                >
                  {item.status === 0
                    ? "Pending"
                    : item.status === 1
                    ? "Succeed"
                    : "Failed"}
                </span>
              </div>
              <div className="mt-3 flex justify-between items-center gray-100 text-sm">
                <span className="text-sm font-medium">Balance</span>
                <span className="text-sm font-medium color-yellow-200">
                  {item.type === "BANK CARD"
                    ? `₹${Number(item.money).toFixed(2)}`
                    : `$${Number(item.money / 92).toFixed(2)}`}
                </span>
              </div>

              <div className=" flex justify-between items-center mt-3 gray-100 text-sm">
                <span className="text-sm font-medium">Type</span>
                <span className="text-sm font-medium">{item.type}</span>
              </div>
              <div className=" flex justify-between items-center  mt-3 gray-100 text-sm">
                <span className="text-sm font-medium">Time</span>
                <span className="fs-sm font-medium">{item.today}</span>
              </div>
              <div className=" flex justify-between items-center  mt-3 gray-100 text-sm">
                <span className="text-sm font-medium">Order number</span>
                <span className="text-sm font-medium flex items-center">
                  {item.id_order}{" "}
                  <PiCopySimpleBold
                    className="ms-1 mt-[3px]"
                    onClick={() => copyToClipCode(item.id_order)}
                  />
                </span>
              </div>
              <div className=" flex justify-between items-center  mt-3 gray-100 text-sm">
                <span className="text-sm font-medium">Remark</span>
                <span className="text-sm font-medium flex items-center">
                  {item.remark}
                </span>
              </div>
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

      {/* filter date */}
      <div className={openCalender ? "overlay-section block" : "hidden"}></div>

      <CopyCopmponent copyPopup={copyPopup} message="Copy successful" />
    </>
  );
};

export default WithdrawHistory;
