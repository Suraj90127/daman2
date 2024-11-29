import React from 'react'
const data = [
    { phone: '7498335717', amount: 12000, type: 'daily', time: '31/07/2024, 08:40:30 pm' },
    { phone: '9769968608', amount: 1300, type: 'daily', time: '31/07/2024, 08:40:16 pm' },
    { phone: '9769968608', amount: 1300, type: 'daily', time: '30/07/2024, 11:30:57 pm' },
    { phone: '7498335717', amount: 12000, type: 'daily', time: '30/07/2024, 11:30:42 pm' },
    { phone: '7667849563', amount: 1000, type: 'daily', time: '28/07/2024, 06:56:48 pm' },
    { phone: '9769968608', amount: 1300, type: 'daily', time: '28/07/2024, 06:55:18 pm' },
    { phone: '7498335717', amount: 12000, type: 'daily', time: '28/07/2024, 06:54:18 pm' },
    { phone: '7498335717', amount: 12000, type: 'daily', time: '27/07/2024, 04:24:54 pm' },
  ];
const CreatedSalery = () => {
  return (
    <div className='text-white'>
      <h2 className='text-2xl text-white font-semibold'>Created Salary Record</h2>
      <div className='rounded bg-[#1f2937] w-[100%] p-4 flex flex-col gap-4 mt-3' style={{boxShadow:"0px 0px 10px #343a99"}}>
      <div className='flex flex-col gap-2'>
        <label className='font-semibold' htmlFor="number">Phone Number</label>
        <input  className='py-2 px-2 rounded bg-body' type="text" placeholder='Enter Mobile Number' id='number' />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='font-semibold' htmlFor="number">Amount</label>
        <input  className='py-2 px-2 rounded bg-body' type="number" placeholder='Enter Mobile Number' id='number' />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='font-semibold' htmlFor="number">Type</label>
        <select className='py-2 px-2 rounded bg-body' >
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="daily">Daily</option>
        </select>
      </div>
      <button className='px-3 rounded py-1 bg-body w-fit'>Submit</button>
      </div>
      {/* table */}
      <div className="overflow-x-auto bg-[#1f2937] mt-10 rounded" style={{boxShadow:"0px 0px 10px #343a99"}}>
      <h3 className='text-white p-3 border-b-2'>Salary Records Table</h3>
      <table className="min-w-full bg-card">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            <th className="py-2 px-4 border-b border-border">Phone</th>
            <th className="py-2 px-4 border-b border-border">Amount</th>
            <th className="py-2 px-4 border-b border-border">Type</th>
            <th className="py-2 px-4 border-b border-border">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-muted">
              <td className="py-2 px-4 text-center border-b border-border">{item.phone}</td>
              <td className="py-2 px-4 text-center border-b border-border">{item.amount}</td>
              <td className="py-2 px-4 text-center border-b border-border">{item.type}</td>
              <td className="py-2 px-4 text-center border-b border-border">{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default CreatedSalery
