import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import { MdSportsBasketball, MdSportsSoccer } from 'react-icons/md';
import { PiApplePodcastsLogo, PiTelevisionSimpleFill } from 'react-icons/pi';
import { BiHeartCircle } from 'react-icons/bi';

const Container = styled.div`
  width: 100%;
  overflow: scroll;
  margin: 0 auto;
  position:relative;
  height:60px;
`;

const Picker = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;
  transform: translateX(${props => props.translateX}px);
  transition: transform 0.3s ease-out;
  z-index: 2;
  position: absolute;
 overflow: hidden;
`;

const Item = styled.div`
  height: 41.67px;
  display: flex;
  margin:auto;
  text-align:center;
  justify-content: center;
  align-items: center;
  color: ${props => (props.active ? '#fff' : '#CED6E1')};
  transition: color 0.3s;
  cursor: pointer;
  font-weight: 700;
  width: 120px; /* Assuming each item has a width of 100px */
  margin: 0 8px;
  background:${props => (props.active ? 'var(--Gradient-1, linear-gradient(93deg, var(--mediam-blue) 7.38%, var(--bgblue) 94.48%))' : 'var( --bg-color-l)')};
  padding: 8px;
`;

const Span = styled.span`
font-size:15px;
`;
const Img=styled.img`
width:20px;
`
const TopFilter = ({items}) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const pickerRef = useRef(null);
    const [translateX, setTranslateX] = useState(0);
 
    //   8273142996
  
  
  
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
    }, []);
  return (
    <>
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
              {item.name==="All"?
              <Span className='flex text-center  justify-center'>
                {item.icon}
              </Span>
:<Img src={item.icon} alt="" className='flex text-center  justify-center' />}
              <p className='flex fs-sm ms-1  text-center  justify-center'>{item.name}</p>
            </Item>
          ))}
        </Picker>
        <div className='picker-bottom-highlight'></div>
      </Container>
    </>
  )
}

export default TopFilter
