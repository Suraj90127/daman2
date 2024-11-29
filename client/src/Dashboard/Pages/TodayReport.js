import React from 'react'

const data = [
  {
    id: 410,
    account: '9766467557',
    type: 'MOMO',
    amount: 110,
    utr: '421362840401',
    time: '2024-31-07 4:36:10 PM',
    status: 'Success',
    statusColor: 'text-green-500', // For conditional styling
  },
  {
    id: 410,
    account: '9766467557',
    type: 'MOMO',
    amount: 110,
    utr: '421362840401',
    time: '2024-31-07 4:36:10 PM',
    status: 'Success',
    statusColor: 'text-green-500', // For conditional styling
  },
  {
    id: 410,
    account: '9766467557',
    type: 'MOMO',
    amount: 110,
    utr: '421362840401',
    time: '2024-31-07 4:36:10 PM',
    status: 'Success',
    statusColor: 'text-green-500', // For conditional styling
  },
  {
    id: 410,
    account: '9766467557',
    type: 'MOMO',
    amount: 110,
    utr: '421362840401',
    time: '2024-31-07 4:36:10 PM',
    status: 'Success',
    statusColor: 'text-green-500', // For conditional styling
  },
  // Add more data objects as needed
];

const ReportTable = () => {
  return (
    <div className=" p-6">
      <h1 className="text-white text-2xl font-semibold mb-4">Today Report</h1>
      <div className="flex flex-col justify-center md:flex-row items-center mb-4">
        <select className="border border-zinc-300 rounded nav-bg text-white p-2 mb-2 md:mb-0 md:mr-2">
          <option>Recharge</option>
        </select>
        <input type="date" placeholder="mm/dd/yyyy" className="border border-zinc-300 rounded nav-bg text-white p-2 mb-2 md:mb-0 md:mr-2" />
        <button className=" text-white p-2 rounded bg-[#192434] mb-2 md:mb-0 md:mr-2">Search</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-zinc-300">
          <thead>
            <tr className="bg-[#192434] text-white">
              <th className="border border-zinc-300 p-2">#</th>
              <th className="border border-zinc-300 p-2">Account</th>
              <th className="border border-zinc-300 p-2">Type</th>
              <th className="border border-zinc-300 p-2">Amount</th>
              <th className="border border-zinc-300 p-2">UTR</th>
              <th className="border border-zinc-300 p-2">Time</th>
              <th className="border border-zinc-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="nav-bg text-white">
                <td className="border border-zinc-300 p-2">{item.id}</td>
                <td className="border border-zinc-300 p-2">{item.account}</td>
                <td className="border border-zinc-300 p-2">{item.type}</td>
                <td className="border border-zinc-300 p-2">{item.amount}</td>
                <td className="border border-zinc-300 p-2">{item.utr}</td>
                <td className="border border-zinc-300 p-2">{item.time}</td>
                <td className={`border border-zinc-300 p-2 ${item.statusColor}`}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
