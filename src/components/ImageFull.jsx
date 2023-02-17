import React from "react";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";

const ImageFull = ({ img }) => {
  return (
    <div className="py-2 flex justify-center">
      <img src={img?.image} alt={img?.image} />
    </div>
  );
};

export default ImageFull;
