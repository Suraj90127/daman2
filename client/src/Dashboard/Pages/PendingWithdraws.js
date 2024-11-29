import React from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const tableData = [
  {
    id: 187,
    upi: "ia3553421@gmail.com",
    usdtAddress: "Mumbai",
    account: "7208305839",
    bank: "HDFC",
    accountNumber: "501004085958850",
    ifscCode: "HDFC0002655",
    cardholderName: "IRFAN AHMAD",
    amount: "₹300",
    status: "Waiting...",
    date: "2024-08-08 5:24:21 PM",
  },
  {
    id: 187,
    upi: "ia3553421@gmail.com",
    usdtAddress: "Mumbai",
    account: "7208305839",
    bank: "HDFC",
    accountNumber: "501004085958850",
    ifscCode: "HDFC0002655",
    cardholderName: "IRFAN AHMAD",
    amount: "₹300",
    status: "Waiting...",
    date: "2024-08-08 5:24:21 PM",
  },
  {
    id: 187,
    upi: "ia3553421@gmail.com",
    usdtAddress: "Mumbai",
    account: "7208305839",
    bank: "HDFC",
    accountNumber: "501004085958850",
    ifscCode: "HDFC0002655",
    cardholderName: "IRFAN AHMAD",
    amount: "₹300",
    status: "Waiting...",
    date: "2024-08-08 5:24:21 PM",
  },
  // Add other rows similarly...
];

const handleApprove = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to approve this transaction?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, approve it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Approved!", "The transaction has been approved.", "success");
    }
  });
};

const handleDelete = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "The transaction has been deleted.", "success");
    }
  });
};

const ApproveWithdrawal = () => {
  return (
    <div className="container mx-auto text-white">
      <h2 className="text-2xl font-bold text-primary mb-4 text-white p-2 rounded">Approve Withdrawal</h2>
      <div className="w-full overflow-x-auto">
      <table className="min-w-full nav-bg border border-zinc-300 rounded-lg shadow-md overflow-auto">
        <thead>
          <tr className="bg-[#192434] text-white">
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">UPI</th>
            <th className="py-2 px-4 border-b">USDT Address</th>
            <th className="py-2 px-4 border-b">Account</th>
            <th className="py-2 px-4 border-b">Bank</th>
            <th className="py-2 px-4 border-b">Account Number</th>
            <th className="py-2 px-4 border-b">IFSC Code</th>
            <th className="py-2 px-4 border-b">Cardholder Name</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {tableData.map((data, index) => (
            <tr key={data.id} className="text-white">
              <td className="py-2 px-4 border-b">{data.id}</td>
              <td className="py-2 px-4 border-b">{data.upi}</td>
              <td className="py-2 px-4 border-b">{data.usdtAddress}</td>
              <td className="py-2 px-4 border-b">{data.account}</td>
              <td className="py-2 px-4 border-b">{data.bank}</td>
              <td className="py-2 px-4 border-b">{data.accountNumber}</td>
              <td className="py-2 px-4 border-b">{data.ifscCode}</td>
              <td className="py-2 px-4 border-b">{data.cardholderName}</td>
              <td className="py-2 px-4 border-b">{data.amount}</td>
              <td className="py-2 px-4 border-b">{data.status}</td>
              <td className="py-2 px-4 border-b">{data.date}</td>
              <td className="py-2 px-4 border-b flex gap-2 justify-around">
                <button onClick={handleApprove} className="bg-green-500 text-white hover:bg-green-600 px-2 py-1 rounded">
                  <FaCheck />
                </button>
                <button onClick={handleDelete} className="bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ApproveWithdrawal;
