import Modal from "react-modal";
import { useEffect, useState } from "react";
import AreaForm from "../Forms/AreaForm";
import { IoClose } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

function Area({ roles }) {
  const [openModal, setOpenModal] = useState(false);
  const [role, setRole] = useState(null);

  function handleCloseModal() {
    setOpenModal((prev) => !prev);
  }

  function handleRoles() {
    if (roles) {
      setRole(roles);
      return;
    }
    setRole("admin");
  }

  useEffect(() => {
    handleRoles;
  }, [role]);

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
          },
          content: {
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "16px",
            border: "none",
            width: "90%",
            maxWidth: "500px",
            margin: "auto",
            padding: "2rem",
            position: "relative",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            overflow: "auto",
          },
        }}
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition text-2xl"
        >
          <IoClose />
        </button>
        <AreaForm />
      </Modal>

      <section className="min-h-screen bg-gradient-to-br from-slate-100 to-white mt-5">
        <h1 className="text-[1.2rem] font-semibold text-center text-slate-800 mb-8 pt-10">
          Area Overview
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 w-100 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Area 1</h2>
            <div className="text-sm text-slate-500">ID: 123498</div>
            <div className="text-sm text-slate-500">📅 Jun 16, 2025</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-slate-600 font-medium mb-1 flex items-center gap-2">
                <span>
                  <FaAddressCard />
                </span>{" "}
                Address
              </h3>
              <p className="text-slate-700 text-sm">Boomanur</p>
              <p className="text-slate-700 text-sm">Near Kolathur</p>
              <p className="text-slate-700 text-sm">636303</p>
            </div>

            <div>
              <h3 className="text-slate-600 font-medium mb-1 flex items-center gap-2">
                <span>
                  <FaUserGroup />
                </span>{" "}
                Assigned Drivers
              </h3>
              <ul className="list-disc list-inside text-slate-700 text-sm">
                <li>Driver 1</li>
                <li>Driver 2</li>
              </ul>
            </div>
          </div>

          {role === "admin" && (
            <div className="flex justify-end gap-4 pt-2">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
                aria-label="Edit"
              >
                <FaPen />
                <span>Edit</span>
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
                aria-label="Delete"
              >
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {role === "admin" && (
        <button
          onClick={handleCloseModal}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition-all text-sm font-medium tracking-wide flex items-center gap-2"
        >
          <FaPlus className="text-[15px]" /> <span>Area</span>
        </button>
      )}
    </>
  );
}

export default Area;
