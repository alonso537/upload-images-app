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
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
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
