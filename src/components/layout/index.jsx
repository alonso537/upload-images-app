import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import UploadForm from "../forms/UploadForm";
import ModalBasic from "../modal/ModalBasic";

const Layout = ({ children }) => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const { user, logout } = useContext(AuthContext);

  const handleOpenRegister = () => {
    setOpenRegister(true);
    setTitle("Register");
    setContent(<RegisterForm close={() => setOpenRegister(false)} />);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
    setTitle("Login");
    setContent(<LoginForm close={() => setOpenLogin(false)} />);
  };

  const handleOpenUpload = () => {
    setUploadOpen(true);
    setTitle("Upload");
    setContent(<UploadForm close={() => setUploadOpen(false)} />);
  };

  // console.log(user);

  return (
    <>
      <div className="bg-purple-500 py-5 px-10 flex flex-col space-y-5 items-center md:flex-row md:space-y-0  md:justify-between">
        <h1 className="text-2xl text-white font-bold">Images Upload App</h1>
        <div className="space-x-5">
          {!user && (
            <>
              <button
                onClick={handleOpenLogin}
                className="bg-white text-purple-500 font-semibold px-5 py-2 rounded-md transition hover:bg-gray-200">
                Login
              </button>
              <button
                onClick={handleOpenRegister}
                className="bg-white text-purple-500 font-semibold px-5 py-2 rounded-md transition hover:bg-gray-200">
                Register
              </button>
            </>
          )}
          {user && (
            <>
              <span className="text-white font-semibold">{user.username}</span>
              <button
                onClick={handleOpenUpload}
                className="bg-purple-600 text-white px-5 py-2 rounded-md font-semibold  transition hover:bg-purple-700">
                Upload
              </button>
              <button
                onClick={logout}
                className="bg-purple-600 text-white px-5 py-2 rounded-md font-semibold  transition hover:bg-purple-700">
                Cerrar Sesion
              </button>
            </>
          )}
        </div>
      </div>
      <div className="container mx-auto mt-20">{children}</div>
      <ModalBasic
        close={() => setOpenRegister(false)}
        visible={openRegister}
        title={title}
        content={content}
      />
      <ModalBasic
        close={() => setOpenLogin(false)}
        visible={openLogin}
        title={title}
        content={content}
      />
      <ModalBasic
        close={() => setUploadOpen(false)}
        visible={uploadOpen}
        title={title}
        content={content}
      />
    </>
  );
};

export default Layout;
