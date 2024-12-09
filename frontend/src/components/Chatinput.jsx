import React, { useEffect, useState, useRef } from 'react'
import useChatstore from '../store/useChatstore'
import { X, Image, Send } from 'lucide-react'
import toast from 'react-hot-toast'

const Chatinput = () => {
  // to store the input
  const [text, settext] = useState("")
  const [imagePreview, setimagePreview] = useState(null)

  const fileInputref = useRef(null)
  const { selectedUser, getMessages, sendMessage } = useChatstore();

  function handleImagechange(e) {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    let reader =new FileReader();
    reader.readAsDataURL(file);
    // set as image preview
    reader.onloadend = () => {
      setimagePreview(reader.result);
    }
  }
  function handleremoveImage() {
    setimagePreview(null)
    if (fileInputref.current) fileInputref.current.value = ""
  }
  async function handlesendMessage(e) {
    e.preventDefault();
    if (!text.trim() && !imagePreview) { return; }
    console.log("clicked")
    try {
      sendMessage({
        text: text.trim(),
        image: imagePreview
      })

      // clearing
      settext("")
      setimagePreview(null)
      if (fileInputref.current) fileInputref.current.value = ""

    } catch (error) {
      console.error("Failed to send message", error);
    }
  }
  
  return (
    <div className="absolute bottom-0 p-4 w-full">
      {/* if any image is selected */}
      {(imagePreview && (
           <div className="mb-3 flex items-center gap-2">
        <div className='relative '>
          <img src={imagePreview} alt="imagepreview"
            className='w-20 h-20 object-cover rounded-lg border border-zinc-700' />
          <button
            type='button' onClick={handleremoveImage}
            className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black text-white'>
            <X className='size-3 m-auto' />
          </button>
        </div>
        </div>
      ))}

      {/* main input part */}
        {/* form */}
        <form onSubmit={handlesendMessage} className='h-[100%] flex item-center'>
          {/* input text */}
          <div className='flex flex-1 border-gray-500'>
            <input type="text"
              placeholder='Type a message...'
              value={text}
              onChange={(e) => { settext(e.target.value) }}
              className='outline-none w-full rounded-none rounded-l-lg input-sm sm:input-md'
            />
            {/* select image */}
            <input type="file"
              accept='image/*'
              className='hidden'
              ref={fileInputref}
              onChange={handleImagechange}
            />
            <button
              type='button'
              className={`h-full sm:flex btn rounded-none m-0 ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
              onClick={() => fileInputref.current?.click()}>
              <Image size={20} />
            </button>
            {/* Send message */}
            <button
              type='submit'
              className='h-full btn rounded-none rounded-r-lg btn-sm m-0'
              disabled={!text.trim() && !imagePreview}>
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
  )
}

export default Chatinput
