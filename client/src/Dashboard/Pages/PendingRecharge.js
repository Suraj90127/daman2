import React from 'react';
import { AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';

const tableData = [
  {
    id: 1,
    account: "John Doe",
    type: "Recharge",
    amount: "$50",
    utrNo: "UTR123456",
    time: "2023-10-01 10:00",
    orderId: "ORD001",
    status: "Pending",
  },
  {
    id: 2,
    account: "Jane Smith",
    type: "Recharge",
    amount: "$75",
    utrNo: "UTR654321",
    time: "2023-10-01 11:00",
    orderId: "ORD002",
    status: "Approved",
  },
  {
    id: 3,
    account: "Alice Johnson",
    type: "Recharge",
    amount: "$100",
    utrNo: "UTR789012",
    time: "2023-10-01 12:00",
    orderId: "ORD003",
    status: "Pending",
  },
  {
    id: 4,
    account: "Bob Brown",
    type: "Recharge",
    amount: "$200",
    utrNo: "UTR345678",
    time: "2023-10-01 13:00",
    orderId: "ORD004",
    status: "Rejected",
  },
  {
    id: 5,
    account: "Charlie Davis",
    type: "Recharge",
    amount: "$150",
    utrNo: "UTR901234",
    time: "2023-10-01 14:00",
    orderId: "ORD005",
    status: "Pending",
  },
];

const PendingRecharge = () => {
  const handleApprove = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to approve this recharge?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Approved!',
          'The recharge has been approved.',
          'success'
        )
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this record?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'The record has been deleted.',
          'success'
        )
      }
    });
  };

  return (
    <div>
      <div className="p-4 text-white">
        <h2 className="text-xl font-semibold mb-4 p-3">
          Approve Recharge
        </h2>
        <div className="overflow-x-auto nav-bg p-3">
          <table className="min-w-full border border-zinc-300">
            <thead>
              <tr className="bg-[#192434]">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Account</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">UTR No</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={data.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{data.account}</td>
                  <td className="border px-4 py-2">{data.type}</td>
                  <td className="border px-4 py-2">{data.amount}</td>
                  <td className="border px-4 py-2">{data.utrNo}</td>
                  <td className="border px-4 py-2">{data.time}</td>
                  <td className="border px-4 py-2">{data.orderId}</td>
                  <td className="border px-4 py-2">{data.status}</td>
                  <td className="border px-4 py-2 flex justify-around">
                    <button
                      className="bg-green-500 text-white hover:bg-green-600 px-2 py-1 rounded"
                      onClick={handleApprove}
                    >
                      <AiOutlineCheck />
                    </button>
                    <button
                      className="bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded"
                      onClick={handleDelete}
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingRecharge;
