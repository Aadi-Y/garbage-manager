import Modal from "react-modal";
import { useContext, useState } from "react";
import { AboutContext } from "./AboutState";
import { IoClose } from "react-icons/io5";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";

function AboutDriver() {
  const { openModal, toggleModal } = useContext(AboutContext);
  const [garbages, setGarbages] = useState([]);
  const [error, setError] = useState(null);

  function handleSelectGarbage(event) {
    const selectedGarbage = event.target.value;
    setGarbages((prev) => [...prev, selectedGarbage]);
  }

  async function handleAssignGarbage() {
    try {
      console.log(garbages);
    } catch (error) {
      console.log("Error in AboutDriver : ", error.message);
      setError("Enable to assign please try again");
    }
  }

  return (
    <>
      <section>
        <Modal
          isOpen={openModal}
          onRequestClose={toggleModal}
          style={{
            overlay: {
              background: "rbga(0,0,0,0.4)",
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
                  <h1 className="font-medium text-[1.2rem]">Aadithya Y</h1>
                  <p>Driver Id : 12345</p>
                </div>
                <p>Joined on : Jan 25 2025</p>
              </div>
              <div className="border p-2 w-40 rounded bg-green-500 text-center border-none shadow-md text-white">
                <p>Available</p>
              </div>
            </div>

            <div>
              <h1 className="font-medium underline">Personal Info</h1>
              <p>
                <span className="font-medium">Phone : </span>9898989898
              </p>
              <p>
                <span className="font-medium">Age :</span> 40 years old
              </p>
              <p>
                <span className="font-medium">Adhaar Id : </span>1400 2300 4500
              </p>
              <p>
                <span className="font-medium">Licence Id : </span>23904586
              </p>
            </div>

            <div>
              <h1 className="font-medium underline">Address : </h1>
              <div className="flex px-2">
                <ul>
                  <li>
                    <i className="text-gray-800">Boomanur</i>
                  </li>
                  <li>
                    <i className="text-gray-800">636303</i>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="underline font-medium">Assign Garbage</h1>
                <div className="flex gap-2">
                  <select
                    name=""
                    id=""
                    className="border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 border-gray-500"
                    onChange={handleSelectGarbage}
                  >
                    <option value="">Select</option>
                    <option value="garbageID1">Garbage 1</option>
                    <option value="garbageID2">Garbage 2</option>
                    <option value="garbageID3">Garbage 3</option>
                  </select>
                  <button
                    onClick={handleAssignGarbage}
                    className="border bg-green-500 rounded-md text-white p-1 transition-all duration-200 hover:bg-green-600 cursor-pointer"
                  >
                    Assign
                  </button>
                </div>
              </div>
              <div>
                <h1 className="underline font-medium">Assigned Garbages</h1>
                <ul>
                  <li>
                    <span className="font-medium">Garbage Id : </span>1234
                  </li>
                </ul>
              </div>
            </div>

            {error && (
              <div>
                <p className="text-red-500">{error}</p>
              </div>
            )}

            <div className="border p-2 rounded bg-slate-200 shadow-lg border-none">
              <p>
                <span className="font-medium">Vehicle details : </span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <FaTruck />
                </span>
                Lorry
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <MdOutlineConfirmationNumber />
                </span>
                TN 23 UI 1600
              </p>
            </div>
          </section>

          <IoClose
            onClick={toggleModal}
            className="absolute top-3 right-3 text-[1.3rem] cursor-pointer flex justify-center items-center text-gray-600"
          />
        </Modal>
      </section>
    </>
  );
}

export default AboutDriver;
