import { useState } from "react";
import Garbage from "../Components/Garbage";
import Area from "../Components/Area";
import Driver from "../Components/Driver";

function DriverPage() {
  const [activeTab, setActiveTab] = useState("area");
  const [showMenu, setShowMenu] = useState(false);

  function handleActiveTab(component) {
    setActiveTab(component);
  }

  return (
    <section className="mt-10 pt-5 min-h-screen bg-slate-100">
      <div className="md:hidden p-4 flex items-end justify-end">
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {showMenu && (
        <div className="md:hidden bg-white shadow-lg rounded p-4 flex flex-col gap-2 mt-2 mx-4 absolute top-30 right-0 w-[50%]">
          <li
            className={`list-none p-3 rounded text-white cursor-pointer transition-all ${
              activeTab === "area"
                ? "bg-green-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={() => {
              handleActiveTab("area");
              setShowMenu(false);
            }}
          >
            Area
          </li>
          <li
            className={`list-none p-3 rounded text-white cursor-pointer transition-all ${
              activeTab === "garbage"
                ? "bg-green-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={() => {
              handleActiveTab("garbage");
              setShowMenu(false);
            }}
          >
            Garbage
          </li>
          <li
            className={`list-none p-3 rounded text-white cursor-pointer transition-all ${
              activeTab === "driver"
                ? "bg-green-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={() => {
              handleActiveTab("driver");
              setShowMenu(false);
            }}
          >
            Driver
          </li>
        </div>
      )}

      {/* Sidebar for md and up */}
      <nav className="hidden md:flex min-h-screen border md:w-60 lg:w-72 pt-5 mt-10 fixed bg-white shadow-lg rounded flex-col gap-2 p-2">
        <li
          className={`list-none text-center p-3 cursor-pointer rounded text-white transition-all duration-200 ${
            activeTab === "area"
              ? "bg-green-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={() => handleActiveTab("area")}
        >
          Area
        </li>
        <li
          className={`list-none text-center p-3 cursor-pointer rounded text-white transition-all duration-200 ${
            activeTab === "garbage"
              ? "bg-green-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={() => handleActiveTab("garbage")}
        >
          Garbage
        </li>
        <li
          className={`list-none text-center p-3 cursor-pointer rounded text-white transition-all duration-200 ${
            activeTab === "driver"
              ? "bg-green-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={() => handleActiveTab("driver")}
        >
          Driver
        </li>
      </nav>

      {/* Main content */}
      <section className="md:ml-60 lg:ml-72 ml-4 mt-4">
        {activeTab === "garbage" && <Garbage personRole={"driver"} />}
        {activeTab === "driver" && <Driver personRole={"driver"} />}
        {activeTab === "area" && <Area personRole={"driver"} />}
      </section>
    </section>
  );
}

export default DriverPage;
