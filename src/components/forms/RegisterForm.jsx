import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthProvider";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";

const RegisterForm = ({ close }) => {
  const { register, loading } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("El nombre es obligatorio"),
      email: Yup.string()

        .email("Email no válido")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
      confirPassword: Yup.string().equals(
        [Yup.ref("password")],
        "Las contraseñas no coinciden",
      ),
    }),
    onSubmit: async (values) => {
      // console.log(values);
      const { username, email, password } = values;
      try {
        await register(username, email, password);
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
        <label htmlFor="name">Nombre de Usuario</label>
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          className="border-2 border-purple-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-700"
        />
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
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
      <div className="w-full flex flex-col">
        <label htmlFor="password">Confirmar Contraseña</label>
        <input
          type="password"
          name="confirPassword"
          value={formik.values.confirPassword}
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
          "Registrarse"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
