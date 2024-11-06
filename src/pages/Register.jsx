import React, { useEffect } from "react";
import { Form, NavLink, useActionData } from "react-router-dom";
import { FormInput } from "../components";

import { useRegister } from "../hook/useRegister";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const password = form.get("passwor");
  const confirmPassword = form.get("confirmPassword");

  if (password === confirmPassword) {
    return { name, email, password, confirmPassword };
  } else {
    return null;
    toast.warn("Password is not equal!");
  }
};

const Register = () => {
 

  const { registerWithGoogle } = useRegister();
  const inputData = useActionData();

  useEffect(() => {
    if (inputData) {
      console.log(inputData);
    }
  }, []);

  return (
    <section className="flex w-full">
      <div className="online:bg-[url(https://picsum.photos/900/1200)] hidden h-screen grow bg-[url(../public/offline-img.jpg)] bg-cover bg-center md:flex"></div>
      <div className="md:background flex h-screen grow items-center justify-center bg-[url(https://picsum.photos/900/1200?blur)] px-5 md:bg-none md:p-0">
        <Form method="post" className="w-full max-w-96">
          <h1 className="mb-3 text-center text-3xl font-semibold text-base-100 md:mb-5 md:text-4xl md:text-slate-300">
            Register
          </h1>
          <div className="flex w-full flex-col gap-3 md:gap-5">
            <FormInput
              placeholder={"Mirzo"}
              name={"name"}
              type={"text"}
            ></FormInput>
            <FormInput
              placeholder={"mirzo@gmail.com"}
              name={"email"}
              type={"email"}
            ></FormInput>
            <FormInput
              placeholder={"*******"}
              name={"passwor"}
              type={"password"}
            ></FormInput>
            <FormInput
              placeholder={"*******"}
              name={"confirmPassword"}
              type={"password"}
            ></FormInput>
          </div>
          <div className="mt-2 flex justify-between">
            <NavLink
              to="/login"
              className="link-primary text-base-100 md:text-slate-300"
            >
              You already have account!
            </NavLink>
          </div>
          <div className="my-5 flex flex-col gap-3 md:flex-row md:gap-5">
            <button
              type="submit"
              className="btn btn-primary btn-sm grow md:btn-md"
            >
              Register
            </button>
            <button
              onClick={registerWithGoogle}
              type="button"
              className="btn btn-secondary btn-sm grow md:btn-md"
            >
              Google
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Register;
