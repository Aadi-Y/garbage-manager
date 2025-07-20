import { useState } from "react";
import Area from "../Components/Area";
import Garbage from "../Components/Garbage";
import AdminGarbage from "./AdminGarbage";
import Driver from "../Components/Driver";

function Admin() {
  const [activeTab, setActiveTab] = useState("Area");
  const [roles,setRoles] = useState("admin");

  return (
    <section className="flex flex-col">
      <section className="mt- bg-slate-100 min-h-screen flex gap-2">
        {/* Sidebar Navigation */}
        <section className="pt-10 mt-10">
          <nav className="min-h-screen border w-70 pt-5 bg-white border-none shadow-lg rounded flex flex-col gap-2 p-2 fixed">
            <li
              className={`list-none text-center p-3 cursor-pointer rounded text-white transition-all duration-200 ${
                activeTab === "Area" ? "bg-green-600" : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={() => setActiveTab("Area")}
            >
              Area
            </li>
            <li
              className={`list-none text-center p-3 cursor-pointer rounded text-white transition-all duration-200 ${
                activeTab === "Garbage" ? "bg-green-600" : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={() => setActiveTab("Garbage")}
            >
              Garbage
            </li>
            <li
              className={`list-none text-center p-3 cursor-pointer rounded text-white transition-all duration-200 ${
                activeTab === "Driver" ? "bg-green-600" : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={() => setActiveTab("Driver")}
            >
              Driver
            </li>
          </nav>
        </section>

        {/* Content Section */}
        <section className="ml-70 flex-1 p-5">
          {activeTab === "Area" && <Area />}
          {activeTab === "Garbage" && <Garbage roles={roles}/>}
          {activeTab === "Driver" && <Driver />}
        </section>
      </section>
    </section>
  );
}

export default Admin;
