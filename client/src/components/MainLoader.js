import React from "react";
import img2 from "../assets/logo.png";
const img1 =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726576678/Polish_20240917_173617470_fxvsq8.png";
const MainLoader = () => {
  return (
    <div className="bg-body fixed z-[999] w-[27rem] top-0 bottom-0 flex flex-col gap-5 items-center justify-center h-screen overflow-hidden p-0">
      <img src={img1} className=" h-auto" alt="daman" />
      <h2 className=" font-bold arial text-[18px]">
        Withdraw fast, safe and stable
      </h2>
      <img src="/logo.png" className="w-[200px] h-auto mt-[70px]" alt="logo" />
    </div>
  );
};

export default MainLoader;
