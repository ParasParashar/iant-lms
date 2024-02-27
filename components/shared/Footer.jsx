import {
  FaGlobe,
  FaPhoneAlt,
  FaMailBulk,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="p-5 bg-slate-100 shadow-inner shadow-slate-400 dark:shadow-neutral-500 w-full flex justify-between sm:p-10 max-[450px]: gap-3 dark:bg-secondary ">
      <div className="flex flex-col item-start justify-start">
        <p className="text-[28px] max-[400px]:text-[20px] cursor-default text-blue-900 dark:text-blue-500 max-[500px]:text-[24px] font-semibold">
          Stay in touch
        </p>
        <p className="text-[24px] cursor-default max-[400px]:text-sm max-[500px]:text-[20px] text-black dark:text-white/90 mb-4">
          IANT Education Pri Lmt.
        </p>
        <ul className="flex flex-col gap-1">
          <li className="flex items-center gap-3">
            <FaGlobe className="a" />
            <a
              className="max-[400px]:text-sm hover:text-blue-600 hover:underline"
              href="https://iantindia.com"
            >
              https://iantindia.com
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FaPhoneAlt />
            <a className="max-[400px]:text-sm hover:text-blue-600 hover:underline">
              +91 9377916611
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FaMailBulk />
            <a
              className="text-[16px] max-[400px]:text-sm hover:text-blue-600 hover:underline"
              href="mailto:contact@iantindia.com"
              target="_blank"
            >
              contact@iantindia.com
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-2 ">
            <FaYoutube color="red" size={24} />
            <a
              className="text-xl max-[400px]:text-sm max-[500px]:text-lg hover:text-blue-600 hover:underline"
              href="https://www.youtube.com/"
            >
              YouTube
            </a>
          </li>
          <li className="flex items-center gap-2 ">
            <FaLinkedin color="#0A66C2" size={24} />

            <a
              className="text-xl max-[400px]:text-sm max-[500px]:text-lg hover:text-blue-600 hover:underline"
              href="https://www.linkedin.com/"
            >
              Linkedin
            </a>
          </li>
          <li className="flex items-center gap-2 ">
            <FaFacebook className=" text-blue-600" size={24} />
            <a
              className=" text-xl max-[400px]:text-sm max-[500px]:text-lg hover:text-blue-600 hover:underline"
              href="https://www.youtube.com/"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
