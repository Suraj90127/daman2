import React, { useState, useEffect, useRef, Fragment } from 'react'
import "./lottery.css"
import { IoIosArrowBack } from 'react-icons/io';

import { useLocation, useNavigate } from "react-router-dom";
import WinningInformation from '../WinningInformation';
import { CasinoGameData} from '../ImgData';
import { useDispatch } from 'react-redux';
import { jilliGame } from '../../../store/reducer/gameReducer';
import { Casino } from '../AllGameImg';

const Casinos = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [jilliPopup, setJilliPopup] = useState(false)
  const [gameId, setGameId] = useState()
  const dispatch=useDispatch()


  // const allImages = CasinoGameData.reduce((acc, curr) => {
  //   return acc.concat(Object.values(curr));
  // }, []);

  const handleJilliOpen = (data) => {
    setGameId(data)
    setJilliPopup(true)
  }

  const handleJilliSubmit = () => {

    dispatch(jilliGame(gameId)).then((res) => {
      if (res.payload.status) {
        window.open(res.payload.data.url, '_blank');
        setJilliPopup(false)
      }
    })

  }

  return (
    <>
      <div className="container-section">
        <div className="lottery--page-section">
          <button className='rounded-3xl border-2 p-1 mt-2 px-3' onClick={() => navigate(`/`, {
            state: location.pathname,
          })}><IoIosArrowBack /></button>
          <div >
                     <div className="grid grid-cols-12 gap-3 mt-3">

              {Casino.map((img, index) => (
                <div className="col-span-4" key={index}>
                  <img src={img} alt={`Image ${index + 1}`} className="w-full h-[150px] rounded-lg" 
                     onClick={()=>{
                      index===0 && handleJilliOpen(207);
                      index===1 && handleJilliOpen(216);
                      index===2 && handleJilliOpen(204);
                      index===3 && handleJilliOpen(197);
                      index===4 && handleJilliOpen(200);
                      index===5 && handleJilliOpen(195);
                      index===6 && handleJilliOpen(182);
                      index===7 && handleJilliOpen(179);
                      index===8 && handleJilliOpen(178);
                      index===9 && handleJilliOpen(173);
                      index===10 && handleJilliOpen(177);
                      index===11 && handleJilliOpen(151);
                      index===12 && handleJilliOpen(152);
                      index===13 && handleJilliOpen(150);
                      index===14 && handleJilliOpen(149);
                      index===15 && handleJilliOpen(148);
                      index===16 && handleJilliOpen(111);
                      index===17 && handleJilliOpen(125);
                      index===18 && handleJilliOpen(139);
                      index===19 && handleJilliOpen(112);
                      index===20 && handleJilliOpen(118);
                      index===21 && handleJilliOpen(113);
                      index===22 && handleJilliOpen(124);
                      index===23 && handleJilliOpen(123);
                      index===24 && handleJilliOpen(61);
                      index===25 && handleJilliOpen(63);
                      index===26 && handleJilliOpen(122);
                      index===27 && handleJilliOpen(62);

                    }}
                  />
                </div>
              ))}

            </div>
          </div>
          {/* winning information */}


          <WinningInformation />
        </div>
      </div>

      <div className={jilliPopup ? "overlay-section block" : "hidden"}></div>
      
      <div className={jilliPopup ? "overlay-section block" : "hidden"}></div>
      {jilliPopup && (

<div className="fixed top-0 z-10 bottom-0 h-32 m-auto flex flex-col justify-center items-center left-0 right-0 w-[20rem] nav-bg rounded-lg">
  <h3 className="heading-h3 gray-50 mt-5">Tips</h3>
  <p className="text-sm gray-100 mt-2">Are you sure you want to join the game?</p>

  <div className="w-full mt-5">
    <button className="bgs-blue-500 p-2 w-[50%]  rounded-bl-lg " onClick={() => setJilliPopup(false)}>Cancel</button>
    <button className="bg-blue p-2 rounded-br-lg  w-[50%]" onClick={handleJilliSubmit}>Confirm</button>
  </div>
</div>

)}

    </>
  )
}

export default Casinos

