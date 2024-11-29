import React from 'react'

const BankUpi = () => {
  return (
    <div className='text-white'>
    <h2 className='text-2xl font-semibold'>Settings</h2>
    {/*  */}
    <div className="mt-6 nav-bg p-3 flex flex-col gap-5 rounded">
              <h2 className="text-xl font-semibold mb-4 text-center">Change Deposit Information</h2>
              <div className="mb-6 flex flex-col gap-5">
                <h3 className="text-lg font-semibold">BANKING</h3>
                <input type="text" placeholder="Enter Rate" className='p-2 rounded bg-body' />
                <input type="text" placeholder="Enter Account Name" className='p-2 rounded bg-body' />
                <input type="text" placeholder="Enter Account Number" className='p-2 rounded bg-body' />
        
                <button className='p-2 rounded bg-[#192434] hover:bg-[#192434]/80'>Submit</button>
              </div>
        
              <div className="mt-6 nav-bg p-3 flex flex-col gap-5 rounded">
                <h3 className="text-lg font-semibold text-center">Manual Settings</h3>
                <h3 className="text-lg font-semibold">UPI</h3>
                <input type="text" placeholder="Rate" className='p-2 rounded bg-body'  />
                <input type="text" placeholder="Wallet Owner Name" className='p-2 rounded bg-body'  />
                <input type="text" placeholder="UPI ID" className='p-2 rounded bg-body'  />
                <input type="text" placeholder="USDT Wallet Address" className='p-2 rounded bg-body'  />
        
                <button className='p-2 rounded bg-[#192434] hover:bg-[#192434]/80'>Submit</button>
              </div>
            </div>
      
    </div>
  )
}

export default BankUpi
