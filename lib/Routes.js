import { BiBookReader, BiHome, BiMessageRoundedDots } from "react-icons/bi";
import { VscNote } from "react-icons/vsc";

export const navbarRoutes = [
  {
    name: "Home",
    href: "/home",
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
    name: "Message",
    href: "/messages",
    icon: BiMessageRoundedDots,
  },
];
