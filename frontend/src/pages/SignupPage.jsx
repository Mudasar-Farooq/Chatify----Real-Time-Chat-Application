import React from 'react'
import { useState } from 'react';
import useAuthStore from '../store/useAuthstore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import ImagePattern from '../components/ImagePattern';
import toast from "react-hot-toast"
import { useThemestore } from '../store/useThemestore'



const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {theme , settheme} = useThemestore();
  const [formData, setFormData] = useState({
    fulname: "",
    email: "",
    password: ""
  });
  const {Signup , isSigningUp} = useAuthStore();

  const validateForm = () =>{
    if(!formData.fulname.trim()) return toast.error("Full Name is required!");
    if(!formData.email.trim()) return toast.error("Email is required!");
    if(!formData.password.trim()) return toast.error("Password is required!");
    // if(formData.password.length<6) return toast.error("Password length should be greater than 6!");

    return true;
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    let check=validateForm();
    if(check) {
      Signup(formData);
    }
  }

  return (
    <div  style={{background:"#ebf9ed" , filter: `invert(${theme})`}} className="grid lg:grid-cols-2 ">
    {/* left side */}
    <div className="m-auto w-[44vw] flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="mt-10 max-w-md space-y-2  w-[66%]">
        {/* LOGO */}
        <div className="text-center mb-2">
          <div className="flex flex-col items-center gap-1 group">
            <div
              className="size-12 rounded-xl bg-customBlue flex items-center justify-center 
            group-hover:bg-customBlue2 transition-colors"
            >
              <MessageSquare style={{color: '#355F2E'}} className="size-6 text-customBlue3" />
            </div>
            <h1 className="text-2xl font-bold mt-1">Create Account</h1>
            <p className="text-base-content/60">Get started with your free account</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className={`input input-bordered w-full pl-10`}
                placeholder="xyz"
                value={formData.fulname}
                onChange={(e) => setFormData({ ...formData, fulname: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button style={{color: '#355F2E'}} type="submit" className="mt-2 btn bg-customBlue w-full hover:bg-customBlue2" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading....
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        
        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account ?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>

    {/* right side */}
    <ImagePattern
      title="Join our community"
      subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
    />
  </div>
  )
}

export default SignupPage