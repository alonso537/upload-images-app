import React, { useContext, useEffect } from "react";
import { ImagesContext } from "../../context/ImagesProvider";
import Skeleton from "../utils/Skeleton";
import Card from "./Card";

const ImagesContainer = () => {
  const { loading, getImages, images } = useContext(ImagesContext);

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-2">
      {loading ? (
        <>
          <Skeleton />
        </>
      ) : !images ? (
        <div className="col-span-12 text-2xl font-bold text-gray-700">
          <h2>
            Necesitas Ingresar a tu cuenta para poder ver las imagenes o crear
            una cuenta para empezar a subir imagenes.
          </h2>
        </div>
      ) : images.length === 0 ? (
        <div className="col-span-12 text-2xl font-bold text-gray-700">
          <h2>
            No tienes imagenes subidas, puedes subir imagenes desde tu cuenta.
          </h2>
        </div>
      ) : (
        images?.map((img) => (
          <div key={img.id} className="col-span-6 md:col-span-3 ">
            <Card img={img} />
          </div>
        ))
      )}
    </div>
  );
};

export default ImagesContainer;
