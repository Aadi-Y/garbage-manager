import Modal from "react-modal";
import { useState } from "react";
import AreaForm from "../Forms/AreaForm";
import { IoClose } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { IoMdTrash } from "react-icons/io";
function Area() {
  const [openModal, setOpenModal] = useState(true);

  function handleCloseModal() {
    setOpenModal((prev) => !prev);
  }

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            background: "rgba(0,0,0,0.5)",
          },
          content: {
            width: "500px",
            height: "auto",
            borderRadius: "5px",
            position: "relative",
            overflowY: "auto",
            margin: "auto",
            background: "#e5e7eb",
            zIndex: "1000px",
          },
        }}
      >
        <AreaForm />
        <IoClose
          onClick={handleCloseModal}
          className="absolute top-5 right-2 text-[1.3rem] cursor-pointer text-gray-500"
        />
      </Modal>

      <section className="p-5  bg-gray-100 h-[100vh] ">
        <h1 className="font-medium text-center text-[1.2rem] mb-10">Area List</h1>
        <section className="bg-white w-100 rounded flex flex-col gap-2 p-3">
          <div className="flex  justify-between">
            <h1 className="font-medium ">Area 1</h1>
            <h2>ID : 123498</h2>
            <div>
              <p>Jun 16 2025</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="underline decoration-gray-500">Address : </h1>
              <i className="text-[15px]">Boomanur</i>
              <i className="text-[15px]">Near Kolathur</i>
              <i className="text-[15px]">636303</i>
            </div>
            <div>
              <h1 className="underline decoration-gray-500">
                Assigned Drivers
              </h1>
              <ul>
                <li>Driver 1</li>
                <li>Driver 2</li>
              </ul>
            </div>
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
          className="border p-2 rounded bg-green-500 border-none hover:bg-green-600 text-white fixed bottom-5 right-5 z-0 cursor-pointer"
          onClick={handleCloseModal}
        >
          ADD
        </button>
      </div>
    </>
  );
}

export default Area;
