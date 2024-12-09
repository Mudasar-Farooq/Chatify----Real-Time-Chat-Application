import React from 'react'
import { useState } from 'react'
import useAuthStore from '../store/useAuthstore'
import { User } from 'lucide-react'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { useThemestore } from '../store/useThemestore'

const SettingsPage = () => {
  const { authUser, Nameupdate } = useAuthStore();
  const {theme , settheme} = useThemestore();
  const [fulName, setfulName] = useState(authUser?.fulName || '');
  function submitName(e) {
    e.preventDefault();
    Nameupdate(fulName);
  }

  return (
    <div className='pt-20 h-screen' >
      <div className='bg-customeBlue4 h-[90%] w-[80%] flex flex-col gap-8 container mx-auto px-4 pt-20 max-w-5xl'>
        {/* theme */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Theme</h2>
            <p className="text-sm text-base-content/70">Choose a theme for your interface</p>
          </div>
          <div className='flex gap-5'>
            <button className='border border-gray-900 px-3 py-1 rounded text-base hover:bg-black hover:text-stone-50' onClick={() => settheme(0)}>
              Day
            </button>
            <button className='border border-gray-900 px-3 py-1 rounded text-base hover:bg-black hover:text-stone-50' onClick={() => settheme(1)}>
              Night
            </button>
          </div>
        </div>


        {/* name changing */}
        <div>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Change User Name</h2>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <form action="" onSubmit={submitName}>
                <input type="text" className="px-4 py-2.5 bg-base-200 rounded-lg border" placeholder={authUser?.fulName || 'Default Placeholder'}
                  onChange={(e) => setfulName(e.target.value)} />
                <button type="submit" className="border bg-black text-white border-gray-600 px-3 py-2 rounded text-base hover:bg-white hover:text-black">
                  Save
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>


  )
}

export default SettingsPage
