import { BiBookReader, BiHome, BiMessageRoundedDots } from "react-icons/bi";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { VscNote } from "react-icons/vsc";

export const navbarRoutes = [
  {
    name: "Home",
    href: "/",
    icon: BiHome,
  },
  {
    name: "Courses",
    href: "/courses",
    icon: BiBookReader,
  },
  {
    name: "Notes",
    href: "/notes",
    icon: VscNote,
  },
  {
    name: "Notisfications",
    href: "/notisfications",
    icon: MdOutlineNotificationsActive,
  },
  {
    name: "Message",
    href: "/messages",
    icon: BiMessageRoundedDots,
  },
];
