import React, { useState } from 'react';

const RechargeApproved = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const deposits = [
      {
        id: 694,
        account: '8169448604',
        type: 'upi_manual',
        amount: 2000,
        utr: '458800205015',
        orderId: '20247188968136573862',
        time: '2024-08-08 6:48:33 PM',
        status: 'Success',
      },
      {
        id: 693,
        account: '7208325937',
        type: 'upi_manual',
        amount: 50000,
        utr: '147162804334',
        orderId: '20247186842351574880',
        time: '2024-08-08 6:46:11 PM',
        status: 'Success',
      },
      {
        id: 694,
        account: '8169448604',
        type: 'upi_manual',
        amount: 2000,
        utr: '458800205015',
        orderId: '20247188968136573862',
        time: '2024-08-08 6:48:33 PM',
        status: 'Success',
      },
      {
        id: 693,
        account: '7208325937',
        type: 'upi_manual',
        amount: 50000,
        utr: '147162804334',
        orderId: '20247186842351574880',
        time: '2024-08-08 6:46:11 PM',
        status: 'Success',
      },
      {
        id: 694,
        account: '8169448604',
        type: 'upi_manual',
        amount: 2000,
        utr: '458800205015',
        orderId: '20247188968136573862',
        time: '2024-08-08 6:48:33 PM',
        status: 'Success',
      },
      {
        id: 693,
        account: '7208325937',
        type: 'upi_manual',
        amount: 50000,
        utr: '147162804334',
        orderId: '20247186842351574880',
        time: '2024-08-08 6:46:11 PM',
        status: 'Success',
      },
      // Add more deposit data...
    ];
  
    // Filter deposits based on the search query
    const filteredDeposits = deposits.filter(deposit =>
      deposit.account.includes(searchQuery)
    );
  
  return (
    <div className="bg-background p-2 text-white">
    <h1 className="text-2xl font-bold text-primary">Deposit List</h1>
    <input
      type="text"
      placeholder="Enter the account to search"
      className="mt-4 p-2 border border-border nav-bg rounded w-full"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <div className="mt-6 nav-bg p-4 rounded">
      <h2 className="text-lg font-semibold ">Deposit List</h2>
      <table className="min-w-full mt-4">
        <thead>
          <tr className="bg-[#192434] border-t-[1px]">
            <th className="p-2 border-b border-border">#</th>
            <th className="p-2 border-b border-border">Account</th>
            <th className="p-2 border-b border-border">Type</th>
            <th className="p-2 border-b border-border">Amount</th>
            <th className="p-2 border-b border-border">UTR</th>
            <th className="p-2 border-b border-border">Order id</th>
            <th className="p-2 border-b border-border">Time</th>
            <th className="p-2 border-b border-border">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeposits.map((deposit) => (
            <tr key={deposit.id} className='text-center'>
              <td className="p-2 border-b border-border">{deposit.id}</td>
              <td className="p-2 border-b border-border">{deposit.account}</td>
              <td className="p-2 border-b border-border">{deposit.type}</td>
              <td className="p-2 border-b border-border">{deposit.amount}</td>
              <td className="p-2 border-b border-border">{deposit.utr}</td>
              <td className="p-2 border-b border-border">{deposit.orderId}</td>
              <td className="p-2 border-b border-border">{deposit.time}</td>
              <td className={`p-2 border-b border-border ${deposit.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>
                {deposit.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default RechargeApproved
