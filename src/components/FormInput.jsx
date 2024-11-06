import { FaKey, FaSearch, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const FormInput = ({ type, name, placeholder }) => {
  return (
    <label className="input input-sm input-bordered flex w-full items-center gap-2 md:input-md">
      <input
        type={type}
        name={name}
        className="grow"
        placeholder={placeholder}
      />
      {name === "search" && <FaSearch className="text-sm md:text-xl" />}
      {type === "password" && <FaKey className="text-sm md:text-xl" />}
      {type === "email" && <MdEmail className="text-sm md:text-xl" />}
      {name === "name" && <FaUser className="text-sm md:text-xl" />}
    </label>
  );
};

export default FormInput;
