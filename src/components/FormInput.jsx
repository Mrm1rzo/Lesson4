import { FaSearch } from "react-icons/fa";

const FormInput = ({ type, name, placeholder }) => {
  return (
    <label className="input input-sm input-bordered flex w-full items-center gap-2 md:input-md">
      <input
        type={type}
        name={name}
        className="grow"
        placeholder={placeholder}
      />
      <FaSearch className="text-sm md:text-xl" />
    </label>
  );
};

export default FormInput;
