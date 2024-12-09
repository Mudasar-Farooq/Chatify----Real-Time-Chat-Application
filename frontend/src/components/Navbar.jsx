import React from 'react'
import { LogOut, MessageSquare, Settings, User, LogIn, UserPlus } from "lucide-react";
import useAuthStore from '../store/useAuthstore';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const { authUser, Logout } = useAuthStore();

  return (
    <header
      className="text-black bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* left side , logo+name */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-black flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="bg-customBlue size-9 rounded-lg flex items-center justify-center">
                <MessageSquare style={{ color: '#355F2E' }} className="w-5 h-5 " strokeWidth="3" />
              </div>
              <p className="text-lg font-bold">Chatify</p>
            </Link>
          </div>

          {/* Right side settings + conditional profile+logout */}
          <div className="flex items-center gap-2">
            {authUser ? (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <Link to={"/settings"} className={`btn btn-sm gap-2 transition-colors`}>
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={() => { Logout() }}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) :
              (<>< Link to={"/login"} className={`btn btn-sm gap-2`}>
                <LogIn className="size-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
                <Link to={"/signup"} className={`btn btn-sm gap-2`}>
                  <UserPlus className="size-5" />
                  <span className="hidden sm:inline">Signup</span>
                </Link> </>
              )
            }

          </div>
        </div>
      </div>
    </header >
  )
}

export default Navbar
