import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthProvider";
import { ImSpinner3 } from "react-icons/im";

const LoginForm = ({ close }) => {
  const { login, loading } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email no válido")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: async (values) => {
      // console.log(values);
      try {
        await login(values.email, values.password);
        close();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form className="flex flex-col space-y-5" onSubmit={formik.handleSubmit}>
      <div className="w-full flex flex-col">
        <label htmlFor="name">Email</label>
        <input
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
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
          "Ingresar"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
