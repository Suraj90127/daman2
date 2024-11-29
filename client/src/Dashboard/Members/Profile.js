import React from 'react'

  // Sample data for Withdrawal history
  const withdrawalHistory = [
    { id: 1, amount: 200, bank: 'Bank A', status: 'Completed', time: '2024-08-09 14:22' },
    { id: 2, amount: 150, bank: 'Bank B', status: 'Pending', time: '2024-08-08 10:15' },
    { id: 3, amount: 300, bank: 'Bank C', status: 'Failed', time: '2024-08-07 16:40' },
  ];

  // Sample data for Gift history
  const giftHistory = [
    { creator: 'User123', amount: 50, code: 'ABCD1234', status: 'Redeemed', time: '2024-08-05 09:30' },
    { creator: 'User456', amount: 100, code: 'EFGH5678', status: 'Pending', time: '2024-08-04 12:45' },
  ];

  // Sample data for Bet history
  const betHistory = [
    { periods: 'Period 1', amount: 100, type: 'Win', status: 'Completed', time: '2024-08-06 18:22' },
    { periods: 'Period 2', amount: 200, type: 'Loss', status: 'Completed', time: '2024-08-05 20:10' },
  ];

const Profile = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 bg-background sm:p-1 md:p-2 rounded-lg shadow-lg text-white">
        <div className="w-full md:w-1/3 p-4 nav-bg">
          <div className="flex justify-center flex-c items-center mb-4">
            <img className="w-16 h-16 rounded-full" src="https://openui.fly.dev/openui/24x24.svg?text=👤" alt="User Avatar" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Member64708</h2>
              <p className="text-muted-foreground">ID: 96116</p>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg">
            <p className="flex justify-between border-b-[1px] p-2"><span>Surplus:</span> <span>0.0</span></p>
            <p className="flex justify-between border-b-[1px] p-2"><span>Total Recharge:</span> <span>0.0</span></p>
            <p className="flex justify-between border-b-[1px] p-2"><span>Total Widthdrawls:</span> <span>0.0</span></p>
            <p className="flex justify-between border-b-[1px] p-2"><span>General Invitation:</span> <span>0.0</span></p>
            <p className="flex justify-between border-b-[1px] p-2"><span>IP:</span> <span>130.1313.313.340</span></p>
            <p className="flex justify-between border-b-[1px] p-2"><span>Inviter:</span> <span>73463500</span></p>
            <p className="flex justify-between border-b-[1px] p-2"><span>Daily</span> <span>73463500</span></p>
            <button className="bg-[#192434] hover:bg-[#192434]/80 mt-4 p-2 rounded w-full">USER</button>
          </div>
          <div className="nav-bg p-4 rounded mt-4">
            <h3 className="font-semibold p-2 bg-[#192434] text-center">Bank Information</h3>
            <div className="mt-4">
              <label htmlFor="bankname" className="block text-muted-foreground">Bank Name</label>
              <input type="text" id="bankname" name="bankname" className="w-full bg-body p-2 rounded" placeholder="Enter Bank Name" />
            </div>
            <div className="mt-4">
              <label htmlFor="Account" className="block text-muted-foreground">Account Name</label>
              <input type="text" id="Account" name="Account" className="w-full bg-body p-2 rounded" placeholder="Enter Account Name" />
            </div>
            <div className="mt-4">
              <label htmlFor="number" className="block text-muted-foreground">Account Number</label>
              <input type="number" id="number" name="number" className="w-full bg-body p-2 rounded" placeholder="Enter Account Number" />
            </div>
            <div className="mt-4">
              <label htmlFor="ifsc" className="block text-muted-foreground">IFSC code</label>
              <input type="text" id="ifsc" name="ifsc" className="w-full bg-body p-2 rounded" placeholder="Enter IFSC Code" />
            </div>
            <div className="mt-4">
              <label htmlFor="upi" className="block text-muted-foreground">UPI</label>
              <input type="upi" id="upi" name="upi" className="w-full bg-body p-2 rounded" placeholder="Enter UPI" />
            </div>
            <button className="bg-[#192434] hover:bg-[#192434]/80 mt-4 p-2 rounded w-full">Save Changes</button>
          </div>
        </div>
        <div className='flex flex-col w-full'>
        <div className="nav-bg p-4 rounded mb-4">
        <h3 className="font-semibold">Withdrawal history</h3>
        <table className="min-w-full mt-2">
          <thead>
            <tr className='bg-[#192434]'>
              <th className="border-b p-2">ID</th>
              <th className="border-b p-2">Amount</th>
              <th className="border-b p-2">Bank</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {withdrawalHistory.length > 0 ? (
              withdrawalHistory.map((item) => (
                <tr key={item.id} className='text-center'>
                  <td className="border-b p-2">{item.id}</td>
                  <td className="border-b p-2">{item.amount}</td>
                  <td className="border-b p-2">{item.bank}</td>
                  <td className="border-b p-2">{item.status}</td>
                  <td className="border-b p-2">{item.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-2">
                  No undefined found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="nav-bg p-4 rounded mb-4">
        <h3 className="font-semibold">History of receiving gifts (0 / 0 Lixi)</h3>
        <table className="min-w-full mt-2">
          <thead>
            <tr className='bg-[#192434]'>
              <th className="border-b p-2">Creator</th>
              <th className="border-b p-2">Amount</th>
              <th className="border-b p-2">CODE</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {giftHistory.length > 0 ? (
              giftHistory.map((item, index) => (
                <tr key={index} className='text-center'>
                  <td className="border-b p-2">{item.creator}</td>
                  <td className="border-b p-2">{item.amount}</td>
                  <td className="border-b p-2">{item.code}</td>
                  <td className="border-b p-2">{item.status}</td>
                  <td className="border-b p-2">{item.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-2">
                  No undefined found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="nav-bg p-4 rounded mb-4">
        <h3 className="font-semibold">Bet history</h3>
        <table className="min-w-full mt-2">
          <thead>
            <tr className='bg-[#192434]'>
              <th className="border-b p-2">Periods</th>
              <th className="border-b p-2">Amount</th>
              <th className="border-b p-2">Type</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {betHistory.length > 0 ? (
              betHistory.map((item, index) => (
                <tr key={index} className='text-center'>
                  <td className="border-b p-2">{item.periods}</td>
                  <td className="border-b p-2">{item.amount}</td>
                  <td className="border-b p-2">{item.type}</td>
                  <td className="border-b p-2">{item.status}</td>
                  <td className="border-b p-2">{item.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-2">
                  No undefined found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Profile
