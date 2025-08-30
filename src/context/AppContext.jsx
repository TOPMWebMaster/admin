import { createContext,useContext, useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext();

export const AppProvider = ({children})=>{
 const navigate = useNavigate()
 const [showLogin, setShowLogin] = useState(true)
 const[isAdmin, setIsAdmin] = useState(false)


 const fetchAdminStatus = async()=>{
    try {
        const {data } = await axios.get("/api/is-auth");
        if(data.success){
            setIsAdmin(true);
        }else{
            setIsAdmin(false);
        }
        
    } catch (error) {
        setIsAdmin(false)
    }
}


    const value = {
        navigate, axios, showLogin, setShowLogin, isAdmin, setIsAdmin}
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}