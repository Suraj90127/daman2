import React, { useState, useEffect, useRef, Fragment } from 'react'
import "./lottery.css"
import { IoIosArrowBack } from 'react-icons/io';

import { useLocation, useNavigate } from "react-router-dom";
import WinningInformation from '../WinningInformation';
import { originalData } from '../ImgData';
import { jilliGame } from '../../../store/reducer/gameReducer';
import { useDispatch } from 'react-redux';


const Original = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [jilliPopup, setJilliPopup] = useState(false)
  const [gameId, setGameId] = useState()

  const dispatch=useDispatch()


  const allImages = originalData.reduce((acc, curr) => {
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
            {/* {console.log("object",item)} */}
            <div className="grid grid-cols-12 gap-3 mt-3">

              {allImages.map((img, index) => (
                <div className="col-span-4" key={index}>
                  <img src={img} alt={`Image ${index + 1}`} className="w-full h-[150px] rounded-lg" 
                  
                  onClick={() =>{
                    index === 0 &&  handleJilliOpen(224);  
                    index === 1 &&  handleJilliOpen(242);  
                    index === 2 &&  handleJilliOpen(235);  
                    index===3 && handleJilliOpen(62);
                    index===4 && handleJilliOpen(233);
                    index===5 && handleJilliOpen(229);
                
                    index===6 && handleJilliOpen(241);
                    index === 7 &&  handleJilliOpen(224);  
                    index===8 && handleJilliOpen(62);

                    index === 10 &&  handleJilliOpen(242); 
                    index===11 && handleJilliOpen(229);
                    index===12 && handleJilliOpen(233);
                    index===13 && handleJilliOpen(241);
                    index===14 && handleJilliOpen(236);

                    index===15 && handleJilliOpen(197);
                    index===16 && handleJilliOpen(200);
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

export default Original

