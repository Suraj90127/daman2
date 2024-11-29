import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import LevelImg from "../../assets/lv.png";
const RuleData = [
  {
    img: LevelImg,
    TN: 0,
    TB: "0",
    TD: "0",
  },
  {
    img: LevelImg,
    TN: 10,
    TB: "500K",
    TD: "100K",
  },
  {
    img: LevelImg,
    TN: 20,
    TB: "1,000K",
    TD: "200K",
  },
  {
    img: LevelImg,
    TN: 50,
    TB: "2.50M",
    TD: "500K",
  },
  {
    img: LevelImg,
    TN: 100,
    TB: "2.50M",
    TD: "500k",
  },
  {
    img: LevelImg,
    TN: 100,
    TB: "5M",
    TD: "1,000K",
  },
  {
    img: LevelImg,
    TN: 500,
    TB: "10M",
    TD: "5M",
  },
  {
    img: LevelImg,
    TN: 1000,
    TB: "60M",
    TD: "10M",
  },
  {
    img: LevelImg,
    TN: 2000,
    TB: "120M",
    TD: "20M",
  },
  {
    img: LevelImg,
    TN: 4000,
    TB: "240M",
    TD: "40M",
  },
  {
    img: LevelImg,
    TN: 999,
    TB: "600M",
    TD: "100.00M",
  },
];
const PromotionRule = () => {
  return (
    <>
      <div className="nav-bg p-1 py-3 sticky top-0 z-10">
        <div className="container-section flex  items-center">
          <button className="absolute">
            <Link to={"/promotion"}>
              {" "}
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <h1 className="heading-h1 gray-50 text-center flex justify-center items-center m-auto">
            Rule
          </h1>
        </div>
      </div>
      <div className="container-section mt-2">
        <h1 className="heading-h1 text-center color-blue">
          [Promotion partner] program
        </h1>
        <p className="text-base  gray-100 text-center">
          This activity is valid for a long time
        </p>

        <div className="nav-bg mt-5 px-2 pb-5 rounded-md">
          <div className="bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  font-bold text-base">
            01
          </div>

          <p className="text-sm gray-100  leading-[18px]">
            There are 6 subordinate levels in inviting friends, if A invites B,
            then B is a level 1 subordinate of A. If B invites C, then C is a
            level 1 subordinate of B and also a level 2 subordinate of A. If
            invites D, then is a level 1 subordinate of C, at the same time a
            level 2 subordinate of B and also a level 3 subordinate of A.
          </p>
        </div>
        <div className="nav-bg mt-5 px-2 pb-5 rounded-md">
          <div className="bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  font-bold text-base">
            02
          </div>

          <p className="text-sm gray-100  leading-[18px]">
            When inviting friends to register, you must send the invitation link
            provided or enter the invitation code manually so that your friends
            become you level 1 subordinates.
          </p>
        </div>
        <div className="nav-bg mt-5 px-2 pb-5 rounded-md">
          <div className="bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  font-bold text-base">
            03
          </div>

          <p className="text-sm gray-100  leading-[18px]">
            The invitee registers via the inviter's invitation code and
            completes the deposit, shortly after that the commission will be
            received immediately.
          </p>
        </div>
        <div className="nav-bg mt-5 px-2 pb-5 rounded-md">
          <div className="bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  font-bold text-base">
            04
          </div>

          <p className="text-sm gray-100  leading-[18px]">
            The calculation of yesterday's commission starts every morning at
            01:00. After the commission calculation is completed, the commission
            is rewarded to the wallet and can be viewed through the commission
            collection record.
          </p>
        </div>
        <div className="nav-bg mt-5 px-2 pb-5 rounded-md">
          <div className="bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  font-bold text-base">
            05
          </div>

          <p className="text-sm gray-100  leading-[18px]">
            Commission rates vary depending on your agency level on that day
            <br />
            Number of Teams: How many downline deposits you have to date.
            <br />
            Team Deposits: The total number of deposits made by your downline in
            one day.
            <br />
            Team Deposit: Your downline deposits within one day.
          </p>
        </div>

        <div className="grid grid-cols-12 bg-color-l rounded-t-md p-2 mt-5">
          <div className="col-span-3 flex text-center justify-center">
            <h5 className="heading-h5">Rebat level</h5>
          </div>
          <div className="col-span-3  text-center justify-center">
            <h5 className="heading-h5">Team Number</h5>
          </div>
          <div className="col-span-3  text-center justify-center">
            <h5 className="heading-h5">Team Betting</h5>
          </div>
          <div className="col-span-3  text-center justify-center">
            <h5 className="heading-h5">Team Deposit</h5>
          </div>
        </div>

        {/* rules data */}
        {RuleData.map((item, i) => (
          <div
            className={
              i % 2 == 0
                ? "grid grid-cols-12 nav-bg p-2 py-3"
                : "grid grid-cols-12 bg-color-l p-2 py-2"
            }
            key={i}
          >
            {console.log("object", item)}
            <div className="col-span-3 flex text-center justify-center items-center">
              <span className="text-base gray-100 font-medium relative flex">
                <img src={item.img} alt="" className="h-6 w-14" />
                <span className="text-lv absolute right-1 fs-sm top-[5px]">
                  L{i}
                </span>
              </span>
            </div>
            <div className="col-span-3  text-center justify-center  items-center">
              <span className="text-base gray-100 font-medium">{item.TN}</span>
            </div>
            <div className="col-span-3  text-center justify-center  items-center">
              <span className="text-base gray-100 font-medium">{item.TB}</span>
            </div>
            <div className="col-span-3  text-center justify-center  items-center">
              <span className="text-base gray-100 font-medium">{item.TD}</span>
            </div>
          </div>
        ))}

        <div className="nav-bg mt-5 px-2 pb-5 rounded-md">
          <div className="bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  font-bold text-base">
            06
          </div>

          <p className="text-sm gray-100  leading-[18px]">
            The commission percentage depends on the membership level. The
            higher the membership level, the higher the bonus percentage.
            Different game types also have different payout percentages.
            <br />
            The commission rate is specifically explained as follows
            <br />
            <span className="color-red-200">View rebate ration {">>"}</span>
          </p>
        </div>
        <div className="nav-bg mt-5 px-2 pb-5 rounded-md">
          <div className="bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  font-bold text-base">
            07
          </div>

          <p className="text-sm gray-100  leading-[18px]">
            TOP20 commission ranking will be randomly awarded with a separate
            bonus
          </p>
        </div>
        <div className="nav-bg mt-5 px-2 pb-5 rounded-md">
          <div className="bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  font-bold text-base">
            08
          </div>

          <p className="text-sm gray-100  leading-[18px]">
            The final interpretation of this activity belongs to daman
          </p>
        </div>
      </div>
    </>
  );
};

export default PromotionRule;
