import { create } from 'zustand';
import { axiosInstance } from '../lib/axios'; 
import toast from 'react-hot-toast';
import {io} from "socket.io-client"


// exporting the state
const useAuthStore = create((set,get) => ({
  // different states
  authUser: null,
  isSigningUp: false,
  isLogingin: false,
  isUpdatingprofile: true,
  isCheckingauth: true,
  socket:null,
  onlineUsers: [],

  Checkauth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check', { withCredentials: true });
      set({ authUser: response.data }); 
      get().connectSocket();
    } catch (error) {
      set({ authUser: null }); 
      console.log('An error occurred:', error);
    } finally {
      set({ isCheckingauth: false });
    }
  }, 

  Signup: async (data) => {
    try {
      set({isSigningUp: true});
      const response= await axiosInstance.post('/auth/signup',data);
      set({authUser: response.data});
      toast.success("Signup Successfully");
      get().connectSocket();

    } catch (error) {
      // toast.error(error.response.data.message);
    } finally {
      set({isSigningUp: false});
    }
  },

  Login: async (data) => {
    try {
      set({isLogingin: true});
      const response= await axiosInstance.post('/auth/login',data, { withCredentials: true });
      set({authUser: response.data});
      toast.success("Login Successfully");
      get().connectSocket();
      
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({isLogingin: false});
    }
  },

  Logout: async () =>{
    try {
      const response=await axiosInstance.get('/auth/logout');
      set({authUser: false});
      toast.success("Logged out Successfully");
      get().disconnectSocket();
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
    },

  Updateprofile: async (data) =>{
    set({isUpdatingprofile: true});
    try {
      const response= await axiosInstance.post('/auth/update-profile',  data);
      console.log(response.data)
      set({authUser: response.data});
      toast.success("Profile Updated Successfully");

    } catch (error) {
      toast.error(error.response.data.message);
      
    } finally {
      set({isUpdatingprofile: false});
    }
  },

  Nameupdate: async (fulName) =>{
    try {
      const response = axiosInstance.post('/auth/update-name', { fulName: fulName },{withCredentials: true});
      set({authUser: await response.data});
      console.log(fulName);
      window.location.reload();
      toast.success("User Name Updated successfully");

    } catch (error) {
      toast.error(error.response.data.message);
    }
  },


  connectSocket: ()=>{
    if(!get().authUser || get().socket?.connected) {
      return ;
    }
    const socketio=io("http://localhost:3000",{
      query: {
        UserId: get().authUser?._id
      }
    });
    socketio.connect();
    set({socket: socketio})

    // we got returned the object of OnlineUsersIds from the backend
    socketio.on("ObjectofOnlineUsersIds",(userIds)=>{
      set({onlineUsers: userIds});
    })
  },

  disconnectSocket: ()=>{
    if(! (get().authUser) || !(get().socket?.connected) ) {
      return ;
    }
    const socketio=io("http://localhost:3000");
    socketio.disconnect();
    set({socket:null})
  }

})); 

export default useAuthStore;
