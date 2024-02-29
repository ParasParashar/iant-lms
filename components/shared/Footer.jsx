import Link from "next/link";
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
          IANT Education Pvt. Ltd
        </p>
        <ul className="flex flex-col gap-1">
          <li className="flex items-center gap-3">
            <FaGlobe className="a" />

            <Link
              className="max-[400px]:text-sm hover:text-blue-600 hover:underline"
              href="https://iantindia.com"
              target="_blank"
            >
              https://iantindia.com
            </Link>
          </li>
          <li className="flex items-center gap-3">
            <FaPhoneAlt />
            <Link
              className="max-[400px]:text-sm hover:text-blue-600 hover:underline"
              target="_blank"
              href="tel:+91 937 791 6611"
            >
              +91 9377916611
            </Link>
          </li>
          <li className="flex items-center gap-3">
            <FaMailBulk />
            <Link
              className="text-[16px] max-[400px]:text-sm hover:text-blue-600 hover:underline"
              href="mailto:contact@iantindia.com"
              target="_blank"
            >
              contact@iantindia.com
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-2 ">
            <FaYoutube color="red" size={24} />
            <Link
              className="text-xl max-[400px]:text-sm max-[500px]:text-lg hover:text-blue-600 hover:underline"
              href="https://www.youtube.com/channel/UCDXpTmcSSW5NlMp7rQnf0bw"
              target="_blank"
            >
              YouTube
            </Link>
          </li>
          <li className="flex items-center gap-2 ">
            <FaLinkedin color="#0A66C2" size={24} />

            <Link
              className="text-xl max-[400px]:text-sm max-[500px]:text-lg hover:text-blue-600 hover:underline"
              href="https://www.linkedin.com/school/iant-official-page/"
              target="_blank"
            >
              Linkedin
            </Link>
          </li>
          <li className="flex items-center gap-2 ">
            <FaFacebook className=" text-blue-600" size={24} />
            <Link
              className=" text-xl max-[400px]:text-sm max-[500px]:text-lg hover:text-blue-600 hover:underline"
              href="https://www.facebook.com/IANT.Official.Page"
              target="_blank"
            >
              Facebook
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
