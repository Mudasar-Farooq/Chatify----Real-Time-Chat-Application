import React from 'react'
import useAuthStore from '../store/useAuthstore'
import { Camera, User ,Mail} from 'lucide-react';
import { useState } from 'react';

const ProfilePage =  () => {
  const { authUser,isUpdatingProfile, Updateprofile } = useAuthStore();
  const [selectedImg, setselectedImg] = useState(null);

  //  fun to handle the img selected by user
  async function handleImageUpload(e) {
    const file=e.target.files[0];
    if(!file) return;

    const MAX_SIZE = 2 * 1024 * 1024; // 2MB in bytes

  // Check if the file exceeds the max size
  if (file.size > MAX_SIZE) {
    toast.error("File is too large. Please upload a smaller image.");
    return;
  }

    const reader= new FileReader();
    reader.readAsDataURL(file);     //result

    reader.onload = async () => {
      const convertedimg= reader.result;
      setselectedImg(convertedimg);
      console.log(convertedimg);
      await Updateprofile({profilepic: convertedimg});
    }
  }
  
  
  return (
    <div  className=' pt-20'>
      <div className='max-w-xl mx-auto p-4 py-8'>
        <div className='shadow-2xl bg-customeBlue4 rounded-xl p-6 space-y-8'>
          
          {/* header part */}
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile
            </h1>
            <p className="mt-2">Your Profile Information</p>
          </div>

          {/* Image upload section */}
          <div className="flex flex-col items-center gap-4">
           <div className="relative">
            <img
             src={ authUser?.profilepic || "/avatar.png"}
             alt="image"
             className='rounded-full border-3 object-cover size-32 ' 
            />
            <label 
            htmlFor="avatar-upload"
            className="
              absolute bottom-0 right-0 
              bg-base-content hover:scale-105
              p-2 rounded-full cursor-pointer 
              transition-all duration-200">
              
            <Camera className='w-5 h-5 text-base-200'/>
            <input type= "file" 
            id='avatar-upload'
            className='hidden'
            accept='image/*'
            onChange={handleImageUpload}
            disabled={isUpdatingProfile}
            />

            </label>
            </div>

            <p className=''>
            Click the camera icon to update your photo
            </p>
          </div>

          {/* Name and Email info */}
          <div className='space-y-6'>

          <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fulName}</p>
          </div>
          <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
          </div>

          </div>

          {/* Additional info */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}

export default ProfilePage
