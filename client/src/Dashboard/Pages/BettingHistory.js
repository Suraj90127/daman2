import React, { useState } from "react";

const BettingHistory = () => {
  const [searchData, setsearchData] = useState("");
  const bettingHistoryData = [
    {
      id: 67305,
      userid: "9399444869",
      gameName: "wingo",
      amount: 4.85,
      win: 0.0,
      status: "Looser",
    },
    {
      id: 67304,
      userid: "9399444869",
      gameName: "wingo",
      amount: 19.4,
      win: 0.0,
      status: "Looser",
    },
    {
      id: 67303,
      userid: "7038267915",
      gameName: "wingo",
      amount: 0.97,
      win: 0.0,
      status: "Looser",
    },
    {
      id: 67302,
      userid: "9399444869",
      gameName: "wingo",
      amount: 14.55,
      win: 0.0,
      status: "Looser",
    },
    {
      id: 67301,
      userid: "7038267915",
      gameName: "wingo",
      amount: 0.97,
      win: 1.94,
      status: "Winner",
    },
    {
      id: 67300,
      userid: "7038267915",
      gameName: "wingo",
      amount: 4.85,
      win: 9.7,
      status: "Winner",
    },
    {
      id: 67299,
      userid: "9399444869",
      gameName: "wingo",
      amount: 14.55,
      win: 0.0,
      status: "Looser",
    },
    {
      id: 67298,
      userid: "9399444869",
      gameName: "wingo",
      amount: 9.7,
      win: 0.0,
      status: "Looser",
    },
  ];

  const filterData = bettingHistoryData.filter((item) =>
    item.userid.includes(searchData)
  );

  return (
    <div className="text-white">
      <div className=" p-4">
        <h1 className="text-white text-2xl font-semibold">Betting History</h1>
        <input
          type="text"
          placeholder="Enter the account to search"
          className=" p-2 rounded w-full mt-7 nav-bg"
          value={setsearchData}
          onChange={(e) => setsearchData(e.target.value)}
        />
      </div>
      <div className="nav-bg py-3 px-2 overflow-x-auto rounded">
        <h2 className="text-white text-xl font-semibold">Betting History</h2>
      <table className="min-w-full  mt-5">
        <thead>
          <tr className="bg-[#192434]">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Userid</th>
            <th className="border px-4 py-2">Game Name</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Win</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((item) => (
            <tr key={item.id} className="border-b text-center">
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.userid}</td>
              <td className="border px-4 py-2">{item.gameName}</td>
              <td className="border px-4 py-2">{item.amount.toFixed(2)}</td>
              <td className="border px-4 py-2">{item.win.toFixed(2)}</td>
              <td className="border px-4 py-2">
                <span
                  className={`px-2 py-1 rounded ${
                    item.status === "Winner" ? "bg-green-500" : "bg-red-500"
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
  );
};

export default BettingHistory;
