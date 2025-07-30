import { useState } from "react";
import Modal from "react-modal";
import DriverForm from "../Forms/DriverForm";
import { IoClose } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import AboutDriver from "../About/AboutDriver";
import { FaPlus } from "react-icons/fa6";
import { useContext } from "react";
import { AboutContext } from "../About/AboutState";
import { axiosInstance } from "../Utility/axiosInstance";
import { apiPath } from "../Utility/apiPath";
import {useEffect} from "react";

function Driver() {
  const [openModal1, setOpenModal] = useState(false);
  const [drivers,setDrivers] = useState([]);
  const { toggleModal } = useContext(AboutContext);

  function handleCloseModal() {
    setOpenModal((prev) => !prev);
  }

  async function handleGetDriver(){
    try{
      const response = await axiosInstance.get(apiPath.DRIVER.GET_DRIVER);
      console.log(response);

    }catch(error){
      if(error?.message){
        console.log(error?.message);
      }
    }
  }

  function handleEditDriver(event){
    try{
      
    }catch(error){
      if(error && error.message){
        console.error(error.message);
      }
    }
  }
  function handleDeleteDriver(event){
    try{
      
    }catch(error){
      if(error && error.message){
        console.error(error.message);
      }
    }
  }

  useEffect(()=>{
    handleGetDriver();
  },[]);

  return (
    <>
      <Modal
        isOpen={openModal1}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            background: "rgba(0,0,0,0.5)",
          },
          content: {
            height: "600px",
            width: "500px",
            padding: "1.5rem",
            borderRadius: "16px",
            position: "relative",
            margin: "auto",
            overflowY: "auto",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DriverForm handleCloseModal={handleCloseModal}/>
        <IoClose
          className="absolute top-5 right-2 text-2xl cursor-pointer"
          onClick={handleCloseModal}
        />
      </Modal>

      <section className="mt-10 bg-slate-100 min-h-screen">
        <section className="pt-10">
          <div>
            <h1 className="text-center font-semibold text-[1.2rem]">
              Driver List
            </h1>
          </div>
          <section
            className="border w-100 px-5 py-6 bg-white rounded-xl border-none shadow-lg"
            onClick={toggleModal}
          >
            <div className="flex items-center justify-between mb-3">
              <h1 className="font-medium text-[1.1rem]">Aadithya Y</h1>
              <p className="text-[15px] text-gray-600">Created on : Jan 25 2025</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-gray-700">
                <FaPhoneAlt className="text-black"/>
                <span className="font-medium text-black">Phone : </span>9898989898
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2">
                <span>
                  <FaTruck />
                </span>
                Lorry
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <span className="font-medium text-black">Vehicle no :</span> TN 25 IU 1890
              </p>
            </div>
            <div className="flex justify-end gap-4 pt-2 mt-2">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md cursor-pointer"
                aria-label="Edit"
                onClick={(event)=>{
                  event.stopPropagation();
                  handleEditDriver()
                }}
              >
                <FaPen />
                <span>Edit</span>
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md cursor-pointer"
                aria-label="Delete"
                onClick={(event)=>{
                  event.stopPropagation()
                  handleDeleteDriver()
                }}
              >
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>

          </section>
        </section>
      </section>

      <div>
        <button
          onClick={handleCloseModal}
          className="bg-green-500 hover:bg-green-600 transition-all duration-200 p-2 text-white rounded-lg fixed bottom-5 right-5 cursor-pointer flex items-center gap-2"
        >
          <span>
            <FaPlus />
          </span>
          Driver
        </button>
      </div>

      <AboutDriver />
    </>
  );
}

export default Driver;
