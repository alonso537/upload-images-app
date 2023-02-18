import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ImagesContext = createContext();

const ImagesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);
  //   useContext

  const getImages = async () => {
    if (!localStorage.getItem("token")) return;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/api/v1/images/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
      );

      //   console.log(data);
      setImages(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  const createImage = async (datos) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/api/v1/images/`,
        datos,
      );
      // console.log(data);

      setLoading(false);
      getImages();
      toast.success("Imagen Subida correctamente");
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  const updateImage = async (id, datos) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACK_URL}/api/v1/images/${id}/update/`,
        datos,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      // console.log(data);
      setLoading(false);
      getImages();
      toast.success("Actualizado Correctamente");
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  const deleteImage = async (id, datos) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/api/v1/images/${id}/delete/`,
        datos,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setLoading(false);
      getImages();
      toast.success("Imagen Eliminada");
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  return (
    <ImagesContext.Provider
      value={{
        loading,
        getImages,
        images,
        createImage,
        updateImage,
        deleteImage,
        setImages,
      }}>
      {children}
    </ImagesContext.Provider>
  );
};

export default ImagesProvider;
