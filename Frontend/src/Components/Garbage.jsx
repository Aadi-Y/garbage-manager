import Modal from "react-modal";
import GarbageForm from "../Forms/GarbageForm";
import { IoClose } from "react-icons/io5";
import { useState,useEffect } from "react";
import { FaPen } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { FaWeight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { AboutContext } from "../About/AboutState";
import { useContext } from "react";
import About from "../About/AboutGarbage";
import { CgCalendarDates } from "react-icons/cg";
import { FaAddressCard } from "react-icons/fa6";

function Garbage({ personRole }) {
  const [openModal1, setOpenModal] = useState(false);
  const [selectDriver, setSelectDriver] = useState(null);
  const [role, setRole] = useState("user");
  const { toggleModal } = useContext(AboutContext);

  function handleCloseModal() {
    setOpenModal((prev) => !prev);
  }

  console.log(personRole);

  useEffect(() => {
    if (personRole) {
      setRole(personRole);
    }
  }, [personRole]);



  function handleSelectDriver(event) {
    console.log(event);
    console.log(event.target.value);
    setSelectDriver(event.target.value);
  }

  function handleGetGarbages(){
    try{

    }catch(error){
      if(error?.message){
        console.error("Error : " + error.message);
      }
    }
  }

  useEffect(()=>{
    handleGetGarbages();
  },[])

  return (
    <>
      <Modal
        isOpen={openModal1}
        onRequestClose={handleCloseModal}
        contentClassName="custom-scrollbar"
        style={{
          overlay: {
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
          },
          content: {
            width: "500px",
            background: "rgba(255,255,255,0.9)",
            height: "600px",
            borderRadius: "16px",
            padding: "2rem",
            margin: "auto",
            position: "relative",
            overflowY: "auto",
            zIndex: "1000",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <GarbageForm />
        <IoClose
          onClick={handleCloseModal}
          className="absolute top-3 right-2 text-[1.3rem] cursor-pointer flex justify-center items-center text-gray-600"
        />
      </Modal>
      <section className={personRole === "user" ? `mt-15` : `mt-10`}>
        <section className="bg-slate-100 h-[100vh] pt-10">
          <h1 className="font-semibold text-[1.2rem] text-center mb-2">
            Garbage list
          </h1>
          <section className="p-2">
            <section
              className="bg-white rounded-2xl shadow-lg w-100 p-4"
              onClick={toggleModal}
            >
              <div className="flex justify-between items-center py-2">
                <p className="font-medium text-[1.2rem]">Organic</p>
                <p className="text-[15px] text-gray-600 flex items-center gap-1">
                  <span><CgCalendarDates/></span>{" "}
                  Created on : Jan 25 2025
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-medium">Deposited on: </p>
                <p>Jan 24 2025</p>
              </div>
              <div className="flex gap-2">
                <p className="font-medium">Status: </p>
                <i>Pending</i>
              </div>
              <div>
                <p className="flex items-center justify-start gap-2">
                  <span>
                    <FaWeight className="text-gray-600"/>
                  </span>
                  20 Kgs
                </p>
              </div>
              <div>
                <p>It is actually a organic waste....</p>
              </div>

              {role === "user" && (
                <div className="flex justify-end gap-4 pt-2 mt-2">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md cursor-pointer"
                    aria-label="Edit"
                    onClick={(event)=>{
                    event.stopPropagation()
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
                  }}
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </div>
              )}

              {role === "driver" && (
                <div className="flex justify-end">
                  <button className="border p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer transition-all duration-200 shadow-md"
                  onClick={(event)=>{
                    event.stopPropagation()
                  }}
                  >
                    Completed
                  </button>
                </div>
              )}
            </section>
          </section>
        </section>
      </section>

      {role === "user" && (
        <div>
          <button
            onClick={handleCloseModal}
            className="bg-green-500 hover:bg-green-600 transition-all duration-200 p-2 text-white rounded-lg fixed bottom-5 right-5 cursor-pointer flex items-center gap-2 shadow-md"
          >
            <span>
              <FaPlus />
            </span>
            Garbage
          </button>
        </div>
      )}

      <About />
    </>
  );
}

export default Garbage;
