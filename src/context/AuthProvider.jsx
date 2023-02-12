import axios from "axios";
import React, { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { ImagesContext } from "./ImagesProvider";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // const { setImages } = useContext(ImagesContext);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/api/v1/api/token/`,
        {
          email,
          password,
        },
      );
      // setUser(data.user)

      localStorage.setItem("token", data.access);
      toast.success("Login Success");
      getMe();
      setLoading(false);
      // # recargar pagina
      window.location.reload();
      // getImages();
    } catch (error) {
      //   console.log(error);
      toast.error("Login Failed");
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/api/v1/auth/register/`,
        {
          username,
          email,
          password,
        },
      );
      // setUser(data.user)
      //   console.log(data);

      setLoading(false);
      toast.success("Register Success");

      //   await login(data.email, data.password);
    } catch (error) {
      //   console.log(error);
      toast.error("Register Failed");
      setLoading(false);
    }
  };

  const getMe = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/api/v1/auth/me/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      //   console.log(data);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    // setImages(null);
    window.location.reload();
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loading,
        getMe,
        logout,
        register,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
