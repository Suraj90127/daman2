import React from "react";

import J1 from "../../../assets/j1.png";
import J2 from "../../../assets/j2.png";
import J3 from "../../../assets/j3.png";
import J4 from "../../../assets/j4.png";
import J5 from "../../../assets/j5.png";
import J6 from "../../../assets/j6.png";
import J7 from "../../../assets/j7.png";
import J8 from "../../../assets/j8.png";
import J9 from "../../../assets/j9.png";
import J10 from "../../../assets/j10.png";
import J11 from "../../../assets/j11.png";
import J12 from "../../../assets/j12.png";
import J13 from "../../../assets/j13.png";
import J14 from "../../../assets/j14.png";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import WinningInformation from "../WinningInformation";
import Profite from "../Profite";

const allImages = [
  J1, J2, J3, J4, J5, J6, J7, J8, J9, J10, J11, J12, J13, J14,
];

const Fishing = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="lottery--page-section nav-bg">
        <div className="container-section flex items-center">
          <button
            className="rounded-3xl border-2 p-1 mt-2 px-3"
            onClick={() =>
              navigate(`/`, {
                state: location.pathname,
              })
            }
          >
            <IoIosArrowBack />
          </button>

          <p className="text-sm font-semibold gray-100 italic ms-2">
            Fishing
          </p>
        </div>
      </div>
      <div className="container-section">
        <div className="grid grid-cols-12 gap-3 mt-3">
          {allImages.map((img, index) => (
            <div className="col-span-4" key={index}>
              <img
                src={img}
                alt={`Image ${index + 1}`}
                loading="lazy"
                className="w-full h-[150px]"
                onClick={() => navigate("/home/AllOnlineGames?game=MG_Fish")}
              />
            </div>
          ))}
        </div>

        {/* winning information */}
        <WinningInformation />

        <Profite />
      </div>
    </>
  );
};

export default Fishing;
