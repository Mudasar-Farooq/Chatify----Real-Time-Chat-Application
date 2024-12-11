import { create } from 'zustand';
import { axiosInstance } from '../lib/axios'; 
import toast from 'react-hot-toast';
import Messages from '../../../backend/src/models/messages.model';
import useAuthStore from './useAuthstore';

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

    // this is to get the all messages from db one-by-one
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

    // this is to get the immediate message from the reciever through socket.io server
    subscribetoMessages: () =>{
        const {selectedUser} = get();
        if(!selectedUser) return;

        // getting the socket from useAuthstore to use it here to get messages
        const socket= useAuthStore.getState().socket;
        socket.on("newMessage",(newmessage)=>{
        // if messages are not from the intended one
        if(newmessage.senderId!== selectedUser._id) return;
            set({Messages: [...get().Messages,newmessage]});
        })
    },
    
    sendMessage: async (messagedata)=>{
        const {selectedUser, Messages} =get()
        try {
            const response = await axiosInstance.post(`/message/send/${selectedUser._id}`,messagedata);
            set({Messages: [...get().Messages,response.data]});
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

