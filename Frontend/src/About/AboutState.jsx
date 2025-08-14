import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../Utility/axiosInstance";
import { apiPath } from "../Utility/apiPath";

export const AboutContext = createContext(null);
function AboutState({ children }) {
  const [openModal, setOpenModal] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  function toggleModal() {
    setOpenModal((prev) => !prev);
  }

  function reset() {
    setUser(null);
    setRole(null);
  }

  async function handleGetUser() {
    try {
      const response = await axiosInstance.get(apiPath.AUTH.GET_PROFILE);
      if (response && response.data) {
        setUser(response.data.user);
        setRole(response.data.user.role);
      }
    } catch (error) {
      if (error?.response) {
        console.error(error?.response);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await handleGetUser();
    };

    fetchData();

    const reset = () => {
      setRole(null);
      setUser(null);
    };

    window.addEventListener("beforeunload", reset);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        reset();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      reset();
      window.removeEventListener("beforeunload", reset);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <AboutContext.Provider
        value={{
          openModal,
          setOpenModal,
          toggleModal,
          role,
          user,
          handleGetUser,
          reset,
        }}
      >
        {children}
      </AboutContext.Provider>
    </>
  );
}

export default AboutState;
