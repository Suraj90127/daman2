// src/Slider.js
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Avatar1 from "../../assets/avatar1.png"
import Avatar2 from "../../assets/avatar2.png"
import Avatar3 from "../../assets/avatar3.png"
import Avatar4 from "../../assets/avatar4.png"
import Avatar5 from "../../assets/avatar5.png"

import WinImg1 from "../../assets/winimg1.png"
import WinImg2 from "../../assets/wingimg2.png"
import WinImg3 from "../../assets/winimg3.png"
import WinImg4 from "../../assets/wingo.png"
import WinImg5 from "../../assets/trx.png"

// Random text and number generators
const generateRandomText = () => {
  const prefix = 'MEM***';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = prefix;
  for (let i = 0; i < 3; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const getRandomINumber = () => {
  return (Math.random() * 1000).toFixed(2);
};

// Data for the avatars and winning images
const data = [
  { text: generateRandomText(), image: Avatar1, img: WinImg1, number: getRandomINumber() },
  { text: generateRandomText(), image: Avatar2, img: WinImg2, number: getRandomINumber() },
  { text: generateRandomText(), image: Avatar3, img: WinImg3, number: getRandomINumber() },
  { text: generateRandomText(), image: Avatar4, img: WinImg4, number: getRandomINumber() },
  { text: generateRandomText(), image: Avatar5, img: WinImg5, number: getRandomINumber() }
];

// Function to pick a random item from the data array
const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Component for showing winning information
const WinningInformation = () => {
  const [slides, setSlides] = useState(data.slice(0, 5)); // Initialize with 5 slides

  useEffect(() => {
    const interval = setInterval(() => {
      const randomItem = getRandomItem(data);
      const newSlide = { ...randomItem, id: uuidv4() };

      // Add new slide and keep the last 5 slides
      setSlides((prevSlides) => {
        const updatedSlides = [newSlide, ...prevSlides];
        return updatedSlides.slice(0, 5); // Keep only the last 5 slides
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"})
  },[])
  return (
    <>
      <h1 className='border-after mt-2'>
        Winning Information
      </h1>

      <div className='winning-item '>
        <div className="slider-container">
          <div className="slider">
            {slides.map((slide) => (
              <div key={slide.id} className="slide justify-between">
                <div className='flex items-center'>
                  <img src={slide.image} alt={slide.text} className='rounded-full w-[50px] h-[50px] mr-2' />
                  <p className='uppercase text-[12px]'>{slide.text}</p>
                </div>
                <div className='flex items-center mr-3'>
                  <img src={slide.img} alt={slide.text} className='rounded-md img2' />
                  <div className='ml-2'>
                    <h4 className='heading-h4 text-[14px] font-medium'>Recieve ₹{slide.number}</h4>
                    <p className='text-[12px] font-normal text-slate-400'>Winning Amount</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WinningInformation;
