import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createAuthUserWithEmailandPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      email: "",
      name: "",
    },
  });
  const navigate = useNavigate();

  const routeChange = () => {
    navigate("/");
  };
  const handleSubmitForm = async (data) => {
    try {
      //console.log(data);
      const { password, email, name } = data;
      const { user } = await createAuthUserWithEmailandPassword(
        email,
        password
      );
      //console.log(user);
      // setCurrentUser(user);
      const response = await createUserDocumentFromAuth(user, { name });
      //console.log(response);

      //Navigate to sign-in page
      user && routeChange();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center lg:h-screen">
      <div className="bg-gray-800 px-10 py-10 lg:rounded-xl flex flex-col gap-4 w-full lg:w-1/4 h-screen lg:h-auto items-center justify-center">
        <h3 className="text-center text-white text-xl mb-4 font-bold">
          SignUp
        </h3>
        <div className="w-full">
          <Input
            {...register("name")}
            name="name"
            placeholder="Name"
            type="text"
            className="bg-gray-600 text-gray-200 placeholder:text-gray-200"
          />
          <p className={`text-red-500 ${errors.email?.message ? "" : "mb-6"}`}>
            {errors.email?.message}
          </p>
        </div>

        <div className="w-full">
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            name="email"
            placeholder="Email"
            type="email"
            className="bg-gray-600 text-gray-200 placeholder:text-gray-200"
          />
          <p className={`text-red-500 ${errors.email?.message ? "" : "mb-6"}`}>
            {errors.email?.message}
          </p>
        </div>

        <div className="w-full">
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            name="password"
            placeholder="Password"
            type="password"
            className="bg-gray-600 text-gray-200 placeholder:text-gray-200"
          />
          <p
            className={`text-red-500 ${errors.password?.message ? "" : "mb-6"}`}
          >
            {errors.password?.message}
          </p>
        </div>

        <Button
          className="bg-yellow-500 w-full text-black font-bold hover:bg-yellow-600"
          onClick={handleSubmit(handleSubmitForm)}
        >
          SignUp
        </Button>
        <p className="text-white">
          Already have account?{" "}
          <Link to={"/login"} className="text-yellow-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
