import React from 'react';
import { GrUpdate } from "react-icons/gr";
import Swal from 'sweetalert2';

const LevelSetting = () => {
  const levelsData = [
    { level: 0, f1: "0.06", f2: "0.06", f3: "0.06", f4: "0.06" },
    { level: 1, f1: "0.75", f2: "0.75", f3: "0.75", f4: "0.75" },
    { level: 2, f1: "0.75", f2: "0.75", f3: "0.75", f4: "0.75" },
    { level: 3, f1: "0.75", f2: "0.75", f3: "0.75", f4: "0.75" },
    { level: 4, f1: "0.5", f2: "0.5", f3: "0.5", f4: "0.5" },
    { level: 5, f1: "0.5", f2: "0.5", f3: "0.5", f4: "0.5" },
    { level: 6, f1: "0.25", f2: "0.25", f3: "0.25", f4: "0.25" },
    { level: 7, f1: "0.25", f2: "0.25", f3: "0.25", f4: "0.25" },
    { level: 8, f1: "0.25", f2: "0.25", f3: "0.25", f4: "0.25" },
    { level: 9, f1: "0.25", f2: "0.25", f3: "0.25", f4: "0.25" },
    { level: 10, f1: "0.25", f2: "0.25", f3: "0.25", f4: "0.25" },
    { level: 11, f1: "0.25", f2: "0.25", f3: "0.25", f4: "0.25" },
  ];
  const handleUpdate = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to update the settings?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Updated!',
          'Your settings have been updated.',
          'success'
        );
      }
    });
  };
  return (
    <div>
    <div className="p-4 nav-bg rounded text-white" style={{boxShadow:"0px 0px 10px #343a99"}}>
      <h2 className="text-2xl font-semibold text-white">Levels Setting</h2>
      <table className="min-w-full mt-4">
        <thead>
          <tr className="bg-[#192434] text-white">
            <th className="border border-border p-2">Levels</th>
            <th className="border border-border p-2">F1</th>
            <th className="border border-border p-2">F2</th>
            <th className="border border-border p-2">F3</th>
            <th className="border border-border p-2">F4</th>
            <th className="border border-border p-2">Update</th>
          </tr>
        </thead>
        <tbody>
          {levelsData.map((levelData, index) => (
            <tr key={index}>
              <td className="border border-border text-white p-2">{levelData.level}</td>
              <td className="border border-border p-2">
                <input type="text" value={levelData.f1} className="border border-border p-1 bg-[#454d56]" />
              </td>
              <td className="border border-border p-2">
                <input type="text" value={levelData.f2} className="border border-border p-1 bg-[#454d56]" />
              </td>
              <td className="border border-border p-2">
                <input type="text" value={levelData.f3} className="border border-border p-1 bg-[#454d56]" />
              </td>
              <td className="border border-border p-2">
                <input type="text" value={levelData.f4} className="border border-border p-1 bg-[#454d56]" />
              </td>
              <td className="border border-border text-center p-2">
                <button className="bg-green-500 text-white p-2 rounded" onClick={handleUpdate}>
                  <GrUpdate />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default LevelSetting;
