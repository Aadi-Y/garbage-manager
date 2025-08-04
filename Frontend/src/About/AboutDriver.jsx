import Modal from "react-modal";
import { useContext, useState } from "react";
import { AboutContext } from "./AboutState";
import { IoClose } from "react-icons/io5";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import { FaAddressCard } from "react-icons/fa6";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance } from "../Utility/axiosInstance";
import { apiPath } from "../Utility/apiPath";
import { IoMdRemove } from "react-icons/io";

function AboutDriver({ driver }) {
  const { openModal, toggleModal, role } = useContext(AboutContext);
  const [garbages, setGarbages] = useState(null);
  const [garbageIds, setGarbageIds] = useState([]);
  const [assignedRequest, setAssignedRequest] = useState([]);
  const [error, setError] = useState(null);
  const [removeGarbage, setRemoveGarbage] = useState(null);
  const [address, setAddress] = useState(null);

  // console.log(openModal);
  // console.log(toggleModal);

  function handleSelectGarbage(event) {
    const selectedGarbage = event.target.value;
    if (selectedGarbage === "") return;
    setGarbages(selectedGarbage);
  }

  async function handleAssignGarbage(e) {
    e.preventDefault();
    console.log(garbages);
    try {
      const response = await axiosInstance.put(
        apiPath.AREA.ASSIGN_GARBAGE(driver._id),
        { garbages }
      );

      console.log(response);
      if (response && response.data) {
        alert(response.data.message);
        handleGetAllAssignedGarbages();
        setGarbages(null);
        setError(null);
      }
    } catch (error) {
      console.log(error);
      console.error("Error in AboutDriver:", error.message);
      setError(error.response.data.message);
    }
  }

  async function handleGetAllAssignedGarbages() {
    try {
      const response = await axiosInstance.get(
        apiPath.AREA.GET_ASSIGNED_GARBAGES(driver._id)
      );

      console.log(response);
      if (response && response.data) {
        setAssignedRequest(response.data.garbageIds);
      }
    } catch (error) {
      if (error && error.data) {
        console.log(error.data.response);
      }
    }
  }

  function handleDriver() {
    setAddress(driver?.currectLocation);
  }

  async function handleGetAllGarbageIds() {
    try {
      const response = await axiosInstance.get(apiPath.GARBAGE.GET_ALL_ID);

      console.log(response);
      if (response && response.data) {
        setGarbageIds(response.data.garbageIds);
      }
    } catch (error) {
      if (error?.message) {
        console.log(error?.message);
      }
    }
  }

  async function handleRemoveAssignedGarbages(e, garbage) {
    e.preventDefault();

    console.log("Remove Id:", garbage);

    try {
      const response = await axiosInstance.put(
        apiPath.AREA.REMOVE_GARBAGE(driver._id),
        { garbageId: garbage }
      );

      if (response && response.data) {
        alert(response.data.message);
        handleGetAllAssignedGarbages();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(
          "Error removing garbage:",
          error.response.data.message || error.response.data
        );
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  }

  useEffect(() => {
    handleDriver();
  }, [driver]);

  useEffect(() => {
    handleGetAllGarbageIds();
    handleGetAllAssignedGarbages();
  }, []);

  function testing(e) {
    e.preventDefault();
    // console.log("testing");
    toggleModal;
  }

  // console.log(driver._id);
  // console.log(assignedRequest);

  return (
    <>
      <section>
        <Modal
          isOpen={openModal}
          onRequestClose={{}}
          style={{
            overlay: {
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
            },
            content: {
              width: "500px",
              height: "600px",
              background: "rgba(255,255,255,0.9)",
              borderRadius: "16px",
              overflow: "auto",
              margin: "auto",
              zIndex: "1000",
              position: "relative",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            },
          }}
        >
          <section className="flex flex-col gap-3 py-5">
            <div>
              <div className="flex justify-between mb-5">
                <div>
                  <h1 className="font-medium text-[1.2rem]">
                    {driver?.userId.userName || ""}
                  </h1>
                  <p>Driver Id : {driver?.driverId || ""}</p>
                </div>
                <p className="flex items-center gap-2">
                  <span>
                    <CgCalendarDates />
                  </span>
                  Joined on :{" "}
                  {moment(driver?.userId.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
              <div
                className={`border p-2 w-40 rounded text-center border-none shadow-md text-white ${
                  driver?.availability ? "bg-green-600" : "bg-red-600"
                }`}
              >
                <p>{driver?.availability ? "Available" : "Unavailable"}</p>
              </div>
            </div>

            <div>
              <h1 className="font-medium underline">Personal Info</h1>
              <p>
                <span className="font-medium">Phone : </span>
                {driver?.phoneNumber || ""}
              </p>
              <p>
                <span className="font-medium">Age :</span> {driver?.age || 0}{" "}
                years old
              </p>
              <p>
                <span className="font-medium">Adhaar Id : </span>
                {driver?.aadharId || ""}
              </p>
              <p>
                <span className="font-medium">Licence Id : </span>
                {driver?.licence || ""}
              </p>
            </div>

            <div>
              <h1 className="font-medium underline flex items-center gap-2">
                <span>
                  <FaAddressCard className="text-gray-600" />
                </span>
                Address :{" "}
              </h1>
              <div className="flex px-2">
                <ul>
                  <li>
                    <i className="text-gray-800">{driver?.currentLocation}</i>
                  </li>
                  {/* <li>
                    <i className="text-gray-800">636303</i>
                  </li> */}
                </ul>
              </div>
            </div>

            <div className="flex items-start justify-between mb-5 flex-col gap-3">
              {role === "Admin" && (
                <div>
                  <h1 className="underline font-medium">Assign Garbage</h1>
                  <div className="flex gap-2">
                    <select
                      className="border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 border-gray-500"
                      onChange={handleSelectGarbage}
                    >
                      <option value="">Select</option>
                      {garbageIds.length > 0 &&
                        garbageIds.map((id, index) => (
                          <option key={id} value={id}>
                            Garbage {index + 1}
                          </option>
                        ))}
                    </select>
                    <button
                      onClick={(event) => handleAssignGarbage(event)}
                      className="border bg-green-500 rounded-md text-white p-1 transition-all duration-200 hover:bg-green-600 cursor-pointer"
                    >
                      Assign
                    </button>
                  </div>

                  {error && (
                    <div>
                      <p className="text-red-500">{error}</p>
                    </div>
                  )}
                </div>
              )}
              <div>
                <h1 className="underline font-medium">Assigned Garbages</h1>
                <ul>
                  {assignedRequest.length > 0 ? (
                    assignedRequest.map((garbage, index) => (
                      <li className="flex items-center gap-3">
                        <span className="font-medium">Garbage Id : </span>
                        {garbage}

                        {role === "Admin" && (
                          <button
                            className="h-5 w-5 bg-red-500 text-white flex items-center justify-center rounded cursor-pointer hover:bg-red-400"
                            onClick={(e) =>
                              handleRemoveAssignedGarbages(e, garbage)
                            }
                          >
                            <IoMdRemove />
                          </button>
                        )}
                      </li>
                    ))
                  ) : (
                    <p>No Assigned</p>
                  )}
                </ul>
              </div>
            </div>

            <div className="border p-2 rounded bg-slate-200 shadow-lg border-none">
              <p>
                <span className="font-medium">Vehicle details : </span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <FaTruck className="text-gray-600" />
                </span>
                {driver?.vehicle}
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <MdOutlineConfirmationNumber />
                </span>
                {driver?.vehicleNumber}
              </p>
            </div>
          </section>

          <IoClose
            onClick={testing}
            className="absolute top-3 right-3 text-[1.3rem] cursor-pointer flex justify-center items-center text-gray-600"
          />
        </Modal>
      </section>
    </>
  );
}

export default AboutDriver;
