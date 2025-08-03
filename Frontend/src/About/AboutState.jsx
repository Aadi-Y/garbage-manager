import { createContext, useEffect, useState } from "react"
import {axiosInstance} from "../Utility/axiosInstance";
import {apiPath} from "../Utility/apiPath";

export const AboutContext = createContext(null);
function AboutState({children}){
    const [openModal,setOpenModal] = useState(false);
    const [role,setRole] = useState(null);

    function toggleModal(){
        setOpenModal(prev => !prev);
    }

    async function handleGetUser(){
        try{
            const response = await axiosInstance.get(apiPath.AUTH.GET_PROFILE);
            if(response && response.data){
                setRole(response.data.user.role);
            }

        }catch(error){
            if(error?.message){
                console.error(error?.message);
            }
        }
    }

    useEffect(()=>{
        handleGetUser();
    },[]);

    return(<>
        <AboutContext.Provider value={{openModal,setOpenModal,toggleModal,role}}>
            {children}
        </AboutContext.Provider>
    </>)
}

export default AboutState;