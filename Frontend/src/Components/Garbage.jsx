import Modal from "react-modal";
import GarbageForm from "../Forms/GarbageForm";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { FaWeight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { AboutContext } from "../About/AboutState";
import { useContext } from "react";
import About from "../About/AboutGarbage";
import { CgCalendarDates } from "react-icons/cg";
import { FaAddressCard } from "react-icons/fa6";
import { axiosInstance } from "../Utility/axiosInstance";
import { apiPath } from "../Utility/apiPath";
import moment from "moment";
import { trimDescription } from "../Helper/helper";
import toast from "react-hot-toast";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function Garbage({}) {
  const [openModal1, setOpenModal] = useState(false);
  const [selectDriver, setSelectDriver] = useState(null);
  // const [role, setRole] = useState("");
  const [garbages, setGarbages] = useState([]);
  const { toggleModal } = useContext(AboutContext);
  const [garbageDescription, setGarbageDescription] = useState("");
  const { role } = useContext(AboutContext);
  const [error, setError] = useState("");

  console.log(role);

  const [openDetails, setOpenDetails] = useState({
    isShown: false,
    type: "view",
    data: null,
  });

  const [openAddEdit, setOpenAddEdit] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  function handleCloseModal() {
    setOpenModal((prev) => !prev);
  }

  // useEffect(() => {
  //   if (role) {
  //     setRole(role);
  //   }
  // }, [role]);

  function handleSelectDriver(event) {
    console.log(event);
    console.log(event.target.value);
    setSelectDriver(event.target.value);
  }

  async function handleGetGarbages() {
    try {
      const response = await axiosInstance.get(apiPath.GARBAGE.GET_USERS);
      console.log(response);
      console.log(response.data.garbages);

      if (response && response.data) {
        setGarbages(response.data.garbages);
      }
    } catch (error) {
      if (error?.response) {
        console.error("Error in creation : " + error.response);
      }
    }
  }

  async function handleGetAllGarbages() {
    try {
      const response = await axiosInstance.get(apiPath.GARBAGE.GET_ALL);
      console.log(response.data.garbages);
      if (response && response.data) {
        setGarbages(response.data.garbages);
      }
    } catch (error) {
      if (error?.response) {
        console.log(error?.response);
      }
    }
  }

  // async function handleGetAllGarbagesForDriver(){
  //   try{
  //     const response = await
  //   }catch(error){
  //     console.log(error);
  //     if(error && error.response){
  //       setError(error.response.data.message);
  //     }
  //   }
  // }

  async function handleGetAllGarbagesForDriver() {
    try {
      const response = await axiosInstance.get(
        apiPath.AREA.GET_ALL_GARBAGE_DRIVER
      );

      console.log(response);
      if (response) {
        setGarbages(response.data.garbages);
      }
    } catch (error) {
      console.log(error);
      if (error && error.response) {
        console.log(error.response);
      }
    }
  }

  //Modal for About the Garbage
  function handleViewDetails(item) {
    setOpenDetails({
      isShown: true,
      type: "edit",
      data: item,
    });
  }

  //Modal for Edit Garbage
  function handleEditGarbage(item) {
    setOpenAddEdit({
      isShown: true,
      type: "edit",
      data: item,
    });
    handleCloseModal();
  }

  //Garbage Deletion
  const handleGarbageDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(apiPath.GARBAGE.DELETE(id));

      console.log(response);

      if (response && response.data) {
        toast.success(response.data.message);
        handleGetGarbages();
      }
    } catch (error) {
      if (error && error.response) {
        console.log("Error in Deletion : ", error.response);
        toast.error(error.response.data.message);
      }
    }
  };

  function handleViewDetailsAndToggle(item) {
    handleViewDetails(item);
    toggleModal();
  }

  function handleGarbageDescription(description) {
    setGarbageDescription(description);
    const newDescription = trimDescription(description);
  }

  async function handleDisposeGarbage(garbageId) {
    try {
      const response = await axiosInstance.put(
        apiPath.GARBAGE.DISPOSED(garbageId)
      );

      console.log(response);
      if (response) {
        toast.success(response.data.message);
        role === "Driver" && handleGetAllGarbagesForDriver();
      }
    } catch (error) {
      console.log(error);
      if (error?.response) {
        setError(error.response.data.message);
      }
    }
  }

  useEffect(() => {
    handleGetGarbages();
    role === "Admin" && handleGetAllGarbages();
    role === "Driver" && handleGetAllGarbagesForDriver();
  }, []);

  return (
    <>
      <Modal
        isOpen={openModal1}
        onRequestClose={handleCloseModal}
        contentClassName="custom-scrollbar"
        style={{
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 0,
            margin: 0,
          },
          content: {
            position: "relative",
            inset: "unset",
            width: "90%",
            maxWidth: "500px",
            minWidth: "280px",
            maxHeight: "90vh",
            background: "rgba(255,255,255,0.9)",
            borderRadius: "16px",
            padding: "1.5rem",
            overflowY: "auto",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <GarbageForm
          handleCloseModal={handleCloseModal}
          garbage={openAddEdit.data}
          type={openAddEdit.type}
          handleGetGarbages={handleGetGarbages}
        />
        <IoClose
          onClick={handleCloseModal}
          className="absolute top-3 right-2 text-[1.3rem] cursor-pointer flex justify-center items-center text-gray-600"
        />
      </Modal>
      <section className={role === "User" ? `mt-15` : `mt-10`}>
        <section className="bg-slate-100 min-h-[100vh] h-auto pt-10">
          <h1 className="font-semibold text-[1.2rem] text-center mb-2">
            Garbage list
          </h1>
          <section
            className={`grid xl:grid-cols-3 gap-x-5 grid-col-2 gap-y-5 pr-3 pl-3 ${
              role === "Admin" || role === "Driver"
                ? "md:grid-cols-1"
                : "md:grid-cols-2"
            }`}
          >
            {garbages &&
              garbages.length > 0 &&
              garbages.map((garbage, index) => (
                <section className="">
                  <section
                    className="bg-white rounded-2xl shadow-lg p-4 min-w-100 max-w-auto"
                    onClick={() => handleViewDetailsAndToggle(garbage)}
                    key={index}
                  >
                    <div className="flex justify-between items-center py-2">
                      <p className="font-medium text-[1.2rem]">
                        {garbage?.garbageType}
                      </p>
                      <p className="text-[15px] text-gray-600 flex items-center gap-1">
                        <span>
                          <CgCalendarDates />
                        </span>{" "}
                        Created on :{" "}
                        {moment(garbage?.createdAt).format("DD-MMM-YYYY")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-medium">Deposited on: </p>
                      <p>
                        {moment(garbage?.depositedOn).format("DD-MMM-YYYY")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-medium">Status: </p>
                      <i>{garbage?.status}</i>
                    </div>
                    <div>
                      <p className="flex items-center justify-start gap-2">
                        <span>
                          <FaWeight className="text-gray-600" />
                        </span>
                        {garbage?.weight} {garbage?.weight > 1 ? "Kgs" : "Kg"}
                      </p>
                    </div>
                    <div>
                      <p>{garbage?.description}</p>
                    </div>

                    {role === "User" && (
                      <div className="flex justify-end gap-4 pt-2 mt-2">
                        <Tippy content="Edit">
                          <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md cursor-pointer"
                            aria-label="Edit"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleEditGarbage(garbage);
                            }}
                          >
                            <FaPen />
                          </button>
                        </Tippy>
                        <Tippy content="Delete">
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md cursor-pointer"
                            aria-label="Delete"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleGarbageDelete(garbage?._id);
                            }}
                          >
                            <FaTrash />
                          </button>
                        </Tippy>
                      </div>
                    )}

                    {role === "Driver" && (
                      <div className="flex justify-end">
                        <button
                          className={`border p-2 rounded-lg text-white cursor-pointer transition-all duration-200 shadow-md ${
                            garbage?.disposed === true
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDisposeGarbage(garbage?._id);
                          }}
                        >
                          {garbage?.disposed ? (
                            <p>Completed</p>
                          ) : (
                            <p>Not Completed</p>
                          )}
                        </button>
                      </div>
                    )}
                  </section>
                  <About garbage={openDetails.data} />
                </section>
              ))}
          </section>
        </section>
      </section>

      {role === "User" && (
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
    </>
  );
}

export default Garbage;
