import { useState } from "react";
import Modal from "react-modal"
import DriverForm from "../Forms/DriverForm";
import { IoClose } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { IoMdTrash } from "react-icons/io";


function Driver(){
    const [openModal, setOpenModal] = useState(true);

    function handleCloseModal(){
        setOpenModal(prev => !prev);
    }

    return(<>
        <Modal
            isOpen={openModal}
            onRequestClose={handleCloseModal}
            style={
                {
                    overlay:{
                        background:"rgba(0,0,0,0.5)"
                    },
                    content:{
                        height:"600px",
                        width:"500px",
                        padding:"",
                        position:"relative",
                        margin:"auto",
                        overflowY:"auto",
                        borderRadius:"10px",
                        background:"#e5e7eb"

                    }
                }
            }
        >
            <DriverForm/>
            <IoClose className="absolute top-2 right-2 text-2xl cursor-pointer"
            onClick={handleCloseModal}
            />
        </Modal>
        

        <section>
            <section>
                <div>
                    <h1 className="text-center font-medium text-[1.2rem]">Driver List</h1>
                </div>

                <div>
                    
                </div>

                <div className="flex items-end justify-end gap-2">
                            <button className="bg-rose-500 p-2 rounded text-white hover:bg-rose-600 cursor-pointer">
                              <FaPen/>
                            </button>
                            <button className="bg-blue-400 p-2 rounded text-white hover:bg-blue-500 cursor-pointer">
                              <IoMdTrash/>
                            </button>
                          </div>
            </section>
        </section>

        <div>
            <button 
            onClick={handleCloseModal}
            className="bg-green-500 hover:bg-green-600 transition-all duration-200 p-2 text-white rounded fixed bottom-5 right-5 cursor-pointer">ADD</button>
        </div>
    </>);
}

export default Driver;