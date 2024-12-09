import React from 'react'
import { MessageSquare } from 'lucide-react'


const Nochat = () => {
  return (
    <div className="bg-inherit w-full flex flex-col items-center justify-center p-16 ">
    <div className="max-w-md text-center space-y-6">
      {/* Icon Display */}
      <div className="flex justify-center gap-4 mb-4">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-2xl bg-customBlue2 flex items-center
           justify-center animate-bounce"
          >
            <MessageSquare className="w-8 h-8  group-hover:bg-customBlue2" />
          </div>
        </div>
      </div>

      {/* Welcome Text */}
      <h2 className="text-2xl font-bold">Welcome to Chatify!</h2>
      <p className="text-base-content/60">
        Select a conversation from the sidebar to start chatting
      </p>
    </div>
  </div>
  )
}

export default Nochat
