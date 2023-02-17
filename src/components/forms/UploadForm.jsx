import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ImagesContext } from "../../context/ImagesProvider";
import { AuthContext } from "../../context/AuthProvider";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";

const UploadForm = ({ close }) => {
  const { createImage, loading } = useContext(ImagesContext);
  const { user } = useContext(AuthContext);

  const [image, setImage] = useState({});

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (form) => {
      const formData = new FormData();

      formData.append("user", user?.id);
      formData.append("password", form.password);
      formData.append("image", image);

      try {
        await createImage(formData);
        close();
      } catch (error) {
        // console.log(error);
        toast.error("error");
      }
    },
  });

  return (
    <form className="flex flex-col space-y-5" onSubmit={formik.handleSubmit}>
      <div className="w-full flex flex-col">
        <label htmlFor="name">imagen</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          className="border-2 border-purple-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-700"
        />
      </div>

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

export default UploadForm;
