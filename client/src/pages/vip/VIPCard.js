import React from 'react'

const VIPCard = ({ level, progress, maxProgress, bgColor, vipImage, iconImage, bgImage, track }) => {
  return (
    <>
      <div 
      className={`rounded-lg p-4 shadow-lg w-full`} 
      style={{ backgroundColor: bgColor, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[#fff2a2] font-semibold text-2xl flex gap-1 items-center">
          <img src={iconImage} className='w-[35px] font-sans' alt="" />VIP{level}
        </h3>
        <img src={vipImage} className='w-[60px]' alt="" />
      </div>
      <p className="text-white text-[0.7rem]">Upgrading VIP{level} requires {maxProgress - progress} EXP</p>
      <div className='flex justify-between mt-4'>
        <p className="text-white text-[0.6rem] mt-2 border px-1">Bet 1=1Exp</p>
        <p className="text-white text-[0.8rem] mt-2">VIP{level}</p>
      </div>
      <div className="mt-1 rounded-full overflow-hidden" style={{ backgroundColor: track }}>
        <div 
          className="bg-yellow-400 h-2 rounded-full" 
          style={{ width: `${(progress / maxProgress) * 100}%` }} 
        />
      </div>
      <div className='flex justify-between'>
        <p className="text-white text-[0.6rem] mt-2 px-2 rounded-full" style={{ backgroundColor: track }}>{progress}/{maxProgress}</p>
        <p className="text-white text-[0.6rem] mt-2">{maxProgress} EXP can be leveled up</p>
      </div>
    </div>
    </>
  )
}

export default VIPCard
