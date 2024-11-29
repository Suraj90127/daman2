import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import { MdSportsBasketball, MdSportsSoccer } from 'react-icons/md';
import { PiApplePodcastsLogo, PiTelevisionSimpleFill } from 'react-icons/pi';
import { BiHeartCircle } from 'react-icons/bi';
import { FaRegDotCircle } from 'react-icons/fa';
import { AiOutlineSmallDash } from 'react-icons/ai';

const Container = styled.div`
   width: 100%;
  overflow: hidden;
  overflow: scroll;
    margin: 0 auto;
  position:relative;
  height:70px;
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
  height: 55.67px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${props => (props.active ? '#fff' : '#606877')};
  transition: color 0.3s;
  cursor: pointer;
  font-weight: 700;
 width: 120px; /* Assuming each item has a width of 100px */
  margin: 10px;
  background:${props => (props.active ? 'var(--Gradient-1, linear-gradient(93deg, var(--mediam-blue) 7.38%, var(--bgblue) 94.48%))' : 'var( --bg-color-l)')};
  padding: 10px 30px;
`;

const Span = styled.span`
font-size:24px;
`;



const RebateRatio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pickerRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [openAll, setOpenAll] = useState(false);

  const handleOpenAll = () => {
    setOpenAll(!openAll);
  };
  //   8273142996

  const items = [
    { name: 'Lottery', icon: <MdSportsBasketball /> },
    { name: 'Casino', icon: <PiTelevisionSimpleFill /> },
    {
      name: 'Sports', icon: <MdSportsSoccer />
    },
    { name: 'Rummy', icon: <BiHeartCircle /> },
    { name: 'Slots', icon: <PiApplePodcastsLogo /> },

  ];

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  useEffect(() => {
    if (pickerRef.current) {
      const itemWidth = pickerRef.current.children[0].clientWidth;
      const newTranslateX = -(activeIndex * itemWidth);

      // Check if newTranslateX exceeds the limit of -420px
      if (newTranslateX < -250) {
        setTranslateX(-250); // Set translateX to -420 if it exceeds
      } else if (newTranslateX > 0) {
        setTranslateX(0); // Set translateX to 0 if it's greater than 0
      } else {
        setTranslateX(newTranslateX); // Otherwise, update translateX normally
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    if (pickerRef.current) {
      const itemWidth = pickerRef.current.children[0].clientWidth;

      const newTranslateX = -(activeIndex * itemWidth);
      setTranslateX(newTranslateX)
    }
    window.scrollTo({top:0,behavior:"smooth"})
  }, []);

  return (
    <>
      <div className='blue-linear p-1 py-3 sticky top-0 z-10'>
        <div className="container-section flex items-center">
          <button  className='absolute'><Link to={"/promotion"}><IoIosArrowBack className='text-xl' /></Link></button>
          <h1 className='heading-h1 gray-50 text-center flex justify-center items-center m-auto'>RebateRatio</h1>
        </div>
      </div>

      <Container className='scroll-none'>
        <Picker ref={pickerRef} translateX={translateX} className=''
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
{(activeIndex==1 || activeIndex==2 ||activeIndex==3)?


(
        RebateData2.map((data, i) => (
          <div className="nav-bg rounded-md p-3 mb-3" key={i}>
            <div className='flex items-center'>
              <h3 className="heading-h3 mb-2">Rebate level</h3> <span className='text-xl ms-2 font-bold blue-color-300 italic'>L{i}</span>
            </div>
            <ul>
              {data?.item?.map((datas, i) => (

                <li className='flex  justify-between' key={i}>
                  <div className='flex '>
                    <div className='flex  flex-col items-center mt-[3px] mr-1'>
                      <FaRegDotCircle className='blue-color-300 bg-white rounded-full fs-sm mr-1 border-b' />
                      {i < 5 ? (
                        <AiOutlineSmallDash className='rotate-90 mt-[2px] mr-1 blue-color-300 fs-sm' />

                      ) : ""}

                    </div>
                    <p className='gray-100 text-sm '>{i + 1} level lower level commission Rebate</p>
                  </div>
                  <span className=' text-sm'>{datas.number}%</span>
                </li>
              ))}
            </ul>
          </div>
        ))

      ):(

        RebateData.map((data, i) => (
          <div className="nav-bg rounded-md p-3 mb-3" key={i}>
            <div className='flex items-center'>
              <h3 className="heading-h3 mb-2">Rebate level</h3> <span className='text-xl ms-2 font-bold blue-color-300 italic'>L{i}</span>
            </div>
            <ul>
              {data?.item?.map((datas, i) => (

                <li className='flex  justify-between' key={i}>
                  <div className='flex '>
                    <div className='flex  flex-col items-center mt-[3px] mr-1'>
                      <FaRegDotCircle className='blue-color-300 bg-white rounded-full fs-sm mr-1 border-b' />
                      {i < 5 ? (
                        <AiOutlineSmallDash className='rotate-90 mt-[2px] mr-1 blue-color-300 fs-sm' />

                      ) : ""}

                    </div>
                    <p className='gray-100 text-sm '>{i + 1} level lower level commission Rebate</p>
                  </div>
                  <span className=' text-sm'>{datas.number}%</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )
      }
      </div>

    </>
  );
};

export default RebateRatio;

const RebateData = [
  {
    item: [
      {
        number: 0.6
      },
      {
        number: 0.18
      },
      {
        number: 0.054
      },
      {
        number: 0.016
      },
      {
        number: 0.0048
      },
      {
        number: 0.0014
      },
    ]
  },
  {
    item: [
      {
        number: 0.7
      },
      {
        number: 0.24
      },
      {
        number: 0.085
      },
      {
        number: 0.03
      },
      {
        number: 0.01
      },
      {
        number: 0.0036
      },
    ]
  },
  {
    item: [
      {
        number: 0.75
      },
      {
        number: 0.28
      },
      {
        number: 0.1
      },
      {
        number: 0.039
      },
      {
        number: 0.014
      },
      {
        number: 0.0055
      },
    ]
  },
  {
    item: [
      {
        number: 0.8
      },
      {
        number: 0.32
      },
      {
        number: 0.12
      },
      {
        number: 0.051
      },
      {
        number: 0.02
      },
      {
        number: 0.0081
      },
    ]
  },
  {
    item: [
      {
        number: 0.85
      },
      {
        number: 0.36
      },
      {
        number: 0.15
      },
      {
        number: 0.065
      },
      {
        number: 0.027
      },
      {
        number: 0.011
      },
    ]
  },
  {
    item: [
      {
        number: 0.9
      },
      {
        number: 0.4
      },
      {
        number: 0.18
      },
      {
        number: 0.082
      },
      {
        number: 0.036
      },
      {
        number: 0.016
      },
    ]
  },
  {
    item: [
      {
        number: 0.1
      },
      {
        number: 0.5
      },
      {
        number: 0.25
      },
      {
        number: 0.12
      },
      {
        number: 0.062
      },
      {
        number: 0.031
      },
    ]
  },
  {
    item: [
      {
        number: 1.1
      },
      {
        number: 0.6
      },
      {
        number: 0.33
      },
      {
        number: 0.18
      },
      {
        number: 0.1
      },
      {
        number: 0.055
      },
    ]
  },
  {
    item: [
      {
        number: 1.2
      },
      {
        number: 0.72
      },
      {
        number: 0.43
      },
      {
        number: 0.25
      },
      {
        number: 0.15
      },
      {
        number: 0.093
      },
    ]
  },
  {
    item: [
      {
        number: 1.4
      },
      {
        number: 0.98
      },
      {
        number: 0.68
      },
      {
        number: 0.48
      },
      {
        number: 0.33
      },
      {
        number: 0.23
      },
    ]
  },
  {
    item: [
      {
        number: 0
      },
      {
        number: 0
      },
      {
        number: 0
      },
      {
        number: 0
      },
      {
        number: 0
      },
      {
        number: 0
      },
     
    ]
  },
]


const RebateData2 = [
  {
    item: [
      {
        number: 0.3
      },
      {
        number: 0.09
      },
      {
        number: 0.027
      },
      {
        number: 0.0081
      },
      {
        number: 0.0024
      },
      {
        number: 0.00072
      },    
    ]
  },
  
  {
    item: [
      {
        number: 0.35
      },
      {
        number: 0.12
      },
      {
        number: 0.042
      },
      {
        number: 0.015
      },
      {
        number: 0.0052
      },
      {
        number: 0.0018
      },    
    ]
  },
  {
    item: [
      {
        number: 0.37
      },
      {
        number: 0.14
      },
      {
        number: 0.052
      },
      {
        number: 0.019
      },
      {
        number: 0.0074
      },
      {
        number: 0.0027
      },    
    ]
  },
  {
    item: [
      {
        number: 0.4
      },
      {
        number: 0.16
      },
      {
        number: 0.064
      },
      {
        number: 0.025
      },
      {
        number: 0.01
      },
      {
        number: 0.004
      },    
    ]
  },
  {
    item: [
      {
        number: 0.42
      },
      {
        number: 0.18
      },
      {
        number: 0.076
      },
      {
        number: 0.032
      },
      {
        number: 0.013
      },
      {
        number: 0.0058
      },    
    ]
  },
  {
    item: [
      {
        number: 0.45
      },
      {
        number: 0.02
      },
      {
        number: 0.091
      },
      {
        number: 0.041
      },
      {
        number: 0.018
      },
      {
        number: 0.0083
      },    
    ]
  },
  {
    item: [
      {
        number: 0.5
      },
      {
        number: 0.25
      },
      {
        number: 0.12
      },
      {
        number: 0.062
      },
      {
        number: 0.031
      },
      {
        number: 0.015
      },    
    ]
  },
  {
    item: [
      {
        number: 0.55
      },
      {
        number: 0.3
      },
      {
        number: 0.16
      },
      {
        number: 0.091
      },
      {
        number: 0.05
      },
      {
        number: 0.027
      },    
    ]
  },
  {
    item: [
      {
        number: 0.6
      },
      {
        number: 0.36
      },
      {
        number: 0.21
      },
      {
        number: 0.12
      },
      {
        number: 0.077
      },
      {
        number: 0.046
      },    
    ]
  },
  {
    item: [
      {
        number: 0.7
      },
      {
        number: 0.49
      },
      {
        number: 0.34
      },
      {
        number: 0.24
      },
      {
        number: 0.16
      },
      {
        number: 0.11
      },    
    ]
  },
  {
    item: [
      {
        number: 0
      },
      {
        number: 0
      },
      {
        number: 0
      },
      {
        number: 0
      },
      {
        number: 0
      },
      {
        number: 0
      },    
    ]
  },

]