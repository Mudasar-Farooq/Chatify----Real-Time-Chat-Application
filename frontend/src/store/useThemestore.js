import { create } from "zustand";

export const useThemestore = create((set)=>({
    theme: localStorage.getItem("chat-theme") || 0,
    settheme: (t) =>{
       theme: localStorage.setItem("chat-theme",t);
        set({theme:t})
    }


}));