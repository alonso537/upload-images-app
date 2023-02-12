import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ImagesContext } from "../../context/ImagesProvider";
import { ImSpinner3 } from "react-icons/im";

const DeleteForm = ({ img, close }) => {
  //   console.log(img);
  const { loading, deleteImage } = useContext(ImagesContext);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (form) => {
      try {
        await deleteImage(img?.id, form);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form
      className="flex flex-col items-center space-y-3"
      onSubmit={formik.handleSubmit}>
      <h2 className="text-2xl text-center font-bold text-gray-700">
        ¿Deseas eliminar la imagen con el id {img?.id}
      </h2>

      <div className="flex flex-col items-center">
        <label className="text-xl font-semibold text-purple-500">
          Contraseña
        </label>
        <input
          className="border-2 border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-gray-700"
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </div>

      <div className="flex justify-end w-full space-x-2">
        <button
          type="submit"
          className="bg-red-500 p-2 rounded text-white transition hover:bg-red-700">
          {loading ? (
            <div className="flex justify-center">
              <ImSpinner3 className="animate-spin" />
            </div>
          ) : (
            "Eliminar"
          )}
        </button>
        <button
          onClick={close}
          className="bg-blue-500 p-2 rounded text-white transition hover:bg-blue-700">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default DeleteForm;
