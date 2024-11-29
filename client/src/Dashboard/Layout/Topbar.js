import React from 'react';
import { FaBars } from 'react-icons/fa';

const TopBar = ({ toggleSidebar, toggleMinimize, isSidebarMinimized }) => {
  return (
    <div className="flex items-center justify-between bg-gray-900 text-white p-4">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="md:hidden topbar-button">
          <FaBars />
        </button>
        <button onClick={toggleMinimize} className="hidden md:block topbar-button">
          <FaBars />
        </button>
        <h1 className="text-xl font-bold ml-4">Dashboard V5</h1>
      </div>
    </div>
  );
};

export default TopBar;
