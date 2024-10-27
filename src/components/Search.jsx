import React from "react";
import FormInput from "./FormInput";
import { Form } from "react-router-dom";

const Search = () => {
  return (
    <Form method="post" className="mx-auto flex w-full max-w-xl gap-3">
      <FormInput type="text" name="search" placeholder="Search" />
      <button className="btn btn-primary btn-sm md:btn-md md:hidden">
        Search
      </button>
    </Form>
  );
};

export default Search;
