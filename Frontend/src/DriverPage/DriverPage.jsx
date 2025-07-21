import {useState} from "react";
import Garbage from "../Components/Garbage"
import Area from "../Components/Area"
import Driver from "../Components/Driver"
function DriverPage() {
  const [activeTab, setActiveTab] = useState("area");
  const [roles, setRoles] = useState("driver");

  function handleActiveTab(component){
    setActiveTab(component);
  }
  return (
    <>
      <section className="mt-10 bg-slate-100 min-h-screen">
        <section className="pt-0">
          <nav className="min-h-screen border w-70 pt-5 mt-10 fixed bg-white border-none shadow-lg rounded flex flex-col gap-2 p-2">
            <li className={`list-none text-center p-3 cursor-pointer rounded text-white transition-all duration-200 ${activeTab === "area" ? "bg-green-600": "bg-green-500 hover:bg-green-600"}`}
            onClick={()=>handleActiveTab("area")}
            >
              Area
            </li>
            <li className={`list-none text-center p-3  cursor-pointer rounded text-white  transition-all duration-200 ${activeTab === "garbage" ? "bg-green-600" : "bg-green-500 hover:bg-green-600"}`}
            onClick={()=>handleActiveTab("garbage")}
            >
              Garbage
            </li>
            <li className={`list-none text-center p-3 bg-green-500 cursor-pointer rounded text-white hover:bg-green-600 transition-all duration-200 ${activeTab === "driver" ? "bg-green-600" : "bg-green-500 hover:bg-green-600"}`}
            onClick={()=>handleActiveTab("driver")}
            >
              Driver
            </li>
          </nav>

          <section className="ml-80">
            {activeTab === "garbage" && <Garbage roles={roles}/>}
            {activeTab === "driver" && <Driver roles={roles}/>}
            {activeTab === "area" && <Area/>}
          </section>
        </section>
      </section>
    </>
  );
}

export default DriverPage;
