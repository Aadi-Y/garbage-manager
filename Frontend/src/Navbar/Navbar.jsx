import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/EcoClean-logo-transparent.png";
function Navbar() {
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
                  <h1>Aadithya</h1>
                  <p><span className="font-medium">User Id :</span> IC123</p>
                  <p><span className="font-medium">Role :</span> User</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2>Aadithya</h2>
              <h2 className="flex items-center gap-2 bg-green-500 text-white rounded-md p-1">
                <span>
                  <BiLogOut />
                </span>
                Logout
              </h2>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Navbar;
