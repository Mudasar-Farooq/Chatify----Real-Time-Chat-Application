import React, { useEffect, useRef } from 'react'
import useChatstore from '../store/useChatstore'
import Chatheader from './Chatheader';
import Chatinput from './Chatinput';
import useAuthStore from '../store/useAuthstore';

const Chatcontainer = () => {
  const { Messages, getMessages, isloadingMessages, selectedUser } = useChatstore();
  const { authUser } = useAuthStore();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  // whenever new message is rendered scroll to down
  useEffect(()=>{
    if(chatContainerRef) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  },[Messages]);


  if (isloadingMessages) return <div>Loading... </div>

  return (
    <div className='relative bg-inherit w-full h-full flex flex-col'>
      <Chatheader />
      {/* message part */}
      <div className='pb-20 flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth' ref={chatContainerRef}>
        {Messages.map((message) => {
          return (
            <div
              key={message._id}
              // chat and chat-end chat-classes are from daisyui
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"} `}
            >

              {/* profilepic and time */}
              <div className='size-10 rounded-full border chat-image avatar'>
                <img src={`${message.senderId === authUser._id ? authUser.profilepic || "/avatar.png" : selectedUser.profilepic || "/avatar.png"}`}
                  alt="profile pic"
                  className='rounded-full'
                   />
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {message.createdAt.split("T")[1].split(".")[0]}
                </time>
              </div>
              {/* main message or image */}
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && (
                <p>{message.text}</p>
              )}
            </div>
          )
        })
        }
      </div>
      <Chatinput />
    </div>
  )
}

export default Chatcontainer
