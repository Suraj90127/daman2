import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import { MdSportsBasketball, MdSportsSoccer } from 'react-icons/md';
import { PiApplePodcastsLogo, PiTelevisionSimpleFill } from 'react-icons/pi';
import { BiHeartCircle } from 'react-icons/bi';
import { GiArrowsShield, GiBarbedNails, GiCherish, GiCircularSaw, GiFishingLure, GiStarSwirl } from 'react-icons/gi';
import { Casino, Crash, Fishing, Jilli, Rummy, Slots } from './AllGameImg';
import { jilliGame } from '../../store/reducer/gameReducer';
import { useDispatch, useSelector } from 'react-redux';
import { userDetail } from '../../store/reducer/authReducer';

const Container = styled.div`
   width: 100%;
  overflow: hidden;
  overflow: scroll;
    margin: 0 auto;
  position:relative;
  height:60px;
`;

const Picker = styled.div`
  display: flex;
  align-items: center;
  transform: translateX(${props => props.translateX}px);
  transition: transform 0.3s ease-out;
  z-index: 2;
  position: absolute;
 overflow: hidden;
`;

const Item = styled.div`
  height: 50.67px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${props => (props.active ? '#fff' : '#606877')};
  transition: color 0.3s;
  cursor: pointer;
  font-weight: 700;
 width: 100px; /* Assuming each item has a width of 100px */
  margin: 10px;
  background:${props => (props.active ? 'var(--Gradient-1, linear-gradient(93deg, var(--mediam-blue) 7.38%, var(--bgblue) 94.48%))' : 'var( --bg-color-l)')};
  padding: 10px 30px;
`;

const Span = styled.span`
font-size:24px;
`;


const AllOnlineGames = () => {
  const { userInfo, } = useSelector((state) => state.auth);

  const [activeIndex, setActiveIndex] = useState(0);
  const pickerRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [openAll, setOpenAll] = useState(false);
  const [jilliPopup, setJilliPopup] = useState(false)
  const [gameId, setGameId] = useState()

  const dispatch=useDispatch()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('game');

  const [tab, setTabs] = useState(0)
 
  //   8273142996

  const items = [
    { name: 'Jilli', icon: <MdSportsBasketball /> },
    { name: 'Crash', icon: <GiStarSwirl /> },
    {
      name: 'MG_Fish', icon: <GiFishingLure />
    },
    { name: 'Rummy', icon: <BiHeartCircle /> },
    { name: 'Slots', icon: <PiApplePodcastsLogo /> },
    { name: 'Casino', icon: <GiArrowsShield /> },

   ];


  const handleClick = (index) => {
    setActiveIndex(index);
    setTabs(items[index].name)
  };
  useEffect(() => {
    // if (pickerRef.current) {
    //   const itemWidth = pickerRef.current.children[0].clientWidth;
    //   const newTranslateX = -(activeIndex * itemWidth);

   
    //   // Check if newTranslateX exceeds the limit of -420px
    //   if (newTranslateX < -250) {
    //     // setTranslateX(-250); // Set translateX to -420 if it exceeds
    //   } else if (newTranslateX > 0) {
    //     // setTranslateX(0); // Set translateX to 0 if it's greater than 0
    //   } else {
    //     setTranslateX(newTranslateX); // Otherwise, update translateX normally
    //   }
    // }
  }, [activeIndex]);

  useEffect(() => {

    setTabs(name)
    dispatch(userDetail());

    const index = items.findIndex(item => item.name === name);
    setActiveIndex(index)

    // if (pickerRef.current) {
    //   const itemWidth = pickerRef.current.children[0].clientWidth;

    //   const newTranslateX = -(activeIndex * itemWidth);
    //   setTranslateX(newTranslateX)
    // }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, []);


  const handleJilliOpen = (data) => {
    setGameId(data)
    setJilliPopup(true)
  }

  const handleJilliSubmit = () => {

    dispatch(jilliGame(gameId)).then((res) => {
      if (res.payload.status) {
        if (userInfo?.isdemo == 0) {    
        window.open(res.payload.data.url, '_blank');
        setJilliPopup(false)
        }else{
          alert("This is a demo account")
          setJilliPopup(false)
        }
      }
    })

  }

  return (
    <>
      <div className='nav-bg p-1 py-3 sticky top-0 z-10'>
        <div className="container-section flex items-center">
          <button className='absolute'><Link to={"/"}><IoIosArrowBack className='text-xl' /></Link></button>
          <h1 className='heading-h1 gray-50 text-center flex justify-center items-center m-auto'>Game</h1>
        </div>
      </div>

      <Container className='scroll-none'>
        <Picker  className=''
        >
          {items.map((item, index) => (
            <Item
              className='text-sm nav-bg rounded-md '
              key={index}
              active={index === activeIndex}
              onClick={() => handleClick(index)}
            >
              <Span >
                {item.icon}
              </Span>
              <p className='flex '>{item.name}</p>
            </Item>
          ))}
        </Picker>
        <div className='picker-bottom-highlight'></div>
      </Container>

      <div className="container-section">
        {/* jilli game */}
        {tab === "Jilli" && (
          <div className="grid grid-cols-12 gap-3 mt-3">
            {Jilli.map((img, index) => (
              <div className="col-span-4" key={index}>
                <img src={img} alt={`Image ${index + 1}`} className="w-full h-[150px] cursor-pointer rounded-lg" loading='lazy' 
                   onClick={()=>{
                    index===0 && handleJilliOpen(113);
                    index===1 && handleJilliOpen(61);
                    index===2 && handleJilliOpen(112);
                    index===3 && handleJilliOpen(111);
                    index===4 && handleJilliOpen(113);
                    index===5 && handleJilliOpen(63);
                    index===6 && handleJilliOpen(62);
                   }
                                            }
                
                />
              </div>
            ))}
          </div>
        )}

{/* Crash game */}
        {tab === "Crash" && (
          <div className="grid grid-cols-12 gap-3 mt-3">
            {Crash.map((img, index) => (
              <div className="col-span-4" key={index}>
                <img src={img} alt={`Image ${index + 1}`} className="w-full h-[150px] cursor-pointer rounded-lg" loading='lazy'  
                      onClick={()=>{
                        index===0 && handleJilliOpen(261);
                        index===1 && handleJilliOpen(254);
                        index===2 && handleJilliOpen(242);
                        index===3 && handleJilliOpen(241);
                        index===4 && handleJilliOpen(236);
                        index===5 && handleJilliOpen(235);
                        index===6 && handleJilliOpen(232);
                        index===7 && handleJilliOpen(233);
                        index===8 && handleJilliOpen(229);
                        index===9 && handleJilliOpen(224);
                       }
                                                }

                
                />
              </div>
            ))}
          </div>
        )}

{/* MG_Fish game */}
        {tab === "MG_Fish" && (
          <div className="grid grid-cols-12 gap-3 mt-3">
            {Fishing.map((img, index) => (
              <div className="col-span-4" key={index}>
                <img src={img} alt={`Image ${index + 1}`} className="w-full h-[150px] cursor-pointer rounded-lg" loading='lazy'  
                      onClick={()=>{
                        index===0 && handleJilliOpen(882);
                        index===1 && handleJilliOpen(212);
                        index===2 && handleJilliOpen(119);
                        index===3 && handleJilliOpen(1);
                        index===4 && handleJilliOpen(60);
                        index===5 && handleJilliOpen(74);
                        index===6 && handleJilliOpen(71);
                        index===7 && handleJilliOpen(42);
                        index===8 && handleJilliOpen(32);
                        index===9 && handleJilliOpen(20);
                       }
                                                }

                />
              </div>
            ))}
          </div>
        )}
{/* Rummy game */}
        {tab === "Rummy" && (
          <div className="grid grid-cols-12 gap-3 mt-3">
            {Rummy.map((img, index) => (
              <div className="col-span-4" key={index}>
                <img src={img} alt={`Image ${index + 1}`} className="w-full h-[150px] cursor-pointer rounded-lg" loading='lazy'  
                     onClick={()=>{
                      index===0 && handleJilliOpen(253);
                      index===1 && handleJilliOpen(220);
                      index===2 && handleJilliOpen(211);
                      index===3 && handleJilliOpen(231);
                      index===4 && handleJilliOpen(221);
                      index===5 && handleJilliOpen(219);
                      index===6 && handleJilliOpen(160);
                      index===7 && handleJilliOpen(159);
                      index===8 && handleJilliOpen(127);
                      index===9 && handleJilliOpen(75);
                      index===10 && handleJilliOpen(94);
                      index===11 && handleJilliOpen(79);
                      index===12 && handleJilliOpen(72);
                     }
                                              }
                />
              </div>
            ))}
          </div>
        )}
{/* Slots game */}
        {tab === "Slots" && (
          <div className="grid grid-cols-12 gap-3 mt-3">
            {Slots.map((img, index) => (
              <div className="col-span-4" key={index}>
                <img src={img} alt={`Image ${index + 1}`} className="w-full h-[150px] cursor-pointer rounded-lg" loading='lazy' 
                  onClick={()=>{
                    index===0 && handleJilliOpen(303);
                    index===1 && handleJilliOpen(301);
                    index===2 && handleJilliOpen(252);
                    index===3 && handleJilliOpen(238);
                    index===4 && handleJilliOpen(239);
                    index===5 && handleJilliOpen(230);
                    index===6 && handleJilliOpen(225);
                    index===7 && handleJilliOpen(223);
                    index===8 && handleJilliOpen(214);
                    index===9 && handleJilliOpen(209);
                    index===10 && handleJilliOpen(193);
                    index===11 && handleJilliOpen(198);
                    index===12 && handleJilliOpen(183);
                    index===13 && handleJilliOpen(181);
                    index===14 && handleJilliOpen(191);
                    index===15 && handleJilliOpen(176);
                    index===16 && handleJilliOpen(172);
                    index===17 && handleJilliOpen(171);
                    index===18 && handleJilliOpen(166);
                    index===19 && handleJilliOpen(164);
                    index===20 && handleJilliOpen(146);
                    index===21 && handleJilliOpen(153);
                    index===22 && handleJilliOpen(144);
                    index===23 && handleJilliOpen(145);
                    index===24 && handleJilliOpen(137);
                    index===25 && handleJilliOpen(142);
                    index===26 && handleJilliOpen(136);
                    index===27 && handleJilliOpen(135);
                    index===28 && handleJilliOpen(126);
                    index===29 && handleJilliOpen(130);
                    index===30 && handleJilliOpen(134);
                    index===31 && handleJilliOpen(115);
                    index===33 && handleJilliOpen(116);
                    index===34 && handleJilliOpen(109);
                    index===35 && handleJilliOpen(110);
                    index===36 && handleJilliOpen(108);
                    index===37 && handleJilliOpen(103);
                    index===38 && handleJilliOpen(106);
                    index===39 && handleJilliOpen(102);
                    index===40 && handleJilliOpen(100);
                    index===41 && handleJilliOpen(101);
                    index===42 && handleJilliOpen(92);
                    index===43 && handleJilliOpen(91);
                    index===44 && handleJilliOpen(87);
                    index===45 && handleJilliOpen(85);
                    index===46 && handleJilliOpen(78);
                    index===47 && handleJilliOpen(77);
                    index===48 && handleJilliOpen(51);
                    index===49 && handleJilliOpen(66);
                    index===50 && handleJilliOpen(76);
                    index===51 && handleJilliOpen(58);
                    index===52 && handleJilliOpen(49);
                    index===53 && handleJilliOpen(48);
                    index===54 && handleJilliOpen(47);
                    index===55 && handleJilliOpen(46);
                    index===56 && handleJilliOpen(40);
                    index===57 && handleJilliOpen(43);
                    index===58 && handleJilliOpen(45);
                    index===59 && handleJilliOpen(38);
                    index===60 && handleJilliOpen(36);
                    index===61 && handleJilliOpen(35);
                    index===62 && handleJilliOpen(33);
                    index===63 && handleJilliOpen(27);
                    index===64 && handleJilliOpen(30);
                    index===65 && handleJilliOpen(23);
                    index===66 && handleJilliOpen(17);
                    index===67 && handleJilliOpen(21);
                    index===68 && handleJilliOpen(16);
                    index===69 && handleJilliOpen(9);
                    index===70 && handleJilliOpen(8);
                    index===71 && handleJilliOpen(7);
                    index===72 && handleJilliOpen(6);
                    index===73 && handleJilliOpen(2);
                   } }
                />
              </div>
            ))}
          </div>
        )}
{/* Casino game */}
        {tab === "Casino" && (
          <div className="grid grid-cols-12 gap-3 mt-3">
            {Casino.map((img, index) => (
              <div className="col-span-4" key={index}>
                <img src={img} alt={`Image ${index + 1}`} className="w-full h-[150px] cursor-pointer rounded-lg" loading='lazy' 
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
        )}

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

export default AllOnlineGames
