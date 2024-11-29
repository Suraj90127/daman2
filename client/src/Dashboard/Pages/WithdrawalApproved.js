import {useState} from 'react'

const WithdrawalApproved = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const withdrawalData = [
      {
        id: 189,
        account: '97699686808',
        bank: 'UNION BANK OF INDIA',
        amount: 30930,
        orderId: '202488824201247748309',
        time: '2024-08-08',
        status: 'Success',
      },
      {
        id: 188,
        account: '98515137463',
        bank: 'KOTAK MAHINDRA BANK',
        amount: 2300,
        orderId: '202488735497940404',
        time: '2024-08-08',
        status: 'Success',
      },
      // Add more withdrawal objects here
    ];
  
    const filteredData = withdrawalData.filter((item) =>
      item.account.includes(searchTerm)
    );
  return (
    <div className="text-white p-2">
    <h1 className="text-2xl font-bold text-primary">Withdrawal List</h1>
    <input
      type="text"
      placeholder="Enter the account to search"
      className="mt-4 p-2 border border-border rounded w-full nav-bg"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <div className='nav-bg p-2 mt-7 rounded'>
    <div className=" text-white p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Withdrawal List</h2>
    </div>

    <table className="min-w-full mt-4 border-collapse">
      <thead>
        <tr className="bg-[#192434] text-muted-foreground">
          <th className="border border-border p-2">ID</th>
          <th className="border border-border p-2">Account</th>
          <th className="border border-border p-2">Bank</th>
          <th className="border border-border p-2">Amount</th>
          <th className="border border-border p-2">Order ID</th>
          <th className="border border-border p-2">Time</th>
          <th className="border border-border p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <tr className="border border-border text-center" key={item.id}>
            <td className="border border-border p-2">{item.id}</td>
            <td className="border border-border p-2">{item.account}</td>
            <td className="border border-border p-2">{item.bank}</td>
            <td className="border border-border p-2">{item.amount}</td>
            <td className="border border-border p-2">{item.orderId}</td>
            <td className="border border-border p-2">{item.time}</td>
            <td className="border border-border p-2">
              <span
                className={`p-1 rounded ${
                  item.status === 'Success' ? 'bg-green-500' : 'bg-red-500'
                } text-white`}
              >
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
  )
}

export default WithdrawalApproved
