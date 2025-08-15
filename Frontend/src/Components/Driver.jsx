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
import { useEffect } from "react";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function Driver() {
  const [openModal, setOpenModal] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const { toggleModal } = useContext(AboutContext);
  const [disable, setDisable] = useState(true);
  const { role } = useContext(AboutContext);

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

  useEffect(() => {
    drivers.length > 0 ? setDisable(true) : setDisable(false);
  }, [drivers]);

  async function handleGetDriver() {
    try {
      const response = await axiosInstance.get(apiPath.DRIVER.GET_DRIVER);
      console.log(response.data.driver);

      if (response && response.data) {
        setDrivers(response.data.driver);
      }
    } catch (error) {
      if (error?.response) {
        console.log(error?.response);
      }
    }
  }

  async function handleGetAllDrivers() {
    try {
      const response = await axiosInstance.get(apiPath.DRIVER.GET_ALL_DRIVER);
      if (response && response.data) {
        setDrivers(response.data.drivers);
      }
    } catch (error) {
      if (error?.response) {
        console.log(error?.response);
      }
    }
  }

  async function handleDeleteDriver(id) {
    try {
      const response = await axiosInstance.delete(apiPath.DRIVER.DELETE(id));

      if (response && response.data) {
        toast.success(response.data.message);
        handleGetDriver();
      }
    } catch (error) {
      if (error && error.response) {
        console.error(error.response);
        toast.error(error.response.data.message);
      }
    }
  }

  //Modal for Edit Garbage
  function handleEditDriver(item) {
    setOpenAddEdit({
      isShown: true,
      type: "edit",
      data: item,
    });
    handleCloseModal();
  }

  useEffect(() => {
    if (role === "Driver") {
      handleGetDriver();
    } else if (role === "Admin") {
      handleGetAllDrivers();
    }
  }, [role]);

  function handleViewAndToggle(item) {
    setOpenDetails({
      isShown: true,
      data: item,
    });
    toggleModal();
  }

  console.log(drivers);

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={handleCloseModal}
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
        <DriverForm
          handleCloseModal={handleCloseModal}
          type={openAddEdit.type}
          driver={openAddEdit.data}
          handleGetDriver={handleGetDriver}
        />
        <IoClose
          className="absolute top-5 right-2 text-2xl cursor-pointer"
          onClick={handleCloseModal}
        />
      </Modal>

      {drivers.length === 0 ? (
        <section className="flex justify-center items-center min-h-[100vh]">
          <p className="font-medium text-[15px] md:text-[20px]">
            No Driver Found
          </p>
        </section>
      ) : (
        <section className="md:mt-10 bg-slate-100 min-h-screen md:ml-3">
          <section className="md:pt-0">
            <div>
              <h1 className="text-center font-semibold text-[1.2rem] mb-2">
                Driver List
              </h1>
            </div>
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:gird-cols-3 gap-x-5 gap-y-5 mr-5">
              {drivers &&
                drivers.length > 0 &&
                drivers.map((driver, index) => (
                  <section
                    className="border md:min-w-100 max-w-auto px-5 py-6 bg-white rounded-xl border-none shadow-lg"
                    onClick={() => handleViewAndToggle(driver)}
                    key={index}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h1 className="font-medium text-[1.1rem]">
                        {driver.name}
                      </h1>
                      <p className="text-[15px] text-gray-600 hidden md:flex">
                        Joined on :{" "}
                        {moment(driver?.createdAt).format("DD MMM YYYY")}
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-2 text-gray-700">
                        <FaPhoneAlt className="text-black" />
                        <span className="font-medium text-black">Phone : </span>
                        {driver?.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-2">
                        <span>
                          <FaTruck />
                        </span>
                        {driver?.vehicle}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <span className="font-medium text-black">
                          Vehicle no :
                        </span>{" "}
                        {driver?.vehicleNumber}
                      </p>
                    </div>
                    <div className="flex justify-end gap-4 pt-2 mt-2">
                      <Tippy content="Edit">
                        <button
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md cursor-pointer"
                          aria-label="Edit"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEditDriver(driver);
                          }}
                        >
                          <FaPen />
                        </button>
                      </Tippy>
                      <Tippy content="Delete">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white  px-4 py-2 rounded-lg flex items-center gap-2 shadow-md cursor-pointer"
                          aria-label="Delete"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteDriver(driver?._id);
                          }}
                        >
                          <FaTrash />
                        </button>
                      </Tippy>
                    </div>
                  </section>
                ))}

              {openDetails.isShown && <AboutDriver driver={openDetails.data} />}
            </section>
          </section>
        </section>
      )}

      <div>
        <button
          onClick={handleCloseModal}
          disabled={disable}
          className={`bg-green-500 transition-all duration-200 p-2 text-white rounded-lg fixed bottom-5 right-5 flex items-center gap-2 ${
            disable ? "cursor-not-allowed bg-green-600" : "cursor-pointer"
          }`}
        >
          <span>
            <FaPlus />
          </span>
          Driver
        </button>
      </div>
    </>
  );
}

export default Driver;
