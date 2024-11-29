import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commissiondatas, subordinates } from "../../store/reducer/authReducer";

import CopyCopmponent from "../../components/CopyCopmponent";
import Calendar from "../../Calender";

const CommissionDetails = () => {
  const { commissiondatasData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [copyPopup, setCopyPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  console.log("amount", commissiondatasData);

  const calculateTotals = async (data) => {
    if (!Array.isArray(data)) {
      return { userLevel: 0, totalBetAmount: 0, totalCommsionsAmount: 0 };
    }
    return data.reduce(
      (totals, item) => {
        totals.userLevel += item.level || 0;
        totals.totalBetAmount += parseFloat(item.amount) || 0;
        totals.totalCommsionsAmount += parseFloat(item.commission) || 0;
        return totals;
      },
      { userLevel: 0, totalBetAmount: 0, totalCommsionsAmount: 0 }
    );
  };

  const filterDataByDate = async (data, date) => {
    if (!Array.isArray(data)) {
      return [];
    }
    return data.filter((item) => {
      if (item.date && item.date !== 0) {
        const itemDate = new Date(item.date).toISOString().split("T")[0];
        return itemDate === date;
      }
      return false;
    });
  };

  const [totals, setTotals] = useState({
    userLevel: 0,
    totalBetAmount: 0,
    totalCommsionsAmount: 0,
  });
  // console.log("dfff",totals)
  useEffect(() => {
    const fetchTotals = async () => {
      if (commissiondatasData && commissiondatasData.length > 0) {
        const filteredData = selectedDate
          ? await filterDataByDate(commissiondatasData, selectedDate)
          : commissiondatasData;
        const calculatedTotals = await calculateTotals(filteredData);
        setTotals(calculatedTotals);
      }
    };

    fetchTotals();
  }, [selectedDate, commissiondatasData]);

  useEffect(() => {
    dispatch(commissiondatas());
  }, [dispatch]);

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 since months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const currentDate = getCurrentDate();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <div className="nav-bg p-1 py-3 sticky top-0 z-10">
        <div className="container-section flex  items-center">
          <button>
            <Link to={"/promotion"}>
              {" "}
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <h1 className="heading-h1 gray-50 text-center flex justify-center items-center m-auto">
            Commission details
          </h1>
        </div>
      </div>
      <div className="container-section z-10 sticky top-16">
        <div className="grid grid-cols-12 gap-2 mt-2">
          <div className="col-span-12">
            <Calendar
            //  onDateSelect={handleDateSelect} onValueChange={handleDateSelect}
            />
          </div>
        </div>
      </div>

      <div className="container-section mt-5">
        <div className="nav-bg rounded-md mt-3 pb-7 px-3 pt-1">
          <p className="text-sm gray-100"> Settlement successful</p>
          <p className="text-sm gray-100"> date</p>
          <p className="text-sm gray-100">
            {" "}
            The commission has been automatically credited your balance
          </p>
          <hr className="border-color-slat mt-1" />
          <div className="mt-3 flex justify-between items-center gray-100 text-sm">
            <span className="text-sm">Number of bettors</span>
            <span className="text-sm ">{totals.userLevel}</span>
          </div>

          <div className=" flex justify-between items-center mt-3 gray-100 text-sm">
            <span className="text-sm font-medium">Bet Amount</span>
            <span className="text-sm font-medium color-yellow-200">
              {totals.totalBetAmount.toFixed(2)}
            </span>
          </div>
          <div className=" flex justify-between items-center mt-3 gray-100 text-sm">
            <span className="text-sm font-medium">Commission payout</span>
            <span className="text-sm font-medium color-yellow-200">
              {totals.totalCommsionsAmount.toFixed(2)}
            </span>
          </div>
          <div className=" flex justify-between items-center mt-3 gray-100 text-sm">
            <span className="text-sm font-medium">Time</span>
            <span className="text-sm font-medium color-yellow-200">
              {selectedDate ? selectedDate : currentDate}
            </span>
          </div>
        </div>
      </div>

      <CopyCopmponent copyPopup={copyPopup} message="Copy successful" />
    </>
  );
};

export default CommissionDetails;
