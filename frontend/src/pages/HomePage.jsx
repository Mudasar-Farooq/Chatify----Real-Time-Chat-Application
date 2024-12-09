import React from 'react'
import { useThemestore } from '../store/useThemestore';
import useChatstore from '../store/useChatstore';
import Sidebar from '../components/sidebar';
import Chatcontainer from '../components/chatcontainer';
import Nochat from '../components/nochat';


const HomePage = () => {
  const { theme, settheme } = useThemestore();
  const { selectedUser } = useChatstore();

  return (
    <div className='h-screen pt-20'> 
    <div  className='shadow-xl h-[100%] m-auto w-[70vw]'>
      {/* main part */}
      <div
        className='bg-customeBlue4 p-1 flex h-[100%] rounded'
      >
          <Sidebar />
        <div className='w-0.5 h-[100%] bg-gray-400'></div>
          { selectedUser ? <Chatcontainer /> : <Nochat />}
      </div>
    </div>
    </div>
  )
}

export default HomePage
