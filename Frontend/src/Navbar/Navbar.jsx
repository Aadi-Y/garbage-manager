import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/EcoClean-logo-transparent.png";
import {axiosInstance} from "../Utility/axiosInstance";
import {apiPath} from "../Utility/apiPath";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import { AboutContext } from "../About/AboutState";

function Navbar() {
  const {user} = useContext(AboutContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <section className="w-[100vw] border bg-white shadow-lg border-none fixed top-0">
        <section className="justify-between w-[80%] m-auto flex items-center py-2 ">
          <div>
            <img src={logo} alt="" className="h-10" />
          </div>

          <div className="flex items-center gap-3">
            <div className="group cursor-pointer">
              <p className="text-4xl text-gray-700">
                <CgProfile />
              </p>
              <div>
                <div className="hidden absolute bg-white top-20 right-15 shadow-md rounded px-6 py-4 group-hover:flex flex-col">
                  <h1 className="font-medium">{user.userName}</h1>
                  <p><span className="font-medium">User Id :</span> {user.userId}</p>
                  <p><span className="font-medium">Role :</span> {user.role}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2>{user.userName}</h2>
              <button className="flex items-center gap-2 bg-green-500 text-white rounded-md p-1 cursor-pointer"
              onClick={handleLogout}
              >
                <span>
                  <BiLogOut />
                </span>
                Logout
              </button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Navbar;
