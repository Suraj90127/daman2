import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import EmptyImg from "../../assets/empty.png"
import { useSelector, useDispatch } from "react-redux"
import { newSubordinate, subordinates } from '../../store/reducer/authReducer';
export default function Subordinate() {
  const { newSubordinateData} = useSelector((state) => state.auth)
  const [value, setValue] = React.useState('1');
  const [filterType, setFilterType] = useState('today');

  console.log("object",value)
  const dispatch = useDispatch()
 


  const handleChange = (event, newValue) => {
    setValue(newValue);
      if (newValue === '1') {
          setFilterType('today');
      } else if (newValue === '2') {
          setFilterType('yesterday');
      } else if (newValue === '3') {
          setFilterType('thisMonth');
      }
  };

  const filterByDate = (data, filterType) => {
      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const startOfYesterday = new Date(startOfToday);
      startOfYesterday.setDate(startOfToday.getDate() - 1);
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      return data?.filter(item => {
          const itemDate = new Date(item.today);

          if (filterType === 'today') {
              return (
                  itemDate.getFullYear() === today.getFullYear() &&
                  itemDate.getMonth() === today.getMonth() &&
                  itemDate.getDate() === today.getDate()
              );
          } else if (filterType === 'yesterday') {
              return (
                  itemDate.getFullYear() === startOfYesterday.getFullYear() &&
                  itemDate.getMonth() === startOfYesterday.getMonth() &&
                  itemDate.getDate() === startOfYesterday.getDate()
              );
          } else if (filterType === 'thisMonth') {
              return (
                  itemDate.getFullYear() === startOfMonth.getFullYear() &&
                  itemDate.getMonth() === startOfMonth.getMonth()
              );
          }

          return false; // No filtering if filterType is not matched
      });
  };

  const filteredData = filterByDate(newSubordinateData, filterType);

  useEffect(() => {

    dispatch(newSubordinate())
  }, []);



  function formatDateString(dateStr) {
    const date = new Date(dateStr);

    const formattedDate = date.getUTCFullYear() +
        '-' + String(date.getUTCMonth() + 1).padStart(2, '0') +
        '-' + String(date.getUTCDate()).padStart(2, '0') +
        ' ' + String(date.getUTCHours()).padStart(2, '0') +
        ':' + String(date.getUTCMinutes()).padStart(2, '0') +
        ':' + String(date.getUTCSeconds()).padStart(2, '0');

    return formattedDate;
}

function formatPhoneNumber(phoneNumber) {

  const prefix = phoneNumber.slice(0, 3);   // '987'
  const suffix = phoneNumber.slice(-3);     // '211'
  
  return `${prefix}****${suffix}`;
}
  return (

    <>
      <div className='nav-bg p-1 py-3'>
        <div className="container-section flex  items-center relative">
          <button className='absolute'><Link to={"/promotion"}>  <IoIosArrowBack className='text-xl' /></Link></button>
          <h1 className='heading-h1 gray-50 text-center flex justify-center text-lg items-center m-auto'>New subordinates</h1>
        </div>
      </div>

      <div className="subordinate-record mt-1 container-section">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value} onChange={handleChange}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Today" value="1" />
                <Tab label="Yesterday" value="2" />
                <Tab label="This month" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" style={{padding:0}}>
            {Array.isArray(filteredData) && filteredData?.map((item, i) => (
                    <div className='nav-bg rounded-md mt-3 pb-7 px-3 pt-1' key={i}>
                        <div className='mt-3 flex justify-between items-center gray-100 text-sm'>
                            <span className='text-sm font-medium'>{formatPhoneNumber(item.phone)}</span>
                            <span className='text-sm font-medium '>UID:{item?.id_user}</span>
                        </div>
                        <div className='flex justify-between items-center mt-3 gray-100 text-sm'>
                            <span className='text-sm font-medium'>Direct Subordinate</span>
                            <span className='text-sm font-medium flex items-center'>{formatDateString(item.today)}</span>
                        </div>
                    </div>
                ))}
            </TabPanel>
            <TabPanel value="2" style={{padding:0}}>
            {Array.isArray(filteredData) && filteredData?.map((item, i) => (
                    <div className='nav-bg rounded-md mt-3 pb-7 px-3 pt-1' key={i}>
                        <div className='mt-3 flex justify-between items-center gray-100 text-sm'>
                            <span className='text-sm font-medium'>{formatPhoneNumber(item.phone)}</span>
                            <span className='text-sm font-medium '>UID:{item?.id_user}</span>
                        </div>
                        <div className='flex justify-between items-center mt-3 gray-100 text-sm'>
                            <span className='text-sm font-medium'>Direct Subordinate</span>
                            <span className='text-sm font-medium flex items-center'>{formatDateString(item.today)}</span>
                        </div>
                    </div>
                ))}
            </TabPanel>
            <TabPanel value="3" style={{padding:0}}>
              
            {Array.isArray(filteredData) && filteredData?.map((item, i) => (
                    <div className='nav-bg rounded-md mt-3 pb-7 px-3 pt-1' key={i}>
                        <div className='mt-3 flex justify-between items-center gray-100 text-sm'>
                            <span className='text-sm font-medium'>{formatPhoneNumber(item.phone)}</span>
                            <span className='text-sm font-medium '>UID:{item?.id_user}</span>
                        </div>
                        <div className='flex justify-between items-center mt-3 gray-100 text-sm'>
                            <span className='text-sm font-medium'>Direct Subordinate</span>
                            <span className='text-sm font-medium flex items-center'>{formatDateString(item.today)}</span>
                        </div>
                    </div>
                ))}
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}
