import { createContext, useEffect, useState } from "react"
import {axiosInstance} from "../Utility/axiosInstance";
import {apiPath} from "../Utility/apiPath";

export const AboutContext = createContext(null);
function AboutState({children}){
    const [openModal,setOpenModal] = useState(false);
    const [role,setRole] = useState(null);
    const [user,setUser] = useState({});
    function toggleModal(){
        setOpenModal(prev => !prev);
    }

    async function handleGetUser(){
        try{
            const response = await axiosInstance.get(apiPath.AUTH.GET_PROFILE);
            if(response && response.data){
                setUser(response.data.user);
                setRole(response.data.user.role);
            }

        }catch(error){
            if(error?.response){
                console.error(error?.response);
            }
        }
    }

    useEffect(()=>{
        handleGetUser();
    },[]);

    return(<>
        <AboutContext.Provider value={{openModal,setOpenModal,toggleModal,role,user}}>
            {children}
        </AboutContext.Provider>
    </>)
}

export default AboutState;