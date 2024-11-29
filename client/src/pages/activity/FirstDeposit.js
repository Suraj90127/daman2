import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const depositBonus = [
  {
    deposit: 50000,
    bonus: 5000,
  },
  {
    deposit: 10000,
    bonus: 1000,
  },
  {
    deposit: 5000,
    bonus: 500,
  },
  {
    deposit: 3000,
    bonus: 300,
  },
  {
    deposit: 1000,
    bonus: 100,
  },
  {
    deposit: 500,
    bonus: 50,
  },
  {
    deposit: 300,
    bonus: 30,
  },
];
const FirstDeposit = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav-bg p-1 py-3 sticky top-0 z-10">
        <div className="container-section flex  items-center">
          <button className="absolute">
            <Link to={"/activity"}>
              {" "}
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <h1 className="heading-h1 gray-100 text-center flex justify-center items-center m-auto">
            First Deposit Bonus
          </h1>
        </div>
      </div>

      <div className="container-section first-text">
        <ul>
          {depositBonus?.map((item, i) => (
            <li key={i} onClick={() => navigate("/wallet/Recharge")}>
              <div className="first-c">
                <p className="gray-50">
                  First deposit{" "}
                  <span className="color-blue">
                    {item.deposit.toLocaleString()}
                  </span>
                </p>
                <p className="color-blue">+₹{item.bonus.toLocaleString()}.00</p>
              </div>
              <p className="color-gray">
                Deposit {item.deposit.toLocaleString()} for the first time in
                your account and you can receive
                {item.deposit + item.bonus.toLocaleString()}
              </p>
              <div className="bottom-c">
                <div className="slider-box">
                  0/{item.deposit.toLocaleString()}
                </div>
                <button className="border border-color-blue ">Deposit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FirstDeposit;
