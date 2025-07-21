import { useState } from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { AboutContext } from "./AboutState";
import { useContext } from "react";
import { FaAddressCard } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
function About() {
  const {openModal,toggleModal} = useContext(AboutContext);

//   function handleCloseModal() {
//     setOpenModal((prev) => !prev);
//   }

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={toggleModal}
        style={{
          overlay: {
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
          },
          content: {
            width: "500px",
            height: "600px",
            borderRadius: "2rem",
            margin:"auto",
            overflowY:"auto",
          },
        }}
      >
        <section>
          <div className="flex items-center justify-between py-3">
            <h1 className="font-medium text-[1.3rem]">Organic</h1>
            <h2 className="flex items-center gap-1"> <span><CgCalendarDates /></span>Created on: Jan 25 2025</h2>
          </div>
          <div>
            <p className=""><span className="font-medium">Deposited on:</span> Jan 24 2025</p>
          </div>
          <div>
            <p><span className="font-medium">Status:</span> Pending</p>
          </div>
          <div>
            <p><span className="font-medium">Weight:</span> 20kg</p>
          </div>
          <div>
            <h1 className="font-medium mt-5">Description: </h1>
            <p className="pl-2">
              It is actually a organic waste that got deposited on boomanur near
              kolathur
            </p>
          </div>

          <div className="mt-5">
            <h1 className="font-medium flex items-center gap-2"><span><FaUser className="text-gray-600"/></span>Assigned Driver</h1>
            <div className="px-2">
              <p>
                <span>Name: </span>Aadithya
              </p>
              <p>
                <span>Vehicle Number: </span>TN 28 UZ 1900
              </p>
            </div>
          </div>

          <div className="border p-2 rounded-md bg-slate-100 shadow-md border-none mt-5">
            <h1 className="font-medium underline flex items-center gap-2"><span><FaAddressCard className="text-gray-600"/></span>Address : </h1>
            <p className="flex flex-col px-9">
              <i>Boomanur,</i>
              <i>Kolathur,</i>
              <i>Mettur,</i>
              <i>Salem,</i>
              <i>636303</i>
            </p>
          </div>
        </section>
        <IoClose
                  onClick={toggleModal}
                  className="absolute top-3 right-4 text-[1.3rem] cursor-pointer flex justify-center items-center text-gray-600"
                />
      </Modal>
    </>
  );
}

export default About;
