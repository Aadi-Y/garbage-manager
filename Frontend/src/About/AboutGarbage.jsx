import { useState } from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { AboutContext } from "./AboutState";
import { useContext } from "react";
import { FaAddressCard } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import moment from "moment";
function About({ garbage }) {
  const { openModal, toggleModal } = useContext(AboutContext);

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
            background: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(2px)",
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
          },
        }}
      >
        <section>
          <div className="flex items-center justify-between py-3">
            <h1 className="font-medium text-[1.3rem]">
              {garbage?.garbageType}
            </h1>
            <h2 className="flex items-center gap-1">
              {" "}
              <span>
                <CgCalendarDates />
              </span>
              Created on: {moment(garbage?.createdAt).format("DD-MMM-YYYY")}
            </h2>
          </div>
          <div className="flex justify-between">
            <div>
              <div>
                <p className="">
                  <span className="font-medium">Deposited on:</span>{" "}
                  {moment(garbage?.deposited).format("DD-MMM-YYYY")}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Status:</span> {garbage?.status}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Weight:</span> {garbage?.weight}
                </p>
              </div>
            </div>

            <div>
              <p className={`border p-2 rounded border-none text-white shadow-md ${garbage?.disposed === true ? "bg-green-500": "bg-red-500"}`}>
                {garbage?.disposed === true ? "Disposed" : "Yet to Dispose"}
              </p>
            </div>
          </div>
          <div>
            <h1 className="font-medium mt-5">Description: </h1>
            <p className="pl-2">{garbage?.description}</p>
          </div>

          <div className="mt-5">
            <h1 className="font-medium flex items-center gap-2">
              <span>
                <FaUser className="text-gray-600" />
              </span>
              Assigned Driver
            </h1>
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
            <h1 className="font-medium underline flex items-center gap-2">
              <span>
                <FaAddressCard className="text-gray-600" />
              </span>
              Address :{" "}
            </h1>
            <p className="flex flex-col px-9">
              <i>{garbage?.area},</i>
              <i>{garbage?.landMark},</i>
              <i>{garbage?.taluk},</i>
              <i>{garbage?.district},</i>
              <i>{garbage?.state},</i>
              <i>{garbage?.pincode}</i>
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
