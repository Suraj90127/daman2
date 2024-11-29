import React, { useState } from 'react'

const Turnover = () => {
    const [searchData, setsearchData] = useState("")
    const turnoverData = [
        {
          id: 3183,
          userid: '9499587229',
          sponsorid: 'eGczr92959',
          totalDeposit: 0,
          totalWithdrawal: 0,
          totalBonus: 0,
          totalBets: '0.00',
          totalWin: '0.00',
          totalLoss: 0,
          currentBal: 0,
          totalPL: 0
        },
        {
          id: 3182,
          userid: '9770737072',
          sponsorid: 'VnfUv82919',
          totalDeposit: 0,
          totalWithdrawal: 0,
          totalBonus: 0,
          totalBets: '0.00',
          totalWin: '0.00',
          totalLoss: 0,
          currentBal: 0,
          totalPL: 0
        },
        {
          id: 3181,
          userid: '9931143723',
          sponsorid: 'QuNZG67235',
          totalDeposit: 100,
          totalWithdrawal: 0,
          totalBonus: 15,
          totalBets: '0.00',
          totalWin: '0.00',
          totalLoss: 0,
          currentBal: 115,
          totalPL: 0
        },
        {
          id: 3180,
          userid: '9600703101',
          sponsorid: 'dphUp53286',
          totalDeposit: 0,
          totalWithdrawal: 0,
          totalBonus: 0,
          totalBets: '0.00',
          totalWin: '0.00',
          totalLoss: 0,
          currentBal: 0,
          totalPL: 0
        },
        // Add more data here as needed
      ];

      const filterData = turnoverData.filter((item) => 
        item.userid.includes(searchData) ||
        item.sponsorid.includes(searchData)
      );
  return (
    <div className="bg-background p-2 text-white">
      <h1 className="text-2xl font-bold text-primary">Turnover Report</h1>
      <input
        type="text"
        placeholder="Enter the account to search"
        className="mt-2 p-2 border border-border rounded w-full nav-bg"
        value={searchData}
        onChange={(e) => setsearchData(e.target.value)}
      />
      <div className="overflow-x-auto mt-7 p-2 rounded nav-bg">
        <table className="min-w-full bg-card border border-border">
          <thead>
            <tr className="bg-[#192434]">
              <th className="p-2 border border-border">#</th>
              <th className="p-2 border border-border">Userid</th>
              <th className="p-2 border border-border">Sponsorid</th>
              <th className="p-2 border border-border">Total Deposit</th>
              <th className="p-2 border border-border">Total Withdrawal</th>
              <th className="p-2 border border-border">Total Bonus</th>
              <th className="p-2 border border-border">Total Bets</th>
              <th className="p-2 border border-border">Total Win</th>
              <th className="p-2 border border-border">Total Loss</th>
              <th className="p-2 border border-border">Current Bal.</th>
              <th className="p-2 border border-border">Total P/L</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="p-2 border border-border">{item.id}</td>
                <td className="p-2 border border-border">{item.userid}</td>
                <td className="p-2 border border-border">{item.sponsorid}</td>
                <td className="p-2 border border-border">{item.totalDeposit}</td>
                <td className="p-2 border border-border">{item.totalWithdrawal}</td>
                <td className="p-2 border border-border">{item.totalBonus}</td>
                <td className="p-2 border border-border">{item.totalBets}</td>
                <td className="p-2 border border-border">{item.totalWin}</td>
                <td className="p-2 border border-border">{item.totalLoss}</td>
                <td className="p-2 border border-border">{item.currentBal}</td>
                <td className="p-2 border border-border">{item.totalPL}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Turnover
