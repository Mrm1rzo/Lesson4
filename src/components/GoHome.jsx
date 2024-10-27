import React from "react";
import { NavLink } from "react-router-dom";

const GoHome = () => {
  return (
    <div className="align-element flex h-full flex-col items-center justify-center gap-5">
      <h1 className="text-lg md:text-3xl">You don't choose andy images yet!</h1>
      <NavLink to="/" className="btn btn-primary text-lg md:text-2xl">
        Go home
      </NavLink>
    </div>
  );
};

export default GoHome;
