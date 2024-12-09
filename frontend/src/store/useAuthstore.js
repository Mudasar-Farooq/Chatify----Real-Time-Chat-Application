import { create } from 'zustand';
import { axiosInstance } from '../lib/axios'; 
import toast from 'react-hot-toast';

// exporting the state
const useAuthStore = create((set) => ({
  // different states
  authUser: null,
  isSigningUp: false,
  isLogingin: false,
  isUpdatingprofile: true,
  isCheckingauth: true,

  Checkauth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check', { withCredentials: true });
      set({ authUser: response.data }); 
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

    } catch (error) {
      // toast.error(error.response.data.message);
    } finally {
      set({isSigningUp: false});
    }
  },

  Login: async (data) => {
    try {
      set({isLogingin: true});
      console.log(data);
      const response= await axiosInstance.post('/auth/login',data, { withCredentials: true });
      set({authUser: response.data});
      toast.success("Login Successfully");
      console.log(response.data);
      
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
  }

})); 

export default useAuthStore;
