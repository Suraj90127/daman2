import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import EmptyImg from "../../assets/empty.png"
export default function Record() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <>
      <div className='nav-bg p-1 py-3'>
        <div className="container-section flex  items-center relative">
          <button className='absolute'><Link to={"/activity/DailyTasks"}>  <IoIosArrowBack className='text-xl' /></Link></button>
        <h1 className='heading-h1 gray-100 text-center flex justify-center text-lg items-center m-auto'>Recieve history</h1>
        </div>
      </div>
   
<div className="container-section task-record">
<Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Weekly" value="1"  />
            <Tab label="Daily" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One


          <img src={EmptyImg} alt="" />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Box>
</div>
    </>
  );
}
