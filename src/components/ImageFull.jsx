import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageFull = ({ img }) => {
  return (
    <div className="py-2">
      <ImageGallery
        items={[{ original: img?.image }]}
        showFullscreenButton={true}
        showPlayButton={false}
        showThumbnails={false}
        showNav={false}
      />
    </div>
  );
};

export default ImageFull;
