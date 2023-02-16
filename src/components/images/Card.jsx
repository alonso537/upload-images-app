import React, { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import DeleteForm from "../forms/DeleteForm";
import UpdateImage from "../forms/UpdateImage";
import ModalBasic from "../modal/ModalBasic";

import ImageFull from "../ImageFull";

const Card = ({ img }) => {
  const [onHovered, setOnHovered] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [verImage, setVerImage] = useState(false);

  const handleUpdate = (img) => {
    setOpenEdit(true);
    setTitle("Actualizar Imagen");
    setContent(<UpdateImage img={img} close={() => setOpenEdit(false)} />);
  };

  const handleDelete = (img) => {
    setOpenDelete(true);
    setTitle("Eliminar imagen con id" + " " + img?.id);
    setContent(<DeleteForm close={() => setOpenDelete(false)} img={img} />);
  };

  const handleVerImage = (img) => {
    setVerImage(true);
    setTitle("Ver Imagen");
    setContent(<ImageFull img={img} />);
  };

  //   console.log(img);
  return (
    <>
      <div
        onMouseEnter={() => setOnHovered(true)}
        onMouseLeave={() => setOnHovered(false)}
        className=" w-full p-2 rounded shadow-lg relative cursor-pointer">
        <img
          src={img?.image}
          alt={img?.image}
          className="rounded w-full h-full"
          onClick={() => handleVerImage(img)}
        />

        <div
          className={`${
            !onHovered && "hidden"
          } absolute bottom-0 left-0 z-50  w-full`}>
          <div className="relative p-5 flex justify-between bg-gray-300 h-32 opacity-50"></div>
          <div className="absolute top-1/2 left-0 w-full">
            <div className="flex justify-around w-full">
              <button
                type="button"
                onClick={() => handleUpdate(img)}
                className="text-4xl text-gray-700 transition hover:text-gray-900 hover:bg-white hover:rounded">
                <BiEdit />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(img)}
                className="text-4xl text-red-700 transition hover:text-red-900 hover:bg-white hover:rounded">
                <BiTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalBasic
        close={() => setOpenEdit(false)}
        visible={openEdit}
        title={title}
        content={content}
      />
      <ModalBasic
        close={() => setOpenDelete(false)}
        visible={openDelete}
        title={title}
        content={content}
      />
      <ModalBasic
        close={() => setVerImage(false)}
        visible={verImage}
        title={title}
        content={content}
      />
    </>
  );
};

export default Card;
