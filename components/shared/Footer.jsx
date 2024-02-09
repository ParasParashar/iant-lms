import { FaGlobe, FaPhoneAlt, FaMailBulk } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="p-20 bg-secondary w-full ">
      <h3 className=" text-[28px] text-blue-900">Stay in touch</h3>
      <h4 className="text-[24px] text-black mb-4">IANT Education Pri Lmt.</h4>
      <ul className="flex flex-col gap-1">
        <li className="flex gap-2 ">
          <FaGlobe />
          <a href="https://iantindia.com">https://iantindia.com</a>
        </li>
        <li className="flex gap-2">
          <FaPhoneAlt />
          <a>+91 9377916611</a>
        </li>
        <li className="flex gap-2">
          <FaMailBulk />
          <a
            className="text-[16px]"
            href="mailto:contact@iantindia.com"
            target="_blank"
          >
            contact@iantindia.com
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
