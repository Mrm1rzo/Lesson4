import React from "react";
import { Outlet } from "react-router-dom";

import { Footer, Navbar } from "../components";

const MainLayouts = () => {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default MainLayouts;
