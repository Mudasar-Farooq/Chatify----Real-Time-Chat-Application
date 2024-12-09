import React from 'react'
import useChatstore from '../store/useChatstore'
import { X } from 'lucide-react';

const Chatheader = () => {
    const { selectedUser, setselectedUser, onlineUsers } = useChatstore();
    return (
        <div className='shadow-md h-[13%] w-[100%] p-2 flex justify-between'>
            <div className='flex gap-2'>
                <img
                    src={selectedUser.profilepic || "/avatar.png"}
                    // alt={user.name}
                    className="size-10 object-cover rounded-full"
                />
                <div className="hidden lg:block text-left min-w-0">
                    <div className="font-medium truncate">{selectedUser.fulName}</div>
                    {/* <p className="text-sm text-base-content/70">
                        {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                    </p> */}
                    <div className="text-sm text-zinc-400">Ofline</div>
                </div>
            </div>


            <button className=' h-[50%] pt-1' onClick={() => setselectedUser(null)} >
                <X size={20} />
            </button>
        </div>


    )
}

export default Chatheader
