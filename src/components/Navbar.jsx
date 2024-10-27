import { HiMenuAlt1 } from "react-icons/hi";
import { FaHeart, FaDownload, FaSun, FaMoon } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContex } from "../hook/useGlobalContext";

const themeFromLocalStroge = () => {
  return localStorage.getItem("theme") || "light";
};

const Navbar = () => {
  const { likedImages, downloadedImages } = useGlobalContex();
 
  
  const [theme, setTheme] = useState(themeFromLocalStroge());
  const toggleTheme = () => {
    const newTheme = theme == "light" ? "dark" : "light";

    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <section className="bg-base-300">
      <div className="align-element navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <HiMenuAlt1 className="text-xl md:text-2xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm  mt-3 w-52 rounded-box bg-base-300 p-2 shadow z-50"
            >
              <li>
                <NavLink to="/">Homepage</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink
                  to="/likedImage"
                  className="flex justify-between md:hidden"
                >
                  Liked images
                  <span className="badge">{likedImages.length}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="downloadedImages"
                  className="flex justify-between md:hidden"
                >
                  Downloaded images
                  <span className="badge">{downloadedImages.length}</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <NavLink to="/" className="btn btn-ghost text-xl">
            Unsplash.com
          </NavLink>
        </div>
        <div className="navbar-end">
          <button className="btn btn-circle btn-ghost hidden md:flex">
            <NavLink to="/likedImage">
              <div className="indicator">
                <FaHeart className="text-xl md:text-2xl" />
                <span className="badge indicator-item badge-primary badge-xs">
                  {likedImages.length}
                </span>
              </div>
            </NavLink>
          </button>
          <button className="btn btn-circle btn-ghost hidden md:flex">
            <NavLink to="downloadedImages">
              <div className="indicator">
                <FaDownload className="text-xl md:text-2xl" />
                <span className="badge indicator-item badge-primary badge-xs">
                  {downloadedImages.length}
                </span>
              </div>
            </NavLink>
          </button>
          <button className="btn btn-circle btn-ghost">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                onClick={toggleTheme}
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />

              {/* sun icon */}
              <FaSun className="swap-off fill-current text-xl md:text-2xl" />
              {/* moon icon */}
              <FaMoon className="swap-on fill-current text-xl md:text-2xl" />
            </label>
          </button>
          <button className="btn btn-circle btn-ghost">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar btn btn-circle btn-ghost"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-300 p-2 shadow"
              >
                <li>
                  <NavLink to="user" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </NavLink>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
