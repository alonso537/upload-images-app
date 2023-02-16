import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ImagesContext } from "../../context/ImagesProvider";

const UpdateImage = ({ img, close }) => {
  const { loading, updateImage } = useContext(ImagesContext);
  const [image, setImage] = useState(img?.image);
  const [preview, setpreview] = useState({});
  //   console.log(img);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (form) => {
      const formData = new FormData();
      form.password.length > 1
        ? formData.append("password", form.password)
        : null;
      img?.image !== image ? formData.append("image", image) : null;

      formData.append("user", img?.user);

      await updateImage(img?.id, formData);
      close();
    },
  });

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setpreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  return (
    <form className="flex flex-col space-y-5" onSubmit={formik.handleSubmit}>
      <div className="w-full flex flex-col">
        <label htmlFor="name">Imagen</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImage}
          className="border-2 border-purple-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-700"
        />
      </div>
      {preview.length > 0 ? (
        <img
          src={preview}
          alt="preview"
          className="w-20 h-20 object-cover rounded-full"
        />
      ) : (
        <img
          className="w-20 h-20 object-cover rounded-full"
          src={image}
          alt={image}
        />
      )}

      <div className="w-full flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="border-2 border-purple-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-700"
        />
      </div>

      <button
        type="submit"
        className="bg-purple-500 text-white px-5 py-2 rounded-md font-semibold  transition hover:bg-purple-700">
        {loading ? (
          <div className="flex justify-center">
            <ImSpinner3 className="animate-spin" />
          </div>
        ) : (
          "Subir"
        )}
      </button>
    </form>
  );
};

export default UpdateImage;
