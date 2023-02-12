import React from "react";

const ModalBasic = ({ title, content, visible, close }) => {
  if (!visible) return null;
  return (
    <div className="fixed top-0 left-0 w-full  bg-black bg-opacity-50 z-50 ">
      <div className="flex justify-center items-center h-screen ">
        <div className="bg-white w-full mx-2 md:w-1/2 p-5 rounded-md shadow-lg">
          <div className="flex justify-between p-5">
            <div></div>
            <h2 className="text-3xl text-purple-500 font-bold ">{title}</h2>
            <button
              onClick={close}
              className="text-2xl text-red-500 transition hover:text-red-700 font-bold">
              X
            </button>
          </div>
          <div className="mx-10 mt-5">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalBasic;
