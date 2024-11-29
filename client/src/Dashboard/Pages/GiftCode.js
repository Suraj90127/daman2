import React from 'react'

const giftcodeData = [
    { id: "QHVX6VN9KM3E4MK", creator: "8437335082", amount: "1.000", status: "not used yet", time: "2024/05/21 - 19:06:31" },
    { id: "DSSWJLIUYF9N9X0DL", creator: "8437335082", amount: "500", status: "not used yet", time: "2024/05/24 - 04:55:40" },
    { id: "1NQERQU7ROUQOCZN", creator: "8437335082", amount: "50", status: "not used yet", time: "2024/05/26 - 10:11:15" },
    { id: "XVSJMRU6UOSA3ISJ", creator: "8437335082", amount: "1.300", status: "not used yet", time: "2024/06/18 - 09:20:00" },
    { id: "TEZ72TKYG1TYCE7V", creator: "8437335082", amount: "20", status: "not used yet", time: "2024/06/18 - 09:26:48" },
    { id: "0YVBH2ICLZ8HN4L1", creator: "8437335082", amount: "20", status: "not used yet", time: "2024/06/18 - 09:26:57" },
    { id: "20240711SNR36N9U7ENPDZ", creator: "997001616", amount: "10", status: "not used yet", time: "2024/07/11 - 06:11:03" },
  ];
  
const GiftCode = () => {
  return (
    <div className="bg-background p-4 sm:p-1 text-white">
    <h1 className="text-2xl sm:text-3xl font-semibold text-primary">Giftcode</h1>
    <div className="mt-4">
      <label htmlFor="amount" className="block text-muted-foreground">
        Giftcode
      </label>
      <input
        type="text"
        id="amount"
        placeholder="Enter the amount"
        className="mt-1 p-2 border border-border rounded-md w-full nav-bg"
      />
      <button className="mt-2 bg-[#192434] py-2 px-3 rounded hover:bg-[#192434]/80">
        Submit
      </button>
    </div>
    <div className="mt-6 nav-bg text-white p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold">Gift code has not been used yet</h2>
      <div className="overflow-x-auto">
        <table className="mt-2 w-full text-left">
          <thead className='bg-[#192434] '>
            <tr className='rounded text-center'>
              <th className="border-b border-border p-2">ID</th>
              <th className="border-b border-border p-2">Creator</th>
              <th className="border-b border-border p-2">Gift code Amount</th>
              <th className="border-b border-border p-2">Already Used</th>
              <th className="border-b border-border p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {giftcodeData.map((item, index) => (
              <tr key={index} className='text-center'>
                <td className="border-b border-border p-2">{item.id}</td>
                <td className="border-b border-border p-2">{item.creator}</td>
                <td className="border-b border-border p-2">{item.amount}</td>
                <td className="border-b border-border p-2">{item.status}</td>
                <td className="border-b border-border p-2">{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default GiftCode
