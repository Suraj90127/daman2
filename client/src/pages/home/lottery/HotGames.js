import React, { useState, useEffect, useRef, Fragment } from 'react'
import "./lottery.css"
import { IoIosArrowBack } from 'react-icons/io';

import { useLocation, useNavigate } from "react-router-dom";
import WinningInformation from '../WinningInformation';
import { HotGameData } from '../ImgData';
import { useDispatch } from 'react-redux';
import { jilliGame } from '../../../store/reducer/gameReducer';


const HotGames = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [jilliPopup, setJilliPopup] = useState(false)
  const [gameId, setGameId] = useState()
  const dispatch=useDispatch()


  const allImages = HotGameData.reduce((acc, curr) => {
    return acc.concat(Object.values(curr));
  }, []);

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

              {allImages.map((img, i) => (
                <div className="col-span-4" key={i}>
                  <img src={img} alt={`Image ${i + 1}`} className="w-full h-[150px]" 
                   onClick={() => {
                    i === 0 && handleJilliOpen(9);
                    i === 1 && handleJilliOpen(51);
                    i === 2 && handleJilliOpen(27);
                    i === 3 && handleJilliOpen(232);
                    i === 4 && handleJilliOpen(236);
                    i === 5 && handleJilliOpen(233)
                  }
                  }

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

export default HotGames

