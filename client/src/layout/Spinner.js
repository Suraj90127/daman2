import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Img from "../assets/banner/loader.PNG";
import "./spinner.css";
import { useSelector } from "react-redux";
const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    if (userInfo) {
      navigate({
        state: location.pathname,
      });
    }
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      {count !== 0 ? (
        <div>
          <div className="loader" role="status">
            <img src={Img} alt="" />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Spinner;
