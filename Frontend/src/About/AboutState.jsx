import { createContext, useState } from "react"

export const AboutContext = createContext(null);
function AboutState({children}){
    const [openModal,setOpenModal] = useState(false);

    function toggleModal(){
        setOpenModal(prev => !prev);
    }

    return(<>
        <AboutContext.Provider value={{openModal,setOpenModal,toggleModal}}>
            {children}
        </AboutContext.Provider>
    </>)
}

export default AboutState;