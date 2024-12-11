import React, {useEffect} from 'react'
import useChatstore from '../store/useChatstore'
import { Users } from 'lucide-react'
import useAuthStore from '../store/useAuthstore';

const Sidebar = () => {
  const {users, getUsers} = useChatstore();
  const {selectedUser, setselectedUser , isloadingUsers} = useChatstore();
  const {onlineUsers}= useAuthStore()

  // on coming reload, fetch the users
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if(isloadingUsers) return <div>Loading... </div>

  
  return (
    <div  className='bg-inherit h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
     {/* logo part */}
      <div className="border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      {/* available users */}
      <div className='flex flex-col gap-3 mt-5'>
      { users.map((user)=>{
        return (
        <button key={user._id} onClick={()=> setselectedUser(user)}
          className={`rounded w-full p-3 h-10 flex items-center gap-3  hover:bg-base-300 transition-colors
        ${selectedUser?._id === user._id && "bg-base-300 ring-1 ring-base-300"}`}
        >
          <div className=' relative mx-auto lg:mx-0 '>
             <img
                src={user.profilepic || "/avatar.png"}
                alt={user.name}
                className="size-10 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) &&
                <span
                  className='absolute bottom-0 right-0 size-3 rounded-full bg-green-500'
                />
              }

            </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fulName}</div>
              <div className={`text-sm pointer-events-none  ${onlineUsers.includes(user._id)? "text-red-600": "text-zinc-400"}`}>{onlineUsers.includes(user._id)? "Online": "Offline"}</div>
              </div>

        </button>

        )
      })
      }
      </div>
    </div>

    </div>
  )
}

export default Sidebar
