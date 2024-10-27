import { FaGithub, FaInstagram, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-300">
      <div className="align-element footer footer-center p-10">
        <aside>
          <p className="font-bold">Powered by: M1RZO DEV</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaTelegram className="text-xl md:text-3xl" />
            </a>
            <a>
              <FaInstagram className="text-xl md:text-3xl" />
            </a>
            <a>
              <FaGithub className="text-xl md:text-3xl" />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
