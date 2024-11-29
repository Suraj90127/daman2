import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 300px;
  height: 400px; /* Adjust maximum height as needed */
  overflow: hidden;
 
  margin: 0 auto;

  color: white;
`;

const Picker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(${props => props.translateY}px);
  transition: transform 0.3s ease-out;
  padding: 0;
`;

const Item = styled.div`
  height: 40px; /* Adjust height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: ${props => (props.active ? '#fff' : '#aaa')};
  transition: color 0.3s;
  cursor: pointer;
`;

const WheelPicker = ({ items, currentDate,onValueChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pickerRef = useRef(null);
  const [valuess,setValuess]=useState(40)
  const [valuess2,setValuess2]=useState(40)
let datavalue=0
let datavalue2=0
  useEffect(() => {
    const currentIndex = items.findIndex(item => item === currentDate);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
      if (pickerRef.current) {
        scrollToIndex(currentIndex);
      }
    }
  }, [currentDate, items]);

  const handleClick = index => {
    setActiveIndex(index);
    scrollToIndex(index);
    const selectedItem = items[index];
    // console.log("Selected Item Value:", selectedItem);
    console.log("object",selectedItem)
    // if (onValueChange) {
    //   onValueChange(selectedItem); // Call the parent callback with the selected item value
    // }
  if(datavalue<-215){
    setValuess(valuess+40)

  }
  if(datavalue2<=-945){
    setValuess2(valuess2+40)
  }
  };
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const scrollToIndex = index => {
    if (pickerRef.current) {
      // const containerHeight = pickerRef.current.clientHeight;
      const containerHeight = 490;
      const itemHeight = pickerRef.current.children[0].clientHeight;
      const maxTranslateY = Math.min(400, containerHeight - itemHeight * 20); // Max translateY is 400px or enough to show all items
  
      // Calculate translateY to center the selected item
      const translateY = -index * itemHeight + containerHeight / 3.5 - itemHeight / 2;
  
      // Adjust translateY to be 50% positive and 50% negative
      const halfContainerHeight = containerHeight / 2;
      const maxTranslateYPositive = halfContainerHeight - itemHeight / 2;
      const maxTranslateYNegative = -maxTranslateYPositive;
      const finalTranslateY = Math.max(Math.min(translateY, maxTranslateYPositive), maxTranslateYNegative);
  if(finalTranslateY<-210){
  
    if(finalTranslateY-valuess<=-945){
      
      pickerRef.current.style.transform = `translateY(${finalTranslateY+valuess2}px)`;
    }else{
      pickerRef.current.style.transform = `translateY(${finalTranslateY-valuess}px)`;

    }
 
  
  }

  
  else{
    pickerRef.current.style.transform = `translateY(${finalTranslateY}px)`;
  }
      // pickerRef.current.style.transform = `translateY(${finalTranslateY}px)`;
      datavalue=finalTranslateY
      datavalue2=finalTranslateY-valuess
    
    }
  };

  // const handleTransitionEnd = () => {
  //   if (onValueChange) {
  //     onValueChange(items[activeIndex]); // Call the parent callback with the selected item value
  //   }
  // };
  return (
    <Container>
      <Picker ref={pickerRef} >
        {items.map((item, index) => (
          <Item
            key={index}
            active={index === activeIndex}
            onClick={() => handleClick(index)}
          >
            {item}
          </Item>
        ))}
      </Picker>
    </Container>
  );
};

export default WheelPicker;
