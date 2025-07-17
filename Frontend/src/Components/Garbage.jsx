import Modal from "react-modal";
import GarbageForm from "../Forms/GarbageForm";
import { IoClose } from "react-icons/io5";
import {useState} from "react";

function Garbage(){
    const [openModal,setOpenModal] = useState(true);

    function handleCloseModal(){
        setOpenModal(prev => !prev);
    }

    return (<>
        <Modal
            isOpen={openModal}
            onRequestClose={handleCloseModal}
            style={{
                overlay:{
                    background:"rgba(0,0,0,0.5)"
                },
                content:{
                    width:"500px",
                    height:"600px",
                    borderRadius:"10px",
                    padding:"10px",
                    margin:"auto",
                    position:"relative",
                    overflowY:"auto",
                    background:"#e5e7eb",
                }
            }}
        >
            <GarbageForm/>
            <IoClose 
            onClick={handleCloseModal}
            className="absolute top-3 right-2 text-[1.3rem] cursor-pointer flex justify-center items-center text-gray-600"/>
        </Modal>
        <section>
            <section>
                <h1 className="font-medium text-[1.2rem] text-center">Garbage list</h1>
                <section>
                    <section className="border w-100 rounded p-2">
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-[1.2rem]">Organic</p>
                            <p>Created on : Jan 25 2025</p>
                        </div>
                        <div>
                            <p>Jan 24 2025</p>
                        </div>
                        <div>
                            <i>Pending</i>
                        </div>
                        <div>
                            <p>20 Kgs</p>
                        </div>
                        <div>
                            <p>It is actually a organic waste</p>
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
                
                
            </section>
        </section>
        <div>
            <button 
            onClick={handleCloseModal}
            className="bg-green-500 p-2 rounded z-10 fixed right-5 bottom-5 text-white cursor-pointer transition-all duration-200 hover:bg-green-600">ADD</button>
        </div>
    </>);
}

export default Garbage;