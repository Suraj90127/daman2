import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const data = [
  { id: 39558, mobile: '8169448604', position: 'USER', referCode: 'JIvQz97554', referBy: 'oCNXn89123', amount: 1170, password: 'Marshal@1421', status: 'Active' },
  { id: 84181, mobile: '9209931804', position: 'USER', referCode: 'jnrvy49662', referBy: 'yGiOO17100', amount: 0, password: 'Subhan123', status: 'Active' },
  { id: 39332, mobile: '6305383177', position: 'USER', referCode: 'OppgJ4362', referBy: 'xQtJY37878', amount: 0, password: '2580', status: 'Active' },
  { id: 44359, mobile: '8001213775', position: 'USER', referCode: 'hmAWr29033', referBy: 'QVERw41134', amount: 5750, password: 'BK04062014', status: 'Active' },
  { id: 35781, mobile: '8955109913', position: 'USER', referCode: 'NQCiv58933', referBy: 'ZMTJi89641', amount: 381, password: 'nikknikhil', status: 'Active' },
  { id: 70645, mobile: '78008663173', position: 'USER', referCode: 'ZraOB35365', referBy: 'HJlua23384', amount: 0, password: 'manishmj7471', status: 'Active' },
];

const Member = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const filteredData = data.filter((item) => {
    return (
      (statusFilter === 'All' || item.status === statusFilter) &&
      (item.mobile.includes(searchTerm) ||
        item.position.includes(searchTerm) ||
        item.referCode.includes(searchTerm) ||
        item.referBy.includes(searchTerm) ||
        item.password.includes(searchTerm))
    );
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleProfileClick = (id) => {
    Swal.fire({
      title: 'View Profile',
      text: `You are about to view the profile of member ID: ${id}.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'View Profile',
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to the profile page
        window.location.href = `/profile/${id}`;
      }
    });
  };

  const handleLockClick = (id) => {
    Swal.fire({
      title: 'Lock Account',
      text: `Are you sure you want to lock the account of member ID: ${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, lock it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle lock logic here
        Swal.fire('Locked!', 'The account has been locked.', 'success');
      }
    });
  };

  return (
    <div>
      <div className="bg-background dark:bg-card p-6 rounded-lg text-white">
        <h2 className="text-2xl font-bold text-white mb-4">Member List</h2>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <select
            className="border border-zinc-300 nav-bg p-2 rounded-md w-full md:w-auto"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
          <input
            type="text"
            placeholder="Enter the member you are looking for"
            className="border border-zinc-300 nav-bg p-2 rounded-md flex-1"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="bg-[#1f2937] text-white p-2 rounded-md">Search</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-border">
          <thead>
            <tr className="bg-[#192434] text-white">
              <th className="border border-border p-2">#</th>
              <th className="border border-border p-2">Mobile No.</th>
              <th className="border border-border p-2">Position</th>
              <th className="border border-border p-2">Refer Code</th>
              <th className="border border-border p-2">Refer By</th>
              <th className="border border-border p-2">Amount</th>
              <th className="border border-border p-2">Password</th>
              <th className="border border-border p-2">Status</th>
              <th className="border border-border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="nav-bg text-white">
                <td className="border border-border p-2">{item.id}</td>
                <td className="border border-border p-2">{item.mobile}</td>
                <td className="border border-border p-2">{item.position}</td>
                <td className="border border-border p-2">{item.referCode}</td>
                <td className="border border-border p-2">{item.referBy}</td>
                <td className="border border-border p-2">{item.amount}</td>
                <td className="border border-border p-2">{item.password}</td>
                <td className="border border-border p-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded">{item.status}</span>
                </td>
                <td className="border border-border p-2 flex space-x-2">
                <Link to="/profile"><button className="bg-blue-500 text-white p-1 rounded flex items-center">
                    <FaUser className="mr-1" /> Profile
                  </button></Link>
                  <button
                    className="bg-red-500 text-white p-1 rounded flex items-center"
                    onClick={() => handleLockClick(item.id)}
                  >
                    <FaLock className="mr-1" /> Lock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-gray-500 text-white p-2 rounded-md"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-gray-500 text-white p-2 rounded-md"
            onClick={handleNextPage}
            disabled={currentPage * itemsPerPage >= filteredData.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Member;
