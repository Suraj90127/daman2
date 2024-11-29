import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Img2 from "../../assets/banner/activty-details.jpeg";
import Banner2 from "../../assets/banner/ban11.png";
// import Img3 from "../../assets/activity3.png";
import Img4 from "../../assets/activity4.png";
import Img5 from "../../assets/activity5.jpg";
import Img6 from "../../assets/activity6.png";
import Img7 from "../../assets/activity7.jpg";
import Img3 from "../../assets/banner/ban7.png";
import Banner9 from "../../assets/banner/ban9.png";
import Banner10 from "../../assets/banner/ban10.png";
const Banner3 =
  "https://res.cloudinary.com/djkkjx9ry/image/upload/v1723875768/GameAssets/activity-banner3_wf4c01.png";
const Banner4 =
  "https://res.cloudinary.com/djkkjx9ry/image/upload/v1723875799/GameAssets/activity-banner4_jiurxb.jpg";
const Banner5 =
  "https://res.cloudinary.com/djkkjx9ry/image/upload/v1723875757/GameAssets/activity-banner5_b8y5uy.png";
const Banner6 =
  "https://res.cloudinary.com/djkkjx9ry/image/upload/v1723875772/GameAssets/activity-banner6_w8azed.png";
const Banner7 =
  "https://res.cloudinary.com/djkkjx9ry/image/upload/v1723875761/GameAssets/activity-banner7_tgjtqc.png";
const Banner8 =
  "https://res.cloudinary.com/djkkjx9ry/image/upload/v1723875766/GameAssets/activity-banner8_vebr5k.jpg";
const ActivityDetail = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="nav-bg p-1 py-3 sticky top-0 z-10">
        <div className="container-section flex justify-between items-center">
          <button className="absolute" onClick={() => navigate("/activity")}>
            <IoIosArrowBack className="text-xl" />
          </button>
          <h1 className="heading-h1 gray-100 text-center flex justify-center items-center m-auto">
            Activity details
          </h1>
        </div>
      </div>
      {id == 2 && (
        <div>
          <img src={Banner10} alt="" className="w-full" />
          <h3 className="heading-h3 text-center mt-3 mb-1 gray-50 font-medium">
            {" "}
            Wingo Win Streak Bonus
          </h3>
          <div className="container-section">
            <img src={Img2} alt="" />

            <p className="fs-sm text-center gray-50 mt-3">
              {" "}
              Please click the link beloto reach our Package
            </p>
            <Link
              to={userInfo?.telegram}
              className="fs-sm color-blue-500 text-center flex justify-center"
            >
              {userInfo?.telegram}
            </Link>
          </div>
        </div>
      )}
      {id == 3 && (
        <div>
          <img src={Banner9} alt="" className="w-full" />
          <h3 className="heading-h3 text-center mt-3 mb-1 gray-50 font-medium">
            💰 Daman Game Youtube 💰
          </h3>
          <div className="container-section">
            <img src={Img3} alt="" />
          </div>
        </div>
      )}
      {id == 4 && (
        <div>
          <img src={Banner4} alt="" className="w-full" />
          <h3 className="heading-h3 text-center mt-3 mb-1 gray-50 font-medium">
            ▶️ daman Creative Video ▶️
          </h3>
          <div className="container-section">
            <img src={Img4} alt="" />
          </div>
        </div>
      )}
      {id == 5 && (
        <div>
          <img src={Banner5} alt="" className="w-full" />
          <h3 className="heading-h3 text-center mt-3 mb-1 gray-50 font-medium">
            🔄 Lucky "10" Days Of Interest 🔄
          </h3>
          <div className="container-section">
            <img src={Img5} alt="" />
          </div>
        </div>
      )}
      {id == 6 && (
        <div>
          <img src={Banner6} alt="" className="w-full" />
          <h3 className="heading-h3 text-center mt-3 mb-1 gray-50 font-medium">
            🚀 Aviator Fly High & Win Big 🚀
          </h3>
          <div className="container-section">
            <img src={Img6} alt="" />
          </div>
        </div>
      )}
      {id == 7 && (
        <div>
          <img src={Banner7} alt="" className="w-full" />
          <h3 className="heading-h3 text-center mt-3 mb-1 gray-50 font-medium">
            ⁉️ Mysterious Gift ⁉️
          </h3>
          <div className="container-section">
            <img src={Img7} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityDetail;
