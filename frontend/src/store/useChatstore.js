import { create } from 'zustand';
import { axiosInstance } from '../lib/axios'; 
import toast from 'react-hot-toast';
import Messages from '../../../backend/src/models/messages.model';

const useChatstore = create((set,get)=> ({

    users: [],
    Messages: [],
    onlineUsers: [],

    selectedUser: false,
    isloadingUsers: false,
    isloadingMessages: false,

    getUsers: async () =>{
        set({isloadingUsers: true})
        try {
            const response = await axiosInstance.get('/message/users');
            set({users: await response.data})
            // console.log(users);
        } catch (error) {
            toast.error(error.response.data.message);            
        } finally {
            set({isloadingUsers: false})
        }
    },

    getMessages: async (userId) =>{
        set({isloadingMessages: true})
        try {
            const response = await axiosInstance.get(`/message/${userId}`);
            set({Messages: await response.data})
        } catch (error) {
            toast.error(error.response.data.message);            
        } finally {
            set({isloadingMessages: false})
        }
    },

    sendMessage: async (messagedata)=>{
        const {selectedUser, Messages} =get()
        try {
            const response = await axiosInstance.post(`/message/send/${selectedUser._id}`,messagedata);
            set({Messages: [...Messages,response.data]});
        } catch (error) {
            toast.error(error.response.data.message);                        
        }
    },

    // later work on it
    setselectedUser: async (selectedUser) =>{
        set({selectedUser:selectedUser});
    }
 

}));

export default useChatstore;

